import { useEffect, useMemo, useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Copy, Download, FileText, Hash, Mail, Moon, Search } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

type Action = {
  id: string;
  label: string;
  group: string;
  Icon: ComponentType<{ className?: string }>;
  run: () => void;
};

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
};

const openUrl = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

export function CommandPalette({ open, onClose, onToggleTheme }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo<Action[]>(
    () => [
      ...navLinks.map((l) => ({
        id: l.id,
        label: `Go to ${l.label}`,
        group: "Navigate",
        Icon: Hash,
        run: () => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" }),
      })),
      { id: "resume", label: "View résumé", group: "Links", Icon: FileText, run: () => openUrl(profile.resumeUrl) },
      {
        id: "download",
        label: "Download résumé PDF",
        group: "Links",
        Icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resumePdf;
          a.download = "";
          a.click();
        },
      },
      { id: "github", label: "Open GitHub", group: "Links", Icon: GithubIcon, run: () => openUrl(profile.github) },
      { id: "linkedin", label: "Open LinkedIn", group: "Links", Icon: LinkedinIcon, run: () => openUrl(profile.linkedin) },
      { id: "email", label: "Send an email", group: "Contact", Icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "copy", label: "Copy email address", group: "Contact", Icon: Copy, run: () => navigator.clipboard?.writeText(profile.email) },
      { id: "theme", label: "Toggle light / dark theme", group: "Settings", Icon: Moon, run: onToggleTheme },
    ],
    [onToggleTheme],
  );

  const results = actions.filter((a) => a.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  const runAction = (action?: Action) => {
    if (!action) return;
    onClose();
    action.run();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAction(results[cursor]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-background/60 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="card-surface w-full max-w-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b px-4">
              <Search className="size-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted-foreground">No results.</li>}
              {results.map((action, i) => {
                const showGroup = action.group !== lastGroup;
                lastGroup = action.group;
                return (
                  <li key={action.id}>
                    {showGroup && <p className="px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{action.group}</p>}
                    <button
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => runAction(action)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm",
                        i === cursor ? "bg-accent text-accent-foreground" : "text-foreground",
                      )}
                    >
                      <action.Icon className="size-4" />
                      <span className="flex-1">{action.label}</span>
                      {i === cursor && <ArrowRight className="size-4" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
