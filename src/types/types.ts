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
  price: number
  quantity: number
  basePrice: number
  unitMeasurement: UnitCode
};

export interface ShoppingList {
  id: number
  title: string
  price: number
  quantity: number
  unit: UnitType
  unitMeasurement: UnitCode,
  createdAt: number,
  savingsPercentage: string,
}

export interface Result {
    isOpen: boolean
}

export interface BestProduct {
  id: number,
  price: number
}