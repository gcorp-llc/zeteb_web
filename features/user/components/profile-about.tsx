import { Button } from "@/components/ui/button";

interface ProfileAboutProps {
  bio: string;
  isOwner: boolean;
}

export function ProfileAbout({ bio, isOwner }: ProfileAboutProps) {
  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xl">درباره من</h3>
        {isOwner && (
          <Button variant="ghost" size="icon" className="rounded-full">
            <span className="icon-[solar--pen-bold] w-5 h-5" />
          </Button>
        )}
      </div>
      <p className="text-foreground/80 leading-relaxed">
        {bio}
      </p>
    </div>
  );
}
