import React from "react";

const ContactInformation: React.FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900">
        Contact Information
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <dt className="mb-1 text-sm text-gray-500">Mobile Phone:</dt>
          <dd className="text-sm text-gray-900">+1 123 456 7890</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Home Phone:</dt>
          <dd className="text-sm text-gray-900">+1 123 456 7890</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Email:</dt>
          <dd className="text-sm text-gray-900">Theresa@email.com</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Address:</dt>
          <dd className="text-sm text-gray-900">
            6470 Koepp Street, South Hillary 72456-8817
          </dd>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
