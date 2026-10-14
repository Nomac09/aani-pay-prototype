import { notFound } from "next/navigation";
import { getInvoice } from "@/lib/demo";
import PaymentClient from "./PaymentClient";

interface Props {
  params: Promise<{ invoiceId: string }>;
}

export default async function PayPage({ params }: Props) {
  const { invoiceId } = await params;
  const invoice = getInvoice(invoiceId);
  if (!invoice) notFound();
  return <PaymentClient invoice={invoice} />;
}

export function generateMetadata() {
  return {
    title: "Pay Invoice - Example Utilities",
    description: "Pay your Example Utilities AC bill securely with Aani",
  };
}
