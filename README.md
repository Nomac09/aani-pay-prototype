# Aani pay prototype

Concept for letting tenants in Dubai pay utility invoices through **Aani**, the UAE's instant payment rail run by the Central Bank's Al Etihad Payments, instead of card payments or bank transfers.

> **Unofficial concept.** Not affiliated with Aani, Al Etihad Payments or any bank. "Example Utilities" is a fictional biller, and the invoice is demo data.

## What it shows

- An invoice page with consumption breakdown and history sparkline.
- A "Pay with Aani" flow: a QR code for the Aani payment URI, copyable alias and reference, and a bank picker with step-by-step instructions per bank app.
- A bank-transfer fallback for tenants not yet enrolled in Aani.

## Research behind it

Before the UI, I studied how far a web page can take a tenant into each bank's app. Findings are kept as comments in `lib/banks.ts`: as of May 2026, Aani enrolment screens are not directly deep-linkable, so the deep link only opens the bank app at its landing screen, and the page has to guide the user the rest of the way. That is why the flow shows printed steps per bank rather than promising a one-tap payment.

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, `qrcode.react`.

```bash
npm install
npm run dev     # then open /pay/EST-2026-04-8821
```

---

*Prototype de paiement de factures de locataires via Aani, le paiement instantané de la Banque centrale des Émirats : facture, QR code, parcours guidé par banque et virement en solution de repli. Concept non officiel, données de démonstration.*

Built by **Nasim Sawalma** · [GitHub](https://github.com/Nomac09) · [LinkedIn](https://www.linkedin.com/in/nasim-sawalma)
