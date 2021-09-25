import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeaderboardDocument = Leaderboard & Document;

@Schema()
export class Leaderboard {
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  isClosed: boolean;
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);
