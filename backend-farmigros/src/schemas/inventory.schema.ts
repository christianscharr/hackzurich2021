import {Prop, Schema} from '@nestjs/mongoose';
import {FieldType} from './field.schema';


@Schema()
export class Inventory {
    @Prop()
    // Corresponding items to the FieldType
    materials: FieldType[];
}
