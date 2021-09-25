import {Prop, Schema} from '@nestjs/mongoose';
import {Field} from './field.model';

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
