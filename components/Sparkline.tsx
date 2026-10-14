"use client";

import { motion } from "framer-motion";
import { SPARKLINE_POINTS } from "@/lib/demo";

interface Props {
  animate?: boolean;
}

export default function Sparkline({ animate = true }: Props) {
  const points = SPARKLINE_POINTS;
  const w = 240;
  const h = 56;
  const pad = 4;

  const values = points.map((p) => p.kwh);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const toX = (i: number) => pad + (i / (points.length - 1)) * (w - pad * 2);
  const toY = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)},${toY(p.kwh).toFixed(1)}`)
    .join(" ");

  const areaD = `${pathD} L ${toX(points.length - 1).toFixed(1)},${h} L ${toX(0).toFixed(1)},${h} Z`;

  return (
    <div className="relative">
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="overflow-visible">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F7B5F" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0F7B5F" stopOpacity="0" />
          </linearGradient>
          <clipPath id="sparkClip">
            <rect x="0" y="0" width={w} height={h} />
          </clipPath>
        </defs>

        {/* Area fill */}
        <path d={areaD} fill="url(#sparkGrad)" clipPath="url(#sparkClip)" />

        {/* Line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#0F7B5F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Endpoint dot */}
        <motion.circle
          cx={toX(points.length - 1)}
          cy={toY(values[values.length - 1])}
          r="3.5"
          fill="#0F7B5F"
          initial={animate ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.2 }}
        />
      </svg>

      {/* Month labels */}
      <div className="flex justify-between mt-1.5">
        {points.map((p) => (
          <span key={p.month} className="text-[10px] text-[#5C6566] font-medium">
            {p.month}
          </span>
        ))}
      </div>
    </div>
  );
}
