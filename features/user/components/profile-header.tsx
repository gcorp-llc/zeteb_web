import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  user: any;
  isOwner: boolean;
}

export function ProfileHeader({ user, isOwner }: ProfileHeaderProps) {
  return (
    <div className="glass-card !p-0 overflow-hidden relative border-none shadow-xl">
      <div
        className="h-48 sm:h-64 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${user.coverImage})` }}
      >
        {isOwner && (
          <Button variant="secondary" size="icon" className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/40">
            <span className="icon-[solar--camera-bold] w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="px-8 pb-8">
        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 gap-6">
          <div className="relative">
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 ring-8 ring-background border-4 border-transparent">
              <AvatarImage src={user.avatarImage} />
              <AvatarFallback className="text-4xl font-black bg-ios-gradient text-white">
                {user.name.split(" ").map((n: string) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {isOwner && (
              <Button variant="secondary" size="icon" className="absolute bottom-2 right-2 rounded-full bg-primary text-white shadow-lg border-2 border-background">
                <span className="icon-[solar--pen-bold] w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {isOwner ? (
              <>
                <Button className="!rounded-2xl bg-ios-gradient shadow-lg shadow-primary/20 h-11 px-6 font-bold">
                  در دسترس برای همکاری
                </Button>
                <Button variant="outline" className="!rounded-2xl h-11 px-6 border-2 font-bold">
                  افزودن بخش جدید
                </Button>
              </>
            ) : (
              <>
                <Button className="!rounded-2xl bg-ios-gradient shadow-lg shadow-primary/20 h-11 px-8 font-bold">
                  دنبال کردن
                </Button>
                <Button variant="outline" className="!rounded-2xl h-11 px-8 border-2 font-bold">
                  پیام
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black">{user.name}</h1>
            <span className="icon-[solar--verified-check-bold] w-6 h-6 text-primary" />
          </div>
          <p className="text-lg text-foreground/80 font-medium">{user.role}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1.5">
              <span className="icon-[solar--map-point-bold-duotone] w-4 h-4 text-primary" />
              {user.location}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="icon-[solar--users-group-rounded-bold-duotone] w-4 h-4 text-primary" />
              <span className="text-primary font-bold">{user.connections}</span> دنبال‌کننده
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
