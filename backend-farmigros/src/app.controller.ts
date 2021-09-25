import {Controller, Get, GoneException, HttpStatus, Post, Put} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {AppService} from './app.service';

import {User, UserDocument} from "./schemas/user.schema";
import {Inventory} from './schemas/inventory.schema';
import {GridObject, ObjectType} from './schemas/object.schema';
import {response} from "express";

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
    async getInventory(): Promise<Inventory> {
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
                        position: [0, 0],
                        addedAt: Date.now() - 3600
                    },
                    {
                        type: ObjectType.WHEAT,
                        position: [5, 0],
                        addedAt: Date.now() - 3600 * 1000
                    }
                ],
                inventory: {
                    materials: [ObjectType.COW, ObjectType.FISH, ObjectType.FISH, ObjectType.WHEAT]
                }
            }
        );
        return createdUser.save();
    }

    @Put('/put')
    async plant(positionX: number, positionY: number, objectType: ObjectType) {
        const user = (await this.userModel.findOne().exec());
        const userInventory = user.inventory;

        if (!userInventory.materials.includes(objectType)) {
            console.log(objectType);
            console.log(userInventory.materials);
            throw new GoneException();
        }
        userInventory.materials.splice(userInventory.materials.indexOf(objectType), 1);
        user.gridObjects.push(new GridObject(positionX, positionY, Date.now(), objectType));
    }
}
