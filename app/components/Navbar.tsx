"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, MessageCircle, Bell, LogOut, Sun, Moon, Menu } from "lucide-react";
import logoUrl from "@/assets/Dalla Dalli Logo.jpeg";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import NotificationsDropdown from "./NotificationsDropdown";
import Image from "next/image";
import { signout } from "../lib/actions/auth";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const unreadMessages = 3;

  const navItems = [
    { href: "/feed", icon: Home, label: "Feed" },
    { href: "/messages", icon: MessageCircle, label: "Messages", badge: unreadMessages },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    return await signout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/feed">
            <div
              className="flex items-center gap-2 cursor-pointer"
              data-testid="link-logo"
            >
              <Image
                src={logoUrl}
                alt="DallaDalli"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-foreground hidden sm:inline">
                DallaDalli
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  size="icon"
                  className="relative"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            ))}

            <NotificationsDropdown />

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                  data-testid="button-user-menu"
                >
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage src={user?.avatarUrl || undefined} alt={user?.displayName} /> */}
                    <AvatarFallback>
                      {/* {user?.displayName?.charAt(0).toUpperCase() ||  */}U{/* } */}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive cursor-pointer"
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <NotificationsDropdown />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <Avatar className="h-10 w-10">
                      {/* <AvatarImage
                        src={user?.avatarUrl || undefined}
                        alt={user?.displayName}
                      /> */}
                      <AvatarFallback>
                        {/* {user?.displayName?.charAt(0).toUpperCase() || " */}U
                        {/* "} */}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">Just Name</p>
                      <p className="text-xs text-muted-foreground">@Just Username</p>
                    </div>
                  </div>

                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant={isActive(item.href) ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3"
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                        {item.badge && item.badge > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  ))}

                  {mounted && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3"
                      onClick={toggleTheme}
                    >
                      {theme === "light" ? (
                        <Moon className="w-5 h-5" />
                      ) : (
                        <Sun className="w-5 h-5" />
                      )}
                      <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-destructive"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Log out</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
