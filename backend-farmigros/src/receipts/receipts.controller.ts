import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AzureKeyCredential, FormRecognizerClient } from "@azure/ai-form-recognizer";
import { FileInterceptor } from "@nestjs/platform-express";
import { Credentials } from "../credentials";
import { ProductCategory, ProductDto } from "../dtos/product-dto";
import { AuzreReceiptMock } from "./azure-ReceiptResult-mock";
import { ReceiptResponse } from "../dtos/receipt-response";
import { CarbonFootprintType } from "../dtos/carbon-footprint-dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { Product, ProductDocument } from "../schemas/product.schema";

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
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<ReceiptResponse> {
    console.log(`[POST /receipts/upload] Received file ${file.originalname} (size: ${file.size}, type: ${file.mimetype})`);
    const receiptNames = await this.mockRecognizeReceipt();
    const products: ProductDto[] = [];

    for (let receiptName in receiptNames) {
      const product = await this.mapReceiptNameToProdcut(receiptName);
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
      console.error(`Failed to query product with receipt name "${receiptName}"`);
      return null;
    }

    const productDto: ProductDto = {
      name: product.name.toString(),
      receipt_test: product.receipt_text.toString(),
      id: product.id,
      category: ProductCategory.FRUITS,
    };

    return productDto;
  }
}
