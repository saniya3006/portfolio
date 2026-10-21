import { Award, GraduationCap } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { certifications, education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="border-t py-16 sm:py-24 lg:py-32">
      <div className="container">
        <SectionHeading index="05" eyebrow="Education" title="Education & certifications" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.08}>
                <GlowCard className="flex gap-4 p-6">
                  <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <GraduationCap className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted-foreground">{e.period}</p>
                    <h3 className="mt-1 font-semibold leading-snug">{e.school}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{e.degree}</p>
                    <span className="mt-3 inline-block rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                      {e.score}
                    </span>
                    {e.note && <p className="mt-3 text-sm text-muted-foreground">{e.note}</p>}
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <GlowCard className="flex items-center gap-4 p-6">
                  <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-snug">{c.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{c.issuer}</p>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
