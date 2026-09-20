"use client";

import { useState } from "react";
import { resources, type Resource } from "../data/mock";
import type { Page } from "@/lib/nav";
import Icon, { type IconName } from "../components/Icon";

interface ResourcesProps {
  navigate: (page: Page) => void;
}

const categories = ["All", "Anxiety", "Stress", "Sleep", "Work", "Mindfulness", "Relationships", "Depression"];
const formatIcons: Record<string, IconName> = {
  Article: "article",
  Guide: "guide",
  Exercise: "exercise",
  Video: "video",
  Audio: "audio",
};

export default function Resources({ navigate }: ResourcesProps) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string[]>(resources.filter(r => r.saved).map(r => r.id));
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filtered = resources.filter((r) => {
    const matchCat = category === "All" || r.category === category;
    const matchSearch = search === "" || r.title.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const toggleSave = (id: string) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  if (selectedResource) {
    return <ResourceDetail resource={selectedResource} onBack={() => setSelectedResource(null)} navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      {/* Header */}
      <div className="bg-sand border-b border-border">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-10">
          <h1 className="font-display text-3xl md:text-4xl font-[400] text-slate mb-2">Resource Library</h1>
          <p className="text-slateM">Explore articles, guides, and exercises at your own pace.</p>
          <div className="mt-5 relative max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slateL" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mental health resources..."
              className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm bg-cream focus:border-sage outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-8">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-[500] border transition-all ${
                category === c
                  ? "bg-sage text-cream border-sage"
                  : "border-border text-slateM hover:border-sageMid bg-cream"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Saved resources section */}
        {saved.length > 0 && category === "All" && search === "" && (
          <div className="mb-10">
            <h2 className="font-display text-xl font-[400] text-slate mb-4">Saved</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {resources.filter(r => saved.includes(r.id)).map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedResource(r)}
                  className="flex-shrink-0 w-56 text-left bg-cream border border-sageMid hover:border-sage rounded-[12px] overflow-hidden transition-all group"
                >
                  <div className="h-28 overflow-hidden bg-sand">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-[600] text-sage mb-1">{r.category}</p>
                    <p className="text-sm font-[500] text-slate leading-snug line-clamp-2">{r.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resource grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">

            <h3 className="font-display text-xl font-[400] text-slate mb-2">No resources found</h3>
            <p className="text-slateM text-sm mb-4">Try a different search or category.</p>
            <button onClick={() => { setSearch(""); setCategory("All"); }} className="text-sage font-[500] text-sm hover:underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <div key={r.id} className="bg-cream border border-border hover:border-sageMid rounded-[12px] overflow-hidden transition-all group flex flex-col">
                <div className="relative h-44 overflow-hidden bg-sand">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSave(r.id); }}
                    aria-label={saved.includes(r.id) ? "Remove from saved" : "Save resource"}
                    aria-pressed={saved.includes(r.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-cream/90 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
                  >
                    <Icon name="heart" className={`h-4 w-4 ${saved.includes(r.id) ? "fill-current text-terra" : "text-slateM"}`} />
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-[600] text-terra bg-terraL px-2.5 py-1 rounded-full">{r.category}</span>
                    <span className="flex items-center gap-1 text-xs text-slateL"><Icon name={formatIcons[r.format]} className="h-3.5 w-3.5" /> {r.format}</span>
                  </div>
                  <h3 className="font-[600] text-slate leading-snug mb-2 flex-1" style={{ textWrap: "balance" }}>{r.title}</h3>
                  <p className="text-slateM text-sm leading-relaxed mb-4 line-clamp-2">{r.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-slateL">{r.readTime}</span>
                    <button
                      onClick={() => setSelectedResource(r)}
                      className="text-sm font-[600] text-sage hover:text-sageD transition-colors"
                    >
                      Read →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ResourceDetail({ resource: r, onBack, navigate }: { resource: Resource; onBack: () => void; navigate: (page: Page) => void }) {
  const [saved, setSaved] = useState(r.saved);

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="max-w-2xl mx-auto px-5 lg:px-8 py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-slateM hover:text-slate mb-8 transition-colors">
          ← Resource Library
        </button>

        <div className="h-56 rounded-[12px] overflow-hidden bg-sand mb-8">
          <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-[600] text-terra bg-terraL px-2.5 py-1 rounded-full">{r.category}</span>
          <span className="text-xs text-slateL">{r.readTime}</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-[400] text-slate mb-3 leading-snug" style={{ textWrap: "balance" }}>
          {r.title}
        </h1>

        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-2 text-sm font-[500] px-3 py-1.5 rounded-lg border transition-all ${
              saved ? "border-terra text-terra bg-terraL" : "border-border text-slateM hover:bg-sand"
            }`}
          >
            <Icon name="heart" className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />{saved ? "Saved" : "Save"}
          </button>
        </div>

        <div className="prose-custom text-slateM leading-relaxed space-y-4 mb-12" style={{ maxWidth: "65ch" }}>
          <p>
            {r.description} Understanding this topic is an important first step in taking care of your mental health.
          </p>
          <p>
            Many people experience this without realising it's something that can be addressed. The good news is that with the right support and strategies, things can improve significantly.
          </p>
          <p>
            Research shows that a combination of self-awareness, practical tools, and professional support (when needed) can make a real difference. The key is to start where you are, not where you think you should be.
          </p>
          <h2 className="font-display text-2xl font-[400] text-slate mt-8">What you can do</h2>
          <ul className="space-y-2 text-slateM">
            <li className="flex gap-2"><span className="text-sage mt-1">→</span> Notice the patterns without judgement</li>
            <li className="flex gap-2"><span className="text-sage mt-1">→</span> Start with small, consistent steps</li>
            <li className="flex gap-2"><span className="text-sage mt-1">→</span> Reach out to someone you trust</li>
            <li className="flex gap-2"><span className="text-sage mt-1">→</span> Consider speaking with a professional</li>
          </ul>
        </div>

        <div className="bg-sageL border border-sageMid rounded-[12px] p-6 text-center">
          <p className="font-[600] text-slate mb-1">Ready to talk to someone?</p>
          <p className="text-slateM text-sm mb-4">A counselor can give you personalised guidance based on your specific situation.</p>
          <button
            onClick={() => navigate("counselors")}
            className="bg-sage hover:bg-sageD text-cream font-[600] px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Find a Counselor
          </button>
        </div>

        <div className="mt-10">
          <p className="text-sm font-[600] text-slateM mb-4">Related resources</p>
          <div className="flex gap-2 flex-wrap">
            {r.tags.map((tag) => (
              <span key={tag} className="text-xs bg-sand text-slateM px-3 py-1.5 rounded-full border border-border">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
