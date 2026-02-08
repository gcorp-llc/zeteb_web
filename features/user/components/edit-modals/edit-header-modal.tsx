"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileHeaderSchema } from "../../lib/schema";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "../../lib/store";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useState } from "react";

export function EditHeaderModal({ initialData }: { initialData: any }) {
  const { activeModal, closeModal } = useUserStore();
  const t = useTranslations("ProfilePage");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ProfileHeaderSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          specialty: data.specialty,
          location: data.location
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      toast.success("اطلاعات با موفقیت بروزرسانی شد");
      closeModal();
      // Optional: Refresh page or mutate state
    } catch (error) {
      toast.error("خطا در بروزرسانی اطلاعات");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveModal
      title="ویرایش اطلاعات پایه"
      open={activeModal === "header"}
      onOpenChange={(open) => !open && closeModal()}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2 text-right">
          <Label>نام و نام خانوادگی</Label>
          <Input {...register("name")} className="text-right" />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message as string}</p>}
        </div>
        <div className="space-y-2 text-right">
          <Label>تخصص</Label>
          <Input {...register("specialty")} className="text-right" />
          {errors.specialty && <p className="text-xs text-destructive">{errors.specialty.message as string}</p>}
        </div>
        <div className="space-y-2 text-right">
          <Label>مکان</Label>
          <Input {...register("location")} className="text-right" />
          {errors.location && <p className="text-xs text-destructive">{errors.location.message as string}</p>}
        </div>
        <div className="flex justify-start gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="bg-ios-gradient px-8">
            {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
          <Button type="button" variant="outline" onClick={closeModal}>انصراف</Button>
        </div>
      </form>
    </ResponsiveModal>
  );
}
