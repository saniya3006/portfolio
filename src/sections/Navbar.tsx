import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Command, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((l) => l.id);

type NavbarProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenPalette: () => void;
};

export function Navbar({ theme, onToggleTheme, onOpenPalette }: NavbarProps) {
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b bg-background/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
        style={{ scaleX: progress }}
      />
      <nav className="container flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-400 to-fuchsia-400 font-display text-sm font-bold text-[#0b0d14] transition-transform group-hover:rotate-6">
            {profile.initials}
          </span>
          <span className="font-display text-lg font-semibold">
            {profile.name}
            <span className="text-primary">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id} className="relative">
              <a
                href={`#${link.id}`}
                className={cn(
                  "relative z-10 block rounded-full px-4 py-2 text-sm transition-colors",
                  active === link.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </a>
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-secondary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="hidden h-9 items-center gap-2 rounded-md border bg-card/60 px-3 text-xs text-muted-foreground transition-colors hover:text-foreground md:flex"
            aria-label="Open command menu"
          >
            <Command className="size-3.5" />
            <span>Quick nav</span>
            <kbd className="rounded border bg-secondary px-1.5 font-mono text-[10px]">Ctrl K</kbd>
          </button>
          <Button variant="outline" size="icon" onClick={onToggleTheme} aria-label="Toggle theme">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </motion.span>
            </AnimatePresence>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container flex flex-col py-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-3 text-base",
                      active === link.id ? "bg-secondary text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
