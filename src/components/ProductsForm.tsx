"use client"

import { useState, useEffect, useCallback } from 'react';
import { UnitType, UnitCode, Currency, Product } from '@/types/types'
import { UNIT_MEASUREMENT, DEFAULT_UNIT_MEASUREMENT, LABEL, ITEM_LOGO } from '@/constants/units'
import { formatMoney, formatToDecimals } from '@/utils/format';
import { getBestProduct } from '@/utils/compare'
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
import ResultModal from '@/components/ResultsModal';
import { ChevronRight, Plus, Trash2, Calculator } from 'lucide-react';

let id = 0;

export default function ProductsForm() {
  const [unit, setUnit]               = useState<UnitType>('mass');
  const [currency, setCurrency]       = useState<Currency>('PHP');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const emptyRow = useCallback((): Product => ({ id: id++, title: '', price: null, quantity: null, unitMeasurement: DEFAULT_UNIT_MEASUREMENT[unit] as UnitCode }), [unit]);
  const [rows, setRows] = useState<Product[]>([]);

  // Initialize and reset rows when unit changes
  useEffect(() => {
    setRows([emptyRow()]);
  }, [emptyRow]);
  

  const addRow    = () => setRows((prev) => [...prev, emptyRow()]);
  const clearAll  = () => setRows([emptyRow()]);
  const removeRow = (id: number) => 
    setRows((prev) => (prev.length === 1 ? prev : prev.filter((row) => row.id !== id)));

  const handleChange = (id: number, field: keyof Product, value: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const computePerUnit = useCallback(
    (price: number|null, quantity: number|null) => {
      if (!price || !quantity) return null;

      return price / quantity;
    },
  []);



  const onCalculate = (e: React.FormEvent) => {
    e.preventDefault();


    console.log(getBestProduct(rows, unit))

    setIsModalOpen(() => (true));
  };

  return (
    <Card className="rounded-2xl my-10">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-2xl">COST PER UNIT</CardTitle>

        <ResultModal products={rows} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      
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
                        min={0}
                        type="number"
                        inputMode="decimal"
                        placeholder="0.00"
                        value={row.price}
                        onChange={(e) => handleChange(row.id, "price", e.target.value)}
                        required
                        className="pl-10 text-right"
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
                          min={0}
                          type="number"
                          inputMode="decimal"
                          placeholder="0"
                          value={row.quantity}
                          onChange={(e) => handleChange(row.id, "quantity", e.target.value)}
                          required
                          className="text-right pr-10"
                        />    

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          /{row.unitMeasurement ?? null}
                        </span>
                      </div>

                      {/* Unit measurement  */}
                      <Select 
                        value={row.unitMeasurement}
                        onValueChange={(v) => handleChange(row.id, "unitMeasurement", v as UnitCode)}
                      >
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
                    { (row.price && row.quantity) &&
                      <div className="text-lg font-semibold tabular-nums">
                        {`${formatToDecimals(computePerUnit(row.price, row.quantity))} / ${row.unitMeasurement}`}
                      </div>
                    }
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
