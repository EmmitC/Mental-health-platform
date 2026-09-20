"use client";

import { useId, useState } from "react";
import type { Page, UserRole } from "@/lib/nav";
import Icon from "../components/Icon";
import { toast } from "../components/Toast";
import ThemeToggle from "../components/ThemeToggle";

type AuthMode = "login" | "register" | "otp" | "onboarding-about" | "onboarding-needs" | "onboarding-prefs" | "forgot-password" | "forgot-sent";

const onboardingNeeds = [
  "Stress", "Anxiety", "Low Mood", "Relationships", "Grief", "Work",
  "School", "Family", "Self-esteem", "Sleep", "Life Changes", "Personal Growth", "Other",
];

export type { UserRole };

interface AuthProps {
  navigate: (page: Page) => void;
  onAuthenticate: (role?: UserRole) => void;
  initialMode?: "login" | "register";
}

const primaryBtn =
  "w-full bg-slate hover:bg-slateM text-cream font-[600] py-3.5 rounded-xl transition-colors disabled:opacity-60 disabled:hover:bg-slate";
const secondaryBtn = "px-5 py-3 text-sm font-[500] text-slateM border border-border rounded-xl hover:bg-sand transition-colors";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function Auth({ navigate, onAuthenticate, initialMode = "login" }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [sessionPref, setSessionPref] = useState("Video");
  const [forgotEmail, setForgotEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState<boolean[]>([false, false, false]);
  const [loading, setLoading] = useState(false);

  const pwRules = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "One number", ok: /\d/.test(password) },
  ];

  const switchMode = (m: AuthMode) => {
    setErrors({});
    setMode(m);
  };

  const withLoading = (fn: () => void) => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      fn();
    }, 700);
  };

  const submitLogin = () => {
    const e: Record<string, string> = {};
    if (!emailOk(email)) e.email = "Enter a valid email address.";
    if (!password) e.password = "Enter your password.";
    setErrors(e);
    if (Object.keys(e).length === 0) withLoading(() => onAuthenticate("client"));
  };

  const submitRegister = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Required.";
    if (!lastName.trim()) e.lastName = "Required.";
    if (!emailOk(email)) e.email = "Enter a valid email address.";
    if (!pwRules.every((r) => r.ok)) e.password = "Password doesn't meet all requirements yet.";
    if (!agreed.every(Boolean)) e.agreed = "Please confirm all three statements to continue.";
    setErrors(e);
    if (Object.keys(e).length === 0) withLoading(() => setMode("otp"));
  };

  const handleOtpChange = (i: number, raw: string) => {
    const val = raw.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const toggleNeed = (n: string) => {
    setSelectedNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  };

  if (mode === "forgot-password") {
    return (
      <AuthShell title="Reset your password" subtitle="Enter your email and we will send you a link.">
        <div className="space-y-4">
          <FormField label="Email address" type="email" value={forgotEmail} onChange={setForgotEmail} placeholder="you@example.com" error={errors.forgot} autoComplete="email" />
          <button
            onClick={() => {
              if (!emailOk(forgotEmail)) return setErrors({ forgot: "Enter a valid email address." });
              setErrors({});
              setMode("forgot-sent");
            }}
            className={primaryBtn}
          >
            Send Reset Link
          </button>
          <button onClick={() => switchMode("login")} className="w-full py-2 text-sm text-slateM hover:text-slate">
            Back to Sign In
          </button>
        </div>
      </AuthShell>
    );
  }

  if (mode === "forgot-sent") {
    return (
      <AuthShell title="Check your email" subtitle={`We sent a reset link to ${forgotEmail}`}>
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sageL text-sage">
            <Icon name="mail" className="h-6 w-6" />
          </div>
          <p className="text-slateM text-sm">Check your inbox and follow the instructions. The link expires in 30 minutes.</p>
          <button onClick={() => switchMode("login")} className={primaryBtn}>
            Back to Sign In
          </button>
        </div>
      </AuthShell>
    );
  }

  if (mode === "otp") {
    return (
      <AuthShell title="Verify your email" subtitle={`We sent a 6-digit code to ${email}`}>
        <div className="space-y-6">
          <div className="flex gap-2 justify-center">
            {otp.map((v, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={v}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[i] && i > 0) document.getElementById(`otp-${i - 1}`)?.focus();
                }}
                onPaste={(e) => {
                  const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                  if (!digits) return;
                  e.preventDefault();
                  setOtp(Array.from({ length: 6 }, (_, k) => digits[k] ?? ""));
                  document.getElementById(`otp-${Math.min(digits.length, 5)}`)?.focus();
                }}
                aria-label={`Digit ${i + 1} of 6`}
                autoComplete={i === 0 ? "one-time-code" : "off"}
                className="w-11 h-12 text-center text-lg font-[600] border-2 border-border hover:border-borderDark focus:border-sage rounded-xl bg-cream outline-none transition-colors"
              />
            ))}
          </div>
          <button onClick={() => setMode("onboarding-about")} disabled={otp.some((d) => !d)} className={primaryBtn}>
            Verify Code
          </button>
          <div className="text-center">
            <button onClick={() => toast("A new code is on its way")} className="text-sm text-slateM hover:text-sage transition-colors">
              Resend code
            </button>
          </div>
        </div>
      </AuthShell>
    );
  }

  if (mode === "onboarding-about" || mode === "onboarding-needs" || mode === "onboarding-prefs") {
    const steps = ["Account", "About You", "Your Needs", "Preferences", "Complete"];
    const stepIdx = mode === "onboarding-about" ? 1 : mode === "onboarding-needs" ? 2 : 3;
    const fieldCls = "w-full border border-border hover:border-borderDark focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none transition-colors";

    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <div className="max-w-xl mx-auto w-full px-5 py-8 flex-1 flex flex-col">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={stepIdx + 1}>
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-[600] transition-all ${
                    i < stepIdx ? "bg-sage text-cream" :
                    i === stepIdx ? "bg-sage text-cream ring-4 ring-sageL" :
                    "bg-sandDark text-slateM"
                  }`}>
                    {i < stepIdx ? <Icon name="check" className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 w-6 sm:w-8 transition-all ${i < stepIdx ? "bg-sage" : "bg-border"}`}></div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-slateM text-xs">{steps[stepIdx]}, step {stepIdx + 1} of {steps.length}</p>
          </div>

          {mode === "onboarding-about" && (
            <div className="flex-1 space-y-6">
              <h1 className="font-display text-3xl font-[400] text-slate">Tell us a little about yourself</h1>
              <p className="text-slateM text-sm">This helps us personalise your experience. You can update this any time.</p>
              <div className="space-y-4">
                <FormField label="Preferred name" value={firstName} onChange={setFirstName} placeholder="How would you like to be addressed?" />
                <SelectField label="Age range" className={fieldCls}>
                  <option value="">Select your age range</option>
                  {["Under 18", "18–24", "25–34", "35–44", "45–54", "55–64", "65+"].map((a) => <option key={a}>{a}</option>)}
                </SelectField>
                <FormField label="Location" value="" onChange={() => {}} placeholder="City / District" uncontrolled />
                <SelectField label="Preferred language" className={fieldCls}>
                  <option>English</option>
                  <option>Luganda</option>
                  <option>Swahili</option>
                  <option>Other</option>
                </SelectField>
              </div>
              <button onClick={() => setMode("onboarding-needs")} className={`${primaryBtn} mt-auto`}>
                Continue
              </button>
            </div>
          )}

          {mode === "onboarding-needs" && (
            <div className="flex-1 space-y-6">
              <h1 className="font-display text-3xl font-[400] text-slate">What brings you here?</h1>
              <p className="text-slateM text-sm">Select any that feel relevant. You can select multiple, or skip this step.</p>
              <div className="flex flex-wrap gap-2">
                {onboardingNeeds.map((n) => (
                  <button
                    key={n}
                    aria-pressed={selectedNeeds.includes(n)}
                    onClick={() => toggleNeed(n)}
                    className={`px-4 py-2.5 rounded-full text-sm font-[500] border-2 transition-all ${
                      selectedNeeds.includes(n)
                        ? "border-sage bg-sage text-cream"
                        : "border-border bg-cream text-slateM hover:border-sageMid"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setMode("onboarding-about")} className={secondaryBtn}>Back</button>
                <button onClick={() => setMode("onboarding-prefs")} className="flex-1 bg-sage hover:bg-sageD text-cream font-[600] py-3 rounded-xl transition-colors">
                  {selectedNeeds.length === 0 ? "Skip for now" : "Continue"}
                </button>
              </div>
            </div>
          )}

          {mode === "onboarding-prefs" && (
            <div className="flex-1 space-y-6">
              <h1 className="font-display text-3xl font-[400] text-slate">How would you like to meet?</h1>
              <p className="text-slateM text-sm">Choose your preferred session format. You can change this any time.</p>
              <div className="space-y-3" role="radiogroup" aria-label="Session format">
                {["Video", "Audio", "In Person"].map((s) => (
                  <button
                    key={s}
                    role="radio"
                    aria-checked={sessionPref === s}
                    onClick={() => setSessionPref(s)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all ${
                      sessionPref === s ? "border-sage bg-sage text-cream shadow-[0_8px_24px_-8px_rgba(78,106,40,0.5)] [&_.sub]:text-cream/85" : "border-border bg-cream hover:border-sageMid"
                    }`}
                  >
                    <div className="text-left">
                      <p className={`font-[600] text-sm ${sessionPref === s ? "text-cream" : "text-slate"}`}>{s}</p>
                      <p className="sub text-slateM text-xs mt-0.5">
                        {s === "Video" ? "See and hear your counselor via camera" :
                         s === "Audio" ? "Voice-only call, no camera required" :
                         "Meet your counselor at their location"}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      sessionPref === s ? "border-cream bg-cream" : "border-border"
                    }`}>
                      {sessionPref === s && <div className="w-2 h-2 rounded-full bg-sage"></div>}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setMode("onboarding-needs")} className={secondaryBtn}>Back</button>
                <button onClick={() => onAuthenticate("client")} className="flex-1 bg-sage hover:bg-sageD text-cream font-[600] py-3 rounded-xl transition-colors">
                  Go to My Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === "login") {
    return (
      <AuthShell title="Welcome back" subtitle="Sign in to your SereneMind account">
        <form
          className="space-y-4"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            submitLogin();
          }}
        >
          <FormField label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" error={errors.email} autoComplete="email" />
          <FormField label="Password" type="password" value={password} onChange={setPassword} placeholder="Your password" error={errors.password} autoComplete="current-password" />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slateM cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded border-border accent-sage" />
              Remember this device
            </label>
            <button type="button" onClick={() => switchMode("forgot-password")} className="text-sm text-sage hover:text-sageD transition-colors">
              Forgot password?
            </button>
          </div>
          <button type="submit" disabled={loading} className={primaryBtn}>
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <div className="bg-sand border border-border rounded-xl p-4 space-y-2">
            <p className="text-xs font-[600] text-slateM uppercase tracking-wide">Demo: skip sign-in as</p>
            <div className="flex gap-2 flex-wrap">
              {(["client", "counselor", "admin"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => onAuthenticate(r)}
                  className="flex-1 text-sm font-[500] text-slateM bg-cream border border-border py-2.5 px-3 rounded-lg hover:border-sageMid hover:text-sage transition-all capitalize"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-slateM">
            Don't have an account?{" "}
            <button type="button" onClick={() => switchMode("register")} className="text-sage font-[600] hover:text-sageD">
              Get started
            </button>
          </p>
          <div className="pt-2 text-center">
            <button type="button" onClick={() => navigate("crisis")} className="text-xs text-crisis font-[500] hover:underline">
              Need immediate help? →
            </button>
          </div>
        </form>
      </AuthShell>
    );
  }

  // Register
  return (
    <AuthShell title="Create your account" subtitle="Start your mental wellness journey">
      <form
        className="space-y-4"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submitRegister();
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <FormField label="First name" value={firstName} onChange={setFirstName} placeholder="First name" error={errors.firstName} autoComplete="given-name" />
          <FormField label="Last name" value={lastName} onChange={setLastName} placeholder="Last name" error={errors.lastName} autoComplete="family-name" />
        </div>
        <FormField label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" error={errors.email} autoComplete="email" />
        <FormField label="Password" type="password" value={password} onChange={setPassword} placeholder="Create a strong password" error={errors.password} autoComplete="new-password" />
        <ul className="bg-sageL rounded-xl p-4 space-y-1.5" aria-label="Password requirements">
          {pwRules.map((r) => (
            <li key={r.label} className={`text-xs flex items-center gap-2 transition-colors ${r.ok ? "text-sageD font-[600]" : "text-slateM"}`}>
              <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${r.ok ? "border-sage bg-sage text-cream" : "border-slateXL"}`}>
                {r.ok && <Icon name="check" className="h-2.5 w-2.5" />}
              </span>
              {r.label}
            </li>
          ))}
        </ul>

        <div className="space-y-3 pt-1">
          <p className="text-xs font-[600] text-slateM uppercase tracking-wide">Please confirm the following:</p>
          {[
            "I agree to the Terms of Service",
            "I acknowledge the Privacy Policy",
            "I understand this platform is not an emergency service",
          ].map((label, i) => (
            <label key={label} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed[i]}
                onChange={(e) => setAgreed((prev) => prev.map((v, k) => (k === i ? e.target.checked : v)))}
                className="mt-0.5 h-4 w-4 border-border accent-sage"
              />
              <span className="text-sm text-slateM leading-relaxed">{label}</span>
            </label>
          ))}
          {errors.agreed && <p className="text-xs font-[500] text-crisis" role="alert">{errors.agreed}</p>}
        </div>

        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? "Creating account…" : "Create Account"}
        </button>
        <p className="text-center text-sm text-slateM">
          Already have an account?{" "}
          <button type="button" onClick={() => switchMode("login")} className="text-sage font-[600] hover:text-sageD">
            Sign in
          </button>
        </p>
      </form>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex">
      <div className="light-scope hidden lg:flex flex-1 relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/window-light.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate/80 via-slate/30 to-transparent"></div>
        </div>
        <div className="relative z-10 p-10 flex flex-col justify-end">
          <p className="font-display text-3xl font-[300] text-cream leading-relaxed max-w-xs">
            <em>&ldquo;You don't have to navigate difficult moments alone.&rdquo;</em>
          </p>
        </div>
      </div>

      <div className="relative w-full lg:w-[480px] flex flex-col justify-center px-6 sm:px-8 py-10 overflow-y-auto">
        <div className="absolute right-4 top-4"><ThemeToggle /></div>
        <div className="max-w-sm mx-auto w-full">
          <a href="/" className="mb-8 inline-block font-display text-2xl font-[500] text-slate">
            Serene<span className="text-sage">Mind</span>
          </a>
          <h1 className="font-display text-3xl font-[400] text-slate mb-1">{title}</h1>
          <p className="text-slateM text-sm mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

function SelectField({ label, className, children }: { label: string; className: string; children: React.ReactNode }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-[500] text-slateM mb-1.5">{label}</label>
      <select id={id} className={className}>{children}</select>
    </div>
  );
}

function FormField({
  label, type = "text", value, onChange, placeholder, error, autoComplete, uncontrolled,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; error?: string; autoComplete?: string; uncontrolled?: boolean;
}) {
  const id = useId();
  const [shown, setShown] = useState(false);
  const isPassword = type === "password";
  const valueProps = uncontrolled ? {} : { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value) };
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-[500] text-slateM mb-1.5">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && shown ? "text" : type}
          {...valueProps}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`w-full bg-cream px-4 py-3 rounded-xl text-sm text-slate outline-none transition-colors border ${
            error ? "border-crisis" : "border-border hover:border-borderDark focus:border-sage"
          } ${isPassword ? "pr-11" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShown(!shown)}
            aria-label={shown ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slateL hover:text-slate"
          >
            <Icon name={shown ? "eyeOff" : "eye"} className="h-4 w-4" />
          </button>
        )}
      </div>
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs font-[500] text-crisis">{error}</p>}
    </div>
  );
}
