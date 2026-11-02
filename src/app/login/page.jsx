import { Suspense } from "react";
import LoginView from "@/components/auth/LoginView";

// Login fallback
function LoginFallback() {
  return (
    <div className="flex justify-center py-24">
      <div className="size-10 animate-spin rounded-full border-2 border-muted border-t-primary" />
    </div>
  );
}

const LoginPage = () => {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginView />
    </Suspense>
  );
};

export default LoginPage;
