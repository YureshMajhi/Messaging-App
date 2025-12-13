"use client";

import { Loader2, ShieldCheck, X } from "lucide-react";
import { Dispatch, SetStateAction, useActionState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { verifyOtp } from "@/app/lib/actions/auth";
import { useToast } from "@/app/hooks/use-toast";
import { redirect } from "next/navigation";

type OTPModalProps = {
  showOtpBox: boolean;
  setShowOtpBox: Dispatch<SetStateAction<boolean>>;
  email?: string;
};

const OTP_LENGTH = 6;

export default function OtpModal({
  showOtpBox = false,
  setShowOtpBox,
  email = "",
}: OTPModalProps) {
  if (!showOtpBox) return;

  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { toast } = useToast();

  const [otpState, otpAction, pending] = useActionState(verifyOtp, undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value;

    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (e.currentTarget.value) {
        e.currentTarget.value = "";
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        inputsRef.current[index - 1]!.value = "";
      }
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    pasted.split("").forEach((char, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = char;
      }
    });
  };

  useEffect(() => {
    if (otpState?.errors) {
      const allErrors = Object.values(otpState.errors).flat();
      const firstError = allErrors[0];

      toast({
        title: "Error",
        description: firstError,
        variant: "destructive",
      });

      return;
    }

    if (otpState?.error) {
      toast({
        title: "Error",
        description: otpState.error,
        variant: "destructive",
      });
      return;
    }
  }, [otpState, toast]);

  const getOtpValue = () => {
    return inputsRef.current.map((input) => input?.value || "").join("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otp = getOtpValue();

    if (!email) return;

    const formData = new FormData();
    formData.set("email", email);
    formData.set("otp", otp);

    const result = await verifyOtp({}, formData);

    if (result?.message) {
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });
    }
    redirect("/login");
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-[6px]"></div>

        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 p-8 sm:p-10 animate-in fade-in zoom-in-95 duration-300">
          <div className="absolute top-5 right-5 text-primary">
            <X className="w-4 h-4" onClick={() => setShowOtpBox(false)} />
          </div>
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-[#4A3732] tracking-tight">
                Verify Account
              </h2>
              <p className="text-md md:text-lg text-stone-500">
                We have sent a verification code to <br />
                <span className="font-medium text-stone-700">{email}</span>
              </p>
            </div>
          </div>

          <form action={otpAction} className="space-y-8">
            <div className="flex justify-between gap-2 sm:gap-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  ref={(el) => {
                    if (el) inputsRef.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={(e) => handlePaste(e)}
                  className="w-9 md:w-12 h-11 md:h-14 text-center text-2xl font-semibold bg-white border border-stone-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm text-primary selection:bg-primary selection:text-white"
                />
              ))}
            </div>

            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full text-lg"
                disabled={pending}
                data-testid="button-login"
              >
                {pending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying Code...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-base text-stone-500">
                <span>Didn't receive code?</span>
                <button
                  type="button"
                  className="text-primary font-medium hover:text-[#8B4513] transition-colors"
                >
                  Resend
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
