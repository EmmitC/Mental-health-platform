"use client";

import { useState } from "react";
import type { Page } from "@/lib/nav";
import { toast } from "../components/Toast";

interface AdminResourcesProps {
  navigate: (page: Page) => void;
}

type ContentStatus = "Published" | "Draft" | "Review" | "Archived";

interface ContentItem {
  id: string;
  title: string;
  category: string;
  format: string;
  status: ContentStatus;
  author: string;
  publishedAt: string;
}

const initialContent: ContentItem[] = [
  { id: "r1", title: "Understanding Anxiety: A Practical Guide", category: "Anxiety", format: "Article", status: "Published", author: "Dr. Grace Nakamya", publishedAt: "15 Aug 2026" },
  { id: "r2", title: "Managing Stress at Work", category: "Stress", format: "Article", status: "Published", author: "Mr. Samuel Ochieng", publishedAt: "10 Aug 2026" },
  { id: "r3", title: "Building Better Sleep Habits", category: "Sleep", format: "Guide", status: "Published", author: "Dr. Amina Hassan", publishedAt: "5 Aug 2026" },
  { id: "r4", title: "Mindfulness for Beginners", category: "Mindfulness", format: "Exercise", status: "Draft", author: "Dr. Grace Nakamya", publishedAt: "—" },
  { id: "r5", title: "Understanding Grief", category: "Grief", format: "Article", status: "Review", author: "Mr. Samuel Ochieng", publishedAt: "—" },
  { id: "r6", title: "Healthy Relationship Patterns", category: "Relationships", format: "Guide", status: "Draft", author: "Dr. Amina Hassan", publishedAt: "—" },
  { id: "r7", title: "Recognising Burnout Early", category: "Work", format: "Article", status: "Archived", author: "Dr. Grace Nakamya", publishedAt: "Jan 2025" },
];

const statusBadge: Record<ContentStatus, string> = {
  Published: "bg-sageL text-sage",
  Draft: "bg-sand text-slateM",
  Review: "bg-amberL text-amber",
  Archived: "bg-sand text-slateXL",
};

export default function AdminResources({ navigate: _navigate }: AdminResourcesProps) {
  const [content, setContent] = useState(initialContent);
  const [filterStatus, setFilterStatus] = useState<"All" | ContentStatus>("All");

  const filtered = filterStatus === "All" ? content : content.filter((c) => c.status === filterStatus);

  const publish = (id: string) =>
    setContent((prev) => prev.map((c) => c.id === id ? { ...c, status: "Published" as ContentStatus, publishedAt: "Today" } : c));
  const archive = (id: string) =>
    setContent((prev) => prev.map((c) => c.id === id ? { ...c, status: "Archived" as ContentStatus } : c));

  const counts: Record<string, number> = {
    Published: content.filter((c) => c.status === "Published").length,
    Draft: content.filter((c) => c.status === "Draft").length,
    Review: content.filter((c) => c.status === "Review").length,
    Archived: content.filter((c) => c.status === "Archived").length,
  };

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="px-5 lg:px-8 py-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl md:text-3xl font-[400] text-slate">Resources</h1>
          <button onClick={() => toast("New resource draft created")} className="bg-sage hover:bg-sageD text-cream font-[600] px-5 py-2.5 rounded-xl text-sm transition-colors">
            + New resource</button>
        </div>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2">
          {(["All", "Published", "Review", "Draft", "Archived"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-3 py-1.5 rounded-full text-sm font-[500] transition-all ${
                filterStatus === f ? "bg-sage text-cream" : "bg-sand border border-border text-slateM hover:border-sageMid"
              }`}
            >
              {f}
              {f !== "All" && counts[f] > 0 && (
                <span className="ml-1 text-[10px]">({counts[f]})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-6">
        {/* Summary metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(counts).map(([label, val]) => (
            <div key={label} className="bg-cream border border-border rounded-xl p-4 text-center">
              <p className="font-display text-3xl font-[300] text-slate">{val}</p>
              <p className="text-slateM text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Content list */}
        <div className="space-y-2">
          {filtered.map((c) => (
            <div key={c.id} className="bg-cream border border-border hover:border-sageMid rounded-[12px] p-5 transition-all">
              <div className="flex items-start gap-4 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-[600] text-terra bg-terraL px-2 py-0.5 rounded-full">{c.category}</span>
                    <span className="text-[10px] font-[500] text-slateL bg-sand px-2 py-0.5 rounded-full">{c.format}</span>
                  </div>
                  <p className="font-[600] text-slate">{c.title}</p>
                  <p className="text-slateM text-xs mt-1">By {c.author} · {c.publishedAt !== "—" ? `Published ${c.publishedAt}` : "Not published"}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-[500] px-2.5 py-1 rounded-full ${statusBadge[c.status]}`}>
                    {c.status}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                {(c.status === "Draft" || c.status === "Review") && (
                  <button onClick={() => publish(c.id)} className="text-xs font-[600] text-sage border border-sageMid px-3 py-1.5 rounded-lg hover:bg-sageL transition-all">
                    Publish
                  </button>
                )}
                <button onClick={() => toast("Editing enabled")} className="text-xs font-[500] text-slateM border border-border px-3 py-1.5 rounded-lg hover:bg-sand transition-all">
                  Edit</button>
                {c.status !== "Archived" && (
                  <button onClick={() => archive(c.id)} className="text-xs font-[500] text-slateL border border-border px-3 py-1.5 rounded-lg hover:bg-sand transition-all">
                    Archive
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
