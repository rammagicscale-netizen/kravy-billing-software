// 


"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Store,
  Users,
  Cpu,
  Sparkles,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";

const stats = [
  { label: "Shops & Restaurants Served", value: "500+" },
  { label: "Bills Generated Every Month", value: "1,00,000+" },
  { label: "Avg. Time Saved Per Day", value: "45 mins" },
];

const values = [
  {
    title: "Built for Real Shopkeepers",
    desc: "We design every screen keeping busy counters, rush hours, and real-world constraints in mind.",
  },
  {
    title: "Simple, Not Complicated",
    desc: "Technology should feel like a helping hand, not a headache. Kravy stays clean, fast and easy to use.",
  },
  {
    title: "Long-Term Partnership",
    desc: "We don’t just sell software. We stay with you through setup, training, and everyday support.",
  },
  {
    title: "Honest & Transparent",
    desc: "Clear pricing, clear communication, and no hidden tricks. You always know what you’re paying for.",
  },
];

const reasons = [
  "Smart invoicing + reporting designed to work together from Day 1.",
  "Fast billing flow tuned for Indian retail and F&B use cases.",
  "Easy GST-ready invoicing and digital receipts.",
  "Works even when internet is patchy (hybrid-first thinking).",
  "Simple onboarding – most shops go live in under a day.",
  "Support that talks your language, not just tech jargon.",
];

const team = [
  {
    name: "Founder / Product",
    role: "Understands both shop counters and software screens. Obsessed with smooth billing flows.",
    focus: "Product, customer conversations, and long-term roadmap.",
  },
  {
    name: "Tech & Infra",
    role: "Keeps Kravy fast, stable, and secure – even during peak hours.",
    focus: "Backend, integrations, and performance.",
  },
  {
    name: "Customer Success",
    role: "Talks to shopkeepers daily and brings real-world feedback to the product.",
    focus: "Onboarding, training, and day-to-day support.",
  },
];

const techTeam = [
  {
    name: "Vikash Verma",
    role: "Product Manager",
    image: "/assets/Vikash.jpeg",
    description: "Spearheading product strategy and designing intuitive, fast-paced workflows for shop counters.",
    techStack: "Product Strategy & UX",
  },
  {
    name: "Deepak",
    role: "App Developer",
    image: "/assets/Deepak.jpeg",
    description: "Crafting lightweight, highly responsive mobile POS apps optimized for Android devices.",
    techStack: "React Native & Android",
  },
  {
    name: "Ramveer",
    role: "Software Developer",
    image: "/assets/Ramveer.jpg",
    description: "Building resilient cloud infrastructures, offline-sync backends, and robust security protocols.",
    techStack: "Next.js & Node.js",
  },
];

const trustedBy = [
  "Local kirana & retail stores",
  "Cafés & quick-service restaurants",
  "Cloud kitchens & tiffin services",
  "Salons & service-based businesses",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-16">

        {/* Breadcrumb */}
        <div className="mb-4 text-xs md:text-sm text-slate-500 dark:text-slate-400">
          <a
            href="/"
            className="hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Home
          </a>
          <span className="mx-1">/</span>
          <span className="text-slate-700 dark:text-slate-200">About Us</span>
        </div>

        <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] uppercase tracking-[0.18em] dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40 mb-4"
            >
              <Sparkles size={14} />
              About Kravy
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4"
            >
              Billing software that actually understands{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Indian shops & restaurants.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-base text-slate-700 dark:text-slate-300 max-w-xl mb-6"
            >
              Kravy was born from a simple observation: most billing systems are
              built for offices, not for fast-moving kirana stores, cafés, and
              restaurants. We’re here to change that. Our mission is to bring
              powerful yet simple billing to every counter in India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-3 items-center"
            >

              <a
                href="https://www.kravy.in/contact"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-300 text-xs md:text-sm text-slate-700 hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
              >
                Talk to our team
              </a>
            </motion.div>
          </div>

          {/* Right side highlight card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-3xl bg-emerald-500/10 blur-3xl opacity-40 dark:bg-emerald-500/20" />
            <div className="relative rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl p-5 md:p-6 shadow-2xl dark:border-slate-700/80 dark:bg-slate-900/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center dark:bg-emerald-500/15">
                  <Store size={20} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-[0.22em]">
                    Our Focus
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    Frontline first – every click counts
                  </p>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-4">
                Kravy is built for teams who stand behind the counter all day – not
                for people sitting in cabins. That’s why our screens are minimal, our
                flows are fast, and our interface is tuned for high-volume use cases and
                rush hours.
              </p>

              <div className="grid grid-cols-3 gap-3 mt-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-slate-50 border border-slate-200 px-3 py-2.5 dark:bg-slate-900/70 dark:border-slate-700/80"
                  >
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {s.value}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5 dark:text-slate-400">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who we are / What we do / Who we serve */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-10">
        <div className="grid md:grid-cols-3 gap-6">
          <CardBlock
            icon={<Users size={20} />}
            title="Who we are"
            text="We’re a focused team of developers, designers, and support specialists obsessed with making billing stress-free for Indian businesses."
          />
          <CardBlock
            icon={<Cpu size={20} />}
            title="What we do"
            text="We focus exclusively on software excellence – Cloud POS + Android app + real-time analytics – with zero hardware lock-in."
          />
          <CardBlock
            icon={<Store size={20} />}
            title="Who we serve"
            text="Retail shops, cafés, cloud kitchens, quick-service restaurants, salons, and any business that wants smoother counters."
          />
        </div>
      </section>

      {/* Trusted by strip */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm px-4 py-4 md:px-6 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:border-slate-700 dark:bg-slate-950/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-500/15">
              <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Trusted By
              </p>
              <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100">
                Growing local businesses across categories
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {trustedBy.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full text-[11px] md:text-xs border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission (Goals & Vision anchor) */}
      <section
        id="goals"
        className="max-w-6xl mx-auto px-4 md:px-6 pb-14 scroll-mt-24"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
            <h2 className="text-lg md:text-2xl font-bold mb-2">Our Vision</h2>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300">
              To become the most trusted billing partner for small and mid-sized
              businesses in India by turning every bill into an opportunity to serve
              better, grow faster, and make smarter decisions.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
            <h2 className="text-lg md:text-2xl font-bold mb-2">Our Mission</h2>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300">
              To remove billing pain from shopkeepers’ lives by combining intuitive software and fast support – at a price point that
              makes clear business sense.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg md:text-2xl font-bold">Our Core Values</h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              These values guide how we design features, talk to customers, and decide
              what to build next.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 flex gap-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
            >
              <div className="mt-1">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-500/15">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-600 dark:text-emerald-400"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold">{v.title}</h3>
                <p className="text-xs md:text-sm text-slate-700 mt-1.5 dark:text-slate-300">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Kravy */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-start">
          <div>
            <h2 className="text-lg md:text-2xl font-bold mb-2">
              Why do growing shops choose Kravy?
            </h2>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mb-4 max-w-xl">
              There are many billing tools out there. Shopkeepers stay with Kravy
              because we focus on the three things that matter the most: speed at the
              counter, accuracy in reports, and support when it’s needed.
            </p>

            <ul className="space-y-2.5 mt-3">
              {reasons.map((r) => (
                <li
                  key={r}
                  className="flex gap-2 text-xs md:text-sm text-slate-800 dark:text-slate-200"
                >
                  <span className="mt-[3px] w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline-style card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-[0.22em] mb-2 dark:text-emerald-400">
              Our Journey (Snapshot)
            </p>

            <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  2023 – Idea to Prototype:
                </span>{" "}
                Started as an internal tool to fix messy billing at a small cloud
                kitchen and retail outlet.
              </p>
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  2024 – Early Adopters:
                </span>{" "}
                Onboarded our first set of shopkeepers who shaped our fastest billing
                flows and must-have reports.
              </p>
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Now – Growing Together:
                </span>{" "}
                We’re refining Kravy with every new counter we serve, focusing on
                stability, speed, and features that actually get used in day-to-day
                business.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Kravy is still evolving. If you’re a shop or restaurant owner, your
              feedback won’t just be “noted” – it will directly shape future releases.
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section
        id="founder"
        className="max-w-6xl mx-auto px-4 md:px-6 pb-20 scroll-mt-28"
      >
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-950/70">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-950 pointer-events-none" />

          <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-shrink-0"
            >
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 border-emerald-200 dark:border-emerald-700/50 shadow-xl">
                <img
                  src="/assets/founder.png"
                  alt="Kravy Founder"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Akash Verma</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Founder, Kravy Software Development</p>
              </div>
            </motion.div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex-1"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] uppercase tracking-[0.18em] dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40 mb-4">
                <Sparkles size={12} />
                A Note from Our Founder
              </span>

              <blockquote className="border-l-4 border-emerald-400 pl-4 dark:border-emerald-500">
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  "When I started Kravy, the goal was simple — to build a billing tool that a shopkeeper
                  in Delhi or a café owner in Bangalore could actually use without any training. Not something
                  built for tech-savvy users in an air-conditioned office, but something built for the real
                  hustle at the counter."
                </p>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  "Every feature we ship comes from real conversations with real shop owners. If it doesn't
                  make their day easier, we don't build it. And if something breaks, we fix it before they
                  even finish their chai."
                </p>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  "Kravy is still a work in progress — and that's exactly how we like it. We grow with our
                  customers, one bill at a time."
                </p>
              </blockquote>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">— Akash Verma, Founder at Kravy</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech & Product Team */}
      <section id="team" className="max-w-6xl mx-auto px-4 md:px-6 pb-20 scroll-mt-28">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-lg md:text-2xl font-bold">Meet our Tech & Product Builders</h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              The engineers and product minds crafting the future of billing technology for Indian retail.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {techTeam.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group relative rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-950/70"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs font-semibold text-emerald-400">
                    {member.techStack}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {member.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 font-semibold">
                    Core Tech
                  </span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet the Team (Our Team anchor) */}
      <section
        className="max-w-6xl mx-auto px-4 md:px-6 pb-20"
      >
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg md:text-2xl font-bold">The team behind Kravy</h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              A small team working closely with shopkeepers and restaurant owners to
              refine Kravy with every release.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200 bg-white p-4 flex flex-col gap-2 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-500/15">
                  <UserCircle2
                    size={22}
                    className="text-emerald-700 dark:text-emerald-300"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {member.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {member.focus}
                  </p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-2">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] md:text-xs text-slate-500 dark:text-slate-400">
          Want to work with us or partner with Kravy? Reach out via the{" "}
          <a
            href="/contact"
            className="text-emerald-600 dark:text-emerald-400 underline-offset-2 hover:underline"
          >
            contact page
          </a>{" "}
          and we’ll get in touch.
        </p>
      </section>

      {/* Pricing / Plan Section */}
      <section
        id="pricing"
        className="max-w-6xl mx-auto px-4 md:px-6 pb-20 scroll-mt-28"
      >
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 md:p-10 text-center dark:border-emerald-500/30 dark:bg-emerald-500/5">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Choose Your Perfect Plan</h2>
          <p className="text-sm md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            Simple, scalable pricing crafted for every food business — from cloud kitchens to fine dining.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            Get Started Now
          </a>
        </div>
      </section>
    </main>
  );
}


/* Reusable card block */
function CardBlock({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
          {icon}
        </div>
        <h2 className="text-sm md:text-base font-semibold">{title}</h2>
      </div>
      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">{text}</p>
    </div>
  );
}
