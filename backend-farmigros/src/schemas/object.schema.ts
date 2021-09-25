import {Prop, Schema} from '@nestjs/mongoose';

@Schema()
export class GridObject {
    constructor(positionX: number, positionY: number, addedAt: number, objectType: ObjectType) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.addedAt = addedAt;
        this.objectType = objectType;
    }

    @Prop()
    positionX: number;

    @Prop()
    positionY: number;

    @Prop()
        // Timestamp to determine age
    addedAt: number;

    @Prop()
    objectType: ObjectType;

}

export enum ObjectType{
    WHEAT = 0,
    FISH = 1,
    MEAT = 2,
    TREE = 3
}
