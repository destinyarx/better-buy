"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Plus, Trash2, Calculator } from "lucide-react";
import Image from "next/image";


type UnitType = "each" | "liter" | "kg" | "inch";
type Currency = "USD" | "PHP" | "EUR";

type ProductDraft = {
  id: number;
  title: string,
  price: string;    // keep as string for input UX
  quantity: string; // keep as string for input UX
};

let id = 0;

const emptyRow = (): ProductDraft => ({ id: id++, price: "", quantity: "" });

const UNIT_LABEL: Record<UnitType, string> = {
  each: "each",
  liter: "liter",
  kg: "kg",
  inch: "in",
};

const ITEM_LOGO: Record<UnitType, string> = {
  each: "/fruits.png",
  liter: "/bottle-icon.png",
  kg: "/meat.png",
  inch: "/zucchini.png",
}

const Q_PLACEHOLDER: Record<UnitType, string> = {
  each: "1",
  liter: "1.5",
  kg: "2",
  inch: "12",
};



function formatMoney(n: number, currency: Currency, locale?: string) {
  try {
    return new Intl.NumberFormat(locale ?? (currency === "PHP" ? "en-PH" : undefined), {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number.isFinite(n) ? n : 0);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}

export default function ProductsForm({
  defaultCurrency = "PHP",
  defaultUnit = "liter",
}: {
  defaultCurrency?: Currency;
  defaultUnit?: UnitType;
}) {
  const [rows, setRows] = React.useState<ProductDraft[]>([emptyRow(), emptyRow(), emptyRow()]);
  const [unit, setUnit] = React.useState<UnitType>(defaultUnit);
  const [currency, setCurrency] = React.useState<Currency>(defaultCurrency);

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);
  const clearAll = () => setRows([emptyRow()]);
  const removeRow = (id: number) =>
    setRows((prev) => (prev.length === 1 ? prev : prev.filter((r) => r.id !== id)));

  const handleChange = (id: number, field: keyof ProductDraft, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const computePerUnit = React.useCallback(
    (price: string, qty: string) => {
      const p = Number(price.replace(/,/g, "."));
      const q = Number(qty.replace(/,/g, "."));
      if (!Number.isFinite(p) || !Number.isFinite(q) || q <= 0) return null;
      return p / q;
    },
    []
  );

  const onCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // No submit action yet—this button mirrors the UX in the mock.
  };

  return (
    <Card className="rounded-2xl my-10">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-2xl">COST PER UNIT</CardTitle>

        <div className="flex gap-2">
          <Select value={unit} onValueChange={(v) => setUnit(v as UnitType)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="liter">Liquid</SelectItem>
              <SelectItem value="kg">Weight</SelectItem>
              <SelectItem value="inch">Length</SelectItem>
              <SelectItem value="each">Each</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PHP">PHP (₱)</SelectItem>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="JPY">JPY (¥)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <Separator />

      <form onSubmit={onCalculate}>
        <CardContent className="p-0">
          {rows.map((row, idx) => {
            const perUnit = computePerUnit(row.price, row.quantity);
            return (
              <div key={row.id} className="px-6 py-6">
                <div className="grid items-start gap-10 sm:grid-cols-[5%_auto_15%_20%_10%5%]">
                  <Image
                    src={ITEM_LOGO[unit]}
                    alt="Water Bottle Logo"
                    width={60}             
                    height={60}
                    className="rounded-lg ml-4"
                    priority               
                  />

                  {/* Product Name */}
                  <div className="space-y-2">
                    <Label htmlFor={`price-${row.id}`}>Product Name</Label>
                    <div className="relative">
                      <Input
                        id={`title-${row.id}`}
                        placeholder="Enter product name"
                        className="pl-10 text-right"
                        value={row.title}
                        onChange={(e) => handleChange(row.id, "title", e.target.value)}
                        aria-label={`Product ${idx + 1} price`}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <Label htmlFor={`price-${row.id}`}>Price</Label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {formatMoney(0, currency).replace(/\d.*$/, "")}
                      </span>
                      <Input
                        id={`price-${row.id}`}
                        type="number"
                        inputMode="decimal"
                        placeholder={currency === "PHP" ? "156" : "0.00"}
                        className="pl-10 text-right"
                        value={row.price}
                        onChange={(e) => handleChange(row.id, "price", e.target.value)}
                        aria-label={`Product ${idx + 1} price`}
                      />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor={`qty-${row.id}`}>Quantity</Label>
                    <div className="flex flex-row gap-2">
                      <Input
                        id={`qty-${row.id}`}
                        type="number"
                        inputMode="decimal"
                        placeholder={Q_PLACEHOLDER[unit]}
                        className="text-right"
                        value={row.quantity}
                        onChange={(e) => handleChange(row.id, "quantity", e.target.value)}
                        aria-label={`Product ${idx + 1} quantity`}
                      />

                      <Select value={unit} onValueChange={(v) => setUnit(v as UnitType)}>
                        <SelectTrigger className="w-50">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="liter">Liquid</SelectItem>
                          <SelectItem value="kg">Weight</SelectItem>
                          <SelectItem value="inch">Length</SelectItem>
                          <SelectItem value="each">Each</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* TODO: Add unit dropdown here */}
                    </div>
                  </div>                

                  <div className="mt-7 flex justify-center items-center">
                    {/* <Label className="text-xs" htmlFor={`qty-${row.id}`}>
                      Price per Unit
                    </Label> */}

                    <ChevronRight className="h-6 w-6 text-muted-foreground" aria-hidden />
                    <div className="text-lg font-semibold tabular-nums">
                      {perUnit == null ? "—" : `${formatMoney(perUnit, currency)} / ${UNIT_LABEL[unit]}`}
                    </div>
                  </div>

                  {/* Delete product */}
                  <div className="flex items-center mt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(row.id)}
                      disabled={rows.length === 1}
                      aria-label={`Remove product ${idx + 1}`}
                    >
                      <Trash2 className="h-8 w-8 text-red-600" />
                    </Button>
                  </div>
                </div>

                {idx < rows.length - 1 && <Separator className="mt-6" />}
              </div>
            );
          })}
        </CardContent>

        <CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-5">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button type="button" variant="outline" onClick={addRow} className="justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Add product to compare
            </Button>
            <Button type="button" variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          </div>

          <Button type="submit" className="w-full sm:w-auto bg-slate-800 text-white">
            <Calculator className="mr-1 h-4 w-4" />
            Compare
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
