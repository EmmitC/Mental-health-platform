"use client";

import type { Page } from "@/lib/nav";

interface AboutProps {
  navigate: (page: Page) => void;
}

const team = [
  {
    name: "Dr. Grace Nakamya",
    role: "Clinical Director",
    bio: "PhD in Clinical Psychology from Makerere University. 14 years in clinical practice and supervision.",
    photo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop&crop=face&auto=format",
  },
  {
    name: "Mr. Samuel Ochieng",
    role: "Head of Counseling Services",
    bio: "MSc in Counselling Psychology. Specialises in grief, life transitions, and community mental health.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format",
  },
  {
    name: "Dr. Amina Hassan",
    role: "Family & Youth Specialist",
    bio: "PhD in Family Therapy. Over a decade working with families and young people across East Africa.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face&auto=format",
  },
];

const values = [
  {
    title: "Privacy",
    desc: "Every conversation, note, and personal detail you share is protected. We apply strict confidentiality standards and give you control over your data.",
  },
  {
    title: "Clinical quality",
    desc: "Every counselor on our platform is independently verified. We check credentials, supervise practice standards, and remove anyone who does not meet them.",
  },
  {
    title: "Accessibility",
    desc: "We offer video, audio, and in-person sessions to remove barriers. Pricing tiers and flexible scheduling mean that getting support should not depend on your circumstances.",
  },
  {
    title: "Safety",
    desc: "We are not an emergency service. We are honest about that. Every page surfaces crisis contact information so no one has to search for it in a difficult moment.",
  },
];

export default function About({ navigate }: AboutProps) {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate py-24 lg:py-32">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1600&h=900&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate/60 to-slate" />
        <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-[400] text-cream mb-6 leading-tight" style={{ textWrap: "balance" }}>
            Mental health support,<br /><em>done honestly.</em>
          </h1>
          <p className="text-cream/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ textWrap: "pretty" }}>
            SereneMind connects people across East Africa with qualified, verified counselors. We built this platform because good mental health care should be findable, affordable, and private.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-[400] text-slate mb-5" style={{ textWrap: "balance" }}>
              Why we built this
            </h2>
            <p className="text-slateM text-base leading-relaxed mb-4" style={{ textWrap: "pretty" }}>
              In many parts of East Africa, seeing a counselor carries stigma, long waiting lists, or a price that makes it unreachable. Meanwhile, people are navigating anxiety, grief, burnout, and relationship challenges with little formal support.
            </p>
            <p className="text-slateM text-base leading-relaxed mb-4">
              We started SereneMind in 2023 to close that gap. Not with a chatbot or an app that pretends to do therapy, but with real counselors who are qualified, background-checked, and available via video, audio, or in person.
            </p>
            <p className="text-slateM text-base leading-relaxed">
              We remain small deliberately. We would rather have 50 counselors we fully trust than 500 we cannot vouch for.
            </p>
          </div>
          <div className="rounded-[12px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=500&fit=crop&auto=format"
              alt="Two people in a counseling session"
              className="w-full h-80 object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-[400] text-slate mb-12" style={{ textWrap: "balance" }}>
            What we stand for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border rounded-[12px] overflow-hidden border border-border">
            {values.map(({ title, desc }) => (
              <div key={title} className="bg-sand p-8">
                <h3 className="font-[600] text-slate mb-3 text-lg">{title}</h3>
                <p className="text-slateM text-sm leading-relaxed" style={{ textWrap: "pretty" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-[400] text-slate mb-3">The clinical team</h2>
          <p className="text-slateM text-base max-w-xl">
            Every counselor is individually interviewed, credential-verified, and reviewed on an ongoing basis.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((p) => (
            <div key={p.name}>
              <div className="rounded-[12px] overflow-hidden mb-5 bg-sand">
                <img src={p.photo} alt={p.name} className="w-full h-56 object-cover object-center" />
              </div>
              <p className="font-[600] text-slate">{p.name}</p>
              <p className="text-sage text-sm font-[500] mb-2">{p.role}</p>
              <p className="text-slateM text-sm leading-relaxed">{p.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats row */}
      <section className="bg-sand border-y border-border">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { figure: "50+", label: "Verified counselors" },
              { figure: "3,200+", label: "Sessions completed" },
              { figure: "5", label: "Languages supported" },
              { figure: "2023", label: "Founded in Kampala" },
            ].map(({ figure, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-4xl font-[300] text-slate mb-1">{figure}</p>
                <p className="text-slateM text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-[400] text-slate mb-4">
          Ready to take the first step?
        </h2>
        <p className="text-slateM text-lg max-w-md mx-auto mb-8 leading-relaxed">
          Browse our counselors, read their backgrounds, and book a session that fits your life.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate("counselors")}
            className="bg-sage hover:bg-sageD text-cream font-[600] px-7 py-3.5 rounded-xl transition-colors"
          >
            Find a Counselor
          </button>
          <button
            onClick={() => navigate("faq" as Page)}
            className="border border-border hover:border-sageMid text-slateM font-[500] px-7 py-3.5 rounded-xl transition-all"
          >
            Read our FAQs
          </button>
        </div>
      </section>
    </div>
  );
}
