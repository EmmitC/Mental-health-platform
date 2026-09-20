"use client";

import { useEffect, useRef, useState } from "react";
import { messages, type Message } from "../data/mock";
import type { Page } from "@/lib/nav";
import Icon from "../components/Icon";
import Counter from "../components/animation/Counter";

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
      <div className="h-screen flex flex-col bg-cream pb-[84px] lg:pb-0">
        {/* Convo Header: kit dark band */}
        <div className="light-scope flex items-center gap-4 bg-slate px-5 py-4 text-cream">
          <button onClick={() => setActiveConvo(null)} aria-label="Back to conversations" className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 transition-colors hover:bg-cream/10">
            <Icon name="chevL" className="h-5 w-5" />
          </button>
          <img src={activeConvo.counselor.photo} alt={activeConvo.counselor.name} className="h-11 w-11 rounded-full object-cover object-top" />
          <div className="flex-1">
            <p className="text-sm font-[700]">{activeConvo.counselor.name}</p>
            <p className="text-xs opacity-75">{activeConvo.counselor.credentials}</p>
          </div>
        </div>

        {/* Safety notice */}
        <div className="border-b border-border bg-sunL px-5 py-2.5 dark:bg-amberL">
          <p className="text-xs font-[500] text-slate">
            Messages are not monitored 24/7. If you are experiencing an emergency,{" "}
            <button onClick={() => navigate("crisis")} className="underline font-[600]">get immediate help</button>.
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
          {thread.map(({ id, from, text, time }) => (
            <div key={id} className={`flex ${from === "me" ? "justify-end" : "justify-start"} gap-3`}>
              {from === "counselor" && (
                <img src={activeConvo.counselor.photo} alt="" className="h-9 w-9 flex-shrink-0 self-end rounded-full object-cover object-top" />
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
        <div className="light-scope mb-6 rounded-[12px] bg-ember p-6 text-slate">
          <h1 className="text-sm font-[700]">My conversations</h1>
          <div className="mt-3 flex items-end gap-8">
            <div>
              <p className="font-display text-6xl font-[700] leading-none"><Counter value={messages.length} /></p>
              <p className="mt-1 text-sm">{messages.length === 1 ? "conversation" : "conversations"}</p>
            </div>
            <div>
              <p className="font-display text-3xl font-[700] leading-none">{messages.reduce((n, m) => n + m.unread, 0)}</p>
              <p className="mt-1 text-sm">unread</p>
            </div>
          </div>
          <p className="mt-4 text-xs">Message your counselor between sessions.</p>
        </div>

        <div className="mb-6 rounded-[12px] border border-border bg-sunL p-4 dark:bg-amberL">
          <p className="text-xs leading-relaxed text-slate">
            <strong>Note:</strong> Messages are not monitored 24/7. If you are experiencing an emergency or crisis, please{" "}
            <button onClick={() => navigate("crisis")} className="font-[700] underline">get immediate help</button>.
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
                className="flex w-full items-center gap-4 rounded-[12px] border border-border bg-cream p-4 text-left transition-all hover:-translate-y-0.5 hover:border-sageMid"
              >
                <div className="relative flex-shrink-0">
                  <img src={m.counselor.photo} alt={m.counselor.name} className="h-14 w-14 rounded-full object-cover object-top" />
                  {m.unread > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ember text-[10px] font-[700] text-[#3C2010]">
                      {m.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-[700] text-slate">{m.counselor.name}</p>
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
