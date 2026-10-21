import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Blocks, Code2, Cpu, Database } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/lib/data";
import { cn } from "@/lib/utils";

const icons = { languages: Code2, ai: Database, core: Cpu, tools: Blocks } as const;

export function Skills() {
  const [active, setActive] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === active) ?? skillGroups[0];

  return (
    <section id="skills" className="border-t py-24 sm:py-32">
      <div className="container">
        <SectionHeading index="04" eyebrow="Skills" title="My toolkit" description="Languages, core CS, and the libraries and tools I use to ship." />

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Skill categories">
            {skillGroups.map((g) => {
              const Icon = icons[g.id as keyof typeof icons];
              const isActive = g.id === active;
              return (
                <button
                  key={g.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(g.id)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors",
                    isActive ? "border-primary/40 text-foreground" : "bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-lg bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <Icon className={cn("relative z-10 size-5", isActive && "text-primary")} />
                  <span className="relative z-10">{g.label}</span>
                  <span className="relative z-10 ml-auto hidden font-mono text-xs opacity-60 lg:inline">{g.items.length}</span>
                </button>
              );
            })}
          </div>

          <div className="card-surface min-h-[220px] p-6 sm:p-8" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="mb-6 font-display text-2xl font-semibold">{group.label}</h3>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ y: -3 }}
                      className="rounded-lg border bg-secondary px-4 py-2.5 text-[15px] font-medium"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
