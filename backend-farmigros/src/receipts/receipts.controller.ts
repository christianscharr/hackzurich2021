import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AzureKeyCredential, FormRecognizerClient } from "@azure/ai-form-recognizer";
import { Credentials } from "../credentials";
import { ProductCategory, ProductDto } from "../dtos/product-dto";
import { AuzreReceiptMock } from "./azure-ReceiptResult-mock";
import { ReceiptResponse } from "../dtos/receipt-response";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MProductCategory, Product, ProductDocument } from "../schemas/product.schema";
import { CarbonFootprintType } from "../dtos/carbon-footprint-dto";
import * as path from "path";
import * as fs from "fs";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('receipts')
export class ReceiptsController {
  public static RECEIPT_BREAKWORDS = [
    'Cumulus-Bonuspunkte',
    'Rundungsvorteil',
    'Sie sparen total'
  ];
  public static UPLOAD_DIR = path.join(__dirname, '..', 'upload');

  private client: FormRecognizerClient;

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    this.client = new FormRecognizerClient(Credentials.azureFormRecognitionEndpoint, new AzureKeyCredential(Credentials.azureApiKey));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: ReceiptsController.UPLOAD_DIR
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<ReceiptResponse> {
    const uploadedFile = path.join(file.destination, file.filename);
    console.log(`[POST /receipts/upload] Received file "${file.originalname}" with size ${file.size} and saved it to "${uploadedFile}"`);

    const receiptNames = await this.recognizeReceipt(uploadedFile);
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

  private async recognizeReceipt(filename: string): Promise<string[]> {
    const readStream = fs.createReadStream(filename);
    const poller = await this.client.beginRecognizeReceipts(readStream, {
      onProgress: (state) => { console.log(`Azure Status: ${state.status}`); }
    });

    const receipts = await poller.pollUntilDone();

    if (!receipts || receipts.length <= 0) {
      throw new Error("Expecting at lease one receipt in analysis result");
    }

    const receipt = receipts[0];
    const products = [];
    const itemsField = receipt.fields["Items"];

    if (itemsField.valueType !== "array") {
      return products;
    }

    for (const itemField of itemsField.value || []) {
      if (itemField.valueType !== "object") {
        continue;
      }

      const itemNameField = itemField.value["Name"];

      if (!itemNameField) {
        continue;
      }

      if (itemNameField.valueType === "string") {
        if (ReceiptsController.RECEIPT_BREAKWORDS.includes(itemNameField.value)) {
          break;
        }

        products.push(itemNameField.value);
      }
    }

    return products;
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
      category: ProductCategory.UNKNOWN,
    };

    if (product.description) {
      productDto.description = product.description.text;
    }

    if (product.categories) {
      productDto.category = this.determineCategory(product.categories);
    }

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

  private determineCategory(categories: MProductCategory[]): ProductCategory {
    for (let mCategoriy of categories) {
      switch (mCategoriy.name) {
        case "Früchte":
          return ProductCategory.FRUITS;
        case "Gemüse":
          return ProductCategory.VEGETABLES;
        case "Fisch & Meeresfrüchte":
          return ProductCategory.FISH;
        case "Fleisch":
          return ProductCategory.MEAT;
        case "Brote":
          return ProductCategory.BAKERY;
        case "Müesli & Cerealien":
          return ProductCategory.CEREALS;
        case "Chips":
          return ProductCategory.CHIPS;
        case "Milch & Milchgetränke":
          return ProductCategory.MILK;
        case "Eier":
          return ProductCategory.EGGS;
        case "Pasta":
          return ProductCategory.PASTA;
      }
    }

    return ProductCategory.UNKNOWN;
  }
}
