import {Prop, Schema} from '@nestjs/mongoose';

@Schema()
export class Field {
    @Prop()
    type: FieldType;

    @Prop()
    // x and y
    position: [number, number];

    @Prop()
    // Array of timestamps, Length of Array is amount of max items
    addedAt: Date[];

}

export enum FieldType{
    WHEAT_FIELD = 0,
    POND = 1,
    CAGE = 2,
    TREE_FIELD = 3
}
