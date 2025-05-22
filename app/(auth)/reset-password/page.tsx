"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/common/ui/button";
import Image from "next/image";
import { supabase } from "@/lib/utils/utils";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password/confirm`,
      });
      if (error) throw error;
      toast.success("Password reset email sent! Please check your inbox.");
      router.push("/sign-in");
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="background-gradient min-h-screen flex justify-center items-center p-5">
      <section className="card p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <Image
            src="/SandBar.png"
            alt="Sandbar Flood Logo"
            className="mb-8 h-[71px] w-[182px] max-sm:h-auto max-sm:w-[140px]"
            width={182}
            height={71}
          />
          <h1 className="card-header text-center mb-3">Reset Password</h1>
          <p className="text-sm text-gray-600 mb-8 text-center">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required className="input w-full" />
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="btn-primary w-full py-6 text-lg" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
          <footer className="mt-8 text-sm text-center text-gray-600">
            <a
              href="/sign-in"
              className="text-sm font-semibold text-amber-600 hover:text-amber-700 no-underline"
            >
              Back to Log In
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
} 