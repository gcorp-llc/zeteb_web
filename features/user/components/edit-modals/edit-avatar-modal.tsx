"use client";

import { useState } from "react";
import { useUserStore } from "../../lib/store";
import { ImageCropModal } from "./image-crop-modal";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";

export function EditAvatarModal() {
  const { activeModal, closeModal } = useUserStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSelectedImage(reader.result as string);
        setShowCropper(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <ResponsiveModal
        title="تغییر تصویر پروفایل"
        open={activeModal === "avatar"}
        onOpenChange={(o) => !o && closeModal()}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
            <span className="icon-[solar--user-broken] w-12 h-12 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground text-center px-8">
            برای تغییر تصویر پروفایل خود، فایلی را انتخاب کنید. پیشنهاد می‌شود تصویر مربعی باشد.
          </p>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <Button className="bg-ios-gradient px-8 pointer-events-none">
              انتخاب تصویر
            </Button>
          </div>
        </div>
      </ResponsiveModal>

      {showCropper && (
        <ImageCropModal
          open={showCropper}
          onClose={() => {
            setShowCropper(false);
            closeModal();
          }}
          image={selectedImage}
          aspect={1}
          type="avatar"
          onSuccess={() => {
            // Success logic
          }}
        />
      )}
    </>
  );
}
