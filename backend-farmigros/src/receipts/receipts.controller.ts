import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AzureKeyCredential, FormRecognizerClient } from "@azure/ai-form-recognizer";
import { Credentials } from "../credentials";
import { ProductCategory, ProductDto } from "../dtos/product-dto";
import { AuzreReceiptMock } from "./azure-ReceiptResult-mock";
import { ReceiptResponse } from "../dtos/receipt-response";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "../schemas/product.schema";
import { CarbonFootprintType } from "../dtos/carbon-footprint-dto";
import path from 'path';
import fs from 'fs';

@Controller('receipts')
export class ReceiptsController {
  public static RECEIPT_BREAKWORDS = [
    'Cumulus-Bonuspunkte',
    'Rundungsvorteil',
    'Sie sparen total'
  ];

  private client: FormRecognizerClient;

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    this.client = new FormRecognizerClient(Credentials.azureFormRecognitionEndpoint, new AzureKeyCredential(Credentials.azureApiKey));
  }

  @Post('upload')
  async uploadFile(@Body() dataUrlfile: string): Promise<ReceiptResponse> {
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const matches = dataUrlfile.match(regex);
    const fileExtension = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, 'base64');

    console.log(`[POST /receipts/upload] Received file with size: ${buffer.length} and type: ${fileExtension}`);
    const uploadDir = path.join(__dirname, 'upload');

    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }

    fs.writeFileSync(path.join(uploadDir, `data.${fileExtension}`), buffer);

    const receiptNames = await this.mockRecognizeReceipt();
    const products: ProductDto[] = [];

    for (let receiptName in receiptNames) {
      const product = await this.mapReceiptNameToProdcut(receiptName);

      if (product === null) {
        continue;
      }

      products.push(product);
    }

    return {
      products
    };
  }

  @Get('mock')
  async getMockReceipt(): Promise<ReceiptResponse> {
    const receiptNames = await this.mockRecognizeReceipt();
    const products: ProductDto[] = [];

    for (let receiptName of receiptNames) {
      const product = await this.mapReceiptNameToProdcut(receiptName);

      if (product === null) {
        continue;
      }

      products.push(product);
    }

    return {
      products
    };
  }

  private async mockRecognizeReceipt(): Promise<string[]> {
    const mockData = AuzreReceiptMock;
    const products = [];

    for (let receiptLine of mockData.analyzeResult.documentResults[0].fields.Items.valueArray) {
      if (receiptLine.type !== 'object' || !('Name' in receiptLine.valueObject)) {
        continue;
      }

      if (ReceiptsController.RECEIPT_BREAKWORDS.includes(receiptLine.valueObject.Name.text)) {
        break;
      }

      products.push(receiptLine.valueObject.Name.text);
    }

    return products;
  }

  private async recognizeReceipt(): Promise<string[]> {
    return [];
  }

  private async mapReceiptNameToProdcut(receiptName: string): Promise<ProductDto> {
    const product = await this.productModel.findOne({ receipt_text: receiptName }).exec();

    if (!product) {
      console.error(`[WARN] Failed to query product with receipt name "${receiptName}"`);
      return null;
    }

    const productDto: ProductDto = {
      name: product.name,
      receipt_test: product.receipt_text,
      id: product.id,
      category: ProductCategory.FRUITS,
    };

    if (product.m_check2 && product.m_check2.carbon_footprint
      && (product.m_check2.carbon_footprint.air_cargo || product.m_check2.carbon_footprint.ground_and_sea_cargo)) {
      productDto.carbonFootprint = {
        image: product.m_check2.carbon_footprint.image.original,
        data: []
      };

      if (product.m_check2.carbon_footprint.air_cargo) {
        productDto.carbonFootprint.data.push({
          kgCo2: product.m_check2.carbon_footprint.air_cargo.kg_co2,
          rating: product.m_check2.carbon_footprint.air_cargo.rating,
          type: CarbonFootprintType.AIR_CARGO,
        });
      }

      if (product.m_check2.carbon_footprint.ground_and_sea_cargo) {
        productDto.carbonFootprint.data.push({
          kgCo2: product.m_check2.carbon_footprint.ground_and_sea_cargo.kg_co2,
          rating: product.m_check2.carbon_footprint.ground_and_sea_cargo.rating,
          type: CarbonFootprintType.GROUND_AND_SEA_CARGO,
        });
      }
    }

    if (product.m_check2 && product.m_check2.animal_welfare) {
      productDto.animalWelfare = {
        image: product.m_check2.animal_welfare.image.original,
        rating: product.m_check2.animal_welfare.rating,
        label: product.m_check2.animal_welfare.label,
      };
    }

    return productDto;
  }
}
