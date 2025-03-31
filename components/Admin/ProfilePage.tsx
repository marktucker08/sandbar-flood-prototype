"use client";
import React from "react";
import { PageHeader } from "@/components/Admin/PageHeader";
import { User, Mail, Phone, Building2, Shield, Bell, Key } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  lastLogin: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

const mockProfileData: ProfileData = {
  name: "Bruce Banner",
  email: "bruce.banner@sandbarflood.com",
  phone: "(555) 123-4567",
  role: "Administrator",
  department: "Claims Management",
  lastLogin: "2024-03-20 14:30",
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
};

const ProfilePage: React.FC = () => {
  const profileData = mockProfileData;

  return (
    <main className="admin-page-main">
      <PageHeader title="Profile Settings" />
      <section className="admin-content-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="admin-card">
              <h3 className="admin-section-header flex items-center gap-2">
                <User className="icon-sm" />
                Profile Information
              </h3>
              <div className="form-group">
                <div>
                  <label className="form-label flex items-center gap-2">
                    <User className="icon-sm" />
                    Full Name
                  </label>
                  <p className="form-value">{profileData.name}</p>
                </div>
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Mail className="icon-sm" />
                    Email
                  </label>
                  <p className="form-value">{profileData.email}</p>
                </div>
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Phone className="icon-sm" />
                    Phone
                  </label>
                  <p className="form-value">{profileData.phone}</p>
                </div>
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Building2 className="icon-sm" />
                    Department
                  </label>
                  <p className="form-value">{profileData.department}</p>
                </div>
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Shield className="icon-sm" />
                    Role
                  </label>
                  <p className="form-value">{profileData.role}</p>
                </div>
                <div>
                  <label className="form-label flex items-center gap-2">
                    <User className="icon-sm" />
                    Last Login
                  </label>
                  <p className="form-value">{profileData.lastLogin}</p>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="admin-card">
              <h3 className="admin-section-header flex items-center gap-2">
                <Bell className="icon-sm" />
                Notification Settings
              </h3>
              <div className="form-group">
                <div className="flex items-center justify-between">
                  <label className="form-label flex items-center gap-2">
                    <Mail className="icon-sm" />
                    Email Notifications
                  </label>
                  <input
                    type="checkbox"
                    checked={profileData.notifications.email}
                    className="form-checkbox"
                  />
                </div>
              
                <div className="flex items-center justify-between">
                  <label className="form-label flex items-center gap-2">
                    <Phone className="icon-sm" />
                    SMS Notifications
                  </label>
                  <input
                    type="checkbox"
                    checked={profileData.notifications.sms}
                    className="form-checkbox"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-6">
            <div className="admin-card">
              <h3 className="admin-section-header flex items-center gap-2">
                <Key className="icon-sm" />
                Security Settings
              </h3>
              <div className="form-group">
                <button className="admin-button w-full">
                  Change Password
                </button>
                {/* <button className="admin-button w-full">
                  Enable Two-Factor Authentication
                </button> */}
                <button className="admin-button w-full text-red-600 hover:text-red-700">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage; 