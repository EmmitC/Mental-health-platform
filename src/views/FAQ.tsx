"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Page } from "@/lib/nav";

interface FAQProps {
  navigate: (page: Page) => void;
}

const faqs = [
  {
    category: "Getting started",
    items: [
      {
        q: "Do I need a referral to use SereneMind?",
        a: "No. You can sign up, browse counselors, and book a session directly through the platform. No doctor's referral is needed.",
      },
      {
        q: "How do I know which counselor is right for me?",
        a: "During onboarding, we ask about what you would like help with, your session preferences, and any language or scheduling requirements. We then suggest counselors who match those preferences. You can also browse all profiles and choose someone yourself.",
      },
      {
        q: "Is there a minimum commitment?",
        a: "No. You can book a single session to see how it goes. There are no packages you must buy in advance, and no subscription you need to cancel.",
      },
    ],
  },
  {
    category: "Sessions and booking",
    items: [
      {
        q: "What types of sessions are available?",
        a: "You can meet your counselor via video call, audio call, or in person at their listed location. Not every counselor offers every format, so check their profile for what they offer.",
      },
      {
        q: "How long are sessions?",
        a: "Most individual sessions are 50 or 60 minutes. Initial consultations may be shorter. Session length is displayed on the booking screen before you confirm.",
      },
      {
        q: "Can I reschedule or cancel?",
        a: "Yes. You can reschedule or cancel from your Appointments page. Each counselor sets their own cancellation window (typically 24 to 48 hours). Cancellations outside that window are generally free; inside the window, a partial fee may apply. The policy is shown before you confirm your booking.",
      },
      {
        q: "What happens if my counselor cancels?",
        a: "You will be notified as soon as possible and offered a rebooking or a full refund, depending on your preference.",
      },
    ],
  },
  {
    category: "Pricing and payment",
    items: [
      {
        q: "How much does a session cost?",
        a: "Session prices are set by each counselor. Prices are displayed on counselor profiles and on the booking screen. There are no hidden fees.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept card payments and mobile money. Bank transfer is available for some plans. You can view and manage your payment methods from your profile.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. We do not store your card details on our servers. Payments are processed by a certified payment provider.",
      },
    ],
  },
  {
    category: "Privacy and confidentiality",
    items: [
      {
        q: "Is what I say to my counselor confidential?",
        a: "Yes. Counselors are bound by professional confidentiality obligations. The contents of your sessions are not shared with anyone outside your care unless you consent, or unless there is a specific legal or safety obligation (for example, if someone is in immediate danger). Your counselor will explain the limits of confidentiality at the start of your first session.",
      },
      {
        q: "Who can see my personal information?",
        a: "Your profile information is accessible to you and to the SereneMind team where necessary for platform operation. It is not shared with third parties for marketing. You can review your privacy settings and data consents from your Profile page.",
      },
      {
        q: "Is my journal private?",
        a: "Yes. Your journal entries are private to you by default. They are not shared with your counselor unless you explicitly choose to share something.",
      },
    ],
  },
  {
    category: "Safety and crisis support",
    items: [
      {
        q: "Is SereneMind an emergency service?",
        a: "No. SereneMind is not an emergency service. If you are in immediate danger, please call 999 or 112, or go to your nearest emergency facility. Our Crisis page has local crisis contacts that may also help.",
      },
      {
        q: "What if I am struggling and cannot wait for an appointment?",
        a: "Visit our Crisis page for immediate contact options. If you are in immediate physical danger, call emergency services now. We also display emergency contact information throughout the platform so it is never hard to find.",
      },
    ],
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className={`font-[500] text-sm leading-relaxed transition-colors ${open ? "text-sage" : "text-slate group-hover:text-sage"}`}>
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all text-xs ${
            open ? "border-sage bg-sageL text-sage rotate-45" : "border-border text-slateL"
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-5">
              <p className="text-slateM text-sm leading-relaxed max-w-2xl" style={{ textWrap: "pretty" }}>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({ navigate }: FAQProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...faqs.map((f) => f.category)];

  const filtered = activeCategory === "All" ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="bg-sand border-b border-border py-16">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-[400] text-slate mb-4" style={{ textWrap: "balance" }}>
            Frequently asked questions
          </h1>
          <p className="text-slateM text-lg leading-relaxed">
            Answers to common questions about sessions, pricing, privacy, and safety.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-[500] transition-all ${
                activeCategory === cat
                  ? "bg-sage text-cream"
                  : "bg-sand border border-border text-slateM hover:border-sageMid"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ sections */}
        <div className="space-y-10">
          {filtered.map((section) => (
            <div key={section.category}>
              <h2 className="font-[600] text-slate text-xs tracking-wide uppercase mb-4 text-slateL">
                {section.category}
              </h2>
              <div className="bg-cream border border-border rounded-2xl px-6 divide-y divide-border">
                {section.items.map(({ q, a }) => (
                  <AccordionItem key={q} question={q} answer={a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="mt-14 bg-sand border border-border rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl font-[400] text-slate mb-2">Still have questions?</h3>
          <p className="text-slateM text-sm mb-6 leading-relaxed">
            Our team usually responds within one business day.
          </p>
          <button
            onClick={() => navigate("contact" as Page)}
            className="bg-sage hover:bg-sageD text-cream font-[600] px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
}
