"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/common/ui/button";
import Image from "next/image";
import { supabase } from "@/lib/utils/utils";
import { FormInput } from "@/components/common/ui/form";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      agency: formData.get("agency") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    };

    try {
      // Store registration request in Supabase
      const { error } = await supabase.from("registration_requests").insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          agency: data.agency,
          phone: data.phone,
          email: data.email,
          status: "pending",
        },
      ]);
      if (error) throw error;
      toast.success("Registration request submitted! An admin will review your request.");
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
          <h1 className="card-header text-center mb-3">Request Access</h1>
          <p className="text-sm text-gray-600 mb-8 text-center">
            Fill out the form below to request access. An administrator will review your request.
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <FormInput
                type="text"
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <FormInput
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div>
              <FormInput
                type="text"
                name="agency"
                label="Agency"
                placeholder="Enter your agency name"
                required
              />
            </div>
            <div>
              <FormInput
                type="tel"
                name="phone"
                label="Phone"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <FormInput
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="btn-primary w-full py-6 text-lg" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Request Access"}
              </Button>
            </div>
          </form>
          <footer className="mt-8 text-sm text-center text-gray-600">
            <span>Already have an account?</span>
            <a
              href="/sign-in"
              className="ml-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 no-underline"
            >
              Log In
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
} 