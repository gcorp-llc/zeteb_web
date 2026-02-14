"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function ProfileWallet() {
  return (
    <div className="glass-card space-y-4 bg-primary/5 border-primary/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <span className="icon-[solar--wallet-money-bold-duotone] w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-sm">وضعیت مالی</h3>
          <p className="text-[10px] text-muted-foreground">درآمد خالص ماه جاری</p>
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-primary">۱۲,۵۰۰,۰۰۰</span>
        <span className="text-[10px] font-bold text-muted-foreground">تومان</span>
      </div>

      <Link href="/wallet" className="block">
        <Button variant="ghost" className="w-full h-9 !rounded-xl text-xs font-bold gap-2 hover:bg-primary/10 text-primary">
          مشاهده جزئیات و تسویه حساب
          <span className="icon-[solar--alt-arrow-left-broken] w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}
