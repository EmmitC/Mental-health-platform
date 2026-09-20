"use client";

import type { Page } from "@/lib/nav";

interface PricingProps {
  navigate: (page: Page) => void;
}

const services = [
  {
    name: "Initial Consultation",
    duration: "30 minutes",
    priceFrom: "UGX 60,000",
    desc: "A first conversation to help you and your counselor understand whether you are a good fit.",
    highlight: false,
  },
  {
    name: "Individual Counseling",
    duration: "50 minutes",
    priceFrom: "UGX 95,000",
    desc: "A private session focused on your personal mental health, growth, or specific challenges.",
    highlight: true,
  },
  {
    name: "Couples Counseling",
    duration: "60 minutes",
    priceFrom: "UGX 120,000",
    desc: "A shared session to work through communication, conflict, or relationship concerns together.",
    highlight: false,
  },
  {
    name: "Family Counseling",
    duration: "60 minutes",
    priceFrom: "UGX 130,000",
    desc: "Guided sessions that help families navigate dynamics, conflict, and change constructively.",
    highlight: false,
  },
  {
    name: "Youth Counseling",
    duration: "45 minutes",
    priceFrom: "UGX 80,000",
    desc: "Age-appropriate support for children and teenagers, with optional parental involvement.",
    highlight: false,
  },
  {
    name: "Follow-up Session",
    duration: "50 minutes",
    priceFrom: "UGX 90,000",
    desc: "A continuation of your established care with your existing counselor.",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Are prices per session?",
    a: "Yes. All prices shown are per session. There are no subscriptions or packages required.",
  },
  {
    q: "Do prices vary by counselor?",
    a: "Yes. Each counselor sets their own rate. The prices here are starting prices; you will see the exact fee for your chosen counselor before you confirm a booking.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Each counselor sets their own cancellation window, typically 24 to 48 hours. Cancellations inside that window may incur a partial fee. The policy is shown before you confirm any booking.",
  },
  {
    q: "Do you offer reduced rates?",
    a: "Some counselors on our platform offer sliding-scale pricing. Filter by price in the counselor directory, or contact us to discuss what is available.",
  },
];

export default function Pricing({ navigate }: PricingProps) {
  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="bg-sand border-b border-border py-16">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-[400] text-slate mb-4" style={{ textWrap: "balance" }}>
            Session pricing
          </h1>
          <p className="text-slateM text-lg leading-relaxed max-w-xl mx-auto">
            Prices are set by individual counselors. The figures below are starting rates; you will see the exact price before you book.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.name}
              className={`rounded-2xl border p-6 flex flex-col ${
                s.highlight
                  ? "bg-sageL border-sageMid"
                  : "bg-cream border-border hover:border-sageMid transition-colors"
              }`}
            >
              {s.highlight && (
                <span className="text-xs font-[600] text-sage bg-sage/10 px-3 py-1 rounded-full self-start mb-4">
                  Most booked
                </span>
              )}
              <h3 className="font-[600] text-slate text-base mb-1">{s.name}</h3>
              <p className="text-slateL text-xs mb-4">{s.duration}</p>
              <p className="text-slateM text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-slateL mb-0.5">From</p>
                  <p className="font-display text-2xl font-[400] text-slate">{s.priceFrom}</p>
                </div>
                <button
                  onClick={() => navigate("counselors")}
                  className={`text-sm font-[600] px-4 py-2.5 rounded-lg transition-colors ${
                    s.highlight
                      ? "bg-sage hover:bg-sageD text-cream"
                      : "border border-sageMid text-sage hover:bg-sageL"
                  }`}
                >
                  Find counselor
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment methods */}
      <section className="bg-sand border-y border-border py-14">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <h2 className="font-display text-2xl font-[400] text-slate mb-8">Payment options</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Card payment", detail: "Visa, Mastercard" },
              { name: "Mobile money", detail: "MTN, Airtel Money" },
              { name: "Bank transfer", detail: "Select counselors" },
              { name: "Platform credit", detail: "Topped up in-app" },
            ].map(({ name, detail }) => (
              <div key={name} className="bg-cream border border-border rounded-xl p-4">
                <p className="font-[600] text-slate text-sm mb-1">{name}</p>
                <p className="text-slateL text-xs">{detail}</p>
              </div>
            ))}
          </div>
          <p className="text-slateM text-sm mt-6 leading-relaxed max-w-2xl">
            Card details are processed by a certified payment provider. We do not store card information on our servers.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-5 lg:px-8 py-16">
        <h2 className="font-display text-2xl font-[400] text-slate mb-8">Pricing questions</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="border border-border rounded-xl p-5">
              <p className="font-[600] text-slate text-sm mb-2">{q}</p>
              <p className="text-slateM text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("counselors")}
            className="bg-sage hover:bg-sageD text-cream font-[600] px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Browse counselors
          </button>
          <button
            onClick={() => navigate("faq" as Page)}
            className="border border-border hover:border-sageMid text-slateM font-[500] px-6 py-3 rounded-xl text-sm transition-all"
          >
            Read all FAQs
          </button>
        </div>
      </section>
    </div>
  );
}
