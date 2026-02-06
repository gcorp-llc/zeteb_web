import { PageContainer } from "@/components/page-container";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProfileHeader } from "@/features/user/components/profile-header";
import { ProfileAnalytics } from "@/features/user/components/profile-analytics";
import { ProfileAbout } from "@/features/user/components/profile-about";
import { ProfileActivity } from "@/features/user/components/profile-activity";
import { ProfileEducation } from "@/features/user/components/profile-education";
import { ProfileContact } from "@/features/user/components/profile-contact";
import { Link } from "@/i18n/navigation";

export default function ProfilePage() {
  const t = useTranslations("Navbar");
  const tp = useTranslations("ProfilePage");

  // Mock data - in real app this would come from ScyllaDB
  const isOwner = true;
  const userData = {
    name: "حسین افتخارراد",
    role: "متخصص داخلی و جراح",
    location: "تهران، ایران",
    bio: "بیش از ۱۰ سال سابقه در درمان بیماری‌های داخلی و مدیریت سلامت بیماران. مشاور ارشد در بیمارستان‌های تراز اول.",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
    avatarImage: "/favicon.ico",
    connections: 1250,
    analytics: {
      profileViews: 425,
      postImpressions: 1200,
      searchAppearances: 85,
      appointments: 12
    },
    education: [
      { degree: "دکترای حرفه‌ای پزشکی", school: "دانشگاه علوم پزشکی تهران", year: "۱۳۹۰" },
      { degree: "تخصص داخلی", school: "دانشگاه علوم پزشکی شهید بهشتی", year: "۱۳۹۵" }
    ],
    skills: ["جراحی داخلی", "تشخیص دقیق", "مدیریت بحران", "مشاوره خانواده"],
    addresses: [
      { title: "مطب جردن", address: "تهران، خیابان جردن، کوچه تندیس، پلاک ۱", phone: "۰۲۱-۸۸۸۸۸۸۸۸" }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex justify-end">
        <Link href="/profile/settings">
          <Button variant="ghost" className="!rounded-xl gap-2 font-bold hover:bg-white/5">
            <span className="icon-[solar--settings-bold-duotone] w-5 h-5 text-primary" />
            تنظیمات حساب
          </Button>
        </Link>
      </div>

      <ProfileHeader user={userData} isOwner={isOwner} />

      {isOwner && <ProfileAnalytics analytics={userData.analytics} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileAbout bio={userData.bio} isOwner={isOwner} />
          <ProfileActivity isOwner={isOwner} />
          <ProfileEducation education={userData.education} isOwner={isOwner} />
        </div>

        <div className="space-y-6">
          <ProfileContact addresses={userData.addresses} isOwner={isOwner} />
          <div className="glass-card space-y-4">
            <h3 className="font-bold text-lg">مهارت‌ها</h3>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="bg-primary/5 text-primary border-none rounded-lg px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
            {isOwner && <Button variant="ghost" className="w-full text-xs text-primary">ویرایش مهارت‌ها</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
