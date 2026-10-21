import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Maximize2, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { GlowCard } from "@/components/ui/glow-card";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { projectFilters, projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm font-medium">
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
          <ExternalLink className="size-4" /> Live demo
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
          <GithubIcon className="size-4" /> Code
        </a>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-background/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        layoutId={`project-${project.title}`}
        className="card-surface relative max-h-[85vh] w-full max-w-2xl overflow-y-auto p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-md hover:bg-secondary"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{project.kind}</p>
        <h3 id="project-title" className="mt-2 pr-10 font-display text-3xl font-semibold">
          {project.title}
        </h3>
        <p className="mt-4 text-muted-foreground">{project.summary}</p>
        <ul className="mt-6 space-y-3">
          {project.details.map((d) => (
            <li key={d} className="flex gap-3">
              <span className="mt-2.5 h-0.5 w-3 shrink-0 bg-primary" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.demo && (
            <LinkButton href={project.demo} external>
              <ExternalLink /> Open live demo
            </LinkButton>
          )}
          {project.repo && (
            <LinkButton href={project.repo} external variant="outline">
              <GithubIcon /> View source
            </LinkButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]["id"]>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="projects" className="border-t py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title="Things I've built"
          description="Machine learning, blockchain and full-stack work. Click a card for details."
        />

        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {projectFilters.map((f) => {
            const id = f.id;
            const count = id === "all" ? projects.length : projects.filter((p) => p.categories.includes(id)).length;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm transition-colors",
                  filter === f.id ? "border-transparent text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {filter === f.id && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative z-10">
                  {f.label} <span className="opacity-60">{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.title}
                layout
                layoutId={`project-${project.title}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <GlowCard
                  className="group flex h-full cursor-pointer flex-col p-6 transition-transform duration-300 hover:-translate-y-1"
                  onClick={() => setSelected(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelected(project))}
                  aria-label={`Open details for ${project.title}`}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{project.kind}</span>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                        project.live ? "border-success/50 text-success" : "text-muted-foreground",
                      )}
                    >
                      {project.live && <span className="size-1.5 animate-pulse rounded-full bg-success" />}
                      {project.badge}
                    </span>
                  </div>
                  <h3 className="flex items-center gap-2 font-display text-2xl font-semibold">
                    {project.title}
                    <ArrowUpRight className="size-5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4" onClick={(e) => e.stopPropagation()}>
                    <ProjectLinks project={project} />
                    <button
                      onClick={() => setSelected(project)}
                      className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Maximize2 className="size-3.5" /> Details
                    </button>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center">
          <LinkButton href="https://github.com/saniya3006?tab=repositories" external variant="outline">
            <GithubIcon /> See all repositories
          </LinkButton>
        </div>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}
