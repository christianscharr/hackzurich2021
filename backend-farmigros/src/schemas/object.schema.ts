import {Prop, Schema} from '@nestjs/mongoose';

@Schema()
export class GridObject {
    @Prop()
        // x and y
    position: [number, number];

    @Prop()
        // Timestamp to determine age
    addedAt: Date;

    @Prop()
    type: ObjectType;

}

export enum ObjectType{
    WHEAT = 0,
    FISH = 1,
    COW = 2,
    TREE = 3
}
