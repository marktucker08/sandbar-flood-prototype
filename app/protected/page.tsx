"use client";

import { useRouter } from "next/navigation";
import { useSupabaseSession } from "@/lib/hooks/useSupabaseSession";
import React from "react";

export default function ProtectedPage() {
  const { session, user, loading } = useSupabaseSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !session) {
      router.replace("/sign-in");
    }
  }, [loading, session, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}!</h1>
      <p>Your user ID is: {user?.id}</p>
      <button
        className="mt-8 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
        onClick={async () => {
          await import("@/lib/utils/utils").then(({ supabase }) => supabase.auth.signOut());
          router.push("/sign-in");
        }}
      >
        Log Out
      </button>
    </main>
  );
} 