"use client";

import { useState } from "react";
import { sessionNotes, type SessionNote } from "../data/counselorMock";
import type { Page } from "@/lib/nav";
import { toast } from "../components/Toast";

interface CounselorNotesProps {
  navigate: (page: Page) => void;
}

const fullNotes: Record<string, string> = {
  n1: `Client reported reduced anxiety compared to last session. Discussed breathing techniques practiced at home — client noted they found the 4-7-8 method helpful during two high-stress moments this week.

Explored workplace triggers in more depth. Client identified meetings with direct manager as the primary stressor. We discussed boundary-setting strategies and how to prepare for difficult conversations.

Next session: Continue boundary work. Assign journaling exercise for mood tracking.`,
  n2: `Session focused on communication patterns in the relationship. Client identified two key triggers: feeling unheard during disagreements, and a sense that their perspective is dismissed before being fully heard.

We practiced a structured listening exercise. Client responded positively to the technique. Discussed implementation at home.

Next steps: Invite partner to next session if both agree. Client will reflect on the exercise this week.`,
  n3: `Third session. Mood has improved slightly according to client self-report (6/10 vs. 4/10 last session). Sleep still disrupted — averaging 4-5 hours per night.

We began a sleep hygiene review. Client currently uses phone in bed and has irregular wake times. Agreed to try fixed wake time for 7 days.

Action: Client to track sleep using the app and bring data to next session.`,
  n4: `Explored how the grief is manifesting in daily life. Client beginning to re-engage with family activities — attended a family gathering for the first time in three months.

Discussed the concept of continuing bonds. Client found this reframing meaningful. Named three things they want to preserve from the relationship with the deceased.

Note: Client becoming more reflective and less avoidant. Positive trajectory.`,
};

export default function CounselorNotes({ navigate: _navigate }: CounselorNotesProps) {
  const [selectedNote, setSelectedNote] = useState<SessionNote | null>(null);
  const [noteText, setNoteText] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);

  if (isNew) {
    return (
      <div className="min-h-screen bg-cream pb-20 lg:pb-8 flex flex-col">
        <div className="px-5 lg:px-8 py-5 border-b border-border flex items-center justify-between">
          <button
            onClick={() => { setIsNew(false); setNoteText(""); setSaved(false); }}
            className="text-slateM hover:text-slate text-sm transition-colors"
          >
            ← Notes
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setSaved(true)}
              className="border border-border text-slateM font-[500] px-4 py-2 rounded-lg text-sm hover:bg-sand transition-all"
            >
              Save draft
            </button>
            <button
              onClick={() => { setSaved(true); setIsNew(false); }}
              className="bg-sage hover:bg-sageD text-cream font-[600] px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Finalize note
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-5 lg:px-8 py-8 flex-1 flex flex-col">
          <div className="bg-amberL border border-amber/20 rounded-xl p-4 mb-6">
            <p className="text-amber text-xs">
              Session notes are private and never visible to the client unless you explicitly share an excerpt.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-[500] text-slateM mb-1.5">Client</label>
              <select className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-cream outline-none">
                <option>Sarah Namukasa</option>
                <option>Daniel Kato</option>
                <option>Grace Apio</option>
                <option>Robert Ssali</option>
                <option>Amira Osman</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-[500] text-slateM mb-1.5">Session type</label>
              <select className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-cream outline-none">
                <option>Video</option>
                <option>Audio</option>
                <option>In Person</option>
              </select>
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-[500] text-slateM mb-1.5">Session notes</label>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your session notes here. These are private to you."
              className="w-full h-64 border border-border focus:border-sage rounded-xl px-4 py-3 text-sm bg-cream outline-none resize-none transition-colors leading-relaxed"
            />
          </div>

          {saved && (
            <div className="mt-3 flex items-center gap-2 text-success text-sm font-[500]">
              <span>✓</span> Draft saved
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedNote) {
    return (
      <div className="min-h-screen bg-cream pb-20 lg:pb-8 flex flex-col">
        <div className="px-5 lg:px-8 py-5 border-b border-border flex items-center justify-between">
          <button
            onClick={() => setSelectedNote(null)}
            className="text-slateM hover:text-slate text-sm transition-colors"
          >
            ← Notes
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-[500] px-2.5 py-1 rounded-full ${selectedNote.status === "Draft" ? "bg-amberL text-amber" : "bg-sageL text-sage"}`}>
              {selectedNote.status}
            </span>
            {selectedNote.status === "Draft" && (
              <button onClick={() => toast("Note finalized and locked")} className="bg-sage hover:bg-sageD text-cream font-[600] px-4 py-2 rounded-lg text-sm transition-colors">
                Finalize</button>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-5 lg:px-8 py-8">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-[400] text-slate">{selectedNote.clientName}</h2>
            <p className="text-slateM text-sm mt-1">{selectedNote.date} · {selectedNote.sessionType}</p>
          </div>

          <div className="bg-amberL border border-amber/20 rounded-xl p-4 mb-6">
            <p className="text-amber text-xs">
              Private note. Not visible to client.
            </p>
          </div>

          <div className="prose prose-sm max-w-none">
            {(fullNotes[selectedNote.id] || selectedNote.preview).split("\n\n").map((para, i) => (
              <p key={i} className="text-slateM text-sm leading-relaxed mb-4">{para}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="px-5 lg:px-8 py-6 border-b border-border flex items-center justify-between">
        <h1 className="font-display text-2xl md:text-3xl font-[400] text-slate">Session Notes</h1>
        <button
          onClick={() => setIsNew(true)}
          className="bg-sage hover:bg-sageD text-cream font-[600] px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          New note
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-6">
        <div className="bg-amberL border border-amber/20 rounded-xl p-4 mb-6">
          <p className="text-amber text-xs leading-relaxed">
            Session notes are <strong>private</strong> and are never automatically shared with clients. Treat them with the same confidentiality as any clinical record.
          </p>
        </div>

        <div className="space-y-2">
          {sessionNotes.map((n) => (
            <button
              key={n.id}
              onClick={() => setSelectedNote(n)}
              className="w-full text-left bg-cream border border-border hover:border-sageMid rounded-2xl p-5 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-[600] text-slate group-hover:text-sage transition-colors">{n.clientName}</p>
                  <p className="text-slateM text-xs mt-0.5">{n.date} · {n.sessionType}</p>
                  <p className="text-slateM text-sm leading-relaxed mt-2 line-clamp-2">{n.preview}</p>
                </div>
                <span className={`flex-shrink-0 text-xs font-[500] px-2.5 py-1 rounded-full ${n.status === "Draft" ? "bg-amberL text-amber" : "bg-sageL text-sage"}`}>
                  {n.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
