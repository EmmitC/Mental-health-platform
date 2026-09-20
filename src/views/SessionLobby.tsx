"use client";

import { useState, useEffect } from "react";
import type { Page } from "@/lib/nav";
import Icon, { type IconName } from "../components/Icon";

interface SessionLobbyProps {
  navigate: (page: Page) => void;
}

const SESSION_START_MINUTES = 8;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function SessionLobby({ navigate }: SessionLobbyProps) {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_START_MINUTES * 60 + 32);
  const [micOk, setMicOk] = useState(false);
  const [camOk, setCamOk] = useState(false);
  const [joined, setJoined] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (!joined) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [joined]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const canJoin = secondsLeft <= 10 * 60;

  if (joined) {
    return (
      <div className="min-h-screen bg-slate flex flex-col">
        {/* Minimal session UI */}
        <div className="flex-1 flex items-center justify-center bg-slate relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-slateM mx-auto mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop&crop=face&auto=format"
                  alt="Dr. Grace Nakamya"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-cream/60 text-sm">Dr. Grace Nakamya</p>
              <p className="text-cream/70 text-xs mt-1">Connecting...</p>
            </div>
          </div>

          {/* Self preview */}
          <div className="absolute bottom-6 right-6 w-32 h-24 bg-slateM rounded-xl overflow-hidden border-2 border-cream/20">
            <div className="w-full h-full flex items-center justify-center text-cream/70 text-xs">{camOff ? "Camera off" : "You"}</div>
          </div>

          {/* Session timer */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate/80 text-cream text-xs font-mono px-3 py-1.5 rounded-full border border-cream/20">
            {pad(Math.floor(elapsed / 60))}:{pad(elapsed % 60)}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate border-t border-cream/10 px-6 py-4">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <div className="flex gap-3">
              {([
                { label: muted ? "Unmute" : "Mute", icon: "mic" as IconName, off: muted, toggle: () => setMuted(!muted) },
                { label: camOff ? "Start video" : "Stop video", icon: "camera" as IconName, off: camOff, toggle: () => setCamOff(!camOff) },
                { label: sharing ? "Stop share" : "Share", icon: "screen" as IconName, off: !sharing, toggle: () => setSharing(!sharing) },
              ]).map(({ label, icon, off, toggle }) => (
                <button
                  key={label}
                  onClick={toggle}
                  aria-label={label}
                  className={`flex flex-col items-center gap-1 rounded-xl w-16 h-14 justify-center transition-colors ${
                    off ? "bg-cream/10 text-cream/60 hover:bg-cream/20" : "bg-sage text-cream hover:bg-sageD"
                  }`}
                >
                  <Icon name={icon} className="h-5 w-5" />
                  <span className="text-[10px]">{label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate("appointments")}
              className="bg-crisis hover:bg-crisisD text-cream font-[600] text-sm px-5 py-3 rounded-xl transition-colors"
            >
              Leave session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-5">
      <div className="max-w-md w-full">
        {/* Counselor info */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-[12px] overflow-hidden mx-auto mb-4 bg-slateM">
            <img
              src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop&crop=face&auto=format"
              alt="Dr. Grace Nakamya"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <p className="text-cream font-[600]">Dr. Grace Nakamya</p>
          <p className="text-cream/70 text-sm">Individual Counseling · 50 min</p>
        </div>

        {/* Countdown */}
        <div className="text-center mb-8">
          {canJoin ? (
            <p className="text-sageMid font-[500] text-sm mb-2">Your session is ready</p>
          ) : (
            <p className="text-cream/70 text-sm mb-2">Your session starts in</p>
          )}
          <p className="font-display text-7xl font-[300] text-cream tabular-nums tracking-tight leading-none">
            {pad(mins)}:{pad(secs)}
          </p>
          {!canJoin && (
            <p className="text-cream/60 text-xs mt-3">
              You can join up to 10 minutes early
            </p>
          )}
        </div>

        {/* Device checks */}
        <div className="bg-cream/5 border border-cream/10 rounded-[12px] p-5 mb-6">
          <p className="text-cream/60 text-xs font-[600] uppercase tracking-wide mb-4">Check your setup</p>
          <div className="space-y-3">
            <button
              onClick={() => setMicOk(!micOk)}
              className="w-full flex items-center gap-3 text-left group"
            >
              <span className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-[11px] transition-colors ${
                micOk ? "bg-success border-success text-cream" : "border-cream/20 text-cream/60 group-hover:border-cream/40"
              }`}>
                {micOk && <Icon name="check" className="h-3 w-3" />}
              </span>
              <span className={`text-sm transition-colors ${micOk ? "text-cream" : "text-cream/50"}`}>
                Microphone working
              </span>
            </button>
            <button
              onClick={() => setCamOk(!camOk)}
              className="w-full flex items-center gap-3 text-left group"
            >
              <span className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-[11px] transition-colors ${
                camOk ? "bg-success border-success text-cream" : "border-cream/20 text-cream/60 group-hover:border-cream/40"
              }`}>
                {camOk && <Icon name="check" className="h-3 w-3" />}
              </span>
              <span className={`text-sm transition-colors ${camOk ? "text-cream" : "text-cream/50"}`}>
                Camera working
              </span>
            </button>
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-success border-success border flex-shrink-0 flex items-center justify-center text-[11px] text-cream">
                <Icon name="check" className="h-3 w-3" />
              </span>
              <span className="text-sm text-cream">Internet connection stable</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setJoined(true)}
          disabled={!canJoin}
          className={`w-full py-4 rounded-xl font-[600] text-sm transition-all ${
            canJoin
              ? "bg-sage hover:bg-sageD text-cream"
              : "bg-cream/10 text-cream/50 cursor-not-allowed"
          }`}
        >
          {canJoin ? "Join session" : `Join in ${pad(mins)}:${pad(secs)}`}
        </button>

        <div className="mt-6 text-center space-y-3">
          <button
            onClick={() => navigate("crisis")}
            className="block mx-auto text-[#FF9C8F] text-xs font-[500] hover:underline"
          >
            Need immediate help?
          </button>
          <button
            onClick={() => navigate("appointments")}
            className="block mx-auto text-cream/60 text-xs hover:text-cream transition-colors"
          >
            Cancel and return to appointments
          </button>
        </div>
      </div>
    </div>
  );
}
