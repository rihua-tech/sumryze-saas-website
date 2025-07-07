"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How fast will I get a reply?",
    answer:
      "We usually respond within 1 business day, often faster. You can also use our AI Assistant for immediate answers, 24/7.",
  },
  {
    question: "Can I get help without filling out the form?",
    answer:
      "Yes! Just click the 'Chat With Our AI' button above to ask anything — it’s fast, private, and available any time.",
  },
  {
    question: "Do you offer demos or walkthroughs?",
    answer:
      "Definitely. You can request a 1:1 walkthrough via the form or explore our interactive demo anytime from the top menu.",
  },
  {
    question: "Can I get support if I’m not a customer yet?",
    answer:
      "Absolutely. Whether you’re comparing plans, exploring features, or just curious — we’re happy to help you make the right decision.",
  },
  {
    question: "What type of issues can your support help with?",
    answer:
      "We handle everything from billing and account setup to SEO report usage and custom use cases. Just tell us what you need help with!",
  },
  {
    question: "Do you offer phone support?",
    answer:
      "Not at this time — but our AI assistant, real-time chat, and fast email support are all designed to give you excellent help without the wait.",
  },
];

export default function AccordionFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-white pt-10 pb-16">
      <div className="max-w-[66rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Got questions? We've got answers.
          </h2>
          <p className="text-lg text-gray-600">
            Explore everything about contacting support, getting help, and using our AI assistant.
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
