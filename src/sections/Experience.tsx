import { Briefcase, Calendar, MapPin } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="border-t py-16 sm:py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Where I've worked"
          description="Hands-on work with the data that trains and evaluates multilingual AI models."
        />

        <ol className="relative space-y-10 border-l border-dashed pl-6 sm:pl-12">
          {experience.map((job) => (
            <li key={job.company} className="relative">
              <span className="absolute -left-[37px] top-6 grid size-7 place-items-center rounded-full border-4 border-background bg-primary sm:-left-[61px]">
                <span className="size-2 animate-ping rounded-full bg-primary-foreground" />
              </span>
              <Reveal>
                <GlowCard className="p-5 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{job.role}</h3>
                      <p className="mt-1 font-medium text-primary">
                        {job.company} · {job.project}
                      </p>
                    </div>
                    <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                      {job.type}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-4" /> {job.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4" /> {job.location}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {job.points.map((point, i) => (
                      <Reveal key={i} delay={0.05 * i}>
                        <li className="flex gap-3 text-muted-foreground">
                          <Briefcase className="mt-1 size-4 shrink-0 text-primary/70" />
                          <span>{point}</span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.skills.map((s) => (
                      <span key={s} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
