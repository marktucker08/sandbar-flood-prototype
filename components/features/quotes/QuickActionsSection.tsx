import React from "react";
import QuickActionButton from "./QuickActionButton";
import { Home, CreditCard, FileCheck, FileText } from "lucide-react";

export default function QuickActionsSection() {
  return (
    <section className="card rounded-3xl max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
        <QuickActionButton
          icon={Home}
          label="Start New Quote"
          link="/quote/new"
        />
        <QuickActionButton
          icon={FileText}
          label="My Quotes"
          link="/manage/quotes/my"
        />
        <QuickActionButton
          icon={FileCheck}
          label="My Policies"
          link="/manage/policies/my"
        />
        <QuickActionButton
          icon={CreditCard}
          label="Make Payment"
          link=""
        />
      </div>
    </section>
  );
}
