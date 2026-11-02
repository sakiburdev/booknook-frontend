"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const RegisterView = () => {
  // Password rules
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must include at least one lowercase letter";
    }

    return "";
  };

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace("/");
    }
  }, [isPending, session, router]);

  // Change Handler
  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirm) {
      setPasswordError("Passwords do not match");
      return;
    }
    const message = validatePassword(form.password);

    if (message) {
      setPasswordError(message);
      return;
    }

    setPasswordError("");
    setSubmitting(true);

    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email,
      password: form.password,
    });

    setSubmitting(false);

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Account created. Welcome to BookNook!");
    router.replace("/");
  };

  // Google register
  const handleGoogleRegister = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  if (isPending || session?.user) {
    return (
      <div className="flex justify-center py-20">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="size-10 animate-spin rounded-full border-2 border-muted border-t-primary" />
          <p className="text-sm">Checking your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold">
        <BookOpen className="size-8 text-primary" /> BookNook
      </div>

      <div className="w-full rounded-3xl border bg-card p-8 shadow-lg">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join BookNook to add, borrow, and manage books.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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
              onChange={handleChange}
              required
            />
          </div>

          {/* Password — validation rules সহ */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="create your password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={Boolean(passwordError && form.password)}
              required
            />

            {passwordError && (
              <p className="text-sm text-destructive">{passwordError}</p>
            )}

            <p className="text-xs text-muted-foreground">
              At least 6 characters with one uppercase and one lowercase letter.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirm" className="text-sm font-medium">
              Confirm password
            </label>
            <Input
              id="confirm"
              type="password"
              placeholder= "confirm your password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleRegister}
          disabled={submitting}
        >
          <FcGoogle className="size-5" /> Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
