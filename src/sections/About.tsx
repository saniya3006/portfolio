import { Check, Copy, Mail } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { about, profile } from "@/lib/data";

export function About() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32">
      <div className="container">
        <SectionHeading index="01" eyebrow="About" title="A little about me" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-2 pt-2">
                {about.interests.map((tag) => (
                  <span key={tag} className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <GlowCard className="p-7">
              <dl className="space-y-4">
                {about.facts.map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 border-b border-dashed pb-4 text-[15px]">
                    <dt className="text-muted-foreground">{f.label}</dt>
                    <dd className="text-right font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex items-center justify-between gap-3 rounded-md bg-secondary px-3 py-1">
                <a href={`mailto:${profile.email}`} className="flex min-w-0 items-center gap-2 py-2.5 text-sm font-medium">
                  <Mail className="size-4 shrink-0 text-primary" />
                  <span className="truncate">{profile.email}</span>
                </a>
                <button
                  onClick={() => copy(profile.email)}
                  className="grid size-10 shrink-0 place-items-center rounded-md transition-colors hover:bg-background"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                </button>
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
