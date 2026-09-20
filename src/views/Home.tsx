"use client";

import type { Page } from "@/lib/nav";
import { motion } from "motion/react";
import { counselors } from "../data/mock";
import Icon, { MoodFace, type IconName } from "../components/Icon";
import { Reveal, Stagger, StaggerItem } from "../components/animation/Reveal";
import ProgressRing from "../components/animation/ProgressRing";
import Counter from "../components/animation/Counter";
import { springs } from "../lib/motion";

const tones = {
  sage: "bg-sage text-cream hover:bg-sageD",
  ember: "bg-ember text-slate hover:brightness-95",
  sun: "bg-sun text-slate hover:brightness-95",
  brown: "bg-slate text-cream hover:bg-[#4b2b18]",
} as const;

const services: { name: string; desc: string; icon: IconName; tone: keyof typeof tones }[] = [
  { name: "Individual Counseling", desc: "One-on-one sessions for personal mental health support", icon: "user", tone: "sage" },
  { name: "Couples Counseling", desc: "Strengthen communication and deepen your connection", icon: "heart", tone: "ember" },
  { name: "Family Counseling", desc: "Navigate family dynamics with professional guidance", icon: "guide", tone: "sun" },
  { name: "Youth Counseling", desc: "Supportive care tailored to children and teenagers", icon: "spark", tone: "brown" },
  { name: "Anxiety Support", desc: "Evidence-based tools to manage anxiety and worry", icon: "exercise", tone: "ember" },
  { name: "Grief Support", desc: "Compassionate space to process loss and find your way forward", icon: "audio", tone: "brown" },
  { name: "Stress Management", desc: "Practical strategies to reduce stress and restore balance", icon: "calendar", tone: "sage" },
  { name: "Career & Academic Stress", desc: "Support through work pressure, burnout, and life transitions", icon: "article", tone: "sun" },
];

const trust = [
  { label: "Qualified Professionals", desc: "All counselors are verified and credentialed" },
  { label: "Private & Secure", desc: "Your sessions and data are fully confidential" },
  { label: "Flexible Appointments", desc: "Book sessions that fit your schedule and lifestyle" },
  { label: "Personalised Support", desc: "Matched to a counselor who understands your needs" },
];

const featuredCounselors = counselors.slice(0, 3);

const resourcePreviews = [
  {
    title: "Understanding Anxiety",
    category: "Anxiety",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&h=320&fit=crop&auto=format",
  },
  {
    title: "Managing Stress at Work",
    category: "Stress",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=500&h=320&fit=crop&auto=format",
  },
  {
    title: "Building Better Sleep",
    category: "Sleep",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&h=320&fit=crop&auto=format",
  },
];

interface HomeProps {
  navigate: (page: Page, params?: { counselorId?: string }) => void;
}

export default function Home({ navigate }: HomeProps) {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-slate/50"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1714976694867-bc0e012fab70?w=1600&h=900&fit=crop&auto=format')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate/80 via-slate/60 to-slate/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-[400] text-cream mb-6">
              Your mental
              <br />
              <em className="not-italic text-sageMid">wellbeing</em>
              <br />
              matters.
            </h1>
            <p className="text-cream/75 text-lg md:text-xl leading-relaxed max-w-lg mb-10">
              Connect with qualified counselors, access helpful resources, and take small steps toward feeling better, on your terms.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("counselors")}
                className="bg-sage hover:bg-sageD text-cream font-[600] px-7 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2"
              >
                Find a Counselor <span aria-hidden="true">→</span>
              </button>
              <button
                onClick={() => navigate("resources")}
                className="bg-cream/15 backdrop-blur-sm hover:bg-cream/25 text-cream border border-cream/30 font-[500] px-7 py-3.5 rounded-xl transition-all"
              >
                Explore Resources
              </button>
            </div>

            <div className="mt-12 flex flex-wrap gap-6">
              {["Qualified Professionals", "Private & Secure", "Video, Audio & In-Person"].map((t) => (
                <span key={t} className="flex items-center gap-2 text-cream/70 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-sageMid"></span>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-sand border-y border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x-0 lg:divide-x divide-border">
            {trust.map(({ label, desc }) => (
              <div key={label} className="lg:pl-8 first:pl-0">
                <p className="font-[600] text-slate text-sm mb-1">{label}</p>
                <p className="text-slateM text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-[400] text-slate mb-3" style={{ textWrap: "balance" }}>
            Counseling for every <em>need</em>
          </h2>
          <p className="text-slateM text-lg max-w-lg">
            Whatever you are navigating, there is a counselor here who understands.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(({ name, desc, icon, tone }) => (
            <StaggerItem key={name} className="h-full">
              <motion.button
                onClick={() => navigate("counselors")}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={springs.responsive}
                className={`group flex h-full w-full flex-col rounded-3xl p-6 text-left transition-colors ${tones[tone]}`}
              >
                <span className="mb-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/25">
                  <Icon name={icon} className="h-5 w-5" />
                </span>
                <h3 className="mb-2 text-lg font-[700] leading-tight">{name}</h3>
                <p className="text-sm leading-relaxed opacity-85">{desc}</p>
                <span className="mt-5 flex items-center gap-1.5 text-sm font-[600]">
                  Find support <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </motion.button>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Featured Counselors */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-[400] text-slate">
                Meet our <em>counselors</em>
              </h2>
              <p className="text-slateM mt-2 text-lg">Qualified, verified, and ready to help.</p>
            </div>
            <button
              onClick={() => navigate("counselors")}
              className="hidden md:flex items-center gap-2 text-sage font-[500] text-sm hover:gap-3 transition-all"
            >
              View all counselors
              <span>→</span>
            </button>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCounselors.map((c) => (
              <StaggerItem key={c.id} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={springs.responsive}
                className="h-full bg-cream border border-border hover:border-sageMid rounded-3xl overflow-hidden group"
              >
                <div className="h-56 overflow-hidden bg-sand">
                  <img
                    src={c.photo}
                    alt={c.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-[400] text-slate mb-1">{c.name}</h3>
                  <p className="text-slateL text-sm mb-3">{c.credentials}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.specializations.map((s) => (
                      <span key={s} className="bg-sageL text-sage text-xs font-[500] px-2.5 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map((i) => (
                      <span key={i} className={`text-sm ${i <= Math.round(c.rating) ? "text-amber-500" : "text-sandDark"}`}>★</span>
                    ))}
                    <span className="text-slateL text-xs ml-1">{c.rating}</span>
                  </div>

                  <p className="text-slateL text-xs mb-4">
                    <span className="text-success font-[500]" aria-hidden="true">●</span> Next available: {c.nextAvailable}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("counselor-profile", { counselorId: c.id })}
                      className="flex-1 text-sm font-[500] text-sage border border-sageMid py-2.5 rounded-lg hover:bg-sageL transition-all"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => navigate("booking", { counselorId: c.id })}
                      className="flex-1 text-sm font-[600] text-cream bg-sage hover:bg-sageD py-2.5 rounded-lg transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </motion.div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-8 text-center md:hidden">
            <button onClick={() => navigate("counselors")} className="text-sage font-[500] text-sm">
              View all counselors →
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-[400] text-slate mb-3">
            Getting started is <em>easy</em>
          </h2>
          <p className="text-slateM text-lg">Four steps to your first session.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Create an account", desc: "Sign up in minutes. No lengthy forms or medical history required to get started." },
            { step: "02", title: "Tell us what you need", desc: "Share your preferences so we can suggest counselors who are a good fit for you." },
            { step: "03", title: "Choose your counselor", desc: "Browse profiles, read about their approach, and book at a time that works for you." },
            { step: "04", title: "Begin your journey", desc: "Attend your session via video, audio, or in person, and keep moving forward." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="relative">
              <p className="font-display text-6xl font-[300] text-sandDark mb-4">{step}</p>
              <h3 className="font-[600] text-slate mb-2">{title}</h3>
              <p className="text-slateM text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("register")}
            className="bg-sage hover:bg-sageD text-cream font-[600] px-8 py-3.5 rounded-xl transition-colors"
          >
            Get Started, It is Free
          </button>
        </div>
      </section>

      {/* Track how you feel: kit-style colour-blocked metric cards */}
      <section className="py-20 max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="mb-12 max-w-xl">
          <h2 className="font-display text-4xl md:text-5xl font-[400] text-slate mb-3">
            See your progress, <em>gently</em>
          </h2>
          <p className="text-slateM text-lg">Small check-ins add up. Your dashboard turns them into a picture you can actually use.</p>
        </Reveal>
        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col justify-between rounded-3xl bg-sage p-6 text-cream">
              <p className="text-sm font-[600] opacity-90">Wellbeing score</p>
              <div className="my-6 flex items-center gap-5">
                <ProgressRing value={80} size={104}>
                  <span className="font-display text-3xl font-[700]"><Counter value={80} /></span>
                </ProgressRing>
                <p className="text-sm leading-relaxed opacity-90">Up 8 points on last month.</p>
              </div>
              <p className="text-xs opacity-80">Based on weekly check-ins</p>
            </div>
          </StaggerItem>
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col justify-between rounded-3xl bg-ember p-6 text-slate">
              <p className="text-sm font-[600]">This week's mood</p>
              <div className="my-6 flex h-24 items-end gap-2" role="img" aria-label="Mood rising across the week">
                {[35, 55, 40, 70, 90, 75, 60].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-lg bg-slate/80"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
              <p className="text-xs font-[500]">Mon to Sun</p>
            </div>
          </StaggerItem>
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col justify-between rounded-3xl bg-sun p-6 text-slate">
              <p className="text-sm font-[600]">How are you feeling?</p>
              <div className="my-6 flex justify-between text-slate">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span key={i} whileHover={{ y: -4, scale: 1.1 }} transition={springs.snappy} className="inline-flex">
                    <MoodFace level={i} className="h-9 w-9" />
                  </motion.span>
                ))}
              </div>
              <p className="text-xs font-[500]">Log a mood in under ten seconds</p>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Resources */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-[400] text-slate">
                Resources to <em>support you</em>
              </h2>
              <p className="text-slateM mt-2 text-lg">Articles, guides, and exercises at your own pace.</p>
            </div>
            <button
              onClick={() => navigate("resources")}
              className="hidden md:flex items-center gap-2 text-sage font-[500] text-sm hover:gap-3 transition-all"
            >
              View all resources →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resourcePreviews.map(({ title, category, readTime, image }) => (
              <button
                key={title}
                onClick={() => navigate("resources")}
                className="group text-left bg-cream border border-border hover:border-sageMid rounded-2xl overflow-hidden transition-all"
              >
                <div className="h-44 overflow-hidden bg-sand">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-[600] text-terra bg-terraL px-2.5 py-1 rounded-full">
                    {category}
                  </span>
                  <h3 className="font-[600] text-slate mt-3 mb-2 group-hover:text-sage transition-colors">
                    {title}
                  </h3>
                  <p className="text-slateL text-xs">{readTime}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-3xl md:text-4xl font-[300] text-slate leading-relaxed mb-8">
            <em>&ldquo;I was nervous about reaching out. But from the first session, I felt genuinely heard. It made all the difference.&rdquo;</em>
          </p>
          <p className="text-slateL text-sm font-[500]">SereneMind client, 2025</p>
        </div>
      </section>

      {/* Safety Section */}
      <section className="bg-slate py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-[400] text-cream mb-4">
            Need immediate help?
          </h2>
          <p className="text-cream/70 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            If you are in immediate danger or believe you may harm yourself or someone else, please seek emergency assistance or contact your local emergency service.
          </p>
          <button
            onClick={() => navigate("crisis")}
            className="bg-crisis hover:bg-crisisD text-cream font-[600] px-8 py-3.5 rounded-xl transition-colors"
          >
            Get Immediate Help
          </button>
          <p className="text-cream/60 text-xs mt-6">
            This platform is not an emergency service. Always contact local emergency services in an emergency.
          </p>
        </div>
      </section>
    </div>
  );
}
