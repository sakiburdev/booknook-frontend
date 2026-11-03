"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  BookMarked,
  BookPlus,
  Library,
  LibraryBig,
  LogOut,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

// Public navigation links
const publicLinks = [
  { href: "/", label: "Home", icon: Library },
  { href: "/books", label: "All Books", icon: LibraryBig },
];

// Private navigation links
const privateLinks = [
  { href: "/add-book", label: "Add Book", icon: BookPlus },
  { href: "/my-books", label: "My Books", icon: BookMarked },
  { href: "/my-borrows", label: "My Borrows", icon: BookMarked },
];

// Theme toggle button
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <Sun className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// Check active navigation link
const isLinkActive = (href, pathname) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

// Reusable navigation links
export function NavLinks({ links, pathname }) {
  return links.map((link) => {
    const Icon = link.icon;

    return (
      <Button
        key={link.href}
        size="sm"
        variant={isLinkActive(link.href, pathname) ? "secondary" : "ghost"}
        render={<Link href={link.href} />}
      >
        <Icon className="size-4" />
        {link.label}
      </Button>
    );
  });
}

export default function Navbar() {
  // Get logged-in user's session
  const { data: session, isPending } = authClient.useSession();

  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = Boolean(session?.user);

  // Logout function
  const handleLogout = async () => {
    await authClient.signOut();

    setMobileOpen(false);

    router.replace("/login");
    router.refresh();
  };

  // Mobile navigation active style
  const mobileLinkClass = (href) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
      isLinkActive(href, pathname) ? "bg-muted text-primary" : ""
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo2.webp"
            alt="BookNook"
            width={36}
            height={36}
            className="rounded-md"
          />

          <span className="text-xl font-bold">BookNook</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLinks links={publicLinks} pathname={pathname} />

          {isLoggedIn && (
            <NavLinks links={privateLinks} pathname={pathname} />
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">

          <ThemeToggle />

          {/* Authentication area */}
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
          ) : !isLoggedIn ? (
            <div className="flex items-center gap-1">
              <Button variant="ghost" render={<Link href="/login" />}>
                Login
              </Button>

              <Button
                className="hidden sm:inline-flex"
                render={<Link href="/register" />}
              >
                Register
              </Button>
            </div>
          ) : (
            /* Logged-in user dropdown */
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar className="size-9 cursor-pointer border">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || "User"}
                  />

                  <AvatarFallback>
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-60">

                {/* IMPORTANT: GroupLabel must be inside DropdownMenuGroup */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1 py-1">
                      <span className="font-semibold text-foreground">
                        {session.user.name || "User"}
                      </span>

                      <span className="truncate text-xs font-normal text-muted-foreground">
                        {session.user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem render={<Link href="/add-book" />}>
                  <BookPlus className="size-4" />
                  Add Book
                </DropdownMenuItem>

                <DropdownMenuItem render={<Link href="/my-books" />}>
                  <BookMarked className="size-4" />
                  My Books
                </DropdownMenuItem>

                <DropdownMenuItem render={<Link href="/my-borrows" />}>
                  <BookMarked className="size-4" />
                  My Borrows
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col">

              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Library className="size-5 text-primary" />
                  BookNook Menu
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4">

                {publicLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={mobileLinkClass(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}

                {isLoggedIn &&
                  privateLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={mobileLinkClass(link.href)}
                    >
                      {link.label}
                    </Link>
                  ))}

              </nav>

              {/* Mobile authentication */}
              <div className="mt-auto flex flex-col gap-3 px-4 pb-6">

                {!isLoggedIn ? (
                  <>
                    <Button
                      variant="outline"
                      render={
                        <Link
                          href="/login"
                          onClick={() => setMobileOpen(false)}
                        />
                      }
                    >
                      Login
                    </Button>

                    <Button
                      render={
                        <Link
                          href="/register"
                          onClick={() => setMobileOpen(false)}
                        />
                      }
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <Avatar className="size-10">
                        <AvatarImage src={session.user.image || ""} />

                        <AvatarFallback>
                          {session.user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {session.user.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 size-4" />
                      Log out
                    </Button>
                  </>
                )}

              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}
