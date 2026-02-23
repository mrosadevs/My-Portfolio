"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface SectionHeaderProps {
  number: string;
  title: string;
}

export default function SectionHeader({ number, title }: SectionHeaderProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-12"
    >
      <span className="font-mono text-accent-primary text-lg md:text-xl">
        {number}.
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary section-line whitespace-nowrap">
        {title}
      </h2>
    </motion.div>
  );
}
