"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface CalendarProps {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
  dir?: "rtl" | "ltr";
}

export function Calendar({
  selected,
  onSelect,
  className,
  dir = "rtl",
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const days = daysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const startDay = firstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthName = currentMonth.toLocaleDateString("fa-IR", { month: "long", year: "numeric" });

  const weekDays = dir === "rtl" ? ["ش", "ی", "د", "س", "چ", "پ", "ج"] : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={cn("p-3", className)} dir={dir}>
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={dir === "rtl" ? nextMonth : prevMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="font-bold text-sm">{monthName}</div>
        <Button variant="ghost" size="icon" onClick={dir === "rtl" ? prevMonth : nextMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-[10px] font-bold text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const day = i + 1;
          const isSelected = selected?.getDate() === day &&
                            selected?.getMonth() === currentMonth.getMonth() &&
                            selected?.getFullYear() === currentMonth.getFullYear();
          return (
            <Button
              key={day}
              variant="ghost"
              className={cn(
                "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-lg text-xs",
                isSelected && "bg-primary text-white hover:bg-primary hover:text-white"
              )}
              onClick={() => onSelect?.(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
            >
              {day}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
