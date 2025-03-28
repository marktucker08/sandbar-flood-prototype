"use client";

import React from "react";
import { FormInput } from "@/components/ui/form";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SignInPage() {
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
          <form className="w-full space-y-6">
            <div>
              <FormInput
                type="email"
                label="Email"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <PasswordInput placeholder="Enter your password" showForgotPassword={true} />
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="btn-primary w-full py-6 text-lg">
                Log In
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