import { Suspense } from "react";
import LoginView from "@/components/auth/LoginView";

// Title and description
export const metadata = {
  title: "Login | BookNook",
  description:
    "Log in to your BookNook account to borrow books and manage your shelf.",
};

// Login fallback
function LoginFallback() {
  return (
    <div className="flex justify-center py-24">
      <div className="size-10 animate-spin rounded-full border-2 border-muted border-t-primary" />
    </div>
  );
}

// Main Page Component
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginView />
    </Suspense>
  );
}
