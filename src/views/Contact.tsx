"use client";

import { useState } from "react";
import Icon from "../components/Icon";
import type { Page } from "@/lib/nav";

interface ContactProps {
  navigate: (page: Page) => void;
}

const topics = [
  "General enquiry",
  "Technical support",
  "Counselor verification",
  "Billing or payment",
  "Privacy or data request",
  "Media or partnership",
  "Other",
];

export default function Contact({ navigate }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center py-20">
          <div className="w-14 h-14 bg-successL text-success rounded-full flex items-center justify-center mx-auto mb-6"><Icon name="check" className="h-7 w-7" /></div>
          <h2 className="font-display text-3xl font-[400] text-slate mb-3">Message sent</h2>
          <p className="text-slateM leading-relaxed mb-8">
            We received your message and will get back to you at <strong>{form.email}</strong> within one business day.
          </p>
          <button
            onClick={() => navigate("home")}
            className="text-sage font-[500] text-sm hover:underline"
          >
            Return to homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="light-scope bg-plum py-16">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-[400] text-slate mb-4" style={{ textWrap: "balance" }}>
            Contact us
          </h1>
          <p className="text-slate text-lg leading-relaxed max-w-xl">
            We respond to most messages within one business day. For urgent matters, see our crisis contacts below.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-[500] text-slateM mb-1.5">Name</label>
                  <input
                    id="c-name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    type="text"
                    placeholder="Your name"
                    className="w-full border border-border hover:border-borderDark focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-sm font-[500] text-slateM mb-1.5">Email</label>
                  <input
                    id="c-email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-border hover:border-borderDark focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="c-topic" className="block text-sm font-[500] text-slateM mb-1.5">Topic</label>
                <select
                  id="c-topic"
                  required
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full border border-border hover:border-borderDark focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none transition-colors"
                >
                  <option value="">Select a topic</option>
                  {topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="c-message" className="block text-sm font-[500] text-slateM mb-1.5">Message</label>
                <textarea
                  id="c-message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  placeholder="How can we help?"
                  className="w-full border border-border hover:border-borderDark focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="bg-sage hover:bg-sageD text-cream font-[600] px-7 py-3.5 rounded-xl text-sm transition-colors"
              >
                Send message
              </button>
            </form>
          </div>

          {/* Info panel */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-sand border border-border rounded-[12px] p-6">
              <h3 className="font-[600] text-slate mb-1">Response time</h3>
              <p className="text-slateM text-sm leading-relaxed">
                We aim to respond within one business day, Monday to Friday, 9:00 AM to 5:00 PM EAT.
              </p>
            </div>

            <div className="bg-sand border border-border rounded-[12px] p-6">
              <h3 className="font-[600] text-slate mb-3">Other ways to reach us</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-[600] text-slateL uppercase tracking-wide mb-0.5">Email</p>
                  <a href="mailto:hello@serenemind.co" className="text-sage text-sm font-[500] hover:underline">
                    hello@serenemind.co
                  </a>
                </div>
                <div>
                  <p className="text-xs font-[600] text-slateL uppercase tracking-wide mb-0.5">Location</p>
                  <p className="text-slateM text-sm">Kampala, Uganda</p>
                </div>
              </div>
            </div>

            <div className="bg-crisisL border border-crisis/20 rounded-[12px] p-6">
              <h3 className="font-[600] text-crisis mb-2">Need immediate help?</h3>
              <p className="text-slateM text-sm leading-relaxed mb-4">
                We are not an emergency service. If you are in crisis, please contact emergency services or visit our crisis page.
              </p>
              <button
                onClick={() => navigate("crisis")}
                className="text-crisis text-sm font-[600] hover:underline"
              >
                View crisis contacts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
