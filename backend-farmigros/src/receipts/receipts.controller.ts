import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AzureKeyCredential, FormRecognizerClient } from "@azure/ai-form-recognizer";
import { FileInterceptor } from "@nestjs/platform-express";
import { Credentials } from "../credentials";
import { ProductCategory, ProductDto } from "../dtos/product-dto";
import { AuzreReceiptMock } from "./azure-ReceiptResult-mock";
import { ReceiptResponse } from "../dtos/receipt-response";
import { CarbonFootprintType } from "../dtos/carbon-footprint-dto";

@Controller('receipts')
export class ReceiptsController {
  public static RECEIPT_BREAKWORDS = [
    'Cumulus-Bonuspunkte',
    'Rundungsvorteil',
    'Sie sparen total'
  ];

  private client: FormRecognizerClient;

  constructor() {
    this.client = new FormRecognizerClient(Credentials.azureFormRecognitionEndpoint, new AzureKeyCredential(Credentials.azureApiKey));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<ReceiptResponse> {
    console.log(`[POST /receipts/upload] Received file ${file.originalname} (size: ${file.size}, type: ${file.mimetype})`);
    const receiptNames = await this.mockRecognizeReceipt();
    const products = receiptNames.map(receiptName => this.mapReceiptNameToProdcut(receiptName));

    return {
      products
    };
  }

  private async mockRecognizeReceipt(): Promise<string[]> {
    const mockData = AuzreReceiptMock;
    const products = [];

    for (let receiptLine of mockData.analyzeResult.documentResults[0].fields.Items.valueArray) {
      if (receiptLine.type !== 'object') {
        continue;
      }

      if (!('Name' in receiptLine.valueObject)) {
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

  private mapReceiptNameToProdcut(receiptName: string): ProductDto {
    return {
      name: receiptName,
      receipt_test: receiptName,
      id: 123456789,
      description: receiptName,
      category: ProductCategory.FRUITS,
      carbonFootprint: {
        image: 'https://',
        data: [{
          type: CarbonFootprintType.GROUND_AND_SEA_CARGO,
          kgCo2: 100,
          rating: 3
        }]
      }
    }
  }
}
