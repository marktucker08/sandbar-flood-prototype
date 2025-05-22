"use client";

import React, { createContext, useContext } from "react";
import { useSupabaseSession } from "@/lib/hooks/useSupabaseSession";
import type { Session, User } from "@supabase/supabase-js";

interface SupabaseSessionContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

const SupabaseSessionContext = createContext<SupabaseSessionContextValue | undefined>(undefined);

export const SupabaseSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, user, loading } = useSupabaseSession();
  return (
    <SupabaseSessionContext.Provider value={{ session, user, loading }}>
      {children}
    </SupabaseSessionContext.Provider>
  );
};

export function useSupabaseSessionContext() {
  const ctx = useContext(SupabaseSessionContext);
  if (!ctx) throw new Error("useSupabaseSessionContext must be used within a SupabaseSessionProvider");
  return ctx;
} 