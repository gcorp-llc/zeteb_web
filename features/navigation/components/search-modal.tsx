"use client";

import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onOpenChange(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const suggestions = [
    { title: "دکتر حسین افتخارراد", type: "doctor" },
    { title: "متخصص داخلی تهران", type: "specialty" },
    { title: "بیمارستان آتیه", type: "location" },
    { title: "روش‌های نوین جراحی", type: "article" },
  ];

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange} title="جستجو در زتب">
      <div className="space-y-6">
        <form onSubmit={handleSearch} className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="نام پزشک، تخصص یا مقاله..."
            className="h-14 !rounded-2xl ps-12 text-sm font-bold bg-white/5 border-white/10"
          />
          <span className="icon-[solar--magnifer-bold-duotone] w-6 h-6 text-primary absolute start-4 top-1/2 -translate-y-1/2" />
          <Button type="submit" className="hidden">جستجو</Button>
        </form>

        <div className="space-y-4">
           <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">پیشنهادها</h4>
           <div className="space-y-1">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(s.title);
                    router.push(`/search?q=${encodeURIComponent(s.title)}`);
                    onOpenChange(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors group"
                >
                   <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className={s.type === 'doctor' ? "icon-[solar--user-bold-duotone]" : s.type === 'article' ? "icon-[solar--document-bold-duotone]" : "icon-[solar--map-point-bold-duotone]"} />
                   </div>
                   <span className="text-sm font-bold text-foreground/80 group-hover:text-primary">{s.title}</span>
                </button>
              ))}
           </div>
        </div>
      </div>
    </ResponsiveModal>
  );
}
