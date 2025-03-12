import React from "react";
import QuickActionButton from "./QuickActionButton";

export default function QuickActionsSection() {
  return (
    <section className="bg-white rounded-3xl p-6 max-w-4xl mx-auto">
      {/* <header className="px-16 py-5 text-2xl text-center font-bold text-black bg-amber-200 rounded-3xl max-md:px-5 max-md:max-w-full">
        Quick Actions
      </header> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
        <QuickActionButton
          icon="https://cdn.builder.io/api/v1/image/assets/1a7e4d913c964d57b4689666b97994d5/48b163ba148175f77aa2f5e74200134a1fcbe151f0ad892f3d985f0db4f28aee?placeholderIfAbsent=true"
          label="Quote 1-4 Family"
          link="/quote/new"
        />
        <QuickActionButton
          icon="https://cdn.builder.io/api/v1/image/assets/1a7e4d913c964d57b4689666b97994d5/9caa3de422c0cc2b82bc481c4866723b83be0f038de4a37c5e1d5517a048fb8c?placeholderIfAbsent=true"
          label="Quote Condo"
          link="/quote/new"
        />
        <QuickActionButton
          icon="https://cdn.builder.io/api/v1/image/assets/1a7e4d913c964d57b4689666b97994d5/7176a7453fea825473efb358622625ecc97d72dcd4120089faead904d216b7a8?placeholderIfAbsent=true"
          label="Quote Commercial"
          link="/quote/new"
        />
        <QuickActionButton
          icon="https://cdn.builder.io/api/v1/image/assets/1a7e4d913c964d57b4689666b97994d5/602b8b6578b35e4a0b3d735b5d8fb938290924b98d9981abfa5bc061b8875075?placeholderIfAbsent=true"
          label="Make Payment"
          link=""
        />
      </div>
    </section>
  );
}
