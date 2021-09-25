import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Credentials } from './credentials';
import { User, UserSchema } from "./schemas/user.schema";
import { ReceiptsController } from './receipts/receipts.controller';
import { Product, ProductSchema } from "./schemas/product.schema";

@Module({
  imports: [
    HttpClientModule,
    MongooseModule.forRoot(Credentials.mongoDbUrl),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Product.name,
        schema: ProductSchema
      }
    ])
  ],
  controllers: [AppController, ReceiptsController],
  providers: [AppService],
})
export class AppModule {}
