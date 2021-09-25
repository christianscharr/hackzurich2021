import { CarbonFootprintDto } from "./carbon-footprint-dto";
import { AnimalWelfareDto } from "./animal-welfare-dto";

export enum MCheckType {
  CARBON_FOOTPRINT = 'CARBON_FOOTPRINT',
  ANIMAL_WELFARE = 'ANIMAL_WELFARE'
}

export enum ProductCategory {
  UNKNOWN = 'UNKNOWN',
  BAKERY = 'BAKERY',
  CHIPS = 'CHIPS',
  CEREALS = 'CEREALS',
  PASTA = 'PASTA',
  FISH = 'FISH',
  MEAT = 'MEAT',
  MILK = 'MILK',
  EGGS = 'EGGS',
  FRUITS = 'FRUIT',
  VEGETABLES = 'VEGETABLES'
}

export interface ProductDto {
  id: number;
  name: string;
  description?: string;
  receipt_test: string;
  category: ProductCategory;
  carbonFootprint?: CarbonFootprintDto;
  animalWelfare?: AnimalWelfareDto;
}
