"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { type MouseEvent, useEffect, useState } from "react";

const navItems = [
  { label: "About", id: "about" },
  { label: "Stack", id: "stack" },
  { label: "Projects", id: "projects" },
  { label: "Open Source", id: "open-source" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleMobileNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const target = document.getElementById(id);

    if (!target) return;

    setOpen(false);
    window.history.pushState(null, "", `#${id}`);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      });
    });
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 transition-all duration-300">
      <nav className={`liquid-glass pointer-events-auto mx-auto flex h-[66px] w-full max-w-[1180px] items-center justify-between rounded-[24px] px-4 sm:px-6 ${scrolled ? "liquid-glass-scrolled" : ""}`} aria-label="Main navigation">
        <a href="#home" className="focus-ring rounded-full px-2 text-base font-bold tracking-[-0.035em] text-[#1d1d1f]" aria-label="Sarthak Madan — home">Sarthak Madan<span className="text-[#2563eb]">.</span></a>
        <div className="hidden items-center gap-7 lg:flex">{navItems.map((item) => <a key={item.id} href={`#${item.id}`} className="focus-ring rounded-full px-1 text-xs font-medium text-[#55555a] transition hover:text-black">{item.label}</a>)}</div>
        <div className="flex items-center gap-3">
          <a href="/Sarthak-Madan-Resume.pdf" download className="focus-ring hidden items-center gap-2 rounded-full bg-[#1d1d1f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#353538] sm:flex"><Download size={13} /> Resume</a>
          <button onClick={() => setOpen((value) => !value)} className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 text-[#1d1d1f] lg:hidden" aria-expanded={open} aria-label="Toggle menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -8 }} className="liquid-glass pointer-events-auto mx-auto mt-2 w-[calc(100%_-_24px)] max-w-[1180px] overflow-hidden rounded-[24px] lg:hidden"><div className="flex flex-col px-5 py-4">{navItems.map((item) => <a key={item.id} href={`#${item.id}`} onClick={(event) => handleMobileNavigation(event, item.id)} className="flex items-center justify-between border-b border-black/[0.06] py-4 text-sm font-medium text-[#4c4c50]">{item.label}<ArrowUpRight size={14} /></a>)}<a href="/Sarthak-Madan-Resume.pdf" download className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-4 py-3 text-sm font-semibold text-white"><Download size={15} /> Download resume</a></div></motion.div>}
      </AnimatePresence>
    </header>
  );
}
