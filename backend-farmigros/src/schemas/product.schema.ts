import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from "mongoose";

export type ProductDocument = Product & Document;

export class ProductImage {
  source: string;
  code: string;
  description: string;
  original: string;
  small: string;
  medium: string;
  large: string;
}

export class ProductDescription {
  text: string;
  source: string;
}

export class MCheck {
  carbon_footprint: MCheckCarbonFootprint;
  animal_welfare: MCheckAnimalWelfare;
  air_cargo_relevant: boolean;
  m_check_relevant: boolean;
  animal_welfare_relevant: boolean;
}

export class MCheckCarbonFootprint {
  image: ProductImage;
  ground_and_sea_cargo: MCheckCarbonFootprintCargo;
  air_cargo: MCheckCarbonFootprintCargo;
}

export class MCheckCarbonFootprintCargo {
  kg_co2: number;
  kg_co2_range: string;
  co2_in_car_km: number;
  rating: number;
  production_in_percent: number;
  packaging_in_percent: number;
  transport_in_percent: number;
}

export class MCheckAnimalWelfare {
  rating: number;
  label: string;
  image: ProductImage
}

export class MProductCategory {
  code: string;
  name: string;
  slug: string;
  visible: boolean;
  title: string;
  parent_cpde: string;
  level: number;
}

@Schema()
export class Product {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  product_type: string;

  @Prop()
  categories: [MProductCategory];

  @Prop()
  image: ProductImage;

  @Prop()
  slug: string;

  @Prop()
  receipt_text: string;

  @Prop()
  description: ProductDescription;

  @Prop()
  short_description: string;

  @Prop()
  gtins: [string];

  @Prop()
  m_check2: MCheck;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
