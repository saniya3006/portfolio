import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container flex flex-col items-center justify-between gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:gap-4 sm:text-left">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind &amp; Framer Motion.
        </p>
        <div className="flex items-center gap-1">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 hover:text-foreground">
            <GithubIcon className="size-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 hover:text-foreground">
            <LinkedinIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
