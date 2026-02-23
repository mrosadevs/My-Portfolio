"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "./SectionHeader";

interface Job {
  company: string;
  title: string;
  period: string;
  location: string;
  points: string[];
}

const jobs: Job[] = [
  {
    company: "The Service Lounge",
    title: "Lead Designer & Developer",
    period: "2021 — Present",
    location: "Port Charlotte, FL",
    points: [
      "Lead end-to-end brand identity design for clients across automotive, hospitality, and lifestyle industries",
      "Design and develop responsive websites and web applications, translating client vision into polished digital experiences",
      "Manage comprehensive digital strategies including social media content, marketing materials, and visual communications",
      "Collaborate directly with stakeholders to define project scope, deliverables, and creative direction",
    ],
  },
  {
    company: "Foundation Hospitality",
    title: "Graphic Designer & Content Creator",
    period: "2019 — 2021",
    location: "Florida",
    points: [
      "Created visual content and brand materials for hospitality venues, driving customer engagement and brand recognition",
      "Designed marketing collateral including menus, promotional materials, social media graphics, and digital advertisements",
      "Managed content creation workflows and maintained brand consistency across all customer-facing touchpoints",
      "Produced photography and video content for social media channels, growing audience engagement",
    ],
  },
  {
    company: "URBE University",
    title: "IT Support & Content Creator",
    period: "2018 — 2019",
    location: "Remote",
    points: [
      "Provided technical support and IT solutions for university digital infrastructure and platforms",
      "Created digital content and visual materials for academic programs and institutional communications",
      "Assisted in maintaining and updating university web properties and digital resources",
      "Coordinated with departments to produce multimedia content for educational initiatives",
    ],
  },
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, isInView } = useInView();

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeader number="02" title="Experience" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="flex flex-col md:flex-row gap-0 md:gap-8">
            {/* Tabs */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible scrollbar-none mb-8 md:mb-0 md:min-w-[180px]">
              {jobs.map((job, i) => (
                <button
                  key={job.company}
                  onClick={() => setActiveTab(i)}
                  className={`tab-btn ${activeTab === i ? "active" : ""}`}
                >
                  {job.company}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-1">
                    {jobs[activeTab].title}{" "}
                    <span className="text-accent-primary">
                      @ {jobs[activeTab].company}
                    </span>
                  </h3>
                  <p className="font-mono text-sm text-text-muted mb-1">
                    {jobs[activeTab].period}
                  </p>
                  <p className="font-mono text-xs text-text-muted mb-6">
                    {jobs[activeTab].location}
                  </p>

                  <ul className="tech-list space-y-4">
                    {jobs[activeTab].points.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-text-secondary text-[15px] leading-relaxed"
                      >
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 pt-12 border-t border-white/5"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-6 font-mono">
              <span className="text-accent-primary">~</span> Education
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  school: "Florida Gulf Coast University",
                  degree: "B.S. Software Programming",
                  year: "2024 — 2026",
                },
                {
                  school: "State College of Florida",
                  degree: "A.S. Software Engineering",
                  year: "2022 — 2024",
                },
                {
                  school: "Design & Architecture Senior High",
                  degree: "High School Diploma",
                  year: "2014 — 2018",
                },
              ].map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="glass-card rounded-lg p-5"
                >
                  <p className="text-accent-primary font-mono text-xs mb-2">
                    {edu.year}
                  </p>
                  <p className="text-text-primary font-semibold text-sm mb-1">
                    {edu.degree}
                  </p>
                  <p className="text-text-muted text-xs">{edu.school}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
