"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/utils/utils";
import type { Session, User } from "@supabase/supabase-js";

export function useSupabaseSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    console.debug('[useSupabaseSession] Hook mounted, fetching session...');
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (mounted) {
          console.debug('[useSupabaseSession] getSession resolved:', session);
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('[useSupabaseSession] getSession error:', error);
        if (mounted) setLoading(false);
      });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        console.debug('[useSupabaseSession] Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
      }
    });
    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
      console.debug('[useSupabaseSession] Hook unmounted, unsubscribed from auth state changes.');
    };
  }, []);

  return { session, user, loading };
} 