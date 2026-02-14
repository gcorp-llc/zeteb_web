"use client";

import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const revenueData = [
  { month: "فروردین", amount: 4500000 },
  { month: "اردیبهشت", amount: 5200000 },
  { month: "خرداد", amount: 4800000 },
  { month: "تیر", amount: 6100000 },
  { month: "مرداد", amount: 7500000 },
  { month: "شهریور", amount: 8900000 },
  { month: "مهر", amount: 12500000 },
];

export default function WalletPage() {
  return (
    <PageContainer title="امور مالی و کیف پول">
      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-card !p-8 flex flex-col justify-between bg-ios-gradient text-white border-none">
             <div>
                <p className="text-xs font-bold opacity-80 mb-1">موجودی قابل برداشت</p>
                <h2 className="text-4xl font-black">۱۲,۵۰۰,۰۰۰ <span className="text-sm font-medium">تومان</span></h2>
             </div>
             <div className="flex gap-4 mt-8">
                <Button className="flex-1 bg-white text-primary font-black hover:bg-white/90 !rounded-2xl h-12">
                   <span className="icon-[solar--card-transfer-bold] w-5 h-5 me-2" />
                   تسویه حساب
                </Button>
                <Button variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10 !rounded-2xl h-12">
                   افزودن کارت
                </Button>
             </div>
          </div>

          <div className="glass-card flex flex-col justify-center items-center text-center p-6 border-primary/20 bg-primary/5">
             <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="icon-[solar--ranking-bold-duotone] w-8 h-8 text-primary" />
             </div>
             <p className="text-xs font-bold text-muted-foreground">رتبه درآمدی</p>
             <h3 className="text-xl font-black">جزو ۱۰٪ برتر</h3>
             <p className="text-[10px] text-primary mt-1">در تخصص داخلی</p>
          </div>
        </div>

        <div className="glass-card !p-6">
          <div className="flex items-center justify-between mb-8">
             <h3 className="font-black text-lg">نمودار درآمد (۶ ماه اخیر)</h3>
             <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs font-bold focus:outline-none">
                <option>سال ۱۴۰۲</option>
                <option>سال ۱۴۰۱</option>
             </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(1 0 0 / 0.1)" />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000000}M`} />
                <Tooltip
                    contentStyle={{ backgroundColor: 'oklch(0.2 0.02 260)', border: 'none', borderRadius: '1rem', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`${Number(value).toLocaleString()} تومان`, "درآمد"]}
                />
                <Area type="monotone" dataKey="amount" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
           <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-black text-lg">تراکنش‌های اخیر</h3>
              <Button variant="ghost" className="text-primary text-xs font-bold">مشاهده همه</Button>
           </div>
           <div className="divide-y divide-white/5">
              {[
                { title: "ویزیت آنلاین - سارا احمدی", date: "۱۴۰۲/۱۱/۲۵", amount: "+۱۵۰,۰۰۰", type: "income" },
                { title: "تسویه حساب سیستمی", date: "۱۴۰۲/۱۱/۲۰", amount: "-۴,۵۰۰,۰۰۰", type: "outcome" },
                { title: "ویزیت حضوری - علی رضایی", date: "۱۴۰۲/۱۱/۱۸", amount: "+۲۰۰,۰۰۰", type: "income" },
              ].map((tx, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                         <span className={tx.type === 'income' ? "icon-[solar--arrow-left-down-bold]" : "icon-[solar--arrow-right-up-bold]"} />
                      </div>
                      <div>
                         <p className="text-sm font-bold">{tx.title}</p>
                         <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                      </div>
                   </div>
                   <span className={`font-black ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>{tx.amount}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </PageContainer>
  );
}
