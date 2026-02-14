import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ProfileActivityProps {
  isOwner: boolean;
}

export function ProfileActivity({ isOwner }: ProfileActivityProps) {
  const activities = [
    {
        id: 1,
        type: "post",
        content: "بسیار خرسندم که اعلام کنم شعبه جدید مطب در غرب تهران افتتاح شد و از این پس در روزهای زوج در خدمت شما عزیزان هستم.",
        date: "۲ روز پیش",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        type: "comment",
        content: "مطلب بسیار مفیدی بود، ممنون از دکتر علوی بابت اشتراک‌گذاری تجربیاتشون در زمینه مراقبت‌های پوستی.",
        date: "۱ هفته پیش"
    }
  ];

  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">فعالیت‌ها</h3>
          <p className="text-xs text-primary font-bold">۱۲۵۰ دنبال‌کننده</p>
        </div>
        <div className="flex gap-2">
           {isOwner && (
             <Button variant="outline" className="!rounded-xl border-primary text-primary hover:bg-primary/5 font-bold h-8 text-xs">
               ایجاد پست
             </Button>
           )}
           <Button variant="ghost" className="!rounded-xl text-primary font-bold h-8 text-xs">
             مشاهده همه
           </Button>
        </div>
      </div>

      {/* Tabs like LinkedIn */}
      <div className="flex gap-2 pb-2">
         <Button variant="secondary" size="sm" className="bg-primary/10 text-primary !rounded-full text-[10px] font-black h-7">پست‌ها</Button>
         <Button variant="ghost" size="sm" className="!rounded-full text-[10px] font-bold h-7">نظرات</Button>
         <Button variant="ghost" size="sm" className="!rounded-full text-[10px] font-bold h-7">تصاویر</Button>
      </div>

      <div className="space-y-6">
        {activities.map(activity => (
          <div key={activity.id} className="group cursor-pointer">
            <p className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1">
              <span className="font-black text-foreground">حسین افتخارراد</span>
              {activity.type === "post" ? "این را پست کرد" : "بر این مورد نظر داد"}
              <span className="mx-1">•</span>
              {activity.date}
            </p>
            <div className="flex gap-3">
              {activity.image && (
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-border/30">
                  <img src={activity.image} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-xs font-medium line-clamp-3 text-foreground/80 group-hover:text-primary transition-colors">
                {activity.content}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground font-bold">
               <div className="flex items-center gap-1">
                  <span className="icon-[solar--like-bold] text-primary w-3 h-3" />
                  <span>۱۲ نفر</span>
               </div>
               <span>۴ نظر</span>
            </div>
          </div>
        ))}
      </div>

      <Button variant="ghost" className="w-full border-t border-border/30 rounded-none !rounded-b-3xl h-10 text-xs font-bold text-muted-foreground hover:text-primary">
         نمایش تمامی فعالیت‌ها
         <span className="icon-[solar--alt-arrow-left-broken] w-4 h-4 ms-2" />
      </Button>
    </div>
  );
}
