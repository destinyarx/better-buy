"use client"

import { useState, useCallback } from 'react';
import { UnitType, UnitCode, Currency, ProductDraft } from '@/types/types'
import { UNIT_CATEGORY, UNIT_MEASUREMENT, LABEL, ITEM_LOGO, Q_PLACEHOLDER } from '@/constants/units'
import Image from 'next/image';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import ResultModal from './ResultsModal';
import { ChevronRight, Plus, Trash2, Calculator } from 'lucide-react';

let id = 0;
const emptyRow = (): ProductDraft => ({ id: id++, title: '', price: undefined, quantity: undefined });

function formatMoney(n: number, currency: Currency, locale?: string) {
  try {
    return new Intl.NumberFormat(locale ?? (currency === "PHP" ? "en-PH" : undefined), {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n ?? 0);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}

export default function ProductsForm() {
  const [rows, setRows] = useState<ProductDraft[]>([emptyRow()]);
  const [unit, setUnit] = useState<UnitType>('mass');
  const [unitMeasurement, setUnitMeasurement] = useState<UnitCode>('mg');
  const [currency, setCurrency] = useState<Currency>('PHP');

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);
  const clearAll = () => setRows([emptyRow()]);
  const removeRow = (id: number) => 
    setRows((prev) => (prev.length === 1 ? prev : prev.filter((row) => row.id !== id)));

  const handleChange = (id: number, field: keyof ProductDraft, value: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const computePerUnit = useCallback(
    (price: number|undefined, quantity: number|undefined) => {
      if (!price || !quantity) return null;

      return price / quantity;
    },
  []);

  const onCalculate = (e: React.FormEvent) => {
    console.log('Computeee mo')
    e.preventDefault();
  };

  return (
    <Card className="rounded-2xl my-10">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-2xl">COST PER UNIT</CardTitle>

        <ResultModal/>
      
        <div className="flex gap-2">
          <Select value={unit} onValueChange={(v) => setUnit(v as UnitType)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mass">Mass</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
              <SelectItem value="length">Length</SelectItem>
              <SelectItem value="circular">Circular</SelectItem>
              <SelectItem value="quantity">Quantity</SelectItem>
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
                <div className="grid items-start gap-10 lg:grid-cols-[5%_auto_17%_22%_12%_5%]">
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
                        required
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
                        placeholder="0.00"
                        className="pl-10 text-right"
                        value={row.price}
                        onChange={(e) => handleChange(row.id, "price", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor={`qty-${row.id}`}>Quantity</Label>
                    <div className="flex flex-row gap-2">
                      <div className="relative">
                        <Input
                          id={`qty-${row.id}`}
                          type="number"
                          inputMode="decimal"
                          placeholder="0"
                          className="text-right pr-10"
                          value={row.quantity}
                          onChange={(e) => handleChange(row.id, "quantity", e.target.value)}
                          required
                        />    

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          /{unitMeasurement ?? null}
                        </span>
                      </div>

                      {/* Unit measurement  */}
                      <Select value={unitMeasurement} onValueChange={(v) => setUnitMeasurement(v as UnitCode)}>
                        <SelectTrigger className="w-50">
                          <SelectValue placeholder="Unit"/>
                        </SelectTrigger>
                        <SelectContent>
                          {UNIT_MEASUREMENT[unit].map((code) => (
                            <SelectItem key={code} value={code}>
                              {LABEL[code]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>                

                  <div className="mt-7 flex justify-center items-center">
                    <ChevronRight className="h-6 w-6 text-muted-foreground" aria-hidden />
                    <div className="text-lg font-semibold tabular-nums">
                      {perUnit == null ? "—" : `${formatMoney(perUnit, currency)} / ${UNIT_CATEGORY[unit]}`}
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

          <Button
            type="submit"
            disabled={rows.length < 2}
            className="w-full sm:w-auto bg-slate-800 text-white"
          >
            <Calculator className="mr-1 h-4 w-4" />
            Compare
          </Button>

        </CardFooter>
      </form>
    </Card>
  );
}
