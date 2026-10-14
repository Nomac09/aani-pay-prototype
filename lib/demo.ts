export const DEMO_INVOICE = {
  id: "EST-2026-04-8821",
  tenant: "Aisha Al Marri",
  building: "Marina Heights Tower",
  location: "Dubai Marina",
  unit: "2104",
  period: "April 2026",
  consumptionKwh: 412,
  serviceFee: 30.00,
  consumptionCharge: 184.20,
  subtotal: 214.20,
  vat: 10.71,
  totalDue: 224.91,
  aaniDiscount: 15.00,
  totalIfAani: 209.91,
  dueDateIso: "2026-05-15",
  dueDateDisplay: "15 May 2026",
  iban: "AE12 0331 2345 6789 1234 567",
  ibanBank: "Mashreq Bank",
  reference: "EST-2026-04-8821",
  aaniAlias: "payments@example.ae",
  aaniUri: "aani://pay?alias=payments@example.ae&amount=209.91&ref=EST-2026-04-8821",
} as const;

export type Invoice = typeof DEMO_INVOICE;

export const SPARKLINE_POINTS = [
  { month: "Nov", kwh: 338 },
  { month: "Dec", kwh: 291 },
  { month: "Jan", kwh: 264 },
  { month: "Feb", kwh: 247 },
  { month: "Mar", kwh: 389 },
  { month: "Apr", kwh: 412 },
] as const;

export function getInvoice(id: string): Invoice | null {
  if (id === DEMO_INVOICE.id) return DEMO_INVOICE;
  return null;
}
