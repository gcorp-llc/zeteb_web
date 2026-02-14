"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkingHours } from "./working-hours";
import dynamic from "next/dynamic";
import { useUpload } from "@/hooks/use-upload";
import { toast } from "sonner";
import { clinicsApi } from "../api";
import { Clinic, WorkingHour } from "../types";
import { Switch } from "@/components/ui/switch";

const MapPicker = dynamic(() => import("./map-picker"), { ssr: false });

const INITIAL_WORKING_HOURS: WorkingHour[] = [
  { day: "saturday", isOpen: false, shifts: [] },
  { day: "sunday", isOpen: false, shifts: [] },
  { day: "monday", isOpen: false, shifts: [] },
  { day: "tuesday", isOpen: false, shifts: [] },
  { day: "wednesday", isOpen: false, shifts: [] },
  { day: "thursday", isOpen: false, shifts: [] },
  { day: "friday", isOpen: false, shifts: [] },
];

export function ClinicForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState<Clinic['type']>("clinic");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | undefined>();
  const [phones, setPhones] = useState<{ number: string; isActive: boolean }[]>([{ number: "", isActive: true }]);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>(INITIAL_WORKING_HOURS);
  const [logoUrl, setLogoUrl] = useState<string | undefined>();

  const { uploadFile, isUploading } = useUpload();

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFile(file);
      if (url) {
        setLogoUrl(url);
        toast.success("لوگو با موفقیت آپلود شد");
      }
    }
  };

  const addPhone = () => setPhones([...phones, { number: "", isActive: true }]);
  const removePhone = (index: number) => setPhones(phones.filter((_, i) => i !== index));
  const updatePhone = (index: number, field: string, value: any) => {
    const newPhones = [...phones];
    newPhones[index] = { ...newPhones[index], [field]: value };
    setPhones(newPhones);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await clinicsApi.createClinic({
        name,
        type,
        address,
        location,
        phones,
        workingHours,
        logoUrl
      });
      toast.success("اطلاعات با موفقیت ثبت شد");
      onSuccess?.();
    } catch (error) {
      toast.error("خطا در ثبت اطلاعات");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>نام مرکز (مطب/کلینیک/بیمارستان)</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً مطب جردن" className="mt-1" />
          </div>
          <div>
            <Label>نوع مرکز</Label>
            <Select value={type} onValueChange={(v) => setType(v as any)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clinic">کلینیک</SelectItem>
                <SelectItem value="office">مطب شخصی</SelectItem>
                <SelectItem value="hospital">بیمارستان</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>لوگو مرکز</Label>
            <div className="mt-2 flex items-center gap-4">
               <div className="w-16 h-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-white/5">
                  {logoUrl ? <img src={logoUrl} className="w-full h-full object-cover" /> : <span className="icon-[solar--camera-bold-duotone] w-8 h-8 text-muted-foreground" />}
               </div>
               <Input type="file" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
               <Label htmlFor="logo-upload" className="cursor-pointer bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary/20 transition-all">
                  {isUploading ? "در حال آپلود..." : "انتخاب لوگو"}
               </Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>موقعیت روی نقشه</Label>
          <MapPicker value={location} onChange={setLocation} />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-bold">اطلاعات تماس</Label>
        <div className="grid gap-4">
          {phones.map((phone, idx) => (
            <div key={idx} className="flex items-end gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex-1">
                <Label className="text-[10px] mb-1 block text-muted-foreground">شماره تماس</Label>
                <Input value={phone.number} onChange={(e) => updatePhone(idx, "number", e.target.value)} placeholder="۰۲۱..." />
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Switch checked={phone.isActive} onCheckedChange={(v) => updatePhone(idx, "isActive", v)} />
                <span className="text-xs">فعال</span>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => removePhone(idx)} className="text-destructive">
                <span className="icon-[solar--trash-bin-trash-bold-duotone] w-5 h-5" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addPhone} className="w-full border-dashed !rounded-2xl">
            + افزودن شماره تماس جدید
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Label>آدرس دقیق</Label>
        <Textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="تهران، خیابان..." className="min-h-[100px]" />
      </div>

      <WorkingHours value={workingHours} onChange={setWorkingHours} />

      <Button type="submit" className="w-full h-12 bg-ios-gradient text-white !rounded-2xl font-black text-lg shadow-xl shadow-primary/20">
        ثبت و ذخیره نهایی
      </Button>
    </form>
  );
}
