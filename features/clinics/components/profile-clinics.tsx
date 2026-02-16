"use client";

import { useQuery } from "@tanstack/react-query";
import { clinicsApi } from "@/features/clinics/api";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export function ProfileClinics({ userId }: { userId?: string }) {
  const t = useTranslations("Clinics");
  const tDays = useTranslations("Days");
  const tHome = useTranslations("HomePage");
  const { data: clinics, isLoading } = useQuery({
    queryKey: ["user-clinics", userId],
    queryFn: () => clinicsApi.getClinics(),
  });

  if (isLoading) return <div className="animate-pulse h-40 bg-white/5 rounded-3xl" />;
  if (!clinics || clinics.length === 0) return null;

  return (
    <div className="glass-card space-y-4">
      <h3 className="font-bold text-lg">{t("title")}</h3>
      <div className="space-y-6">
        {clinics.map((clinic) => (
          <div key={clinic.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-ios-gradient flex items-center justify-center text-white shrink-0 overflow-hidden">
                  {clinic.logoUrl ? <img src={clinic.logoUrl} className="w-full h-full object-cover" /> : <span className="icon-[solar--hospital-bold-duotone] w-6 h-6" />}
               </div>
               <div>
                  <h4 className="font-bold text-sm">{clinic.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{clinic.address}</p>
               </div>
               <Badge className="mr-auto bg-primary/10 text-primary border-none text-[10px]">
                  {clinic.type === 'clinic' ? t("clinic") : clinic.type === 'office' ? t("office") : t("hospital")}
               </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
               <div>
                  <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase">{t("contactInfo")}</p>
                  <div className="flex flex-wrap gap-2">
                     {clinic.phones.filter(p => p.isActive).map((p, i) => (
                        <span key={i} className="text-xs font-black text-primary bg-primary/5 px-2 py-1 rounded-lg">
                           {p.number}
                        </span>
                     ))}
                  </div>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase">{t("workingHours")}</p>
                  <div className="space-y-1">
                     {clinic.workingHours.filter(h => h.isOpen).slice(0, 3).map((h, i) => (
                        <div key={i} className="flex justify-between text-[10px]">
                           <span>{tDays(h.day)}</span>
                           <span className="text-muted-foreground">{h.shifts.map(s => `${s.start}-${s.end}`).join(' | ')}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <button className="w-full py-2 bg-primary text-white !rounded-xl text-xs font-bold shadow-lg shadow-primary/20">
               {tHome("bookNow")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

