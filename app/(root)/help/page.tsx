"use client";
import React from "react";
import Link from "next/link";

const HelpPage: React.FC = () => {
  const helpTopics = [
    {
      title: "Getting Started",
      description: "Learn the basics of using our flood insurance platform",
      icon: "ti ti-rocket",
      link: "/help/getting-started",
    },
    {
      title: "Creating Quotes",
      description: "Step-by-step guide to creating and managing quotes",
      icon: "ti ti-file-invoice",
      link: "/help/creating-quotes",
    },
    // {
    //   title: "Managing Policies",
    //   description: "How to manage and update existing policies",
    //   icon: "ti ti-file-check",
    //   link: "/help/managing-policies",
    // },
    // {
    //   title: "Inspections",
    //   description: "Understanding the inspection process and requirements",
    //   icon: "ti ti-clipboard-check",
    //   link: "/help/inspections",
    // },
    {
      title: "Billing & Payments",
      description: "Information about billing, payments, and premium calculations",
      icon: "ti ti-credit-card",
      link: "/help/billing",
    },
    {
      title: "Account Settings",
      description: "Manage your account preferences and profile settings",
      icon: "ti ti-settings",
      link: "/help/account-settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200">
      <section className="container mx-auto px-6 py-8 max-w-[1920px]">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-sm">
            How can we help you?
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-sm">
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
              <i className="ti ti-search text-xl" />
            </button>
          </div>
        </div>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic, index) => (
            <Link
              key={index}
              href={topic.link}
              className="bg-white/90 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <i className={`${topic.icon} text-2xl text-blue-600`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600">{topic.description}</p>
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
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
};

export default HelpPage; 