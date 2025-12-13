"use client";

import { useActionState, useEffect, useState } from "react";
import { signup, verifyOtp } from "@/lib/actions/auth";
import Link from "next/link";
import { CardContent, CardFooter } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { useToast } from "@/app/hooks/use-toast";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Layout from "@/app/components/authLayout/layout";
import OtpModal from "@/app/components/modal/OtpModal";

export default function SignUp() {
  const [formState, formAction, pending] = useActionState(signup, undefined);

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showOtpBox, setShowOtpBox] = useState(false);

  const passwordsMatch = password === confirmPassword && password.length > 0;

  const { toast } = useToast();

  useEffect(() => {
    if (formState?.errors) {
      const allErrors = Object.values(formState.errors).flat();
      const firstError = allErrors[0];

      toast({
        title: "Error",
        description: firstError,
        variant: "destructive",
      });

      return;
    }

    if (formState?.error) {
      toast({
        title: "Error",
        description: formState.error,
        variant: "destructive",
      });
      return;
    }

    if (formState?.message === "OK" && formState?.email) {
      setShowOtpBox(true);
      return;
    }
  }, [formState, toast]);

  return (
    <>
      <Layout mode="signup">
        <OtpModal
          showOtpBox={showOtpBox}
          setShowOtpBox={setShowOtpBox}
          email={formState?.email}
        />
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Your Name"
                name="username"
                autoComplete="username"
                data-testid="input-username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="you@example.com"
                name="email"
                autoComplete="email"
                data-testid="input-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password">
                  <span
                    className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                    data-testid="link-forgot-password"
                  >
                    Forgot password?
                  </span>
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  data-testid="input-password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>{" "}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  name="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  data-testid="input-confirm-password"
                />
                {confirmPassword && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {passwordsMatch ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X
                        className="w-4 h-4 text-destructive cursor-pointer"
                        onClick={() => setConfirmPassword("")}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={pending}
              data-testid="button-login"
            >
              {pending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login">
                <span
                  className="text-foreground font-medium cursor-pointer hover:underline"
                  data-testid="link-signup"
                >
                  Log In
                </span>
              </Link>
            </p>
          </CardFooter>
        </form>
      </Layout>
    </>
  );
}
