"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "./SectionHeader";

const skillCategories = [
  {
    label: "Frontend & Web",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML & CSS", "Tailwind CSS"],
  },
  {
    label: "Languages (Learning)",
    items: ["Python", "C++", "Java", "Node.js", "Git", "REST APIs"],
  },
  {
    label: "Platforms & Cloud",
    items: ["Windows", "Linux", "macOS", "AWS", "Vercel", "Self-Hosting"],
  },
  {
    label: "AI & Design",
    items: ["AI Agents & LLMs", "MCP Servers", "Prompt Engineering", "Figma", "Adobe Suite", "Framer"],
  },
];

export default function About() {
  const { ref, isInView } = useInView();

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeader number="01" title="About Me" />

        <div ref={ref} className="grid md:grid-cols-[3fr_2fr] gap-12 items-start">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              I&apos;m a Software Engineering student at{" "}
              <span className="text-accent-primary">
                Florida Gulf Coast University
              </span>{" "}
              with a background in design from the{" "}
              <span className="text-accent-primary">
                Design and Architecture Senior High
              </span>
              . My journey bridges the gap between creative design and technical
              development, allowing me to build solutions that are both
              beautiful and functional.
            </p>

            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              With professional experience in{" "}
              <span className="text-accent-primary">graphic design</span>,{" "}
              <span className="text-accent-primary">brand identity</span>, and{" "}
              <span className="text-accent-primary">web development</span>, I
              bring a unique perspective to every project. I&apos;m currently
              building my foundation in languages like{" "}
              <span className="text-accent-primary">Python</span>,{" "}
              <span className="text-accent-primary">C++</span>, and{" "}
              <span className="text-accent-primary">Java</span> through my
              coursework while leveraging my strong front-end and design skills
              in real-world projects.
            </p>

            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              I&apos;m comfortable working across{" "}
              <span className="text-accent-primary">Windows</span>,{" "}
              <span className="text-accent-primary">Linux</span>, and{" "}
              <span className="text-accent-primary">macOS</span>, and I&apos;m
              proficient in working with{" "}
              <span className="text-accent-primary">AI agents</span>,{" "}
              <span className="text-accent-primary">LLMs</span>, and{" "}
              <span className="text-accent-primary">MCP servers</span> to
              accelerate development workflows. I also have hands-on experience
              with{" "}
              <span className="text-accent-primary">cloud hosting</span> and{" "}
              <span className="text-accent-primary">self-hosting</span> through
              platforms like AWS and Vercel.
            </p>

            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              I&apos;m bilingual in{" "}
              <span className="text-accent-primary">English</span> and{" "}
              <span className="text-accent-primary">Spanish</span>, and when
              I&apos;m not coding, you&apos;ll find me exploring 3D rendering,
              photography, AI, and video editing.
            </p>

            <p className="text-text-secondary leading-relaxed text-base md:text-lg mt-6">
              Technologies I&apos;ve been working with:
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
              {skillCategories.map((cat, colIdx) => (
                <div key={cat.label}>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + colIdx * 0.1 }}
                    className="text-accent-primary font-mono text-xs mb-3 uppercase tracking-wider"
                  >
                    {cat.label}
                  </motion.p>
                  <ul className="tech-list space-y-2">
                    {cat.items.map((skill, i) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: 0.3 + colIdx * 0.1 + i * 0.05,
                        }}
                        className="text-text-secondary text-sm font-mono"
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Profile image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group mx-auto md:mx-0"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              {/* Glow border */}
              <div className="absolute -inset-1 bg-gradient-to-br from-accent-primary/30 via-accent-secondary/20 to-accent-tertiary/30 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-accent-primary/20 bg-bg-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10" />
                {/* Initials as placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold gradient-text opacity-30">
                    MR
                  </span>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-accent-primary/20 rounded-lg -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
