import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { About } from "@/sections/About";
import { CommandPalette } from "@/sections/CommandPalette";
import { Contact } from "@/sections/Contact";
import { Education } from "@/sections/Education";
import { Experience } from "@/sections/Experience";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { Navbar } from "@/sections/Navbar";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { TechMarquee } from "@/sections/TechMarquee";
import "./App.css";

export default function App() {
  const { theme, toggle } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  // Ctrl/Cmd + K opens the command palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Cursor spotlight + back-to-top visibility.
  useEffect(() => {
    const root = document.documentElement;
    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--x", `${e.clientX}px`);
      root.style.setProperty("--y", `${e.clientY}px`);
    };
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="spotlight" aria-hidden="true" />
      <Navbar theme={theme} onToggleTheme={toggle} onOpenPalette={openPalette} />
      <main className="relative z-[2]">
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#top"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-1"
          >
            <ArrowUp className="size-5" />
          </motion.a>
        )}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onClose={closePalette} onToggleTheme={toggle} />
    </>
  );
}
