"use client";
import React from "react";
import Link from "next/link";
import { FileText, CreditCard, Settings, Search, Compass, FileCheck, LifeBuoy } from "lucide-react";

const HelpPage: React.FC = () => {
  const helpTopics = [
    {
      title: "Getting Started",
      description: "Learn how to use the Sandbar Flood Insurance Platform",
      icon: Compass,
      link: "/help/getting-started",
    },
    {
      title: "Creating Quotes",
      description: "Step-by-step guide to creating flood insurance quotes",
      icon: FileText,
      link: "/help/creating-quotes",
    },
    {
      title: "Managing Policies",
      description: "How to manage and update your flood insurance policies",
      icon: FileCheck,
      link: "/help/managing-policies",
    },
    {
      title: "Support",
      description: "Contact our support team for assistance",
      icon: LifeBuoy,
      link: "/help/support",
    },
    {
      title: "Billing & Payments",
      description: "Information about billing, payments, and premium calculations",
      icon: CreditCard,
      link: "/help/billing",
    },
    {
      title: "Account Settings",
      description: "Manage your account preferences and profile settings",
      icon: Settings,
      link: "/help/account-settings",
    },
  ];

  return (
    <div className="background-gradient min-h-screen">
      <section className="container mx-auto px-6 py-8 max-w-[1920px]">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="heading text-white drop-shadow-sm">
            How can we help you?
          </h1>
          <p className="sub-heading text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            Find answers to common questions and learn how to use our platform effectively
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help topics..."
              className="w-full px-6 py-4 rounded-lg bg-white/90 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Search className="icon-lg" />
            </button>
          </div>
        </div>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic, index) => (
            <Link
              key={index}
              href={topic.link}
              className="card hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <topic.icon className="icon-lg text-blue-600" />
                </div>
                <div>
                  <h3 className="card-header text-gray-900">
                    {topic.title}
                  </h3>
                  <p className="form-value text-gray-600">{topic.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-white mb-4">
            Still need help? Our support team is here for you
          </p>
          <button className="btn-secondary">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
};

export default HelpPage; 