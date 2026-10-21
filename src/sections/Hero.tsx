import { motion } from "framer-motion";
import { ArrowDown, Brain, Download, FileText, MapPin, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { LinkButton } from "@/components/ui/button";
import { useCountUp } from "@/hooks/useCountUp";
import { useTypewriter } from "@/hooks/useTypewriter";
import { profile, stats } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.1, duration: 0.6 } }),
};

function Stat({ value, decimals, suffix, label }: (typeof stats)[number]) {
  const { ref, value: current } = useCountUp<HTMLDivElement>(value);
  return (
    <div ref={ref} className="bg-card/80 px-5 py-5 backdrop-blur sm:px-6">
      <div className="font-display text-3xl font-semibold tabular-nums">
        {current.toFixed(decimals)}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function Hero() {
  const role = useTypewriter(profile.roles);

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="blob -z-10 left-[-10%] top-10 size-[420px] bg-indigo-500" />
      <div className="blob -z-10 right-[-8%] top-40 size-[380px] bg-fuchsia-500" />

      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur sm:text-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                Open to AI/ML, Data &amp; Software Engineering roles
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Hi, I'm {profile.firstName}.
              <br />
              <span className="text-gradient animate-gradient-x italic">I build with data &amp; AI.</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-5 flex h-8 items-center font-mono text-base text-foreground/90 sm:text-lg"
              aria-label={profile.roles.join(", ")}
            >
              <span className="text-primary">&gt;&nbsp;</span>
              <span aria-hidden="true">{role}</span>
              <span aria-hidden="true" className="ml-0.5 inline-block h-5 w-[2px] animate-blink bg-primary" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              {profile.tagline}
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={profile.resumeUrl} external>
                <FileText /> View Résumé
              </LinkButton>
              <LinkButton href={profile.resumePdf} download variant="outline">
                <Download /> Download PDF
              </LinkButton>
              <LinkButton href={profile.github} external variant="outline" size="icon" aria-label="GitHub">
                <GithubIcon />
              </LinkButton>
              <LinkButton href={profile.linkedin} external variant="outline" size="icon" aria-label="LinkedIn">
                <LinkedinIcon />
              </LinkButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-fuchsia-500/30 blur-2xl" />
            <div className="card-surface relative overflow-hidden rounded-[1.75rem] p-6">
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-red-400/80" />
                <span className="size-3 rounded-full bg-amber-400/80" />
                <span className="size-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">saniya.py</span>
              </div>
              <pre className="mt-5 overflow-x-auto font-mono text-[13px] leading-6">
                <code>
                  <span className="text-fuchsia-500 dark:text-fuchsia-300">class</span>{" "}
                  <span className="text-indigo-500 dark:text-indigo-300">Engineer</span>:{"\n"}
                  {"  "}name = <span className="text-emerald-600 dark:text-emerald-300">"Saniya Mehta"</span>{"\n"}
                  {"  "}sgpa = <span className="text-amber-600 dark:text-amber-300">9.19</span>{"\n"}
                  {"  "}stack = [{"\n"}
                  {"    "}<span className="text-emerald-600 dark:text-emerald-300">"Python"</span>,{" "}
                  <span className="text-emerald-600 dark:text-emerald-300">"C++"</span>,{" "}
                  <span className="text-emerald-600 dark:text-emerald-300">"SQL"</span>,{"\n"}
                  {"    "}<span className="text-emerald-600 dark:text-emerald-300">"ML"</span>,{" "}
                  <span className="text-emerald-600 dark:text-emerald-300">"Solidity"</span>{"\n"}
                  {"  "}]{"\n"}
                  {"  "}open_to_work = <span className="text-amber-600 dark:text-amber-300">True</span>
                </code>
              </pre>
            </div>

            <div className="card-surface absolute -left-4 -top-5 flex animate-float items-center gap-2 rounded-full px-3 py-2 text-xs font-medium shadow-lg sm:-left-8">
              <Brain className="size-4 text-primary" /> AI Intern @ Tech Mahindra
            </div>
            <div
              className="card-surface absolute -bottom-5 -right-2 flex animate-float items-center gap-2 rounded-full px-3 py-2 text-xs font-medium shadow-lg sm:-right-6"
              style={{ animationDelay: "-3s" }}
            >
              <MapPin className="size-4 text-primary" /> Pune, India
            </div>
            <Sparkles className="absolute -right-3 top-8 size-6 animate-pulse text-fuchsia-400" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-4"
        >
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </motion.div>

        <a
          href="#about"
          className="mx-auto mt-14 flex w-fit flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Scroll to explore
          <ArrowDown className="size-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
