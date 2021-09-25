import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Credentials } from './credentials';
import {User, UserSchema} from "./schemas/user.schema";

@Module({
  imports: [MongooseModule.forRoot(Credentials.mongoDbUrl), MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
