"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const LoginView = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect");

  const { data: session, isPending } = authClient.useSession();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace(redirectTarget);
    }
  }, [isPending, session, router, redirectTarget]);

  // Email, Password Login
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);

    const { error } = await authClient.signIn.email({
      email: form.email,
      password: form.password,
    });

    setSubmitting(false);

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }
    toast.success("Welcome back to BookNook!");

    router.replace(redirectTarget);
  };

  // Google login
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  if (isPending || session?.user) {
    return (
      <div className="flex justify-center py-20">
        <SkeletonLogin message="Checking your session..." />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold">
        <BookOpen className="size-8 text-primary" /> BookNook
      </div>

      <div className="w-full rounded-3xl border bg-card p-8 shadow-lg">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Log in to borrow books and manage your shelf.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="your register password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </Button>
        </form>

        {/* Google login */}
        <div className="my-5 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={submitting}
        >
          <FcGoogle className="size-5" /> Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;

// Skeleton
function SkeletonLogin({ message }) {
  return (
    <div className="flex flex-col items-center gap-3 text-muted-foreground">
      <div className="size-10 animate-spin rounded-full border-2 border-muted border-t-primary" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
