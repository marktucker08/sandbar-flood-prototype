'use client';

import React, { useEffect, useState } from "react";
import QuickActionsSection from "@/components/features/quotes/QuickActionsSection";
import DashboardSection from "@/components/common/layout/DashboardSection";
import SearchBar from "@/components/common/ui/SearchBar";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Quote } from "@/types/admin";

export default function HomePage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [pendingQuotes, setPendingQuotes] = useState<Quote[]>([]);
  const [approvedQuotes, setApprovedQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const checkUserAndFetchQuotes = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          // Fetch pending approval quotes with joins
          const { data: pendingData, error: pendingError } = await supabase
            .from('quotes')
            .select(`
              id,
              status,
              premium,
              created_at,
              expiration_date,
              property:property_id (
                address
              ),
              property_id,
              user_id
            `)
            .eq('status', 'PENDING')
            .order('created_at', { ascending: false })
            .limit(5);

          type SupabaseQuote = {
            id: string;
            status: string;
            premium: number | string;
            created_at: string;
            expiration_date: string;
            property: { address?: string } | null | { address?: string }[];
            property_id: string;
            user_id: string;
          };
          if (pendingError) {
            console.error('Error fetching quotes:', pendingError);
            setPendingQuotes([]);
          } else {
            const quotesWithClient = await Promise.all(
              (pendingData || []).map(async (q: SupabaseQuote) => {
                let clientName = '';
                let businessName = '';
                let propertyObj: { address?: string } | null = null;
                if (Array.isArray(q.property)) {
                  propertyObj = q.property[0] || null;
                } else {
                  propertyObj = q.property;
                }
                const propertyStr = propertyObj?.address || '';
                if (q.property_id) {
                  // Fetch property to get client_id
                  const { data: propertyData } = await supabase
                    .from('properties')
                    .select('client_id')
                    .eq('id', q.property_id)
                    .single();
                  if (propertyData?.client_id) {
                    // Fetch client
                    const { data: clientData } = await supabase
                      .from('insured_clients')
                      .select('first_name, last_name, business_name')
                      .eq('id', propertyData.client_id)
                      .single();
                    if (clientData) {
                      clientName = `${clientData.first_name || ''} ${clientData.last_name || ''}`.trim();
                      businessName = clientData.business_name || '';
                    }
                  }
                }
                const displayName = clientName && clientName !== ' ' ? clientName : (businessName || 'Unknown');
                return {
                  id: q.id,
                  clientName: displayName,
                  property: propertyStr,
                  status: 'pending',
                  premium: q.premium ? `$${Number(q.premium).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '',
                  createdDate: q.created_at ? new Date(q.created_at).toLocaleDateString() : '',
                  expiryDate: q.expiration_date ? new Date(q.expiration_date).toLocaleDateString() : '',
                } as Quote;
              })
            );
            setPendingQuotes(quotesWithClient);
          }

          // Fetch approved quotes with joins
          const { data: approvedData, error: approvedError } = await supabase
            .from('quotes')
            .select(`
              id,
              status,
              premium,
              created_at,
              expiration_date,
              property:property_id (
                address
              ),
              property_id,
              user_id
            `)
            .eq('status', 'APPROVED')
            .order('created_at', { ascending: false })
            .limit(5);

          if (approvedError) {
            console.error('Error fetching approved quotes:', approvedError);
            setApprovedQuotes([]);
          } else {
            const approvedQuotesWithClient = await Promise.all(
              (approvedData || []).map(async (q: SupabaseQuote) => {
                let clientName = '';
                let businessName = '';
                let propertyObj: { address?: string } | null = null;
                if (Array.isArray(q.property)) {
                  propertyObj = q.property[0] || null;
                } else {
                  propertyObj = q.property;
                }
                const propertyStr = propertyObj?.address || '';
                if (q.property_id) {
                  const { data: propertyData } = await supabase
                    .from('properties')
                    .select('client_id')
                    .eq('id', q.property_id)
                    .single();
                  if (propertyData?.client_id) {
                    const { data: clientData } = await supabase
                      .from('insured_clients')
                      .select('first_name, last_name, business_name')
                      .eq('id', propertyData.client_id)
                      .single();
                    if (clientData) {
                      clientName = `${clientData.first_name || ''} ${clientData.last_name || ''}`.trim();
                      businessName = clientData.business_name || '';
                    }
                  }
                }
                const displayName = clientName && clientName !== ' ' ? clientName : (businessName || 'Unknown');
                return {
                  id: q.id,
                  clientName: displayName,
                  property: propertyStr,
                  status: 'approved',
                  premium: q.premium ? `$${Number(q.premium).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '',
                  createdDate: q.created_at ? new Date(q.created_at).toLocaleDateString() : '',
                  expiryDate: q.expiration_date ? new Date(q.expiration_date).toLocaleDateString() : '',
                } as Quote;
              })
            );
            setApprovedQuotes(approvedQuotesWithClient);
          }
          setLoading(false);
        } else {
          router.push("/sign-in");
        }
      } catch (error) {
        console.error('Session check failed:', error);
        router.push("/sign-in");
      }
    };

    checkUserAndFetchQuotes();
  }, [router, supabase]);

  const handleSearch = (searchTerm: string) => {
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="background-gradient min-h-screen">
      <section className="container mx-auto px-6 py-8 max-w-[1920px]">
        <p className="sub-heading text-white drop-shadow-sm">
          Welcome to your one stop solution for all things flood insurance.
        </p>

        <SearchBar 
          placeholder="Search quotes, policies, or clients..." 
          onSearch={handleSearch}
          className="mx-auto mb-8"
        />

        <QuickActionsSection />
        <div className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <DashboardSection
                title="Quotes Pending Approval"
                quotes={pendingQuotes}
                className="h-full"
              />
            </div>
            <div className="w-full flex flex-col gap-8">
              <DashboardSection
                title="Approved Quotes"
                quotes={approvedQuotes}
                className="h-full"
              />
              <DashboardSection
                title="Recent Unquoted Indications"
                className="h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}