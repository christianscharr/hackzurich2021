import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from "mongoose";

export type ProductDocument = Product & Document;

export class ProductImage {
  source: String;
  code: String;
  description: String;
  original: String;
  small: String;
  medium: String;
  large: String;
}

export class ProductDescription {
  text: String;
  source: String;
}

export class MCheck {
  carbon_footprint: MCheckCarbonFootprint;
  animal_welfare: MCheckAnimalWelfare;
  air_cargo_relevant: Boolean;
  m_check_relevant: Boolean;
  animal_welfare_relevant: Boolean;
}

export class MCheckCarbonFootprint {
  image: ProductImage;
  ground_and_sea_cargo: MCheckCarbonFootprintCargo;
  air_cargo: MCheckCarbonFootprintCargo;
}

export class MCheckCarbonFootprintCargo {
  kg_co2: Number;
  kg_co2_range: String;
  co2_in_car_km: Number;
  rating: Number;
  production_in_percent: Number;
  packaging_in_percent: Number;
  transport_in_percent: Number;
}

export class MCheckAnimalWelfare {
  rating: Number;
  label: String;
  image: ProductImage
}

@Schema()
export class Product {
  @Prop()
  id: String;

  @Prop()
  name: String;

  @Prop()
  product_type: String;

  @Prop()
  image: ProductImage;

  @Prop()
  slug: String;

  @Prop()
  receipt_text: String;

  @Prop()
  description: ProductDescription;

  @Prop()
  short_description: String;

  @Prop()
  gtins: [String];

  @Prop()
  m_check2: MCheck;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
