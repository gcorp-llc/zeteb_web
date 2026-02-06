interface ProfileAnalyticsProps {
  analytics: {
    profileViews: number;
    postImpressions: number;
    searchAppearances: number;
    appointments: number;
  };
}

export function ProfileAnalytics({ analytics }: ProfileAnalyticsProps) {
  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-xl text-foreground">تحلیل و بررسی</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <span className="icon-[solar--eye-bold-duotone] w-4 h-4" />
            فقط برای شما قابل نمایش است
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-1 group cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="icon-[solar--users-group-two-rounded-bold-duotone] w-5 h-5 text-primary" />
            <span className="text-xl font-black group-hover:text-primary transition-colors">{analytics.profileViews}</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">بازدید از پروفایل</p>
        </div>

        <div className="space-y-1 group cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="icon-[solar--graph-bold-duotone] w-5 h-5 text-green-500" />
            <span className="text-xl font-black group-hover:text-primary transition-colors">{analytics.postImpressions}</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">مشاهده پست‌ها</p>
        </div>

        <div className="space-y-1 group cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="icon-[solar--magnifer-bold-duotone] w-5 h-5 text-orange-500" />
            <span className="text-xl font-black group-hover:text-primary transition-colors">{analytics.searchAppearances}</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">ظهور در نتایج جستجو</p>
        </div>

        <div className="space-y-1 group cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="icon-[solar--calendar-bold-duotone] w-5 h-5 text-purple-500" />
            <span className="text-xl font-black group-hover:text-primary transition-colors">{analytics.appointments}</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">نوبت‌های دریافت شده</p>
        </div>
      </div>
    </div>
  );
}
