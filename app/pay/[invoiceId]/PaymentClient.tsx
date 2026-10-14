"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Invoice } from "@/lib/demo";
import Header from "@/components/Header";
import HeroInvoiceCard from "@/components/HeroInvoiceCard";
import AaniButton from "@/components/AaniButton";
import AaniModal from "@/components/AaniModal";
import BankTransferAccordion from "@/components/BankTransferAccordion";
import ConsumptionBreakdown from "@/components/ConsumptionBreakdown";
import TrustStrip from "@/components/TrustStrip";
import HelpFooter from "@/components/HelpFooter";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

interface Props {
  invoice: Invoice;
}

export default function PaymentClient({ invoice }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header />
      <motion.main
        className="min-h-screen bg-[#FAFAF7] pt-16 pb-16 px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-lg mx-auto space-y-4">
          <motion.div variants={itemVariants}>
            <HeroInvoiceCard invoice={invoice} />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <AaniButton invoice={invoice} onOpen={() => setModalOpen(true)} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <BankTransferAccordion invoice={invoice} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ConsumptionBreakdown invoice={invoice} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TrustStrip />
          </motion.div>

          <motion.div variants={itemVariants}>
            <HelpFooter />
          </motion.div>
        </div>
      </motion.main>

      <AnimatePresence>
        {modalOpen && (
          <AaniModal invoice={invoice} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
