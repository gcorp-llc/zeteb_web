import { z } from "zod";

export const ProfileHeaderSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  specialty: z.string().min(2, "تخصص الزامی است"),
  location: z.string().min(2, "مکان الزامی است"),
});

export const ProfileAboutSchema = z.object({
  bio: z.string().min(10, "درباره من باید حداقل ۱۰ کاراکتر باشد"),
});

export const EducationSchema = z.object({
  school: z.string().min(2, "نام دانشگاه الزامی است"),
  degree: z.string().min(2, "مدرک تحصیلی الزامی است"),
  year: z.string().min(4, "سال فارغ‌التحصیلی الزامی است"),
});

export const SkillSchema = z.object({
  name: z.string().min(2, "نام مهارت الزامی است"),
});

export const ContactSchema = z.object({
  address: z.string().min(5, "آدرس الزامی است"),
  phone: z.string().min(8, "شماره تماس الزامی است"),
});
