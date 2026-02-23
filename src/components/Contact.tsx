"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export default function Contact() {
  const { ref, isInView } = useInView();

  return (
    <section id="contact" className="relative py-24 md:py-32">
      {/* Background elements */}
      <div className="orb orb-green w-[400px] h-[400px] bottom-0 left-1/4 opacity-10" />
      <div className="orb orb-cyan w-[300px] h-[300px] top-1/4 right-1/3 opacity-5" />

      <div className="section-container">
        <div ref={ref} className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-accent-primary text-sm mb-4"
          >
            04. What&apos;s Next?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
          >
            Let&apos;s Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-secondary text-base md:text-lg leading-relaxed mb-12"
          >
            I&apos;m currently looking for new opportunities and my inbox is always
            open. Whether you have a question, a project idea, or just want to
            say hello — I&apos;d love to hear from you. Let&apos;s create something
            amazing together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="mailto:rosalesmanuel2000@gmail.com"
              className="magnetic-btn text-base"
            >
              <span className="relative z-10">Say Hello</span>
              <svg
                className="relative z-10 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </motion.div>

          {/* Additional contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex flex-col items-center gap-3"
          >
            <p className="text-text-muted text-xs font-mono">
              rosalesmanuel2000@gmail.com
            </p>
            <p className="text-text-muted text-xs font-mono">
              Port Charlotte, FL
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
