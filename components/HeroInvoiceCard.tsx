"use client";

import { useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { daysUntil } from "@/lib/utils";
import type { Invoice } from "@/lib/demo";

interface Props {
  invoice: Invoice;
}

function CountUp({ to, duration = 0.8 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        node.textContent = value.toFixed(2);
      },
    });
    return () => controls.stop();
  }, [to, duration]);

  return <span ref={ref}>0.00</span>;
}

interface DueDateProps {
  dueDate: string;
  display: string;
}

function DueDateRow({ dueDate, display }: DueDateProps) {
  const days = daysUntil(dueDate);
  const totalDays = 30;
  const elapsed = Math.max(0, totalDays - days);
  const progress = Math.min(elapsed / totalDays, 1);
  const urgentColor = days <= 3 ? "#C0392B" : days <= 7 ? "#B89A6A" : "#0F7B5F";

  const r = 10;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex items-center gap-2 text-[#5C6566] text-sm">
      <div className="relative w-6 h-6 flex-shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" className="-rotate-90">
          <circle cx="12" cy="12" r={r} fill="none" stroke="rgba(10,14,15,0.08)" strokeWidth="2.5" />
          <motion.circle
            cx="12"
            cy="12"
            r={r}
            fill="none"
            stroke={urgentColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.4 }}
          />
        </svg>
      </div>
      <span>
        Due {display}
        <span className="mx-1.5 opacity-40">·</span>
        <span style={{ color: urgentColor }} className="font-medium">
          {days} {days === 1 ? "day" : "days"} left
        </span>
      </span>
    </div>
  );
}

export default function HeroInvoiceCard({ invoice }: Props) {
  return (
    <div
      className="relative rounded-[16px] p-8 sm:p-12 bg-white overflow-hidden"
      style={{
        boxShadow: "0 1px 2px rgba(10,14,15,0.04), 0 8px 24px rgba(10,14,15,0.07)",
        border: "1px solid rgba(10,14,15,0.06)",
      }}
    >
      {/* Subtle gradient accent border top */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-[16px]"
        style={{ background: "linear-gradient(90deg, #0F7B5F 0%, #14A37A 50%, #B89A6A 100%)" }}
      />

      {/* Invoice label */}
      <p className="text-[#5C6566] text-xs font-medium tracking-wide mb-5">
        Invoice {invoice.id} &nbsp;·&nbsp; {invoice.building} &nbsp;·&nbsp; Unit {invoice.unit}
      </p>

      {/* Hero amount */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
      >
        <div
          className="text-[#0A0E0F] leading-none tracking-tight mb-1"
          style={{ fontFamily: "var(--font-instrument-serif)", fontSize: "clamp(3rem, 12vw, 4.5rem)" }}
        >
          AED <CountUp to={invoice.totalIfAani} duration={0.85} />
        </div>
      </motion.div>

      {/* Strikethrough + discount pill */}
      <div className="flex flex-wrap items-center gap-2 mt-3 mb-6">
        <span className="text-[#5C6566] text-base line-through">
          AED {invoice.totalDue.toFixed(2)}
        </span>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: "rgba(184,154,106,0.12)", color: "#B89A6A", border: "1px solid rgba(184,154,106,0.25)" }}
        >
          AED {invoice.aaniDiscount.toFixed(0)} off when you pay with Aani
        </span>
      </div>

      <DueDateRow dueDate={invoice.dueDateIso} display={invoice.dueDateDisplay} />
    </div>
  );
}
