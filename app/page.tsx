import Link from "next/link";
import EstaWordmark from "@/components/EstaWordmark";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF7] px-6">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full text-center">
        <EstaWordmark className="h-8" />

        <div className="space-y-2">
          <h1
            className="text-4xl text-[#0A0E0F] leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Tenant Payment Portal
          </h1>
          <p className="text-[#5C6566] text-sm leading-relaxed">
            Secure AC sub-metering bill payments for Example Utilities buildings across Dubai.
          </p>
        </div>

        <Link
          href="/pay/EST-2026-04-8821"
          className="w-full flex items-center justify-center gap-2 bg-[#0A0E0F] text-white rounded-[12px] h-14 text-sm font-medium tracking-wide transition-all duration-200 hover:bg-[#1a2425] active:scale-[0.98]"
        >
          View demo invoice
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        <p className="text-[#5C6566] text-xs">
          Example Utilities (fictional) - Dubai
        </p>
      </div>
    </main>
  );
}
