"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { authClient } from "../lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // I should check if sonner is available or use alert

export const AuthContainer = () => {
  const t = useTranslations("Auth");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber,
      });
      if (error) {
        toast.error(error.message || "Error sending OTP");
      } else {
        toast.success(t("otpSent"));
        setStep("otp");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await authClient.phoneNumber.verify({
        phoneNumber,
        code: otp,
      });
      if (error) {
        toast.error(error.message || "Invalid OTP");
      } else {
        toast.success(t("loginSuccess"));
        // Redirect or refresh
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="p-1 rounded-[2.5rem] bg-linear-to-br from-primary to-purple-600 shadow-2xl">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2.3rem] p-8 md:p-10 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
              {t("welcome")}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {step === "phone" ? t("enterPhone") : t("enterOtp")}
            </p>
          </div>

          <div className="min-h-[200px]">
            {step === "phone" ? (
              <form
                onSubmit={handleSendOtp}
                className="space-y-6"
              >
                <div className="relative">
                  <span className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-400 icon-[solar--phone-bold-duotone] w-6 h-6" />
                  <Input
                    type="tel"
                    placeholder={t("phonePlaceholder")}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-14 ps-12 rounded-2xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-primary focus:border-primary text-lg"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 rounded-2xl bg-linear-to-br from-primary to-purple-600 text-white text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all border-none"
                >
                  {isLoading ? t("sending") : t("sendCode")}
                </Button>
              </form>
            ) : (
              <form
                onSubmit={handleVerifyOtp}
                className="space-y-6"
              >
                <div className="relative">
                  <span className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-400 icon-[solar--lock-password-bold-duotone] w-6 h-6" />
                  <Input
                    type="text"
                    placeholder={t("otpPlaceholder")}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="h-14 ps-12 rounded-2xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-center text-2xl tracking-[0.5em] font-black"
                    required
                    maxLength={6}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 rounded-2xl bg-linear-to-br from-primary to-purple-600 text-white text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all border-none"
                >
                  {isLoading ? t("verifying") : t("verifyCode")}
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="w-full text-slate-500 text-sm font-bold hover:text-primary transition-colors"
                >
                  {t("changePhone")}
                </button>
              </form>
            )}
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold italic">
                {t("orContinueWith")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              className="h-14 rounded-2xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all gap-3 font-bold"
            >
              <span className="icon-[logos--google-icon] w-5 h-5" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("github")}
              className="h-14 rounded-2xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all gap-3 font-bold"
            >
              <span className="icon-[logos--github-icon] w-5 h-5" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
