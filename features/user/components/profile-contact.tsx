import { Button } from "@/components/ui/button";
import { useUserStore } from "../lib/store";

interface Address {
  title: string;
  address: string;
  phone: string;
}

interface ProfileContactProps {
  addresses: Address[];
  isOwner: boolean;
}

export function ProfileContact({ addresses, isOwner }: ProfileContactProps) {
  const { openModal } = useUserStore();

  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">اطلاعات تماس و آدرس</h3>
        {isOwner && (
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => openModal("contact")}>
            <span className="icon-[solar--pen-bold] w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {addresses.map((addr, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-video w-full rounded-2xl bg-muted overflow-hidden relative border border-border/50">
              <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                 <span className="icon-[solar--map-point-wave-bold-duotone] w-12 h-12 text-primary/30" />
                 <p className="absolute bottom-4 text-[10px] font-bold text-primary/40 uppercase tracking-widest">Map Placeholder</p>
              </div>
            </div>
            <div className="space-y-1">
               <h4 className="font-bold text-sm">{addr.title}</h4>
               <p className="text-xs text-muted-foreground">{addr.address}</p>
               <p className="text-xs font-bold text-primary">{addr.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
