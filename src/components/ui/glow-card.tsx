import type { HTMLAttributes, MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** A card whose border lights up around the pointer (see .glow-card in App.css). */
export function GlowCard({ className, onMouseMove, ...props }: HTMLAttributes<HTMLDivElement>) {
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    onMouseMove?.(e);
  };

  return <div className={cn("glow-card card-surface", className)} onMouseMove={handleMove} {...props} />;
}
