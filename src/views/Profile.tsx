"use client";

import { useState } from "react";
import type { Page } from "@/lib/nav";
import { toast } from "../components/Toast";
import Icon, { type IconName } from "../components/Icon";

interface ProfileProps {
  navigate: (page: Page) => void;
}

export default function Profile({ navigate }: ProfileProps) {
  const [tab, setTab] = useState<"Personal" | "Security" | "Privacy" | "Payments">("Personal");
  const [saved, setSaved] = useState(false);

  const tabs = ["Personal", "Security", "Privacy", "Payments"] as const;

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="max-w-2xl mx-auto px-5 lg:px-8 py-8">
        <h1 className="font-display text-3xl md:text-4xl font-[400] text-slate mb-8">Profile</h1>

        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-sageL text-sage flex items-center justify-center"><Icon name="user" className="h-9 w-9" /></div>
          <div>
            <p className="font-[600] text-slate">Sarah Namukasa</p>
            <p className="text-slateM text-sm">sarah.namukasa@email.com</p>
            <button onClick={() => toast("Photo picker opened")} className="text-sage text-sm font-[500] hover:underline mt-1">Change photo</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-8 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-[500] whitespace-nowrap border-b-2 -mb-px transition-all ${
                tab === t ? "border-sage text-sage" : "border-transparent text-slateM hover:text-slate"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Personal" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" defaultValue="Sarah" />
              <Field label="Last Name" defaultValue="Namukasa" />
            </div>
            <Field label="Email Address" defaultValue="sarah.namukasa@email.com" type="email" />
            <Field label="Phone" defaultValue="+256 700 000 000" type="tel" />
            <div>
              <label className="block text-sm font-[500] text-slateM mb-1.5">Preferred Language</label>
              <select className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-cream focus:border-sage outline-none">
                <option>English</option>
                <option>Luganda</option>
                <option>Swahili</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-[500] text-slateM mb-1.5">Timezone</label>
              <select className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-cream focus:border-sage outline-none">
                <option>Africa/Kampala (EAT, UTC+3)</option>
                <option>Africa/Nairobi (EAT, UTC+3)</option>
              </select>
            </div>
            {saved ? (
              <div className="flex items-center gap-2 text-success text-sm font-[500]">
                <span>✓</span> Changes saved
              </div>
            ) : (
              <button onClick={() => setSaved(true)} className="bg-sage hover:bg-sageD text-cream font-[600] px-6 py-3 rounded-xl text-sm transition-colors">
                Save Changes
              </button>
            )}
          </div>
        )}

        {tab === "Security" && (
          <div className="space-y-4">
            <div className="bg-cream border border-border rounded-2xl p-5">
              <h3 className="font-[600] text-slate mb-1">Password</h3>
              <p className="text-slateM text-sm mb-4">Last changed 3 months ago.</p>
              <button onClick={() => toast("Password reset link sent to your email")} className="text-sm font-[600] text-sage border border-sageMid px-4 py-2 rounded-lg hover:bg-sageL transition-all">Change Password</button>
            </div>
            <div className="bg-cream border border-border rounded-2xl p-5">
              <h3 className="font-[600] text-slate mb-1">Two-Factor Authentication</h3>
              <p className="text-slateM text-sm mb-4">Add an extra layer of security to your account.</p>
              <button onClick={() => toast("Two-factor setup started")} className="text-sm font-[600] text-sage border border-sageMid px-4 py-2 rounded-lg hover:bg-sageL transition-all">Enable 2FA</button>
            </div>
            <div className="bg-cream border border-border rounded-2xl p-5">
              <h3 className="font-[600] text-slate mb-1">Active Sessions</h3>
              <p className="text-slateM text-sm mb-4">1 device signed in.</p>
              <button onClick={() => toast("Loading active sessions")} className="text-sm font-[500] text-slateM border border-border px-4 py-2 rounded-lg hover:bg-sand transition-all">View Sessions</button>
            </div>
            <div className="bg-cream border border-crisis/20 rounded-2xl p-5">
              <h3 className="font-[600] text-crisis mb-1">Delete Account</h3>
              <p className="text-slateM text-sm mb-4">Permanently remove your account and all associated data. This cannot be undone.</p>
              <button onClick={() => toast("Account deletion needs email confirmation. Check your inbox.")} className="text-sm font-[500] text-crisis border border-crisis/30 px-4 py-2 rounded-lg hover:bg-crisisL transition-all">Delete Account</button>
            </div>
          </div>
        )}

        {tab === "Privacy" && (
          <div className="space-y-4">
            <p className="text-slateM text-sm mb-2">Review and manage your privacy settings and consents.</p>
            {[
              { label: "Terms of Service", status: "Accepted 15 Jan 2025", required: true },
              { label: "Privacy Policy", status: "Accepted 15 Jan 2025", required: true },
              { label: "Counseling Service Agreement", status: "Accepted 15 Jan 2025", required: true },
              { label: "Communication Consent", status: "Accepted 15 Jan 2025", required: false },
              { label: "Assessment Consent", status: "Accepted 15 Jan 2025", required: false },
              { label: "Marketing Communications", status: "Not accepted", required: false },
            ].map(({ label, status, required }) => (
              <div key={label} className="flex items-center justify-between p-4 bg-cream border border-border rounded-xl">
                <div>
                  <p className="font-[500] text-slate text-sm">{label}</p>
                  <p className="text-slateL text-xs mt-0.5">{status}</p>
                </div>
                <div className="flex items-center gap-2">
                  {required && <span className="text-xs text-slateL bg-sand px-2 py-0.5 rounded-full">Required</span>}
                  {!required && (
                    <button className="text-xs font-[500] text-sage hover:underline">
                      {status === "Not accepted" ? "Accept" : "Withdraw"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Payments" && (
          <div className="space-y-5">
            <div>
              <h3 className="font-[600] text-slate mb-3">Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-cream border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sand text-slateM rounded-lg flex items-center justify-center"><Icon name="card" className="h-5 w-5" /></div>
                    <div>
                      <p className="font-[500] text-slate text-sm">Visa **** 1234</p>
                      <p className="text-slateL text-xs">Expires 12/28</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toast("Editing enabled")} className="text-xs text-sage font-[500] hover:underline">Edit</button>
                    <button onClick={() => toast("Payment method removed")} className="text-xs text-crisis font-[500] hover:underline">Remove</button>
                  </div>
                </div>
                <button onClick={() => toast("Payment method form opened")} className="w-full border border-dashed border-border py-3 rounded-xl text-sm text-slateM hover:border-sageMid hover:text-sage transition-all">
                  + Add Payment Method</button>
              </div>
            </div>

            <div>
              <h3 className="font-[600] text-slate mb-3">Transaction History</h3>
              <div className="space-y-2">
                {[
                  { date: "Aug 20, 2026", description: "Individual Counseling with Dr. G. Nakamya", amount: "UGX 120,000" },
                  { date: "Aug 5, 2026", description: "Individual Counseling with Mr. S. Ochieng", amount: "UGX 95,000" },
                  { date: "Jul 22, 2026", description: "Initial Consultation with Dr. G. Nakamya", amount: "UGX 60,000" },
                ].map(({ date, description, amount }) => (
                  <div key={date} className="flex items-center justify-between py-3 border-b border-border text-sm">
                    <div>
                      <p className="font-[500] text-slate">{description}</p>
                      <p className="text-slateL text-xs mt-0.5">{date}</p>
                    </div>
                    <span className="font-[600] text-slate">{amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
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
}
