import {Prop, Schema} from '@nestjs/mongoose';

@Schema()
export class Field {
    @Prop()
    type: FieldType;

    @Prop()
    // x and y
    position: [number, number];

    @Prop()
    cumulusCardNr: string;

}

export enum FieldType{
    WHEAT_FIELD=0,
    POND=1,
    CAGE=2,
    TREE_FIELD=3
}
