import {Body, Controller, Get, GoneException, Post, Put} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {AppService} from './app.service';

import {User, UserDocument} from "./schemas/user.schema";
import {GridObject, ObjectType} from './schemas/object.schema';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {
    }

    @Get('/grid-objects')
    async getFields(): Promise<GridObject[]> {
        return (await this.userModel.findOne().exec()).gridObjects;
    }

    @Get('/inventory')
    async getInventory(): Promise<ObjectType[]> {
        return (await this.userModel.findOne().exec()).inventory;
    }

    @Post("/testdata")
    async insertUser() {
        const createdUser = new this.userModel({
                firstname: "Moritz",
                lastname: "Wicki",
                gridObjects: [
                    {
                        type: ObjectType.FISH,
                        positionX: 1,
                        positionY: 1,
                        addedAt: Date.now() - 3600
                    },
                    {
                        type: ObjectType.WHEAT,
                        positionX: 5,
                        positionY: 4,
                        addedAt: Date.now() - 3600 * 1000
                    }
                ],
                inventory: [ObjectType.COW, ObjectType.FISH, ObjectType.FISH, ObjectType.WHEAT]

            }
        );
        return createdUser.save();
    }

    @Put('/put')
    async plant(@Body() body: { positionX: number, positionY: number, objectType: ObjectType }) {
        const user = (await this.userModel.findOne().exec());
        if (!user.inventory.includes(body.objectType)) {
            throw new GoneException();
        }
        const index = user.inventory.indexOf(body.objectType)
        user.inventory.splice(index, 1);
        user.gridObjects.push(new GridObject(body.positionX, body.positionY, Date.now(), body.objectType));
        await user.save();
    }
}
