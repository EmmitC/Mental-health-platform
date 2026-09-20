"use client";

import { useEffect, useRef, useState } from "react";
import { messages, type Message } from "../data/mock";
import type { Page } from "@/lib/nav";
import Icon from "../components/Icon";

interface MessagesProps {
  navigate: (page: Page) => void;
}

export default function Messages({ navigate }: MessagesProps) {
  const [activeConvo, setActiveConvo] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [sent, setSent] = useState<Record<string, Message["messages"]>>({});
  const endRef = useRef<HTMLDivElement>(null);

  const thread = activeConvo ? [...activeConvo.messages, ...(sent[activeConvo.id] ?? [])] : [];
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [thread.length, activeConvo]);

  const send = () => {
    const text = newMessage.trim();
    if (!text || !activeConvo) return;
    const time = new Date().toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true });
    setSent((prev) => ({
      ...prev,
      [activeConvo.id]: [...(prev[activeConvo.id] ?? []), { id: `me-${Date.now()}`, from: "me", text, time: `Today ${time}` }],
    }));
    setNewMessage("");
  };

  if (activeConvo) {
    return (
      <div className="h-screen flex flex-col bg-cream pb-[68px] lg:pb-0">
        {/* Convo Header */}
        <div className="flex items-center gap-4 px-5 py-4 border-b border-border bg-cream">
          <button onClick={() => setActiveConvo(null)} aria-label="Back to conversations" className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full text-slateM hover:bg-sand hover:text-slate transition-colors"><Icon name="chevL" className="h-5 w-5" /></button>
          <img src={activeConvo.counselor.photo} alt={activeConvo.counselor.name} className="w-10 h-10 rounded-xl object-cover object-top bg-sand" />
          <div className="flex-1">
            <p className="font-[600] text-slate text-sm">{activeConvo.counselor.name}</p>
            <p className="text-slateL text-xs">{activeConvo.counselor.credentials}</p>
          </div>
        </div>

        {/* Safety notice */}
        <div className="bg-amberL border-b border-amber/20 px-5 py-2.5">
          <p className="text-amber text-xs font-[500]">
            Messages are not monitored 24/7. If you are experiencing an emergency,{" "}
            <button onClick={() => navigate("crisis")} className="underline font-[600]">get immediate help</button>.
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
          {thread.map(({ id, from, text, time }) => (
            <div key={id} className={`flex ${from === "me" ? "justify-end" : "justify-start"} gap-3`}>
              {from === "counselor" && (
                <img src={activeConvo.counselor.photo} alt="" className="w-8 h-8 rounded-lg object-cover object-top bg-sand flex-shrink-0 self-end" />
              )}
              <div className={`max-w-[70%] ${from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-3 rounded-[12px] text-sm leading-relaxed ${
                    from === "me"
                      ? "light-scope bg-ember text-slate rounded-br-sm"
                      : "bg-sand border border-border text-slate rounded-bl-sm"
                  }`}
                >
                  {text}
                </div>
                <span className="text-[10px] text-slateL">{time}</span>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-border bg-cream">
          <div className="flex gap-3 items-end">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              aria-label="Message" placeholder="Type a message..."
              rows={1}
              className="flex-1 border border-border focus:border-sage rounded-[20px] px-4 py-3 text-sm bg-cream outline-none resize-none transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button
              aria-label="Send message"
              disabled={!newMessage.trim()}
              className="w-11 h-11 bg-sage hover:bg-sageD rounded-full text-cream flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40"
              onClick={send}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-20 lg:pb-8">
      <div className="max-w-2xl mx-auto px-5 lg:px-8 py-8">
        <h1 className="font-display text-3xl md:text-4xl font-[400] text-slate mb-2">Messages</h1>
        <p className="text-slateM text-sm mb-8">Communicate with your counselor between sessions.</p>

        <div className="bg-amberL border border-amber/20 rounded-xl p-4 mb-6">
          <p className="text-amber text-xs leading-relaxed">
            <strong>Note:</strong> Messages are not monitored 24/7. If you are experiencing an emergency or crisis, please{" "}
            <button onClick={() => navigate("crisis")} className="underline font-[600]">get immediate help</button>.
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-20">

            <h3 className="font-display text-xl font-[400] text-slate mb-2">No conversations yet</h3>
            <p className="text-slateM text-sm max-w-xs mx-auto leading-relaxed">
              Once you connect with a counselor, your conversations will appear here.
            </p>
            <button onClick={() => navigate("counselors")} className="mt-6 bg-sage text-cream font-[600] px-5 py-2.5 rounded-xl text-sm hover:bg-sageD transition-colors">
              Find a Counselor
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveConvo(m)}
                className="w-full flex items-center gap-4 p-4 bg-cream border border-border hover:border-sageMid rounded-[12px] transition-all text-left"
              >
                <div className="relative flex-shrink-0">
                  <img src={m.counselor.photo} alt={m.counselor.name} className="w-12 h-12 rounded-xl object-cover object-top bg-sand" />
                  {m.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-terra text-cream text-[10px] font-[700] rounded-full flex items-center justify-center">
                      {m.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-[600] text-slate text-sm">{m.counselor.name}</p>
                    <span className="text-xs text-slateL flex-shrink-0">{m.time}</span>
                  </div>
                  <p className="text-slateM text-sm truncate">{m.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
