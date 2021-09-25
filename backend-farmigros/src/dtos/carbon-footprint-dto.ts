export enum CarbonFootprintType {
  GROUND_AND_SEA_CARGO = 'GROUND_AND_SEA_CARGO',
  AIR_CARGO = 'AIR_CARGO'
}

export interface CarbonFootprintData {
  type: CarbonFootprintType;
  kgCo2: number;
  rating: number; // from 1 to 5 stars
}

export interface CarbonFootprintDto {
  image: string; // URL to original badge image
  data: CarbonFootprintData[]; // one or more data containers
}
