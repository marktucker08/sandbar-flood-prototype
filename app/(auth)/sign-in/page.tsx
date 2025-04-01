"use client";

import React from "react";
import { FormInput } from "@/components/ui/form";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
        return;
      }

      router.push("/");
      router.refresh();
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
          <h1 className="card-header text-center mb-3">
            Log In to Sandbar Flood
          </h1>
          <p className="text-sm text-gray-600 mb-8 text-center">
            Enter your email and password below
          </p>
          <p className="text-sm text-red-600 mb-8 text-center">
            <span className="font-bold">Note:</span>
            <br />
            Sample email: test@example.com
            <br />
            Sample password: password123
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <FormInput
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div>
              <PasswordInput 
                name="password"
                placeholder="Enter your password" 
                showForgotPassword={true} 
                required
              />
            </div>
            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="btn-primary w-full py-6 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </div>
          </form>
          <footer className="mt-8 text-sm text-center text-gray-600">
            <span>Don&apos;t have an account?</span>
            <a
              href="#"
              className="ml-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 no-underline"
            >
              Contact Us
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
}