import { Button } from "@/components/ui/button";
import { useUserStore } from "../lib/store";

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface ProfileEducationProps {
  education: Education[];
  isOwner: boolean;
}

export function ProfileEducation({ education, isOwner }: ProfileEducationProps) {
  const { openModal } = useUserStore();

  return (
    <div className="glass-card space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xl">تحصیلات</h3>
        {isOwner && (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => openModal("education")}>
              <span className="icon-[solar--add-circle-bold] w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => openModal("education")}>
              <span className="icon-[solar--pen-bold] w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {education.map((edu, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
               <span className="icon-[solar--square-academic-cap-bold-duotone] w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold">{edu.school}</h4>
              <p className="text-sm text-foreground/80">{edu.degree}</p>
              <p className="text-xs text-muted-foreground">{edu.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
