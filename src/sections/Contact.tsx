import { Check, Copy, FileText, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Button, LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { profile } from "@/lib/data";

const channels = [
  { label: "GitHub", value: "@saniya3006", href: profile.github, Icon: GithubIcon },
  { label: "LinkedIn", value: "Saniya S Mehta", href: profile.linkedin, Icon: LinkedinIcon },
  { label: "Résumé", value: "View on Google Drive", href: profile.resumeUrl, Icon: FileText },
];

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <section id="contact" className="relative overflow-hidden border-t py-24 sm:py-32">
      <div className="blob -z-10 left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 bg-violet-500" />
      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">06 — Contact</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Let's build <span className="text-gradient italic">something</span> together.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            I'm open to AI/ML, data and software engineering opportunities. The fastest way to reach me is by email.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href={`mailto:${profile.email}`} className="w-full sm:w-auto">
              <Mail /> {profile.email}
            </LinkButton>
            <Button variant="outline" onClick={() => copy(profile.email)} className="w-full sm:w-auto" aria-live="polite">
              {copied ? <Check className="text-success" /> : <Copy />}
              {copied ? "Copied!" : "Copy email"}
            </Button>
          </div>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" /> {profile.location}
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
          {channels.map(({ label, value, href, Icon }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface group flex h-full flex-col items-center gap-3 p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <span className="font-semibold">{label}</span>
                <span className="text-sm text-muted-foreground">{value}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
