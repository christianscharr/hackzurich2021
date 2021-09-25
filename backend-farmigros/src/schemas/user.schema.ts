import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Field} from "./field.schema";
import {Inventory} from './inventory.schema';

export type UserDocument = User & Document;


@Schema()
export class User {

    constructor(firstname?: string, lastname?: string, fields?: Field[], inventory?: Inventory) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.fields = fields;
        this.inventory = inventory;
    }

    @Prop()
    firstname: string;
    @Prop()
    lastname: string;

    @Prop()
    fields: Field[];
    @Prop()
    inventory: Inventory
}

export const UserSchema = SchemaFactory.createForClass(User);
