"use client";

import { useActionState, useEffect, useState } from "react";
import { signin } from "../lib/actions/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/Dalla Dalli Logo.jpeg";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Login() {
  const [state, action, pending] = useActionState(signin, undefined);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.errors) {
      const allErrors = Object.values(state.errors).flat();
      const firstError = allErrors[0];

      toast({
        title: "Error",
        description: firstError,
        variant: "destructive",
      });

      return;
    }

    if (state?.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <>
      <Toaster />

      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <Image
                src={logoUrl}
                alt="DallaDalli"
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
              <CardDescription>Sign in to connect with your loved ones</CardDescription>
            </div>
          </CardHeader>
          <form action={action}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Username</Label>
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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup">
                  <span
                    className="text-foreground font-medium cursor-pointer hover:underline"
                    data-testid="link-signup"
                  >
                    Sign up
                  </span>
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
