import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id: String;

  @Prop()
  name: String;

  @Prop()
  product_type?: String;

  @Prop()
  image?: {
    source?: String;
    code?: String;
    description?: String;
    original?: String;
    small?: String;
    medium?: String;
    large?: String;
  };

  @Prop()
  slug?: String;

  @Prop()
  receipt_text?: String;

  @Prop()
  description?: {
    text?: String;
    source?: String;
  };

  @Prop()
  short_description?: String;

  @Prop()
  gtins?: [String];

  @Prop()
  m_check2?: {
    carbon_footprint?: {
      image?: {
        source?: String;
        code?: String;
        description?: String;
        original?: String;
        small?: String;
        medium?: String;
        large?: String;
      },
      ground_and_sea_cargo?: {
        kg_co2: Number;
        kg_co2_range?: String;
        co2_in_car_km?: Number;
        rating: Number;
        production_in_percent?: Number;
        packaging_in_percent?: Number;
        transport_in_percent?: Number;
      },
      air_cargo?: {
        kg_co2: Number;
        kg_co2_range?: String;
        co2_in_car_km?: Number;
        rating: Number;
        production_in_percent?: Number;
        packaging_in_percent?: Number;
        transport_in_percent?: Number;
      }
    },
    animal_welfare?: {
      rating?: Number;
      label?: String;
      image?: {
        source?: String;
        code?: String;
        description?: String;
        original?: String;
        small?: String;
        medium?: String;
        large?: String;
      }
    },
    air_cargo_relevant?: Boolean;
    m_check_relevant?: Boolean;
    animal_welfare_relevant?: Boolean;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);
