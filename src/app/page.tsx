"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChartLineUp,
  CheckCircle,
  FileArrowUp,
  FileText,
  Hash,
  ShieldCheck,
  Sparkle,
  TreeEvergreen,
  Users,
} from "@/lib/icons";

const PILLARS = [
  {
    kicker: "01 / Environment",
    title: "Turn source documents into a carbon baseline.",
    copy: "Extract emissions from the records your business already produces, then see every number in its Scope 1, 2, or 3 context.",
    href: "/environment",
    action: "Measure carbon",
    icon: TreeEvergreen,
    panel: "bg-[#dcebc7] text-[#17341f]",
    iconPanel: "bg-[#2e6b46] text-[#f1f7e9]",
    detail: "Utility bill → Scope 2 metric",
  },
  {
    kicker: "02 / Social",
    title: "Make sustainable action visible and worth repeating.",
    copy: "Give employees a clear action hub, evidence-based validation, and a shared sense of momentum across teams.",
    href: "/social",
    action: "Engage people",
    icon: Users,
    panel: "bg-[#dce9f6] text-[#173044]",
    iconPanel: "bg-[#28628e] text-[#eef7ff]",
    detail: "Evidence → XP → shared progress",
  },
  {
    kicker: "03 / Governance",
    title: "Make every claim defensible before it reaches the board.",
    copy: "Link evidence through a tamper-evident chain, identify disclosure gaps, and generate reports with a transparent trail.",
    href: "/governance",
    action: "Prove compliance",
    icon: ShieldCheck,
    panel: "bg-[#e8def4] text-[#392451]",
    iconPanel: "bg-[#69408d] text-[#faf4ff]",
    detail: "Hash chain → cited report",
  },
];

const PROOF_STEPS = [
  { number: "01", label: "Capture", detail: "Bills, invoices, fleet logs", icon: FileArrowUp, tone: "text-[#b7dc85]" },
  { number: "02", label: "Structure", detail: "Scopes, factors, confidence", icon: Sparkle, tone: "text-[#8fc4ec]" },
  { number: "03", label: "Connect", detail: "Actions and evidence", icon: Hash, tone: "text-[#c9a9e7]" },
  { number: "04", label: "Report", detail: "GRI and CSRD ready", icon: FileText, tone: "text-[#f6d382]" },
];

function useHydratedReducedMotion() {
  const preference = useReducedMotion() ?? false;
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReduced(preference));
    return () => cancelAnimationFrame(frame);
  }, [preference]);

  return reduced;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between px-5 transition-colors sm:px-8 lg:px-12 ${scrolled ? "border-b border-[#d8dfd3] bg-[#f4f6ef]/95 backdrop-blur" : "bg-transparent"}`}
    >
      <Link href="/" className="flex items-center gap-2.5 text-[#12291a]" aria-label="EcoSphere home">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#183a27] text-[12px] font-bold text-[#eef4e7]">E</span>
        <span className="text-[15px] font-semibold tracking-[-0.03em]">EcoSphere</span>
      </Link>
      <div className="hidden items-center gap-7 text-[13px] font-medium text-[#526059] md:flex">
        <Link href="/environment" className="transition-colors hover:text-[#183a27]">Measure</Link>
        <Link href="/social" className="transition-colors hover:text-[#183a27]">Engage</Link>
        <Link href="/governance" className="transition-colors hover:text-[#183a27]">Assure</Link>
      </div>
      <Link
        href="/dashboard"
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#183a27] px-4 text-[13px] font-semibold text-[#f4f6ef] transition-colors hover:bg-[#29563b]"
      >
        Open workspace <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </nav>
  );
}

function Hero({ reduced }: { reduced: boolean }) {
  return (
    <section className="bg-[#f4f6ef] px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pb-12 lg:pt-28">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[2.5rem] bg-[#133725] text-[#eef4e7] lg:grid-cols-[minmax(0,1.05fr)_minmax(440px,.95fr)]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-h-[590px] flex-col justify-between px-7 py-8 sm:px-12 sm:py-12 lg:px-16 lg:py-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#62836d] px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-[#c8deaf]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b7dc85]" />
              ESG, connected end to end
            </div>
            <h1 className="mt-10 max-w-[10ch] text-[clamp(3.25rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-[#f4f6ef]">
              Build the proof behind every ESG claim.
            </h1>
            <p className="mt-7 max-w-[50ch] text-[16px] leading-relaxed text-[#c7d5c8] sm:text-[18px]">
              EcoSphere turns scattered source data into a defensible operating system for carbon, people, and compliance.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#b7dc85] px-5 text-[14px] font-semibold text-[#17341f] transition-colors hover:bg-[#d5edb5]"
            >
              Explore the live demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#how-it-works" className="inline-flex min-h-12 items-center gap-2 px-2 text-[14px] font-medium text-[#e4eee1] hover:text-white">
              See how proof flows <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.72, delay: reduced ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden border-t border-[#376247] bg-[#1c4a33] p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12"
        >
          <div className="absolute right-[-10%] top-[-12%] h-72 w-72 rounded-full border border-[#4e785c]" />
          <div className="absolute bottom-[-24%] left-[7%] h-72 w-72 rounded-full border border-[#4e785c]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold tracking-[0.08em] text-[#b7dc85]">THE EVIDENCE PATH</p>
              <span className="rounded-full bg-[#2b5d40] px-3 py-1 text-[11px] font-medium text-[#d7e8d2]">LIVE DEMO</span>
            </div>
            <div className="my-10 space-y-0">
              {PROOF_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="grid grid-cols-[46px_minmax(0,1fr)] gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`grid h-10 w-10 place-items-center rounded-full border border-[#648a6b] bg-[#214f37] ${step.tone}`}>
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      {index < PROOF_STEPS.length - 1 && <div className="h-12 w-px bg-[#66846b]" />}
                    </div>
                    <div className="pb-6 pt-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="text-[19px] font-semibold tracking-[-0.03em] text-[#f2f7ed]">{step.label}</h2>
                        <span className="text-[12px] font-medium text-[#9ebda3]">{step.number}</span>
                      </div>
                      <p className="mt-1 text-[13px] text-[#bcd0be]">{step.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[#4b7456] pt-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[13px] font-medium text-[#dcead8]">Every result keeps its source.</span>
                <CheckCircle className="h-5 w-5 flex-none text-[#b7dc85]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection({ reduced }: { reduced: boolean }) {
  return (
    <section className="bg-[#f4f6ef] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-[12px] font-semibold tracking-[0.11em] text-[#52705a]"
        >
          FROM SPREADSHEET CHASE TO SHARED CERTAINTY
        </motion.p>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: reduced ? 0 : 0.08 }}
        >
          <h2 className="max-w-[15ch] text-[clamp(2.25rem,4.4vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-[#17341f]">
            Sustainability only works when the evidence moves with the decision.
          </h2>
          <p className="mt-7 max-w-[54ch] text-[17px] leading-relaxed text-[#5b6c61]">
            A utility bill affects an emissions metric. An employee action changes the carbon story. A disclosure depends on both. EcoSphere keeps that chain intact, so teams can act faster without losing trust.
          </p>
          <div className="mt-10 grid border-y border-[#cdd8ca] sm:grid-cols-3">
            {[
              ["Source-aware", "Every number links back."],
              ["People-powered", "Actions feed impact."],
              ["Board-ready", "Reports show the trail."],
            ].map(([title, copy]) => (
              <div key={title} className="border-[#cdd8ca] py-5 pr-5 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-0">
                <p className="text-[15px] font-semibold text-[#17341f]">{title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#627166]">{copy}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PillarsSection({ reduced }: { reduced: boolean }) {
  return (
    <section className="bg-[#e8ece3] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.11em] text-[#52705a]">THREE PILLARS, ONE OPERATING SYSTEM</p>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(2rem,3.5vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#17341f]">Follow the signal across your whole ESG program.</h2>
          </div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#29563b] hover:text-[#17341f]">
            See the workspace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.kicker}
                initial={reduced ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: reduced ? 0 : index * 0.08, duration: 0.5 }}
                className={`flex min-h-[410px] flex-col justify-between rounded-[2rem] p-7 sm:p-8 ${pillar.panel}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold tracking-[0.08em] opacity-70">{pillar.kicker}</span>
                    <span className={`grid h-11 w-11 place-items-center rounded-full ${pillar.iconPanel}`}><Icon className="h-5 w-5" /></span>
                  </div>
                  <h3 className="mt-12 max-w-[13ch] text-[31px] font-semibold leading-[0.98] tracking-[-0.055em]">{pillar.title}</h3>
                  <p className="mt-5 max-w-[37ch] text-[15px] leading-relaxed opacity-80">{pillar.copy}</p>
                </div>
                <div className="pt-8">
                  <p className="border-t border-current/15 pt-4 text-[13px] font-medium opacity-75">{pillar.detail}</p>
                  <Link href={pillar.href} className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold hover:opacity-70">
                    {pillar.action} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CapabilitySection({ reduced }: { reduced: boolean }) {
  const rows = [
    ["Extract", "AI turns source records into structured ESG data.", "Environmental"],
    ["Validate", "Evidence-based actions earn confidence, XP, and impact.", "Social"],
    ["Assure", "Hash-linked records make disclosure status inspectable.", "Governance"],
  ];

  return (
    <section id="how-it-works" className="bg-[#f4f6ef] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className="grid gap-6 border-b border-[#cdd8ca] pb-10 lg:grid-cols-[.8fr_1.2fr]"
        >
          <p className="text-[12px] font-semibold tracking-[0.11em] text-[#52705a]">NOT A DASHBOARD FOR ITS OWN SAKE</p>
          <div>
            <h2 className="max-w-[13ch] text-[clamp(2.25rem,4vw,4rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-[#17341f]">Do the work once. Let every ESG decision benefit.</h2>
            <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-[#5b6c61]">Each pillar is useful on its own. Together, they stop ESG data from becoming a handoff problem.</p>
          </div>
        </motion.div>
        <div className="divide-y divide-[#cdd8ca]">
          {rows.map(([verb, copy, destination], index) => (
            <motion.div
              key={verb}
              initial={reduced ? false : { opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: reduced ? 0 : index * 0.08 }}
              className="grid gap-4 py-7 sm:grid-cols-[.35fr_1fr_auto] sm:items-center"
            >
              <p className="text-[24px] font-semibold tracking-[-0.04em] text-[#17341f]">{verb}</p>
              <p className="max-w-[46ch] text-[15px] leading-relaxed text-[#5b6c61]">{copy}</p>
              <span className="text-[13px] font-semibold text-[#52705a]">{destination}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ reduced }: { reduced: boolean }) {
  return (
    <section className="bg-[#f4f6ef] px-5 pb-8 sm:px-8 lg:px-12 lg:pb-12">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-[1440px] rounded-[2.5rem] bg-[#153c2a] px-7 py-14 text-[#eff6e9] sm:px-12 sm:py-20 lg:px-16"
      >
        <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.11em] text-[#b7dc85]">START WITH THE EVIDENCE YOU ALREADY HAVE</p>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(2.5rem,5vw,5.25rem)] font-semibold leading-[0.9] tracking-[-0.075em]">Make your next ESG report easier to trust.</h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-[38ch] text-[16px] leading-relaxed text-[#c7d5c8]">Open the demo, upload a source record, and follow the chain all the way to a cited report.</p>
            <Link href="/dashboard" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#b7dc85] px-5 text-[14px] font-semibold text-[#17341f] transition-colors hover:bg-[#d5edb5]">
              Launch EcoSphere <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#f4f6ef] px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 border-t border-[#cdd8ca] pt-7 text-[13px] text-[#627166] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-[#17341f]">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#183a27] text-[9px] font-bold text-[#eef4e7]">E</span>
          <span className="font-semibold">EcoSphere</span>
        </div>
        <p>Connected sustainability management for teams that need proof, not just progress.</p>
        <Link href="/governance" className="font-semibold text-[#29563b] hover:text-[#17341f]">Explore assurance</Link>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const reduced = useHydratedReducedMotion();

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[#f4f6ef] text-[#17341f]">
      <Nav />
      <main>
        <Hero reduced={reduced} />
        <ProblemSection reduced={reduced} />
        <PillarsSection reduced={reduced} />
        <CapabilitySection reduced={reduced} />
        <FinalCta reduced={reduced} />
      </main>
      <Footer />
    </div>
  );
}
