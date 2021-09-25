import {Prop, Schema} from '@nestjs/mongoose';
import {ObjectType} from './object.schema';


@Schema()
export class Inventory {
    @Prop()
    // Corresponding items to the FieldType
    materials: ObjectType[];
}
