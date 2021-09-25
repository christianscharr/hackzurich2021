import {Prop, Schema} from '@nestjs/mongoose';
import {Field} from './field.schema';

@Schema()
export class User {
    @Prop()
    firstname: string;
    @Prop()
    lastname: string;

    @Prop()
    fields: Field[];
    @Prop()
    // TODO
    inventory: any
}
