"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu as MenuIcon, X, Instagram, MapPin } from "lucide-react";

const links = [
  { href: "/#concept", label: "Le concept" },
  { href: "/#menu", label: "La carte" },
  { href: "/#experience", label: "Sur les quais" },
  { href: "/#emplacement", label: "Emplacement" },
  { href: "/notre-histoire", label: "Notre histoire" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "glass mt-2 rounded-full px-4 py-2 shadow-soft sm:px-5"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2">
          <LogoMark />
          <div className="leading-tight">
            <div className="font-display text-[19px] tracking-tight">Glaces en Seine</div>
            <div className="-mt-0.5 font-script text-[14px] text-teal-700">la frette-sur-seine</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-[13.5px] font-medium text-ink/80 transition hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-cherry transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/80 shadow-soft transition hover:-translate-y-0.5 hover:text-cherry"
          >
            <Instagram className="h-4 w-4" />
          </Link>
          <Link
            href="/#emplacement"
            className="btn-liquid inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-cream shadow-soft hover:shadow-glow"
          >
            <MapPin className="h-3.5 w-3.5" /> Voir l'emplacement
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="grid h-10 w-10 place-items-center rounded-full bg-cream/80 text-ink shadow-soft lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden"
        >
          <div className="mx-3 mt-2 rounded-3xl bg-cream/95 p-5 shadow-ring backdrop-blur">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-base font-medium text-ink transition hover:bg-teal-50"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                href="/#emplacement"
                onClick={() => setOpen(false)}
                className="btn-liquid flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-semibold text-cream"
              >
                <MapPin className="h-4 w-4" /> Voir l'emplacement
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-teal-100 py-3 text-sm font-semibold text-teal-700"
              >
                Nous écrire
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function LogoMark() {
  return (
    <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-sun shadow-soft">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M6 11c0-3.3 2.7-6 6-6s6 2.7 6 6h-1.5l-4.5 9-4.5-9H6Z"
          fill="#221C12"
        />
      </svg>
      <span className="absolute -inset-0.5 -z-10 animate-breathe rounded-full bg-gradient-sun blur-[10px] opacity-60" />
    </span>
  );
}
