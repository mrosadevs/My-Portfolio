"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "./SectionHeader";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image: string;
}

const featuredProjects: Project[] = [
  {
    title: "Accuracy Flux",
    description:
      "Practice management software built for accounting firms. Run your whole firm from one place — clients, work pipeline, a drag-and-drop Kanban board, time tracking, invoicing, auto-computed tax deadlines, and a secure client portal.",
    tech: ["Next.js 16", "TypeScript", "Supabase", "Tailwind CSS 4", "React 19"],
    github: "https://github.com/mrosadevs/Accuracy-Flux",
    image: "/projects/accuracy-flux.png",
  },
  {
    title: "Phantom Study",
    description:
      "AI-powered study platform that transforms your notes and slides into flashcards, quizzes, and fill-in-the-blank exercises on demand. Cyberpunk aesthetic, Supabase backend, and live at study.mrosadev.site.",
    tech: ["HTML/CSS/JS", "Supabase", "AI"],
    github: "https://github.com/mrosadevs/Phantom-Study",
    live: "https://study.mrosadev.site",
    image: "/projects/phantom-study.png",
  },
  {
    title: "Phantom Pulse",
    description:
      "Electron desktop app that bridges QuickBooks Desktop and modern data workflows. Import CSVs, visualize financials with interactive Recharts dashboards, bulk-edit and clean transactions, then export polished Excel workbooks — wrapped in a dark cyberpunk UI.",
    tech: ["Electron 31", "React 18", "TypeScript", "Recharts", "Tailwind CSS"],
    github: "https://github.com/mrosadevs/Phantom-Pulse",
    image: "/projects/phantom-pulse.png",
  },
];

const otherProjects: Project[] = [
  // Phantom suite first
  {
    title: "Phantom Command Center",
    description:
      "Personal AI agent system running 24/7. Routes requests through a smart model router across LM Studio, Claude, and Groq. Features overnight autonomous agents, persistent memory, a live dashboard, and Discord integration via FastAPI.",
    tech: ["Python", "FastAPI", "Discord.py", "Claude SDK", "LM Studio"],
    github: "https://github.com/mrosadevs/Phantom-Command-Center",
    image: "/projects/phantom-command-center.png",
  },
  {
    title: "Phantom Launcher",
    description:
      "A modern Minecraft launcher with a glassmorphism UI. Rust-powered backend via Tauri 2 handles instance management, mod support, Microsoft OAuth, and JVM configuration — all wrapped in a React + TypeScript frontend.",
    tech: ["Tauri 2", "Rust", "React 18", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/mrosadevs/Phantom-Launcher",
    image: "/projects/phantom-launcher.png",
  },
  {
    title: "Phantom Ledger",
    description:
      "Bank statement PDF-to-Excel converter. Extracts and auto-cleans transactions, then exports a formatted Excel file with sorting and filtering. Live at ledger.accuracycg.com.",
    tech: ["React", "Vite", "Express", "Node.js"],
    github: "https://github.com/mrosadevs/Phantom-Ledger",
    live: "https://ledger.accuracycg.com",
    image: "/projects/phantom-ledger.png",
  },
  {
    title: "Phantom Finance",
    description:
      "A 100% offline personal budget tracker with 7 dedicated pages — Dashboard, Monthly Budget, Debt Tracker, Property, Annual Budget, Business, and Settings. Excel/JSON import-export and 245+ financial tips.",
    tech: ["JavaScript", "Vite", "CSS"],
    github: "https://github.com/mrosadevs/Phantom-Finance",
    image: "/projects/phantom-finance.png",
  },
  {
    title: "Phantom Palette",
    description:
      "Zero-dependency color palette generator with 10 harmony modes. Lock colors, one-click copy, export to CSS/SCSS/Tailwind/JSON, PNG download, and full keyboard shortcuts.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/mrosadevs/Phantom-Palette",
    image: "/projects/phantom-palette.png",
  },
  {
    title: "Phantom User",
    description:
      "Username generator producing clean, pronounceable names. 5 generation strategies, 6 vibe modes, case styles, seed words, and an animated particle background.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/mrosadevs/Phantom-User",
    image: "/projects/phantom-user.png",
  },
  // Rest
  {
    title: "Arisleydis Realtor Website",
    description:
      "Production real estate platform for a Florida realtor — full property listings with status badges, a secure admin portal with 2FA and brute-force protection, CRUD operations, image uploads, and dynamic OG images.",
    tech: ["Next.js 14", "TypeScript", "Supabase", "Tailwind CSS"],
    github: "https://github.com/mrosadevs/Arisleydis-Realtor-Website",
    live: "https://arisleydisrealtor.com",
    image: "/projects/arisleydis-realtor.png",
  },
  {
    title: "Accuracy Consulting Website",
    description:
      "Reimagined professional website for a financial advisory firm. Features a bilingual English/Spanish toggle, light/dark theme, services showcase, and smooth scroll animations.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/mrosadevs/Accuracy-Consulting-Website",
    live: "https://accuracycg.com",
    image: "/projects/accuracy-consulting.png",
  },
  {
    title: "TaskGrid",
    description:
      "Desktop task manager built with a 3-person team. C++17 backend with a QML frontend, SQLite persistence, week/month calendar views, and Light/Dark/Cyber themes.",
    tech: ["C++17", "Qt Quick", "QML", "SQLite", "CMake"],
    github: "https://github.com/mrosadevs/TaskGrid",
    image: "/projects/taskgrid.png",
  },
  {
    title: "The Ultimate AI Stack",
    description:
      "Interactive single-file HTML guide synthesizing the best self-hosted AI setup — LM Studio with 30B local models, 8 MCP servers, 7 specialized agents, hybrid routing, and morning briefings.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/mrosadevs/The-Ultimate-AI-Stack",
    image: "/projects/ultimate-ai-stack.png",
  },
  {
    title: "Dino Sol",
    description:
      "NFT landing page for 7,777 prehistoric Dino NFTs. Canvas particle background, custom cursor, and smooth scroll animations. Reimagined from an original 2018 concept.",
    tech: ["HTML", "CSS", "JavaScript", "Canvas"],
    github: "https://github.com/mrosadevs/Dino-Sol",
    live: "https://dinosol.mrosadev.site",
    image: "/projects/dino-sol.png",
  },
  {
    title: "The Dodo NFT",
    description:
      "NFT landing page with an animated sand background, island aesthetic, custom cursor, collection showcase, and mint section. Reimagined from an original 2018 concept.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/mrosadevs/The-Dodo-NFT",
    live: "https://dodonft.mrosadev.site",
    image: "/projects/the-dodo-nft.png",
  },
  {
    title: "The Flip Lounge",
    description:
      "Marketplace and community platform for flippers. Dark minimal aesthetic, bold Bebas Neue typography, stats counters, ticker marquee, and a canvas background.",
    tech: ["HTML", "CSS", "JavaScript", "Canvas"],
    github: "https://github.com/mrosadevs/The-Flip-Lounge",
    live: "https://tfl.mrosadev.site",
    image: "/projects/the-flip-lounge.png",
  },
  {
    title: "Programming II Coursework",
    description:
      "7-assignment C++ coursework documenting progression through OOP — classes, constructors, arrays, vectors, pointers, inheritance, and polymorphism. Built with CMake.",
    tech: ["C++", "OOP", "CMake"],
    github: "https://github.com/mrosadevs/COP-3003-Programming-II",
    image: "/projects/cop-3003.png",
  },
];

const INITIAL_VISIBLE = 6;

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const { ref, isInView } = useInView();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative mb-24 last:mb-0"
    >
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}>
        {/* Image */}
        <div className="flex-1 w-full">
          <a
            href={project.live || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative group rounded-xl overflow-hidden"
          >
            <div className="relative aspect-[40/21] rounded-xl overflow-hidden border border-white/5 group-hover:border-accent-primary/30 transition-colors duration-300">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          </a>
        </div>

        {/* Info */}
        <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
          <p className="font-mono text-accent-primary text-sm mb-2">Featured Project</p>
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 hover:text-accent-primary transition-colors">
            <a href={project.live || project.github} target="_blank" rel="noopener noreferrer">
              {project.title}
            </a>
          </h3>

          <div className={`glass-card rounded-lg p-6 mb-4 ${isEven ? "md:-ml-12" : "md:-mr-12"} relative z-10`}>
            <p className="text-text-secondary text-[15px] leading-relaxed">{project.description}</p>
          </div>

          <ul className={`flex flex-wrap gap-3 font-mono text-xs text-text-muted mb-4 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
            {project.tech.map((t) => <li key={t}>{t}</li>)}
          </ul>

          <div className={`flex gap-4 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-primary transition-colors" aria-label="GitHub">
                <GitHubIcon />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-primary transition-colors" aria-label="Live site">
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, isInView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <a
        href={project.live || project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card rounded-xl overflow-hidden h-full flex flex-col group block"
      >
        {/* Banner image — 1200×630 ratio = 40/21 */}
        <div className="relative w-full aspect-[40/21] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Links */}
          <div className="absolute top-3 right-3 flex gap-2">
            {project.github && (
              <span className="text-white/60 group-hover:text-accent-primary transition-colors drop-shadow-lg">
                <GitHubIcon />
              </span>
            )}
            {project.live && (
              <span className="text-white/60 group-hover:text-accent-primary transition-colors drop-shadow-lg">
                <ExternalIcon />
              </span>
            )}
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-text-muted">
            {project.tech.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? otherProjects : otherProjects.slice(0, INITIAL_VISIBLE);
  const hiddenCount = otherProjects.length - INITIAL_VISIBLE;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="orb orb-purple w-[500px] h-[500px] top-1/4 -right-40 opacity-10" />

      <div className="section-container">
        <SectionHeader number="03" title="Projects" />

        {/* Featured */}
        <div className="mb-24">
          {featuredProjects.map((project, i) => (
            <FeaturedProject key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Other projects heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-semibold text-text-primary">Other Noteworthy Projects</h3>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence initial={false}>
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i >= INITIAL_VISIBLE ? (i - INITIAL_VISIBLE) * 0.06 : 0 }}
                className="h-full"
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All / Show Less */}
        {otherProjects.length > INITIAL_VISIBLE && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="font-mono text-sm text-accent-primary border border-accent-primary/40 hover:border-accent-primary hover:bg-accent-primary/5 px-8 py-3 rounded transition-all duration-200"
            >
              {showAll ? "Show Less" : `View All (${hiddenCount} more)`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
