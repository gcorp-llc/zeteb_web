"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationSchema } from "../../lib/schema";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "../../lib/store";
import { useState } from "react";
import { toast } from "sonner";

export function EditEducationModal({ initialData }: { initialData: any }) {
  const { activeModal, closeModal } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(EducationSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // For simplicity, we'll store education as a formatted string in the list
      const eduString = `${data.school} - ${data.degree} (${data.year})`;

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          education: [eduString] // In a real app, we'd append to existing list
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      toast.success("سوابق تحصیلی بروزرسانی شد");
      closeModal();
    } catch (error) {
      toast.error("خطا در بروزرسانی");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveModal
      title="افزودن/ویرایش سوابق تحصیلی"
      open={activeModal === "education"}
      onOpenChange={(open) => !open && closeModal()}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2 text-right">
          <Label>دانشگاه</Label>
          <Input {...register("school")} className="text-right" />
          {errors.school && <p className="text-xs text-destructive">{errors.school.message as string}</p>}
        </div>
        <div className="space-y-2 text-right">
          <Label>مدرک</Label>
          <Input {...register("degree")} className="text-right" />
          {errors.degree && <p className="text-xs text-destructive">{errors.degree.message as string}</p>}
        </div>
        <div className="space-y-2 text-right">
          <Label>سال فارغ‌التحصیلی</Label>
          <Input {...register("year")} className="text-right" />
          {errors.year && <p className="text-xs text-destructive">{errors.year.message as string}</p>}
        </div>
        <div className="flex justify-start gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="bg-ios-gradient px-8">
            {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
          </Button>
          <Button type="button" variant="outline" onClick={closeModal}>انصراف</Button>
        </div>
      </form>
    </ResponsiveModal>
  );
}
