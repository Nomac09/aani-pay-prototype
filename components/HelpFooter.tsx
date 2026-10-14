import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "97145550123";

export default function HelpFooter() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <p className="text-sm text-[#5C6566]">Questions about your bill?</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2.5 rounded-[10px] transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
        style={{ background: "#25D366" }}
      >
        <MessageCircle size={16} strokeWidth={2} />
        WhatsApp support
      </a>
      <p className="text-xs text-[#5C6566] opacity-60">
        Example Utilities LLC (fictional) - Dubai, UAE
      </p>
    </div>
  );
}
