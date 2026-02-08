"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileAboutSchema } from "../../lib/schema";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUserStore } from "../../lib/store";
import { useState } from "react";
import { toast } from "sonner";

export function EditAboutModal({ initialData }: { initialData: any }) {
  const { activeModal, closeModal } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ProfileAboutSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio: data.bio }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      toast.success("درباره من با موفقیت بروزرسانی شد");
      closeModal();
    } catch (error) {
      toast.error("خطا در بروزرسانی");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveModal
      title="ویرایش درباره من"
      open={activeModal === "about"}
      onOpenChange={(open) => !open && closeModal()}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2 text-right">
          <Label>بیوگرافی</Label>
          <Textarea {...register("bio")} className="text-right min-h-[150px]" />
          {errors.bio && <p className="text-xs text-destructive">{errors.bio.message as string}</p>}
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
