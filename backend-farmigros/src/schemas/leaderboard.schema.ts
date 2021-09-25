import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from "mongoose";

export type LeaderboardDocument = Leaderboard & Document;

@Schema()
export class Leaderboard {
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  isClosed: boolean;

  @Prop()
  title: string;

  @Prop()
  ranks: { id: ObjectId, ranking: number }[]
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);
