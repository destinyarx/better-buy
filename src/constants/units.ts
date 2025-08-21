import { UnitType, UnitCode } from '@/types/types'

export const UNIT_CATEGORY: Record<UnitType, string> = {
    mass: "mass",
    volume: "volume",
    length: "length",
    circular: "circular",
    quantity: "quantity",
};

export const UNIT_MEASUREMENT: Record<UnitType, UnitCode[]> = {
    mass: ["mg", "g", "kg", "t"],
    volume: ["ml", "l", "m3"],
    length: ["mm", "cm", "m", "km", "in", "ft"],
    circular: ["diameter", "radius", "circumference", "area"],
    quantity: ["pc", "dozen", "pack", "set", "unit"],
};

export const LABEL: Record<UnitCode, string> = {
    // mass
    mg: "milligrams",
    g: "grams",
    kg: "kilograms",
    t: "tons",

    // volume
    ml: "milliliters",
    l: "liters",
    m3: "cubic meters",

    // length
    mm: "millimeters",
    cm: "centimeters",
    m: "meters",
    km: "kilometers",
    in: "inches",
    ft: "feet",

    // circular
    diameter: "diameter",
    radius: "radius",
    circumference: "circumference",
    area: "area",

    // quantity
    pc: "pieces",
    dozen: "dozen (12 pcs)",
    pack: "pack",
    set: "set",
    unit: "unit",
};

export const ITEM_LOGO: Record<UnitType, string> = {
    mass: "/meat.png",
    volume: "/bottle-icon.png",
    length: "/zucchini.png",
    circular: "/pizza.png",
    quantity: "/fruits.png",
}

export const Q_PLACEHOLDER: Record<UnitType, string> = {
    mass: "1.5",
    volume: "1.5",
    length: "1.5",
    circular: "1.5",
    quantity: "1",
};