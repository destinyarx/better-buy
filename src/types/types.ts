export type UnitType = "volume" | "mass" | "length" | "circular" | "quantity"

export type Currency = "USD" | "PHP" | "EUR";

export type UnitCode =
  | "mg" | "g" | "kg" | "t"            // mass
  | "ml" | "l" | "m3"                 // volume
  | "mm" | "cm" | "m" | "km" | "in" | "ft" // length
  | "diameter" | "radius" | "circumference" | "area" // circular
  | "pc" | "dozen" | "pack" | "set" | "unit"; // quantity

export interface ProductDraft {
  id: number;
  title: string,
  price: number | undefined;
  quantity: number | undefined; 
  unitMeasurement: UnitCode | undefined;
};

export interface Result {
    isOpen: boolean
}