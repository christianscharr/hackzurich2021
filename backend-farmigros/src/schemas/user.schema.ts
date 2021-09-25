import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {GridObject, ObjectType} from './object.schema';

export type UserDocument = User & Document;


@Schema()
export class User {

    constructor(firstname?: string, lastname?: string, gridObjects?: GridObject[], inventory?: ObjectType[]) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gridObjects = gridObjects;
        this.inventory = inventory;
    }

    @Prop()
    firstname: string;
    @Prop()
    lastname: string;

    @Prop()
    gridObjects: GridObject[];

    @Prop()
    inventory: ObjectType[];

}

export const UserSchema = SchemaFactory.createForClass(User);
