"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { otpSchema, type OtpSchema } from "../lib/schema";
import { authClient } from "../lib/auth-client";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";

interface OtpFormProps {
  phoneNumber: string;
  onBack: () => void;
}

export const OtpForm = ({ phoneNumber, onBack }: OtpFormProps) => {
  const t = useTranslations("Auth");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const otpValue = watch("otp");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (otpValue.length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [otpValue]);

  const onSubmit = async (data: OtpSchema) => {
    if (data.otp.length !== 6) return;
    setIsLoading(true);
    try {
      const { error } = await authClient.phoneNumber.verify({
        phoneNumber,
        code: data.otp,
      });
      if (error) {
        toast.error(error.message || "Invalid OTP");
      } else {
        toast.success(t("loginSuccess"));
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const currentOtp = otpValue.split("");
    currentOtp[index] = value.slice(-1);
    const newOtp = currentOtp.join("");
    setValue("otp", newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    try {
      await authClient.phoneNumber.sendOtp({ phoneNumber });
      setTimeLeft(120);
      toast.success(t("otpSent"));
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <div className="space-y-4">
        <div className="flex justify-between gap-2 dir-ltr">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otpValue[i] || ""}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-12 h-16 sm:w-14 sm:h-20 flex items-center justify-center rounded-2xl border-2 transition-all text-2xl sm:text-3xl font-black glass text-center focus:outline-none ${
                otpValue.length === i
                  ? "border-primary bg-primary/10 ring-4 ring-primary/20"
                  : otpValue[i]
                  ? "border-primary/50 bg-white/10"
                  : "border-white/10 bg-white/5"
              }`}
              disabled={isLoading}
              autoFocus={i === 0}
            />
          ))}
        </div>
        {errors.otp && (
          <p className="text-sm font-bold text-red-500 text-center">
            {t(errors.otp.message as Parameters<typeof t>[0])}
          </p>
        )}
      </div>

      <div className="text-center space-y-2">
        {timeLeft > 0 ? (
          <p className="text-sm text-muted-foreground font-medium">
            زمان باقی‌مانده: <span className="text-primary font-bold tabular-nums">{formatTime(timeLeft)}</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-primary font-bold hover:underline"
          >
            ارسال مجدد کد تایید
          </button>
        )}
      </div>

      <div className="space-y-4">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            type="submit"
            disabled={isLoading || otpValue.length !== 6}
            className="w-full h-14 rounded-2xl bg-ios-gradient text-white text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all border-none"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin icon-[solar--restart-broken] w-5 h-5" />
                {t("verifying")}
              </span>
            ) : (
              t("verifyCode")
            )}
          </Button>
        </motion.div>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-slate-500 dark:text-slate-400 text-sm font-bold hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <span className="icon-[solar--arrow-left-broken] w-4 h-4 rtl:rotate-180" />
          {t("changePhone")}
        </button>
      </div>
    </motion.form>
  );
};
