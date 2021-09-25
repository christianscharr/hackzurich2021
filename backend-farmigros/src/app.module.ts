import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Credentials } from './credentials';

@Module({
  imports: [MongooseModule.forRoot(Credentials.mongoDbUrl)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
