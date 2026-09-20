"use client";

import { useState } from "react";
import { wellnessGoals, moodHistory } from "../data/mock";
import type { Page } from "@/lib/nav";
import { MoodFace } from "../components/Icon";
import { toast } from "../components/Toast";

interface WellnessProps {
  navigate: (page: Page) => void;
}

const moodEmojis = [
  { label: "Very low" },
  { label: "Low" },
  { label: "Okay" },
  { label: "Good" },
  { label: "Great" },
];

const assessments = [
  { id: "a1", name: "General Wellbeing Check", questions: 10, duration: "5 min", lastTaken: "2 weeks ago", category: "Wellbeing" },
  { id: "a2", name: "Stress Level Screening", questions: 8, duration: "4 min", lastTaken: "Never", category: "Stress" },
  { id: "a3", name: "Anxiety Screening (GAD-7)", questions: 7, duration: "3 min", lastTaken: "1 month ago", category: "Anxiety" },
];

const initialJournal = [
  { id: "j1", date: "Today", mood: 3, preview: "Woke up feeling more settled than usual. The breathing exercises are starting to feel...", tags: ["Progress", "Sleep"] },
  { id: "j2", date: "Yesterday", mood: 2, preview: "Difficult meeting at work. Found myself overthinking it for hours afterward...", tags: ["Work", "Stress"] },
  { id: "j3", date: "Monday", mood: 4, preview: "Had a really good session with Dr. Nakamya. Feeling hopeful about the things we discussed.", tags: ["Therapy", "Progress"] },
];

export default function Wellness({ navigate }: WellnessProps) {
  const [tab, setTab] = useState<"Check-in" | "Goals" | "Assessments" | "Journal">("Check-in");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState(3);
  const [stress, setStress] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [journalText, setJournalText] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState<null | number>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<number[]>([]);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newJournalOpen, setNewJournalOpen] = useState(false);
  const [journalEntries, setJournalEntries] = useState(initialJournal);
  const [entryMood, setEntryMood] = useState<number | null>(null);
  const [entryText, setEntryText] = useState("");

  const tabs = ["Check-in", "Goals", "Assessments", "Journal"] as const;

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-8">
        <h1 className="font-display text-3xl md:text-4xl font-[400] text-slate mb-8">Wellness</h1>

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

        {/* Check-in Tab */}
        {tab === "Check-in" && (
          <div>
            {checkedIn ? (
              <div className="bg-sageL border border-sageMid rounded-[12px] p-6 mb-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center text-2xl">✓</div>
                <div>
                  <p className="font-[600] text-sage">Check-in complete</p>
                  <p className="text-sage/70 text-sm">You checked in {moodEmojis[selectedMood ?? 3].label.toLowerCase()} today. See your history below.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 mb-8">
                <div>
                  <h2 className="font-display text-2xl font-[400] text-slate mb-2">How are you feeling today?</h2>
                  <p className="text-slateM text-sm mb-5">Take a moment to check in with yourself.</p>
                  <div className="flex gap-4">
                    {moodEmojis.map(({ label }, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedMood(i)}
                        aria-pressed={selectedMood === i}
                        aria-label={label}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                          selectedMood === i
                            ? "bg-sageL ring-2 ring-sage scale-110"
                            : "hover:bg-sand hover:scale-105"
                        }`}
                      >
                        <MoodFace level={i} className={`h-9 w-9 transition-colors ${selectedMood === i ? "text-sage" : "text-slateL"}`} />
                        <span className="text-[10px] text-slateM font-[500]">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedMood !== null && (
                  <div className="space-y-6 border-t border-border pt-6">
                    <SliderField label="Energy" lowLabel="Very low" highLabel="Very high" value={energy} onChange={setEnergy} />
                    <SliderField label="Stress" lowLabel="Low" highLabel="High" value={stress} onChange={setStress} />
                    <SliderField label="Sleep quality" lowLabel="Poor" highLabel="Excellent" value={sleep} onChange={setSleep} />
                    <div>
                      <label className="block text-sm font-[500] text-slate mb-2">
                        What's on your mind? <span className="text-slateL font-[400]">(optional)</span>
                      </label>
                      <textarea
                        value={journalText}
                        onChange={(e) => setJournalText(e.target.value)}
                        placeholder="Write something..."
                        rows={3}
                        className="w-full border border-border focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none resize-none transition-colors"
                      />
                    </div>
                    <button
                      onClick={() => setCheckedIn(true)}
                      className="w-full bg-sage hover:bg-sageD text-cream font-[600] py-3.5 rounded-xl transition-colors"
                    >
                      Save Check-in
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mood history chart */}
            <div className="bg-cream border border-border rounded-[12px] p-6">
              <h3 className="font-[600] text-slate mb-5">This week</h3>
              <div className="flex items-end gap-3 h-28">
                {moodHistory.map(({ day, score }) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative flex items-end" style={{ height: "80px" }}>
                      <div
                        className="w-full rounded-sm bg-sage/50 transition-all duration-500"
                        style={{ height: `${(score / 5) * 80}px` }}
                      />
                    </div>
                    <span className="text-[10px] text-slateL font-[500]">{day}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slateL mt-4 text-center">Tap any day to view that check-in</p>
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {tab === "Goals" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-slateM text-sm">{wellnessGoals.length} active goals</p>
              <button
                onClick={() => setShowNewGoal(!showNewGoal)}
                className="bg-sage hover:bg-sageD text-cream font-[600] px-4 py-2 rounded-xl text-sm transition-colors"
              >
                + Add Goal
              </button>
            </div>

            {showNewGoal && (
              <div className="bg-sageL border border-sageMid rounded-[12px] p-6 mb-6">
                <h3 className="font-[600] text-slate mb-4">New Goal</h3>
                <div className="space-y-3">
                  <input placeholder="Goal name (e.g. Improve Sleep)" className="w-full border border-sageMid bg-cream focus:border-sage px-4 py-3 rounded-xl text-sm outline-none" />
                  <input placeholder="Target (e.g. 7 hours/night)" className="w-full border border-sageMid bg-cream focus:border-sage px-4 py-3 rounded-xl text-sm outline-none" />
                  <select className="w-full border border-sageMid bg-cream focus:border-sage px-4 py-3 rounded-xl text-sm outline-none">
                    <option>Daily</option>
                    <option>3x per week</option>
                    <option>Weekly</option>
                  </select>
                  <div className="flex gap-3">
                    <button onClick={() => setShowNewGoal(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm text-slateM hover:bg-sand">Cancel</button>
                    <button onClick={() => setShowNewGoal(false)} className="flex-1 bg-sage text-cream font-[600] py-2.5 rounded-xl text-sm hover:bg-sageD">Save Goal</button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {wellnessGoals.map(({ id, title, target, progress, streak }) => (
                <div key={id} className="bg-cream border border-border rounded-[12px] p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-[600] text-slate">{title}</h3>
                      <p className="text-slateM text-sm mt-0.5">Target: {target}</p>
                    </div>
                    <span className="text-sm font-[700] text-sage">{progress}%</span>
                  </div>
                  <div className="h-2.5 bg-sand rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-sage rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-slateL">{streak}-day streak</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assessments Tab */}
        {tab === "Assessments" && (
          <div>
            {assessmentStep !== null ? (
              <AssessmentView
                step={assessmentStep}
                answers={assessmentAnswers}
                onAnswer={(ans) => {
                  const next = [...assessmentAnswers, ans];
                  setAssessmentAnswers(next);
                  if (assessmentStep < 6) setAssessmentStep(assessmentStep + 1);
                  else {
                    setAssessmentStep(null);
                    setAssessmentAnswers([]);
                  }
                }}
                onBack={() => {
                  if (assessmentStep > 0) setAssessmentStep(assessmentStep - 1);
                  else { setAssessmentStep(null); setAssessmentAnswers([]); }
                }}
                navigate={navigate}
              />
            ) : (
              <>
                <div className="bg-amberL border border-amber/20 rounded-xl p-5 mb-6">
                  <p className="font-[600] text-amber text-sm mb-1">Important</p>
                  <p className="text-slateM text-sm leading-relaxed">These screenings are not diagnoses. They help you understand how you are feeling and consider whether professional support could help you.</p>
                </div>
                <div className="space-y-4">
                  {assessments.map(({ id, name, questions, duration, lastTaken, category }) => (
                    <div key={id} className="bg-cream border border-border rounded-[12px] p-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-[600] text-terra bg-terraL px-2 py-0.5 rounded-full">{category}</span>
                        </div>
                        <h3 className="font-[600] text-slate text-sm">{name}</h3>
                        <p className="text-slateL text-xs mt-1">{questions} questions · {duration} · Last taken: {lastTaken}</p>
                      </div>
                      <button
                        onClick={() => { setAssessmentStep(0); setAssessmentAnswers([]); }}
                        className="flex-shrink-0 bg-sage hover:bg-sageD text-cream font-[600] px-4 py-2 rounded-xl text-sm transition-colors"
                      >
                        Start
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Journal Tab */}
        {tab === "Journal" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="bg-amberL border border-amber/10 rounded-xl px-4 py-2.5">
                <p className="text-amber text-xs leading-relaxed">
                  Your journal is private. It is not shared with your counselor unless you choose to share something.
                </p>
              </div>
              <button
                onClick={() => setNewJournalOpen(true)}
                className="ml-3 flex-shrink-0 bg-sage hover:bg-sageD text-cream font-[600] px-4 py-2 rounded-xl text-sm transition-colors"
              >
                + New Entry
              </button>
            </div>

            {newJournalOpen && (
              <div className="bg-cream border border-sageMid rounded-[12px] p-6 mb-6">
                <h3 className="font-[600] text-slate mb-4">New Journal Entry</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-[600] text-slateM mb-2 block">How are you feeling?</label>
                    <div className="flex gap-3">
                      {moodEmojis.map(({ label }, i) => (
                        <button
                          key={i}
                          onClick={() => setEntryMood(i)}
                          aria-label={label}
                          aria-pressed={entryMood === i}
                          className={`rounded-xl p-2 transition-all ${entryMood === i ? "bg-sageL text-sage ring-2 ring-sage" : "text-slateL hover:bg-sand"}`}
                        >
                          <MoodFace level={i} className="h-7 w-7" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    rows={5}
                    value={entryText}
                    onChange={(e) => setEntryText(e.target.value)}
                    placeholder="Write about your day, your thoughts, or anything on your mind..."
                    className="w-full border border-border focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none resize-none transition-colors"
                  />
                  <div className="flex gap-3">
                    <button onClick={() => setNewJournalOpen(false)} className="flex-1 border border-border py-2.5 rounded-xl text-sm text-slateM hover:bg-sand">Cancel</button>
                    <button
                      onClick={() => {
                        setJournalEntries([{ id: `j${Date.now()}`, date: "Today", mood: entryMood ?? 2, preview: entryText.trim(), tags: ["New"] }, ...journalEntries]);
                        setEntryText("");
                        setEntryMood(null);
                        setNewJournalOpen(false);
                        toast("Journal entry saved");
                      }}
                      disabled={!entryText.trim()}
                      className="flex-1 bg-sage text-cream font-[600] py-2.5 rounded-xl text-sm hover:bg-sageD disabled:opacity-40"
                    >
                      Save Entry
                    </button>
                  </div>
                </div>
              </div>
            )}

            {journalEntries.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="font-display text-xl font-[400] text-slate mb-2">Your journal is empty</h3>
                <p className="text-slateM text-sm max-w-xs mx-auto leading-relaxed">Writing down how you are feeling can help you reflect on your experiences and notice patterns over time.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {journalEntries.map(({ id, date, mood, preview, tags }) => (
                  <button
                    key={id}
                    className="w-full text-left bg-cream border border-border rounded-[12px] p-5 hover:border-sageMid transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MoodFace level={mood} className="h-6 w-6 text-sage" />
                        <span className="text-sm font-[500] text-slateM">{date}</span>
                      </div>
                      <span className="text-slateL group-hover:text-sage text-sm transition-colors">→</span>
                    </div>
                    <p className="text-slateM text-sm leading-relaxed line-clamp-2">{preview}</p>
                    <div className="flex gap-1.5 mt-3">
                      {tags.map((t) => (
                        <span key={t} className="text-xs bg-sand text-slateM px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SliderField({ label, lowLabel, highLabel, value, onChange }: { label: string; lowLabel: string; highLabel: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-[500] text-slate">{label}</label>
        <span className="text-sm text-sage font-[600]">{value}/5</span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-sage"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-slateL">{lowLabel}</span>
        <span className="text-xs text-slateL">{highLabel}</span>
      </div>
    </div>
  );
}

const assessmentQuestions = [
  { q: "Over the past two weeks, how often have you felt nervous, anxious, or on edge?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { q: "How often have you felt unable to stop or control worrying?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { q: "How often have you had trouble relaxing?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { q: "How often have you felt so restless that it's hard to sit still?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { q: "How often have you become easily annoyed or irritable?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { q: "How often have you felt afraid, as if something awful might happen?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { q: "How difficult have these problems made it to do your work or get along with others?", opts: ["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"] },
];

function AssessmentView({ step, answers, onAnswer, onBack, navigate }: {
  step: number; answers: number[]; onAnswer: (a: number) => void; onBack: () => void; navigate: (page: Page) => void;
}) {
  if (step >= assessmentQuestions.length) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 bg-sageL rounded-full flex items-center justify-center mx-auto mb-5 text-2xl">✓</div>
        <h2 className="font-display text-2xl font-[400] text-slate mb-3">Assessment complete</h2>
        <div className="bg-sand border border-border rounded-[12px] p-6 text-left mb-6 max-w-sm mx-auto">
          <p className="text-slateM text-sm leading-relaxed">
            Your responses suggest you may be experiencing some anxiety symptoms. This screening does not provide a diagnosis.
          </p>
          <p className="text-slateM text-sm mt-3 leading-relaxed">
            Consider discussing your results with a qualified professional.
          </p>
        </div>
        <div className="space-y-3 max-w-sm mx-auto">
          <button onClick={() => navigate("counselors")} className="w-full bg-sage hover:bg-sageD text-cream font-[600] py-3 rounded-xl transition-colors">Find a Counselor</button>
          <button onClick={() => navigate("resources")} className="w-full border border-border py-3 rounded-xl text-sm text-slateM hover:bg-sand">Explore Resources</button>
          <button onClick={onBack} className="w-full text-sm text-slateL hover:text-slate py-2">Take Again Later</button>
        </div>
      </div>
    );
  }

  const q = assessmentQuestions[step];
  const progress = Math.round(((step) / assessmentQuestions.length) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-[500] text-slateM">Question {step + 1} of {assessmentQuestions.length}</p>
        <p className="text-sm text-slateL">{progress}%</p>
      </div>
      <div className="h-2 bg-sand rounded-full mb-8">
        <div className="h-full bg-sage rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <h2 className="font-display text-xl md:text-2xl font-[400] text-slate mb-6 leading-snug" style={{ textWrap: "balance" }}>
        {q.q}
      </h2>
      <div className="space-y-2 mb-8">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(i)}
            className="w-full text-left px-5 py-4 rounded-xl border border-border hover:border-sageMid hover:bg-sageL/50 text-slateM text-sm font-[500] transition-all"
          >
            {opt}
          </button>
        ))}
      </div>
      <button onClick={onBack} className="text-sm text-slateL hover:text-slateM transition-colors">← Back</button>
    </div>
  );
}
