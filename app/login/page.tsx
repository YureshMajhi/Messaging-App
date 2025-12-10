"use client";

import { useActionState, useState } from "react";
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

export default function Login() {
  const [state, action, pending] = useActionState(signin, undefined);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* <form action={action}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" />
          {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" placeholder="Password" />
          {state?.errors?.password && (
            <div>
              <p className="text-red-500">Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li className="text-red-500" key={error}>
                    - {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button type="submit">Login</button>
        {state?.error && <p className="text-red-500">{state.error}</p>}
      </form>

      <div>
        <p>Don't have an account?</p>
        <button>
          <Link href={"/signup"}>Sign Up</Link>
        </button>
      </div> */}

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
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    data-testid="input-password"
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
