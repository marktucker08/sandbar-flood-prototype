'use client';

import { useSession } from "next-auth/react";
import { UserCircle, Mail, Building2, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/common/ui/button";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <main className="background-gradient min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-sky-50 flex items-center justify-center mb-4">
              <UserCircle className="w-20 h-20 text-sky-950" />
            </div>
            <h1 className="text-2xl font-bold text-sky-950 mb-2">{session?.user?.name || 'User Profile'}</h1>
            <p className="text-gray-600">{session?.user?.email}</p>
          </div>

          <div className="grid gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-sky-950">Personal Information</h2>
              
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-lg border border-sky-100">
                  <Mail className="w-5 h-5 text-sky-950" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sky-950">{session?.user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-lg border border-sky-100">
                  <Building2 className="w-5 h-5 text-sky-950" />
                  <div>
                    <p className="text-sm text-gray-500">Agency</p>
                    <p className="text-sky-950">Your Agency Name</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-lg border border-sky-100">
                  <Phone className="w-5 h-5 text-sky-950" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-sky-950">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-lg border border-sky-100">
                  <MapPin className="w-5 h-5 text-sky-950" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-sky-950">City, State</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-sky-950">Account Statistics</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50 rounded-lg text-center border border-sky-100">
                  <p className="text-2xl font-semibold text-sky-950">12</p>
                  <p className="text-sm text-gray-500">Active Quotes</p>
                </div>
                <div className="p-4 bg-sky-50 rounded-lg text-center border border-sky-100">
                  <p className="text-2xl font-semibold text-sky-950">5</p>
                  <p className="text-sm text-gray-500">Active Policies</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="action-button">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 