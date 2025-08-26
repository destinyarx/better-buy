export type UnitType = "volume" | "mass" | "length" | "circular" | "quantity"

export type Currency = "USD" | "PHP" | "EUR";

export type UnitCode =
  | "mg" | "g" | "kg" | "t"            // mass
  | "ml" | "l" | "m3"                 // volume
  | "mm" | "cm" | "m" | "km" | "in" | "ft" // length & circular
  | "pc"; // quantity

export interface Product {
  id: number
  title: string
  price: number|null
  quantity: number|null
  basePrice: number|null
  unitMeasurement: UnitCode
};

export interface Result {
    isOpen: boolean
}

export interface BestProduct {
  id: number,
  price: number
}