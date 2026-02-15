"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { phoneSchema, type PhoneSchema } from "../lib/schema";
import { authClient } from "../lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";

interface PhoneFormProps {
  onSuccess: (phoneNumber: string) => void;
}

export const PhoneForm = ({ onSuccess }: PhoneFormProps) => {
  const t = useTranslations("Auth");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneSchema>({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmit = async (data: PhoneSchema) => {
    setIsLoading(true);
    try {
      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber: data.phoneNumber,
      });
      if (error) {
        toast.error(error.message || "Error sending OTP");
      } else {
        toast.success(t("otpSent"));
        onSuccess(data.phoneNumber);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <div className="relative group">
          <span className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors icon-[solar--phone-broken] w-6 h-6" />
          <Input
            type="tel"
            placeholder={t("phonePlaceholder")}
            {...register("phoneNumber")}
            className="h-14 ps-12 rounded-2xl glass !bg-white/5 focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
            disabled={isLoading}
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-sm font-bold text-red-400 ps-2">
            {t(errors.phoneNumber.message as Parameters<typeof t>[0])}
          </p>
        )}
      </div>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 rounded-2xl bg-ios-gradient text-white text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all border-none"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin icon-[solar--restart-bold-duotone] w-5 h-5" />
              {t("sending")}
            </span>
          ) : (
            t("sendCode")
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};
