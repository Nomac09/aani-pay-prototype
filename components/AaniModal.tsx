"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { X, ArrowLeft, ExternalLink } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { Invoice } from "@/lib/demo";
import { BANKS, type Bank } from "@/lib/banks";

interface Props {
  invoice: Invoice;
  onClose: () => void;
}

type Tab = "have" | "new";
type BankStage = "picker" | "instructions";

// ---------------------------------------------------------------------------
// Tab toggle
// ---------------------------------------------------------------------------

function TabToggle({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div
      className="relative flex rounded-[10px] p-1"
      style={{ background: "rgba(10,14,15,0.06)" }}
    >
      <motion.div
        className="absolute top-1 bottom-1 rounded-[8px] bg-white"
        style={{
          boxShadow: "0 1px 3px rgba(10,14,15,0.1)",
          left: active === "have" ? "4px" : "50%",
          right: active === "have" ? "50%" : "4px",
        }}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      {(["have", "new"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className="relative z-10 flex-1 text-sm font-medium py-2 px-3 rounded-[8px] transition-colors cursor-pointer"
          style={{ color: active === tab ? "#0A0E0F" : "#5C6566" }}
        >
          {tab === "have" ? "I have Aani" : "I'm new to Aani"}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// "I have Aani" content
// ---------------------------------------------------------------------------

function HaveAaniContent({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="rounded-[16px] p-4 bg-white"
        style={{ boxShadow: "0 2px 12px rgba(10,14,15,0.08)", border: "1px solid rgba(10,14,15,0.07)" }}
      >
        <QRCodeSVG
          value={invoice.aaniUri}
          size={200}
          bgColor="#ffffff"
          fgColor="#0A0E0F"
          level="M"
          style={{ display: "block" }}
        />
      </div>

      <div className="text-center space-y-1">
        <p className="text-sm text-[#5C6566]">
          Open your bank app and scan, or tap below to launch directly.
        </p>
        <p className="text-xs text-[#5C6566] opacity-70">
          {invoice.tenant}&nbsp;&nbsp;·&nbsp;&nbsp;{invoice.aaniAlias}&nbsp;&nbsp;·&nbsp;&nbsp;AED {invoice.totalIfAani.toFixed(2)}
        </p>
      </div>

      <a
        href={invoice.aaniUri}
        className="w-full h-14 flex items-center justify-center rounded-[12px] text-white font-semibold text-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #0F7B5F 0%, #14A37A 100%)" }}
      >
        Open my bank app
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bank logo placeholder
// ---------------------------------------------------------------------------

function BankLogo({ bank, size }: { bank: Bank; size: "sm" | "lg" }) {
  const dim = size === "lg" ? "w-10 h-10 text-lg rounded-[10px]" : "w-8 h-8 text-sm rounded-[8px]";
  const letter = bank.id === "other" ? "?" : bank.name[0];
  return (
    <div
      className={`${dim} flex items-center justify-center flex-shrink-0`}
      style={{ background: bank.brandColor }}
    >
      <span
        style={{ fontFamily: "var(--font-instrument-serif)", color: "white", lineHeight: 1 }}
      >
        {letter}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stage A — bank picker grid
// ---------------------------------------------------------------------------

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
};

function BankPickerStage({ onSelect }: { onSelect: (bank: Bank) => void }) {
  return (
    <motion.div
      key="picker"
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -24, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="grid gap-2"
        style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {BANKS.map((bank) => (
          <motion.button
            key={bank.id}
            variants={tileVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(bank)}
            className="flex flex-col items-center gap-2 p-3 rounded-[12px] cursor-pointer text-center"
            style={{ border: "1px solid rgba(10,14,15,0.08)", background: "white" }}
          >
            <BankLogo bank={bank} size="sm" />
            <span className="text-[11px] text-[#0A0E0F] font-medium leading-tight">
              {bank.name}
            </span>
          </motion.button>
        ))}
      </motion.div>

      <p className="text-xs text-[#5C6566] text-center mt-4">
        Don't see your bank? Tap Other.
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Stage B — bank-specific instructions
// ---------------------------------------------------------------------------

function openBankApp(bank: Bank) {
  const isAndroid = /android/i.test(navigator.userAgent);
  const storeUrl = isAndroid ? bank.androidUrl : bank.iosUrl;
  window.location.href = bank.deepLink;
  // Fallback to store if deep link didn't open the app
  setTimeout(() => {
    window.location.href = storeUrl;
  }, 1500);
}

function BankInstructionsStage({
  bank,
  onBack,
  onEnrolled,
}: {
  bank: Bank;
  onBack: () => void;
  onEnrolled: () => void;
}) {
  return (
    <motion.div
      key="instructions"
      initial={{ x: 24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 24, opacity: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
    >
      {/* Bank header row */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer flex-shrink-0 hover:bg-[rgba(10,14,15,0.06)] transition-colors"
          aria-label="Back to bank list"
        >
          <ArrowLeft size={16} className="text-[#5C6566]" strokeWidth={2} />
        </button>
        <BankLogo bank={bank} size="lg" />
        <span className="text-base font-semibold text-[#0A0E0F]">{bank.name}</span>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-0 mb-6">
        {bank.steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold flex-shrink-0 mt-0.5"
                style={{ background: "rgba(15,123,95,0.10)", color: "#0F7B5F" }}
              >
                {i + 1}
              </span>
              {i < bank.steps.length - 1 && (
                <div
                  className="w-px flex-1 my-1.5"
                  style={{ background: "rgba(10,14,15,0.08)", minHeight: "16px" }}
                />
              )}
            </div>
            <div className={i < bank.steps.length - 1 ? "pb-4" : ""}>
              <p className="text-sm text-[#0A0E0F] leading-relaxed">{step}</p>
              {i === bank.steps.length - 1 && bank.helpUrl && (
                <a
                  href={bank.helpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#0F7B5F] font-medium mt-1.5 hover:underline"
                >
                  <ExternalLink size={11} strokeWidth={2} />
                  aep.ae/services/aani
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Primary CTA */}
      <button
        onClick={() => openBankApp(bank)}
        className="w-full h-14 flex items-center justify-center rounded-[12px] text-white font-semibold text-sm mb-3 cursor-pointer transition-opacity hover:opacity-90 active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #0F7B5F 0%, #14A37A 100%)" }}
      >
        Open {bank.name} app
      </button>

      {/* Secondary CTA */}
      <button
        onClick={onEnrolled}
        className="w-full h-11 flex items-center justify-center rounded-[12px] text-sm font-medium cursor-pointer hover:bg-[rgba(10,14,15,0.04)] transition-colors"
        style={{ color: "#5C6566", border: "1px solid rgba(10,14,15,0.08)" }}
      >
        I've enrolled - pay now
      </button>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// "I'm new to Aani" orchestrator
// ---------------------------------------------------------------------------

function NewToAaniContent({ onEnrolled }: { onEnrolled: () => void }) {
  const [stage, setStage] = useState<BankStage>("picker");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  function handleSelectBank(bank: Bank) {
    setSelectedBank(bank);
    setStage("instructions");
  }

  function handleBack() {
    setStage("picker");
  }

  return (
    <div style={{ overflowX: "clip" }}>
      <AnimatePresence mode="wait" initial={false}>
        {stage === "picker" ? (
          <BankPickerStage key="picker" onSelect={handleSelectBank} />
        ) : selectedBank ? (
          <BankInstructionsStage
            key="instructions"
            bank={selectedBank}
            onBack={handleBack}
            onEnrolled={onEnrolled}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modal shell
// ---------------------------------------------------------------------------

export default function AaniModal({ invoice, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("have");
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 200], [1, 0]);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  function handleDragEnd(_: unknown, info: { offset: { y: number } }) {
    if (info.offset.y > 80) onClose();
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose();
  }

  return (
    <motion.div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        backgroundColor: "rgba(10,14,15,0.4)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="relative w-full sm:max-w-md sm:mx-4 bg-white rounded-t-[24px] sm:rounded-[20px] flex flex-col"
        style={{
          y,
          opacity: typeof window !== "undefined" && window.innerWidth < 640 ? opacity : 1,
          boxShadow: "0 -4px 24px rgba(10,14,15,0.12), 0 0 0 1px rgba(10,14,15,0.06)",
          maxHeight: "90svh",
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 300 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(10,14,15,0.15)" }} />
        </div>

        {/* Fixed header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-4 sm:pt-6 flex-shrink-0">
          <h2
            className="text-xl text-[#0A0E0F] tracking-tight"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Pay with Aani
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-[rgba(10,14,15,0.06)] transition-colors"
            aria-label="Close"
          >
            <X size={18} className="text-[#5C6566]" strokeWidth={1.75} />
          </button>
        </div>

        {/* Fixed tab toggle */}
        <div className="px-6 pb-3 flex-shrink-0">
          <TabToggle active={tab} onChange={setTab} />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto min-h-0 px-6 pb-8 pt-2">
          <AnimatePresence mode="wait" initial={false}>
            {tab === "have" ? (
              <motion.div
                key="have"
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 24, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <HaveAaniContent invoice={invoice} />
              </motion.div>
            ) : (
              <motion.div
                key="new"
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <NewToAaniContent onEnrolled={() => setTab("have")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
