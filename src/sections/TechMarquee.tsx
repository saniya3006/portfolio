import { techMarquee } from "@/lib/data";

export function TechMarquee() {
  const items = [...techMarquee, ...techMarquee];

  return (
    <div className="marquee-mask overflow-hidden border-y bg-card/40 py-5" aria-label="Technologies I use">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {items.map((tech, i) => (
          <span
            key={i}
            aria-hidden={i >= techMarquee.length}
            className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted-foreground"
          >
            {tech}
            <span className="size-1.5 rounded-full bg-primary/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
