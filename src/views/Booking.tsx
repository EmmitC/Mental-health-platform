"use client";

import { useMemo, useState } from "react";
import { counselors } from "../data/mock";
import type { Page } from "@/lib/nav";
import Icon, { type IconName } from "../components/Icon";
import { motion } from "motion/react";
import { buildDays, calDays, fmtLong, fmtRange, leadingBlanks as blanksFor } from "../data/calendar";
import { toast } from "../components/Toast";

interface BookingProps {
  navigate: (page: Page, params?: { counselorId?: string }) => void;
  counselorId: string | null;
}

const serviceIcons: IconName[] = ["spark", "user", "calendar", "clock"];

const services = [
  { name: "Initial Consultation", duration: 30, price: 60000, desc: "A first session to discuss your needs and see if we are a good fit." },
  { name: "Individual Counseling", duration: 60, price: 120000, desc: "A full individual session focused on your goals and wellbeing." },
  { name: "Follow-up Session", duration: 60, price: 110000, desc: "A continuation of your ongoing counseling journey." },
  { name: "Extended Session", duration: 90, price: 170000, desc: "A longer session for deeper exploration of complex topics." },
];

const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "4:30 PM"];
const disabledSlots = ["12:00 PM", "3:30 PM"];

const steps = ["Service", "Date & Time", "Session Type", "Intake", "Payment", "Confirmed"];

export default function Booking({ navigate, counselorId }: BookingProps) {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [paying, setPaying] = useState(false);
  const days = useMemo(buildDays, []);
  const leadingBlanks = blanksFor(days);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState("Video");
  const [intakeText, setIntakeText] = useState("");
  const [previousCounseling, setPreviousCounseling] = useState<string | null>(null);

  const counselor = counselors.find((c) => c.id === counselorId) ?? counselors[0];
  const service = services[selectedService];

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  if (step === steps.length - 1) {
    return (
      <div className="min-h-screen bg-cream px-5 pb-16">
        <div className="mx-auto max-w-md pt-8">
          <div className="relative overflow-hidden rounded-[12px]">
            <img src="/images/window-rest.jpg" alt="" className="h-56 w-full object-cover object-[50%_30%]" />
            <div className="light-scope absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-slate/85 via-slate/30 to-transparent pb-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.15 }}
                className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-sage text-cream"
              >
                <Icon name="check" className="h-7 w-7" />
              </motion.div>
              <h1 className="font-display text-3xl font-[700] text-cream">Appointment confirmed</h1>
            </div>
          </div>
          <p className="my-6 text-center text-slateM">You will receive a confirmation email with all the details.</p>

          <div className="light-scope mb-6 space-y-3 rounded-[12px] bg-slate p-6 text-sm text-cream">
            {[
              ["Counselor", counselor.name],
              ["Service", service.name],
              ["Date", selectedDate ? fmtLong(selectedDate) : "To be confirmed"],
              ["Time", selectedTime ?? "To be confirmed"],
              ["Format", `${sessionType} Session`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="opacity-75">{label}</span>
                <span className="text-right font-[600]">{value}</span>
              </div>
            ))}
            <div className="flex items-baseline justify-between border-t border-cream/20 pt-3">
              <span className="font-[600]">Total paid</span>
              <span className="font-display text-2xl font-[700] text-sun">UGX {service.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => toast("Added to your calendar")} className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-[500] text-slateM transition-all hover:bg-sand">
              Add to Calendar
            </button>
            <button onClick={() => navigate("appointments")} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate py-3.5 font-[600] text-cream transition-colors hover:bg-slateM">
              View My Appointments <span aria-hidden="true">→</span>
            </button>
            <button onClick={() => navigate("dashboard")} className="w-full py-2 text-sm text-slateM transition-colors hover:text-slate">
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Progress header: kit "STEP n OF N" pill + animated bar */}
      <div className="sticky top-14 z-10 border-b border-border bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-5 py-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-[700] text-slate">{steps[step]}</p>
            <span className="rounded-full bg-sand px-3 py-1 text-xs font-[700] tracking-wide text-slateM">
              STEP {step + 1} OF {steps.length - 1}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-sandDark" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length - 1} aria-valuenow={step + 1}>
            <motion.div
              className="h-full rounded-full bg-sage"
              initial={false}
              animate={{ width: `${((step + 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10">
        {/* Counselor summary strip */}
        <div className="flex items-center gap-4 p-4 light-scope bg-sage text-cream rounded-[12px] mb-8">
          <img src={counselor.photo} alt={counselor.name} className="w-12 h-12 rounded-full object-cover object-top" />
          <div>
            <p className="font-[600] text-cream text-sm">{counselor.name}</p>
            <p className="text-cream text-xs">{counselor.credentials}</p>
          </div>
          {step > 0 && service && (
            <div className="ml-auto text-right">
              <p className="text-cream font-[600] text-sm">{service.name}</p>
              <p className="text-cream text-xs">{service.duration} min · UGX {service.price.toLocaleString()}</p>
            </div>
          )}
        </div>

        {/* Step 0: Service */}
        {step === 0 && (
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-[700] text-center text-slate mb-2">Choose a service</h2>
            <p className="text-slateM text-sm mb-8 text-center">Select the type of session that best fits your needs.</p>
            <div className="space-y-3">
              {services.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setSelectedService(i)}
                  className={`w-full flex items-start justify-between p-5 rounded-[12px] border-2 text-left transition-all ${
                    selectedService === i ? "border-sage bg-sage text-cream shadow-[0_8px_24px_-8px_rgba(78,106,40,0.5)] [&_.sub]:text-cream/85" : "border-border bg-cream hover:border-sageMid"
                  }`}
                >
                  <span className={`mr-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${selectedService === i ? "bg-cream/25" : "bg-sageL text-sage"}`}>
                    <Icon name={serviceIcons[i]} className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className={`font-[700] ${selectedService === i ? "text-cream" : "text-slate"}`}>{s.name}</p>
                    <p className="sub text-slateM text-xs mt-1 leading-relaxed">{s.desc}</p>
                    <p className="sub text-slateL text-xs mt-2">{s.duration} minutes</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className={`font-[700] ${selectedService === i ? "text-cream" : "text-slate"}`}>
                      UGX {s.price.toLocaleString()}
                    </p>
                    <div className={`w-5 h-5 rounded-full border-2 mt-2 ml-auto flex items-center justify-center ${
                      selectedService === i ? "border-cream bg-cream" : "border-border"
                    }`}>
                      {selectedService === i && <div className="w-2 h-2 rounded-full bg-sage"></div>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={nextStep} className="inline-flex items-center justify-center gap-2 mt-8 w-full bg-slate hover:bg-slateM text-cream font-[600] py-3.5 rounded-xl transition-colors">
              Continue <span aria-hidden="true">→</span></button>
          </div>
        )}

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-[700] text-center text-slate mb-2">Choose a date and time</h2>
            <p className="text-slateM text-sm mb-8 text-center">All times shown in your local timezone.</p>
            <div className="bg-sand border border-border rounded-[12px] p-6 mb-6">
              <h3 className="font-[600] text-slate mb-5">
                {fmtRange(days)}
              </h3>
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {calDays.map((d) => (
                  <p key={d} className="text-xs font-[600] text-slateM mb-1">{d}</p>
                ))}
                {Array.from({ length: leadingBlanks }, (_, i) => <span key={`b${i}`} />)}
                {days.map(({ date, unavailable }) => {
                  const isSelected = selectedDate?.getTime() === date.getTime();
                  return (
                    <button
                      key={date.getTime()}
                      onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                      disabled={unavailable}
                      aria-label={`${fmtLong(date)}${unavailable ? ", unavailable" : ""}`}
                      aria-pressed={isSelected}
                      className={`aspect-square rounded-full text-sm font-[600] transition-all ${
                        isSelected ? "bg-sage text-cream" :
                        unavailable ? "text-slateXL line-through decoration-slateXL/50" :
                        "hover:bg-sageL hover:text-sageD text-slate"
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDate ? (
              <div>
                <h3 className="font-[600] text-slate mb-3">Available times, {fmtLong(selectedDate)}</h3>
                <div className="grid grid-cols-3 gap-2 mb-8">
                  {timeSlots.map((t) => {
                    const disabled = disabledSlots.includes(t);
                    const isSelected = selectedTime === t;
                    return (
                      <button
                        key={t}
                        onClick={() => !disabled && setSelectedTime(t)}
                        disabled={disabled}
                        className={`py-3 rounded-xl border text-sm font-[500] transition-all ${
                          isSelected ? "border-sage bg-sage text-cream" :
                          disabled ? "border-border text-slateXL cursor-not-allowed line-through" :
                          "border-border hover:border-sageMid text-slateM"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-slateM text-sm mb-8 italic">Select a date to see available times.</p>
            )}

            <div className="flex gap-3">
              <button onClick={prevStep} disabled={paying} className="px-6 py-3 border border-border rounded-xl text-sm font-[500] text-slateM hover:bg-sand">Back</button>
              <button onClick={nextStep} disabled={!selectedDate || !selectedTime} className="inline-flex items-center justify-center gap-2 flex-1 bg-slate hover:bg-slateM text-cream font-[600] py-3 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Continue <span aria-hidden="true">→</span></button>
            </div>
          </div>
        )}

        {/* Step 2: Session Type */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-[700] text-center text-slate mb-2">How would you like to meet?</h2>
            <p className="text-slateM text-sm mb-8 text-center">Choose the format that feels most comfortable for you.</p>
            <div className="space-y-3 mb-8">
              {["Video", "Audio", "In Person"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSessionType(s)}
                  className={`w-full flex items-start gap-4 p-5 rounded-[12px] border-2 transition-all ${
                    sessionType === s ? "border-sage bg-sage text-cream shadow-[0_8px_24px_-8px_rgba(78,106,40,0.5)] [&_.sub]:text-cream/85" : "border-border bg-cream hover:border-sageMid"
                  }`}
                >
                  <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${sessionType === s ? "bg-cream/25" : "bg-sageL text-sage"}`}>
                    <Icon name={s === "Video" ? "video" : s === "Audio" ? "audio" : "pin"} className="h-5 w-5" />
                  </span>
                  <div className="text-left flex-1">
                    <p className={`font-[700] ${sessionType === s ? "text-cream" : "text-slate"}`}>{s} Session</p>
                    <p className="sub text-slateM text-xs mt-1">
                      {s === "Video" ? "See and hear your counselor via a secure video link" :
                       s === "Audio" ? "Voice call only, no camera needed. Fully private." :
                       "Visit your counselor at their practice location"}
                    </p>
                    {s === "In Person" && <p className="sub text-slateL text-xs mt-1.5">{counselor.location}</p>}
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                    sessionType === s ? "border-cream bg-cream" : "border-border"
                  }`}>
                    {sessionType === s && <div className="w-2 h-2 rounded-full bg-sage"></div>}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prevStep} disabled={paying} className="px-6 py-3 border border-border rounded-xl text-sm font-[500] text-slateM hover:bg-sand">Back</button>
              <button onClick={nextStep} className="inline-flex items-center justify-center gap-2 flex-1 bg-slate hover:bg-slateM text-cream font-[600] py-3 rounded-xl transition-colors">Continue <span aria-hidden="true">→</span></button>
            </div>
          </div>
        )}

        {/* Step 3: Intake */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-[700] text-center text-slate mb-2">A little about you</h2>
            <p className="text-slateM text-sm mb-8 text-center">This helps your counselor prepare for your first session. You only need to share what feels comfortable.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-[500] text-slate mb-2">What would you like help with?</label>
                <textarea
                  value={intakeText}
                  onChange={(e) => setIntakeText(e.target.value)}
                  placeholder="Share as much or as little as you are comfortable with..."
                  rows={4}
                  className="w-full border border-border focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-[500] text-slate mb-3">Have you received counseling before?</label>
                {["Yes, I have", "No, this is my first time", "I prefer not to say"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPreviousCounseling(opt)}
                    className={`block w-full text-left px-4 py-3 mb-2 rounded-xl border text-sm transition-all ${
                      previousCounseling === opt ? "border-sage bg-sage text-cream font-[500]" : "border-border text-slateM hover:border-sageMid"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="bg-amberL border border-amber/20 rounded-xl p-4">
                <p className="text-amber text-xs font-[600] mb-1">Your privacy</p>
                <p className="text-slateM text-xs leading-relaxed">This intake information is shared only with your counselor and is kept strictly confidential.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={prevStep} disabled={paying} className="px-6 py-3 border border-border rounded-xl text-sm font-[500] text-slateM hover:bg-sand">Back</button>
              <button onClick={nextStep} className="inline-flex items-center justify-center gap-2 flex-1 bg-slate hover:bg-slateM text-cream font-[600] py-3 rounded-xl transition-colors">Continue <span aria-hidden="true">→</span></button>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-[700] text-center text-slate mb-8">Review and pay</h2>

            <div className="light-scope mb-6 rounded-[12px] bg-slate p-6 text-cream">
              <h3 className="mb-4 font-[700]">Appointment Summary</h3>
              <div className="space-y-3 text-sm">
                {[
                  ["Counselor", counselor.name],
                  ["Service", service.name],
                  ["Duration", `${service.duration} minutes`],
                  ["Date", selectedDate ? fmtLong(selectedDate) : "Not selected"],
                  ["Time", selectedTime ?? "Not selected"],
                  ["Format", `${sessionType} Session`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="opacity-75">{label}</span>
                    <span className="font-[600]">{value}</span>
                  </div>
                ))}
                <div className="border-t border-cream/20 pt-3 flex items-baseline justify-between">
                  <span className="font-[600]">Total</span>
                  <span className="font-display text-2xl font-[700] text-sun">UGX {service.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-[600] text-slate mb-4">Payment Method</h3>
              <div className="space-y-2">
                {["Mobile Money (MTN / Airtel)", "Bank Card (Visa / Mastercard)", "Bank Transfer", "Platform Credits"].map((m) => (
                  <label key={m} className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:border-sageMid transition-all">
                    <input type="radio" name="payment" className="accent-sage" defaultChecked={m.includes("Mobile")} />
                    <span className="text-sm font-[500] text-slate">{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-crisisL border border-crisis/20 rounded-xl p-4 mb-6">
              <p className="text-crisis text-xs font-[600] mb-1">Cancellation Policy</p>
              <p className="text-slateM text-xs leading-relaxed">Free cancellation up to 24 hours before your session. After that, a 50% fee applies.</p>
            </div>

            <div className="flex gap-3">
              <button onClick={prevStep} disabled={paying} className="px-6 py-3 border border-border rounded-xl text-sm font-[500] text-slateM hover:bg-sand">Back</button>
              <button
                onClick={() => { setPaying(true); window.setTimeout(() => { setPaying(false); nextStep(); }, 1200); }}
                disabled={paying}
                className="flex-1 bg-sage hover:bg-sageD text-cream font-[600] py-3.5 rounded-xl transition-colors text-base disabled:opacity-70"
              >
                {paying ? "Processing payment…" : `Pay and Confirm: UGX ${service.price.toLocaleString()}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
