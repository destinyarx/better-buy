"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { value: string; label: string };

type NumberWithSelectProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
  selectValue: string;
  onSelectChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  inputAriaLabel?: string;
  disabled?: boolean;
  /** Tailwind width of the select trigger so we can pad the input accordingly (e.g. w-24) */
  selectWidthClass?: string; // default "w-24"
};

export default function NumberWithSelect({
  id,
  label,
  value,
  onChange,
  selectValue,
  onSelectChange,
  options,
  placeholder = "0",
  inputAriaLabel,
  disabled,
  selectWidthClass = "w-24",
}: NumberWithSelectProps) {
  // Map select width to input padding (keep the trigger from overlapping the text).
  // w-24 ~= 6rem → pr-28 (adds a bit of breathing room)
  const inputPaddingRight =
    selectWidthClass === "w-24"
      ? "pr-28"
      : selectWidthClass === "w-28"
      ? "pr-32"
      : "pr-28";

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        {/* Number input */}
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={inputAriaLabel ?? label ?? "number input"}
          disabled={disabled}
          className={`${inputPaddingRight} text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
        />

        {/* Right-end dropdown, positioned over the input’s right side */}
        <Select value={selectValue} onValueChange={onSelectChange} disabled={disabled}>
          <SelectTrigger
            // match input height (h-9) and place on right edge
            className={`absolute right-1 top-1/2 -translate-y-1/2 h-9 ${selectWidthClass} justify-between`}
            aria-label="unit selector"
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent align="end" className="min-w-[8rem]">
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
