"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "./SectionHeader";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

const featuredProjects: Project[] = [
  {
    title: "Arisleydis Realtor Website",
    description:
      "A modern, responsive real estate website built for a professional realtor. Features property listings, contact forms, and a clean design that converts visitors into clients. Deployed on Vercel with optimized performance.",
    tech: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Vercel"],
    github: "https://github.com/mrosadevs/Arisleydis-Realtor-Website",
    live: "https://arisleydis-realtor-website.vercel.app",
    featured: true,
  },
  {
    title: "Accuracy Consulting Website",
    description:
      "A professional consulting firm website delivering a polished brand experience. Built with modern JavaScript, featuring responsive design, smooth interactions, and a focus on conveying trust and expertise.",
    tech: ["JavaScript", "React", "CSS", "Responsive Design"],
    github: "https://github.com/mrosadevs/Accuracy-Consulting-Website",
    featured: true,
  },
];

const otherProjects: Project[] = [
  {
    title: "TaskGrid",
    description:
      "A task management application built with QML, featuring an intuitive grid-based interface for organizing and tracking tasks with a focus on visual clarity and productivity.",
    tech: ["QML", "Qt", "JavaScript"],
    github: "https://github.com/mrosadevs/TaskGrid",
  },
  {
    title: "Phantom Clean",
    description:
      "A utility application from the Phantom suite designed for efficient data cleaning and organization with a streamlined user interface.",
    tech: ["JavaScript", "Node.js"],
    github: "https://github.com/mrosadevs/Phantom-Clean",
  },
  {
    title: "Phantom Clipper",
    description:
      "Part of the Phantom tool suite — a clipboard management utility built to enhance workflow productivity with smart capture and organization features.",
    tech: ["JavaScript", "Node.js"],
    github: "https://github.com/mrosadevs/Phantom-Clipper",
  },
  {
    title: "Phantom Ledger",
    description:
      "A financial tracking application from the Phantom suite, built for managing transactions and maintaining organized financial records.",
    tech: ["JavaScript", "Node.js"],
    github: "https://github.com/mrosadevs/Phantom-Ledger",
  },
  {
    title: "Programming II Coursework",
    description:
      "Repository documenting progression through advanced C++ concepts including object-oriented design, data structures, algorithms, and problem-solving techniques.",
    tech: ["C++", "OOP", "Data Structures", "Algorithms"],
    github: "https://github.com/mrosadevs/COP-3003-Programming-II",
  },
];

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
      <div
        className={`flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } gap-8 items-center`}
      >
        {/* Project image / preview */}
        <div className="flex-1 w-full">
          <a
            href={project.live || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative group rounded-lg overflow-hidden"
          >
            <div className="aspect-video bg-bg-secondary rounded-lg overflow-hidden border border-white/5 group-hover:border-accent-primary/20 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-5xl font-bold gradient-text opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    {project.title
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </a>
        </div>

        {/* Project info */}
        <div
          className={`flex-1 ${
            isEven ? "md:text-right" : "md:text-left"
          }`}
        >
          <p className="font-mono text-accent-primary text-sm mb-2">
            Featured Project
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 hover:text-accent-primary transition-colors">
            <a
              href={project.live || project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
            </a>
          </h3>

          <div
            className={`glass-card rounded-lg p-6 mb-4 ${
              isEven ? "md:-ml-12" : "md:-mr-12"
            } relative z-10`}
          >
            <p className="text-text-secondary text-[15px] leading-relaxed">
              {project.description}
            </p>
          </div>

          <ul
            className={`flex flex-wrap gap-3 font-mono text-xs text-text-muted mb-4 ${
              isEven ? "md:justify-end" : "md:justify-start"
            }`}
          >
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div
            className={`flex gap-4 ${
              isEven ? "md:justify-end" : "md:justify-start"
            }`}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-primary transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-primary transition-colors"
                aria-label="Live Demo"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
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
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card rounded-xl p-6 h-full flex flex-col group block"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <svg
            className="w-10 h-10 text-accent-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <div className="flex gap-3">
            {project.github && (
              <span className="text-text-muted group-hover:text-accent-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-6">
          {project.description}
        </p>

        {/* Tech */}
        <ul className="flex flex-wrap gap-2 font-mono text-xs text-text-muted">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      {/* Background orb */}
      <div className="orb orb-purple w-[500px] h-[500px] top-1/4 -right-40 opacity-10" />

      <div className="section-container">
        <SectionHeader number="03" title="Projects" />

        {/* Featured Projects */}
        <div className="mb-24">
          {featuredProjects.map((project, i) => (
            <FeaturedProject key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-semibold text-text-primary">
            Other Noteworthy Projects
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
