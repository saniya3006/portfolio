import { Reveal } from "./reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        <span>{index}</span>
        <span className="h-px w-10 bg-primary/50" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </Reveal>
  );
}
