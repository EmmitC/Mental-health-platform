"use client";

import { useState } from "react";
import type { Page } from "@/lib/nav";
import { toast } from "../components/Toast";
import Icon, { type IconName } from "../components/Icon";
import SegmentedTabs from "../components/SegmentedTabs";

interface CounselorProfileEditProps {
  navigate: (page: Page) => void;
}

const Field = ({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div>
      <label className="block text-sm font-[500] text-slateM mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-border hover:border-borderDark focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none transition-colors"
      />
    </div>
  );
};

const SPECIALIZATIONS = ["Anxiety", "Stress", "Depression", "Relationships", "Grief", "Trauma", "Family", "Youth", "Couples", "Career", "Life transitions", "Mindfulness"];
const LANGUAGES = ["English", "Luganda", "Swahili", "Arabic", "French", "Acholi", "Runyakitara"];

export default function CounselorProfileEdit({ navigate: _navigate }: CounselorProfileEditProps) {
  const [tab, setTab] = useState<"Profile" | "Credentials" | "Pricing" | "Security">("Profile");
  const [selectedSpecs, setSelectedSpecs] = useState(["Anxiety", "Stress", "Relationships"]);
  const [selectedLangs, setSelectedLangs] = useState(["English", "Luganda"]);
  const [saved, setSaved] = useState(false);

  const toggleSpec = (s: string) =>
    setSelectedSpecs((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleLang = (l: string) =>
    setSelectedLangs((prev) => prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]);

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="px-5 lg:px-8 py-6 border-b border-border">
        <h1 className="font-display text-2xl md:text-3xl font-[400] text-slate">My Profile</h1>
      </div>

      <div className="max-w-2xl mx-auto px-5 lg:px-8 py-8">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          <div className="relative">
            <img
              src="/images/avatars/counselor-grace.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-[12px] object-cover object-top bg-sand"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-sage rounded-full border-2 border-cream flex items-center justify-center text-cream text-xs cursor-pointer">
              <Icon name="edit" className="h-3 w-3" />
            </div>
          </div>
          <div>
            <p className="font-[600] text-slate">Dr. Grace Nakamya</p>
            <p className="text-slateM text-sm">PhD, Clinical Psychology</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span className="text-success text-xs font-[500]">Verified counselor</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <SegmentedTabs label="Profile sections" className="mb-8" options={["Profile", "Credentials", "Pricing", "Security"] as const} value={tab} onChange={(t) => { setTab(t); setSaved(false); }} />

        {tab === "Profile" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" defaultValue="Grace" />
              <Field label="Last Name" defaultValue="Nakamya" />
            </div>
            <Field label="Professional title" defaultValue="PhD, Clinical Psychology" />
            <div>
              <label className="block text-sm font-[500] text-slateM mb-1.5">Bio</label>
              <textarea
                defaultValue="I am a clinical psychologist with 14 years of experience in individual therapy, anxiety management, and trauma-informed care. I work with adults and young people navigating stress, relationships, and life transitions."
                rows={5}
                className="w-full border border-border hover:border-borderDark focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none resize-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-[500] text-slateM mb-2">Specializations</label>
              <div className="flex flex-wrap gap-2">
                {SPECIALIZATIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSpec(s)}
                    className={`px-3 py-1.5 rounded-full text-sm font-[500] border transition-all ${
                      selectedSpecs.includes(s)
                        ? "bg-sage text-cream border-sage"
                        : "border-border text-slateM hover:border-sageMid"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-[500] text-slateM mb-2">Languages</label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l}
                    onClick={() => toggleLang(l)}
                    className={`px-3 py-1.5 rounded-full text-sm font-[500] border transition-all ${
                      selectedLangs.includes(l)
                        ? "bg-sage text-cream border-sage"
                        : "border-border text-slateM hover:border-sageMid"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-[500] text-slateM mb-1.5">Session types offered</label>
              <div className="space-y-2">
                {["Video", "Audio", "In Person"].map((s) => (
                  <label key={s} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-sage w-4 h-4" />
                    <span className="text-sm text-slate">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {saved ? (
              <div className="flex items-center gap-2 text-success text-sm font-[500]">
                <span>✓</span> Profile updated
              </div>
            ) : (
              <button onClick={() => setSaved(true)} className="bg-sage hover:bg-sageD text-cream font-[600] px-6 py-3 rounded-xl text-sm transition-colors">
                Save profile
              </button>
            )}
          </div>
        )}

        {tab === "Credentials" && (
          <div className="space-y-4">
            <div className="bg-sageL border border-sageMid rounded-[12px] p-5 flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-[600] text-slate">Credentials verified</p>
                <p className="text-slateM text-sm">Your credentials were verified on 15 January 2024. Renewal due January 2027.</p>
              </div>
            </div>

            {[
              { label: "Primary degree", value: "PhD in Clinical Psychology — Makerere University, 2010" },
              { label: "Professional license", value: "Uganda Allied Health Professional Council — UAHPC/CP/2010/01234" },
              { label: "Membership", value: "Uganda Counselling Association — Member since 2011" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-cream border border-border rounded-xl p-4">
                <p className="text-xs font-[600] text-slateL uppercase tracking-wide mb-1">{label}</p>
                <p className="text-slate text-sm font-[500]">{value}</p>
              </div>
            ))}

            <button onClick={() => toast("New qualification row added")} className="w-full border border-dashed border-border py-3 rounded-xl text-sm text-slateM hover:border-sageMid hover:text-sage transition-all">
              + Add qualification</button>
          </div>
        )}

        {tab === "Pricing" && (
          <div className="space-y-4">
            <p className="text-slateM text-sm">Set your session rates. These are shown to clients before they book.</p>
            {[
              { service: "Initial Consultation (30 min)", price: "60,000" },
              { service: "Individual Session (50 min)", price: "120,000" },
              { service: "Follow-up Session (50 min)", price: "110,000" },
            ].map(({ service, price }) => (
              <div key={service} className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-slate text-sm font-[500]">{service}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slateM text-sm">UGX</span>
                  <input
                    defaultValue={price}
                    className="w-28 border border-border rounded-lg px-3 py-2 text-sm bg-cream outline-none text-right focus:border-sage transition-colors"
                  />
                </div>
              </div>
            ))}
            <button onClick={() => toast("Pricing saved")} className="bg-sage hover:bg-sageD text-cream font-[600] px-6 py-3 rounded-xl text-sm transition-colors">
              Save pricing</button>
          </div>
        )}

        {tab === "Security" && (
          <div className="space-y-4">
            <div className="bg-cream border border-border rounded-[12px] p-5">
              <h3 className="font-[600] text-slate mb-1">Password</h3>
              <p className="text-slateM text-sm mb-4">Last changed 6 months ago.</p>
              <button onClick={() => toast("Password reset link sent to your email")} className="text-sm font-[600] text-sage border border-sageMid px-4 py-2 rounded-lg hover:bg-sageL transition-all">Change password</button>
            </div>
            <div className="bg-cream border border-border rounded-[12px] p-5">
              <h3 className="font-[600] text-slate mb-1">Two-Factor Authentication</h3>
              <p className="text-slateM text-sm mb-4">Enabled via authenticator app.</p>
              <button onClick={() => toast("Two-factor settings opened")} className="text-sm font-[500] text-slateM border border-border px-4 py-2 rounded-lg hover:bg-sand transition-all">Manage 2FA</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
