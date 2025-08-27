import { UnitType, UnitCode } from '@/types/types'

export const UNIT_CATEGORY: Record<UnitType, string> = {
    mass: 'mass',
    volume: 'volume',
    length: 'length',
    circular: 'circular',
    quantity: 'quantity',
};

export const UNIT_MEASUREMENT: Record<UnitType, UnitCode[]> = {
    mass: ['mg', 'g', 'kg', 't'],
    volume: ['ml', 'l', 'm3'],
    length: ['mm', 'cm', 'm', 'km', 'in', 'ft'],
    circular: ['mm', 'cm', 'm', 'km', 'in', 'ft'],
    quantity: ['pc'],
};

export const DEFAULT_UNIT_MEASUREMENT: Record<UnitType, string> = {
    mass: 'mg',
    volume: 'ml',
    length: 'cm',
    circular: 'in',
    quantity: 'pc',
};

export const LABEL: Record<UnitCode, string> = {
    // mass
    mg: 'milligrams',
    g: 'grams',
    kg: 'kilograms',
    t: 'tons',

    // volume
    ml: 'milliliters',
    l: 'liters',
    m3: 'cubic meters',

    // length & circular
    mm: 'millimeters',
    cm: 'centimeters',
    m: 'meters',
    km: 'kilometers',
    in: 'inches',
    ft: 'feet',

    // quantity
    pc: 'piece/s',
};

export const ITEM_LOGO: Record<UnitType, string> = {
    mass: '/meat.png',
    volume: '/bottle-icon.png',
    length: '/zucchini.png',
    circular: '/pizza.png',
    quantity: '/fruits.png',
}

export const Q_PLACEHOLDER: Record<UnitType, string> = {
    mass: '1.5',
    volume: '1.5',
    length: '1.5',
    circular: '1.5',
    quantity: '1',
};

export const UNIT_ICON: Record<UnitType, string[]> = {
  mass: ["🍞","🧀","🥩","🍎","🥔","🍫"],
  volume: ["🥤","🥛","🧃","🍶","🧴","🚰"],
  length: ["🪢","📏","🪡","🪵","🧵","⛓️"],
  circular: ["🍕","🍩","🥯","🥚","🥫","🍪"],
  quantity: ["🥚","🍇","🍒","🍓","🍊","🥝"]
};


// Conversion factors relative to default unit
export const CONVERSION_TABLE: Record<UnitType, Record<string, number>> = {
    mass: {
      mg: 1,            // base
      g: 1000,          // 1 g = 1000 mg
      kg: 1000_000,     // 1 kg = 1,000,000 mg
      t: 1_000_000_000, // 1 ton = 1,000,000,000 mg
    },
    volume: {
      ml: 1,
      l: 1000,        // 1 L = 1000 mL
      m3: 1_000_000,  // 1 m³ = 1,000,000 mL
    },
    length: {
      cm: 1,
      mm: 0.1,         // 1 mm = 0.1 cm
      m: 100,          // 1 m = 100 cm
      km: 100_000,     // 1 km = 100,000 cm
      in: 2.54,        // 1 in = 2.54 cm
      ft: 30.48,       // 1 ft = 30.48 cm
    },
    circular: {
      in: 1,
      mm: 0.0393701,  // 1 mm ≈ 0.03937 in
      cm: 0.393701,   // 1 cm ≈ 0.3937 in
      m: 39.3701,     // 1 m ≈ 39.37 in
      km: 39370.1,    // 1 km ≈ 39,370.1 in
      ft: 12,         // 1 ft = 12 in
    },
    quantity: {
      "pc/s": 1,
    },
  };