"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillSchema } from "../../lib/schema";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "../../lib/store";
import { useState } from "react";
import { toast } from "sonner";

export function EditSkillsModal({ initialData }: { initialData: any }) {
  const { activeModal, closeModal } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>(initialData || []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(SkillSchema),
  });

  const onSubmit = async (data: any) => {
    if (skills.includes(data.name)) {
      toast.error("این مهارت قبلا اضافه شده است");
      return;
    }
    setSkills([...skills, data.name]);
    reset();
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const saveAll = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills }),
      });

      if (!response.ok) throw new Error("Failed to update");

      toast.success("مهارت‌ها بروزرسانی شد");
      closeModal();
    } catch (error) {
      toast.error("خطا در بروزرسانی");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveModal
      title="ویرایش مهارت‌ها"
      open={activeModal === "skills"}
      onOpenChange={(open) => !open && closeModal()}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill: string) => (
            <div key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-destructive"
              >×</button>
            </div>
          ))}
        </div>
        <div className="space-y-2 text-right">
          <Label>مهارت جدید</Label>
          <div className="flex gap-2">
             <Button type="submit" size="sm" className="bg-ios-gradient">افزودن</Button>
             <Input {...register("name")} className="text-right" placeholder="نام مهارت..." />
          </div>
          {errors.name && <p className="text-xs text-destructive">{errors.name.message as string}</p>}
        </div>
        <div className="flex justify-start gap-3 pt-4 border-t">
          <Button
            type="button"
            disabled={isSubmitting}
            className="bg-ios-gradient px-8"
            onClick={saveAll}
          >
            {isSubmitting ? "در حال ذخیره..." : "تایید نهایی"}
          </Button>
          <Button type="button" variant="outline" onClick={closeModal}>انصراف</Button>
        </div>
      </form>
    </ResponsiveModal>
  );
}
