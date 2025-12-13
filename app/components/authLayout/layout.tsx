import { Toaster } from "@/components/ui/toaster";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import logoUrl from "@/assets/Dalla Dalli Logo.jpeg";

export default function Layout({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: "signin" | "signup";
}) {
  const description =
    mode === "signin"
      ? "Sign in to connect with your loved ones"
      : mode === "signup"
      ? "Sign up to create an account"
      : mode === "forgot-password" && "";

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
              <CardTitle className="text-2xl font-bold">
                Welcome {mode === "signin" && "Back!"}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </CardHeader>
          {children}
        </Card>
      </div>
    </>
  );
}
