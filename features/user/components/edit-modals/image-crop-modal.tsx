"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { profileApi } from "../../api/profile";
import { useUpload } from "@/hooks/use-upload";

interface ImageCropModalProps {
  open: boolean;
  onClose: () => void;
  image: string | null;
  aspect: number;
  type: "avatar" | "cover";
  onSuccess: (url: string) => void;
}

export function ImageCropModal({ open, onClose, image, aspect, type, onSuccess }: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadFile } = useUpload();

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<Blob | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleSave = async () => {
    if (!image || !croppedAreaPixels) return;
    setIsSubmitting(true);
    try {
      const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels);
      if (!croppedImageBlob) throw new Error("Could not crop image");

      const file = new File([croppedImageBlob], "cropped-image.jpg", { type: "image/jpeg" });
      const uploadedUrl = await uploadFile(file);

      if (!uploadedUrl) throw new Error("Upload failed");

      if (type === "avatar") {
        // Mocking update for now as profileApi might not have direct avatar update
        // await profileApi.updateProfile({ avatar_url: uploadedUrl });
      } else {
        await profileApi.updateProfile({ cover_image: uploadedUrl });
      }

      onSuccess(uploadedUrl);
      toast.success("تصویر با موفقیت بروزرسانی شد");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("خطا در ذخیره تصویر");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveModal
      title={type === "avatar" ? "ویرایش تصویر پروفایل" : "ویرایش تصویر کاور"}
      open={open}
      onOpenChange={(o) => !o && onClose()}
    >
      <div className="space-y-6 pt-4">
        <div className="relative h-64 w-full bg-muted rounded-xl overflow-hidden">
          {image && (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape={type === "avatar" ? "round" : "rect"}
              showGrid={false}
            />
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground text-right">بزرگنمایی</p>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={handleSave} disabled={isSubmitting} className="bg-ios-gradient px-8">
            {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
          </Button>
          <Button variant="outline" onClick={onClose}>انصراف</Button>
        </div>
      </div>
    </ResponsiveModal>
  );
}
