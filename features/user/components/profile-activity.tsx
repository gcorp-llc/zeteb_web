import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProfileActivityProps {
  isOwner: boolean;
}

export function ProfileActivity({ isOwner }: ProfileActivityProps) {
  const activities = [
    { id: 1, type: "post", content: "بسیار خرسندم که اعلام کنم شعبه جدید مطب در غرب تهران افتتاح شد...", date: "۲ روز پیش" },
    { id: 2, type: "comment", content: "مطلب بسیار مفیدی بود، ممنون از دکتر علوی بابت اشتراک‌گذاری.", date: "۱ هفته پیش" }
  ];

  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-xl">فعالیت‌ها</h3>
          <p className="text-sm text-primary font-bold">۱۲۵۰ دنبال‌کننده</p>
        </div>
        <div className="flex gap-2">
           {isOwner && (
             <Button variant="outline" className="!rounded-xl border-primary text-primary hover:bg-primary/5 font-bold h-9">
               ایجاد پست
             </Button>
           )}
           <Button variant="ghost" className="!rounded-xl text-primary font-bold h-9">
             مشاهده همه
           </Button>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="pb-4 border-b border-border/50 last:border-0 last:pb-0">
            <p className="text-xs text-muted-foreground mb-1">
              {activity.type === "post" ? "حسین افتخارراد پست کرد" : "حسین افتخارراد نظر داد"} • {activity.date}
            </p>
            <p className="text-sm font-medium line-clamp-2">
              {activity.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
