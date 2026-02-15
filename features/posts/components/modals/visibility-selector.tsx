"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

interface VisibilitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function VisibilitySelector({ value, onChange }: VisibilitySelectorProps) {
  const t = useTranslations("PostEditor");

  const options = [
    { id: "connections", label: t("connections"), icon: "icon-[solar--users-group-two-rounded-bold]" },
  ];

  const selected = options.find((opt) => opt.id === value) || options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 rounded-full px-2 text-[10px] border-border/50 bg-white/5">
          <span className={selected.icon + " w-3 h-3 text-primary"} />
          {selected.label}
          <span className="icon-[solar--alt-arrow-down-bold] w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="glass border-none rounded-xl">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className="gap-2 text-xs font-bold cursor-pointer focus:bg-primary/10 focus:text-primary"
          >
            <span className={opt.icon + " w-4 h-4"} />
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
