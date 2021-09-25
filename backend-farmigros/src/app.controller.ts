import {Controller, Get} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {AppService} from './app.service';

import {User, UserDocument} from "./schemas/user.schema";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, @InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    @Get()
    async getFields() {

        console.log(await this.userModel.find().exec());

    }
}
