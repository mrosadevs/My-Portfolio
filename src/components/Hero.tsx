"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const roles = [
  "Software Engineer",
  "UI/UX Designer",
  "Creative Developer",
  "Problem Solver",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentRole.slice(0, text.length - 1)
              : currentRole.slice(0, text.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="orb orb-green w-[500px] h-[500px] -top-40 -right-40 animate-float" />
      <div
        className="orb orb-purple w-[400px] h-[400px] -bottom-20 -left-20"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="orb orb-cyan w-[300px] h-[300px] top-1/3 left-1/4"
        style={{ animationDelay: "1.5s", opacity: 0.08 }}
      />

      <div className="section-container relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-accent-primary text-sm md:text-base mb-5 tracking-wider"
          >
            Hi, my name is
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2"
          >
            <span className="gradient-text">Manuel Rosales</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-secondary mb-8"
          >
            I{" "}
            <span className="text-text-primary">
              {text}
              <span className="inline-block w-[3px] h-[1em] bg-accent-primary ml-1 align-middle animate-typing-cursor" />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-text-secondary text-base md:text-lg max-w-xl leading-relaxed mb-12"
          >
            Software Engineering student at{" "}
            <span className="text-accent-primary">
              Florida Gulf Coast University
            </span>{" "}
            with a passion for blending design and code. I build beautiful,
            functional digital experiences that make an impact.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="magnetic-btn"
            >
              <span className="relative z-10">View My Work</span>
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="magnetic-btn !border-accent-secondary/40 !text-accent-secondary hover:!shadow-[0_0_20px_rgba(99,102,241,0.15)]"
            >
              <span className="relative z-10">Get In Touch</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-xs font-mono tracking-widest">
            SCROLL
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-accent-primary/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
