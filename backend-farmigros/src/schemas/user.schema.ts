import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Field} from "./field.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    firstname: string;
    @Prop()
    lastname: string;

    @Prop()
    fields: Field[];
    // @Prop()
    // // TODO
    // inventory: any
}

export const UserSchema = SchemaFactory.createForClass(User);
