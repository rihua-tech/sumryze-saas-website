
"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan anytime. Changes take effect immediately and your billing is prorated automatically.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Absolutely. Every plan comes with a 14-day free trial. No credit card is required to get started.",
  },
  {
    question: "What happens if I exceed my report limit?",
    answer:
      "You'll receive a usage notification, and you can either upgrade or purchase additional reports à la carte.",
  },
  {
    question: "Do you offer custom solutions for agencies?",
    answer:
      "Yes. We provide tailored white-label and multi-client solutions for agencies and enterprise teams. Contact us for details.",
  },
  {
    question: "Can I add team members to manage reports?",
    answer:
      "Yes, Pro and Agency plans include team collaboration features with role-based access control.",
  },
  {
    question: "Are SEO and analytics included by default?",
    answer:
      "SEO audit, keyword tracking, and basic analytics are included in all plans. Advanced analytics are available on Pro plans.",
  },
  {
    question: "Can I export reports to PDF or Notion?",
    answer:
      "Yes. Reports can be exported in PDF, CSV, and sent to Notion automatically via integration.",
  },
  {
    question: "How secure is my client data?",
    answer:
      "We follow industry best practices with encrypted storage, access control, and regular audits to protect all user data.",
  },
];

export default function AccordionFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-white pt-10 pb-16">
           
       
          <div className="max-w-[68rem] mx-auto px-4 sm:px-6 lg:px-8">


        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Got questions? We've got answers.
          </h2>
          <p className="text-lg text-gray-600">
             Explore everything about pricing, features, and flexibility.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl transition-all"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="flex justify-between items-center w-full px-6 py-5 text-left text-gray-900 font-medium text-lg hover:bg-gray-50 transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-6 pb-5 text-gray-600 text-base leading-relaxed transition-all duration-300 ease-in-out ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
