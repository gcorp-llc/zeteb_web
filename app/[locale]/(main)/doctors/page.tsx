import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DoctorList } from "@/features/doctors/components/doctor-list";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return {
    title: `${t("featuredDoctors")} | ZETEB`,
  };
}

export default function DoctorsPage() {
  const t = useTranslations("HomePage");

  const specialties = [
    { name: t("internalMedicine"), icon: "icon-[solar--medical-kit-bold-duotone]", color: "text-blue-500" },
    { name: t("dermatology"), icon: "icon-[solar--magic-stick-3-bold-duotone]", color: "text-purple-500" },
    { name: t("gynecology"), icon: "icon-[solar--user-speak-bold-duotone]", color: "text-pink-500" },
    { name: t("pediatrics"), icon: "icon-[solar--reorder-bold-duotone]", color: "text-orange-500" },
    { name: t("cardiology"), icon: "icon-[solar--heart-bold-duotone]", color: "text-red-500" },
    { name: t("ophthalmology"), icon: "icon-[solar--eye-bold-duotone]", color: "text-indigo-500" },
  ];

  const doctors = [
    { id: 1, name: "دکتر مریم علوی", specialty: t("dermatologyHair"), rating: 4.8, reviews: 120, image: "MA", location: t("tehranJordan"), nextAvailable: t("tomorrow1030") },
    { id: 2, name: "دکتر رضا محمدی", specialty: t("cardiologyVascular"), rating: 4.9, reviews: 85, image: "RM", location: t("tehranSaadatAbad"), nextAvailable: t("monday1600") },
    { id: 3, name: "دکتر سارا احمدی", specialty: t("pediatrics"), rating: 4.7, reviews: 150, image: "SA", location: t("tehranValiasr"), nextAvailable: t("today1815") },
    { id: 4, name: "دکتر علی حسینی", specialty: t("internalMedicine"), rating: 4.6, reviews: 210, image: "AH", location: t("tehranPounak"), nextAvailable: t("wednesday0900") },
    { id: 5, name: "دکتر مونا رضایی", specialty: t("ophthalmology"), rating: 4.9, reviews: 95, image: "MR", location: t("tehranTajrish"), nextAvailable: t("tomorrow1545") },
  ];

  return (
    <div className="flex flex-col gap-16 pb-24">
      {/* Top Section - Inherited from Home */}
      <div className="flex flex-col gap-16 pt-10">
        <section className="relative px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              {t("heroTitle")}
            </h1>
            <div className="relative max-w-2xl mx-auto">
              <div className="glass !rounded-3xl p-2 flex items-center shadow-2xl">
                <span className="icon-[solar--magnifer-bold-duotone] w-6 h-6 text-primary mx-3" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="bg-transparent border-none outline-none flex-1 py-3 text-lg placeholder:text-muted-foreground/50"
                />
                <Button className="!rounded-2xl px-8 h-12 bg-ios-gradient shadow-lg shadow-primary/20">
                  {t("viewAll")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 max-w-7xl mx-auto w-full space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{t("specialties")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specialties.map((spec, i) => (
              <div key={i} className="glass-card group flex flex-col items-center gap-4 text-center hover:scale-105">
                <div className={`w-16 h-16 rounded-2xl bg-white/5 dark:bg-white/10 flex items-center justify-center transition-transform group-hover:rotate-12`}>
                  <span className={`${spec.icon} w-8 h-8 ${spec.color}`} />
                </div>
                <span className="font-bold text-sm">{spec.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 max-w-7xl mx-auto w-full space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{t("featuredDoctors")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.slice(0, 3).map((doc) => (
              <div key={doc.id} className="glass-card flex gap-6 items-center">
                <div className="w-24 h-24 rounded-3xl bg-ios-gradient flex items-center justify-center text-white text-3xl font-black shadow-lg">
                  {doc.image}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold">{doc.name}</h3>
                  <p className="text-muted-foreground text-sm">{doc.specialty}</p>
                  <div className="flex items-center gap-2">
                    <span className="icon-[solar--star-bold] w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-sm">{doc.rating}</span>
                    <span className="text-muted-foreground text-xs">({t("reviews", { count: doc.reviews })})</span>
                  </div>
                  <Link href={`/appointments/book/${doc.id}`}>
                    <Button variant="secondary" className="w-full !rounded-xl text-xs font-bold h-9">
                      {t("bookNow")}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Main Listing & Filters Section */}
      <section className="px-6 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Sidebar on Desktop, Top on Mobile */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="glass-card !p-6 space-y-6 sticky top-24">
              <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                <span className="icon-[solar--filter-bold-duotone] w-5 h-5 text-primary" />
                <h3 className="font-bold">{t("filters")}</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-70">{t("city")}</label>
                  <div className="relative">
                    <span className="icon-[solar--map-point-bold-duotone] absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder={t("city")} className="pl-9 !rounded-xl bg-white/5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-70">{t("specialty")}</label>
                  <div className="relative">
                    <span className="icon-[solar--medical-kit-bold-duotone] absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder={t("specialty")} className="pl-9 !rounded-xl bg-white/5" />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-sm font-medium opacity-70">{t("services")}</label>
                  {[
                    { id: "onlineBooking", label: t("onlineBooking") },
                    { id: "phoneConsultation", label: t("phoneConsultation") },
                    { id: "chatConsultation", label: t("chatConsultation") }
                  ].map((service) => (
                    <label key={service.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded-md border-2 border-primary/30 group-hover:border-primary/50 transition-colors" />
                      <span className="text-sm">{service.label}</span>
                    </label>
                  ))}
                </div>

                <Button className="w-full !rounded-xl mt-4">{t("applyFilters")}</Button>
              </div>
            </div>
          </aside>

          {/* Doctor List */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-xl font-black">{t("allDoctors")}</h2>
              <span className="text-sm text-muted-foreground">{t("found", { count: doctors.length })}</span>
            </div>

            <DoctorList initialDoctors={doctors} />
          </div>
        </div>
      </section>

      {/* How it Works - Inherited */}
      <section className="px-6 max-w-7xl mx-auto w-full py-16">
        <div className="glass-card !bg-primary/5 border-primary/10 rounded-[3rem] p-12 text-center space-y-12">
          <h2 className="text-3xl font-bold">{t("howItWorks")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((step) => (
              <div key={step} className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-black mx-auto">
                  {step}
                </div>
                <h3 className="text-xl font-bold">{t(`step${step}`)}</h3>
                <p className="text-muted-foreground">{t(`step${step}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
