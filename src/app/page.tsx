"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  TreeEvergreen,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkle,
  ChartLineUp,
  SealCheck,
  Lightning,
  Globe,
  MagnifyingGlass,
  FileText,
  RocketLaunch,
} from "@phosphor-icons/react";

function fadeUp(r: boolean, d = 0) {
  return {
    initial: r ? {} : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] },
  };
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b px-6 text-sm transition-colors lg:px-10 ${
        scrolled
          ? "border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/80"
          : "border-transparent bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-zinc-100">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">
          E
        </span>
        <span>EcoSphere</span>
      </Link>
      <div className="hidden items-center gap-8 text-slate-600 dark:text-zinc-400 md:flex">
        <Link href="/dashboard" className="transition-colors hover:text-emerald-600">Dashboard</Link>
        <Link href="/environment" className="transition-colors hover:text-emerald-600">Environment</Link>
        <Link href="/social" className="transition-colors hover:text-emerald-600">Social</Link>
        <Link href="/governance" className="transition-colors hover:text-emerald-600">Governance</Link>
      </div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-emerald-700 active:scale-[0.97]"
      >
        Launch App
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </nav>
  );
}

function HeroSection({ r }: { r: boolean }) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.div {...fadeUp(r)}>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-tighter text-slate-900 dark:text-zinc-100">
              Measure. Engage.
              <br />
              <span className="text-emerald-600 dark:text-emerald-400">Prove.</span>
            </h1>
            <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-slate-600 dark:text-zinc-400">
              From carbon measurement to employee engagement to audit-ready compliance reports. One unified platform for your entire ESG program.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-[15px] font-medium text-white transition-all hover:bg-emerald-700 active:scale-[0.97]"
              >
                Launch Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/governance"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-[15px] font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.97] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              >
                View Reports
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={r ? {} : { opacity: 0, x: 40 }}
            animate={r ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-zinc-800">
              <img
                src="https://picsum.photos/seed/ecosphere-hero/800/600"
                alt="Sustainable office and nature"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/90 px-4 py-2.5 text-[13px] font-medium text-slate-700 shadow-lg backdrop-blur-md dark:border-zinc-700/60 dark:bg-zinc-900/90 dark:text-zinc-300">
              <SealCheck className="h-4 w-4 text-emerald-500" weight="fill" />
              ESG Score: 82
            </div>
            <div className="absolute -right-3 -top-3 flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/90 px-4 py-2.5 text-[13px] font-medium text-slate-700 shadow-lg backdrop-blur-md dark:border-zinc-700/60 dark:bg-zinc-900/90 dark:text-zinc-300">
              <Lightning className="h-4 w-4 text-amber-500" weight="fill" />
              AI Active
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustedBySection() {
  const logos = [
    { name: "SustainCorp", color: "#059669" },
    { name: "GreenGrid", color: "#3b82f6" },
    { name: "EcoFirst", color: "#8b5cf6" },
    { name: "CarbonZero", color: "#0891b2" },
    { name: "FutureFuel", color: "#d97706" },
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="mb-10 text-center text-[13px] font-medium uppercase tracking-[0.15em] text-slate-400 dark:text-zinc-500">
          Trusted by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((l) => (
            <div key={l.name} className="flex items-center gap-2.5">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
                <rect width="32" height="32" rx="8" fill={l.color} />
                <text x="16" y="20" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="system-ui">{l.name.charAt(0)}</text>
              </svg>
              <span className="text-[15px] font-semibold text-slate-700 dark:text-zinc-300">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  { id: "environmental", icon: TreeEvergreen, title: "Environmental", desc: "Upload utility bills, fleet records, and invoices. AI extracts carbon data, maps to Scope 1/2/3, and builds your full emissions baseline.", color: "emerald", features: ["AI document extraction", "Scope 1/2/3 breakdown", "MACC abatement curve", "SBTi trajectory tracking"], href: "/environment" },
  { id: "social", icon: Users, title: "Social", desc: "Empower employees with 10 sustainability actions. AI validates evidence, awards XP, and badges drive engagement.", color: "blue", features: ["10 action types", "AI evidence validation", "XP and badge system", "Department leaderboards"], href: "/social" },
  { id: "governance", icon: ShieldCheck, title: "Governance", desc: "Tamper-proof evidence registry with SHA-256 hash chain. Generate GRI/CSRD compliant reports with one click.", color: "violet", features: ["SHA-256 evidence chain", "GRI and CSRD compliance", "Board-ready PDF reports", "Anomaly spike detection"], href: "/governance" },
];

function PillarsSection({ r }: { r: boolean }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div {...fadeUp(r)} className="mb-14 text-center">
          <p className="text-[11px] font-mono font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
            Three pillars
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Environmental. Social. Governance.
          </h2>
          <p className="mx-auto mt-3 max-w-[55ch] text-[17px] text-slate-500 dark:text-zinc-400">
            Three modules, one shared data model. Every upload, action, and record feeds every pillar.
          </p>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">
          {PILLARS.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200/60 p-8 transition-all hover:shadow-lg dark:border-zinc-800/60 ${i === 0 ? "bg-emerald-50 dark:bg-emerald-950/20" : i === 1 ? "bg-blue-50/60 dark:bg-blue-950/20" : "bg-violet-50/60 dark:bg-violet-950/20"}`}
            >
              <motion.div {...fadeUp(r, 0.1 * i)} className="h-full">
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${i === 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" : i === 1 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"}`}>
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">{p.desc}</p>
                <ul className="mt-5 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-zinc-400">
                      <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-emerald-500" : i === 1 ? "bg-blue-500" : "bg-violet-500"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-1 text-[13px] font-medium text-emerald-600 dark:text-emerald-400">
                  Open {p.title}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIFeaturesSection({ r }: { r: boolean }) {
  const features = [
    { icon: MagnifyingGlass, title: "Smart Document Extraction", desc: "Upload PDFs, CSVs, or images. AI extracts vendor, amount, date, and category with confidence scoring." },
    { icon: Sparkle, title: "Action Validation Engine", desc: "Employees submit evidence for sustainable actions. AI validates authenticity and estimates carbon impact in real time." },
    { icon: ChartLineUp, title: "Anomaly Detection", desc: "Month-over-month spikes above 30% are flagged automatically with AI-generated explanations." },
    { icon: FileText, title: "Automated Report Generation", desc: "Generate GRI and CSRD compliant board reports with cited evidence from the tamper-proof registry." },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div {...fadeUp(r)}>
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            AI that does the work
          </h2>
          <p className="mt-3 max-w-[55ch] text-[17px] text-slate-500 dark:text-zinc-400">
            Not a chatbot. An agent that extracts, validates, detects, and reports across every pillar.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={r ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 rounded-2xl border border-slate-200/60 bg-white p-6 transition-colors hover:border-slate-300/60 dark:border-zinc-800/60 dark:bg-zinc-900 dark:hover:border-zinc-700/60"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-zinc-100">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: RocketLaunch, title: "Upload Data", desc: "Utility bills, fleet logs, invoices. Drag and drop. AI extracts everything." },
  { icon: Globe, title: "Measure Impact", desc: "Real-time Scope 1/2/3 breakdown, MACC curve, and employee engagement metrics." },
  { icon: ShieldCheck, title: "Prove Compliance", desc: "Tamper-proof evidence chain. GRI/CSRD reports with one click." },
];

function HowItWorksSection({ r }: { r: boolean }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div {...fadeUp(r)} className="mb-14 text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            From data to report in minutes
          </h2>
          <p className="mx-auto mt-3 max-w-[55ch] text-[17px] text-slate-500 dark:text-zinc-400">
            Three steps. No spreadsheets. No consultants.
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={r ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                <s.icon className="h-6 w-6" />
              </div>
              {i < STEPS.length - 1 && (
                <div className="absolute left-[calc(50%+3rem)] top-7 hidden h-px w-[calc(100%-6rem)] md:block bg-slate-200 dark:bg-zinc-700" />
              )}
              <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ r }: { r: boolean }) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={r ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-emerald-600 px-8 py-16 text-center text-white md:px-16 md:py-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
          <h2 className="relative text-[clamp(1.5rem,4vw,2.75rem)] font-bold leading-tight tracking-tight">
            Ready to unify your ESG program?
          </h2>
          <p className="relative mx-auto mt-4 max-w-[50ch] text-[17px] text-emerald-100">
            Upload a utility bill and see your full environmental baseline in under 60 seconds. No signup required for the demo.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[15px] font-semibold text-emerald-700 transition-all hover:bg-emerald-50 active:scale-[0.97]">
              Launch Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/environment" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-[15px] font-medium text-white transition-all hover:bg-white/10 active:scale-[0.97]">
              View Environmental Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="border-t border-slate-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 dark:text-zinc-500 lg:flex-row lg:px-10">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">E</span>
          <span className="font-medium text-slate-700 dark:text-zinc-300">EcoSphere</span>
        </div>
        <p className="text-center text-[13px]">Built for Odoo Hackathon 2026. ESG management, unified.</p>
        <div className="flex gap-6 text-[13px]">
          <Link href="/dashboard" className="transition-colors hover:text-emerald-600">Dashboard</Link>
          <Link href="/environment" className="transition-colors hover:text-emerald-600">Environment</Link>
          <Link href="/social" className="transition-colors hover:text-emerald-600">Social</Link>
          <Link href="/governance" className="transition-colors hover:text-emerald-600">Governance</Link>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-white text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Nav />
      <main>
        <HeroSection r={reduced} />
        <TrustedBySection />
        <PillarsSection r={reduced} />
        <AIFeaturesSection r={reduced} />
        <HowItWorksSection r={reduced} />
        <CTASection r={reduced} />
      </main>
      <FooterSection />
    </div>
  );
}
