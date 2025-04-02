import React from "react";
import QuickActionButton from "./QuickActionButton";
import { Home, CreditCard, Hotel, Building2 } from "lucide-react";

export default function QuickActionsSection() {
  return (
    <section className="card rounded-3xl max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
        <QuickActionButton
          icon={Home}
          label="Quote 1-4 Family"
          link="/quote/new"
        />
        <QuickActionButton
          icon={Hotel}
          label="Quote Condo"
          link="/quote/new"
        />
        <QuickActionButton
          icon={Building2}
          label="Quote Commercial"
          link="/quote/new"
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
