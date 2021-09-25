import {Controller, Get, Post} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {AppService} from './app.service';

import {User, UserDocument} from "./schemas/user.schema";
import {Inventory} from './schemas/inventory.schema';
import {Field, FieldType} from './schemas/field.schema';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {
    }

    @Get('/fields')
    async getFields(): Promise<Field[]> {
        return (await this.userModel.findOne().exec()).fields;
    }

    @Get('/inventory')
    async getInventory(): Promise<Inventory> {
        return (await this.userModel.findOne().exec()).inventory;
    }

    @Post("/testdata")
    async insertUser() {
        const createdUser = new this.userModel({
                firstname: "Moritz",
                lastname: "Wicki",
                fields: [{
                    fieldType: FieldType.POND,
                    position: [0, 0],
                    addedAt: [Date.now(), Date.now() - 3600]
                }],
                inventory: {
                    materials: [FieldType.TREE_FIELD, FieldType.TREE_FIELD, FieldType.POND]
                }
            }
        );
        return createdUser.save();
    }
}
