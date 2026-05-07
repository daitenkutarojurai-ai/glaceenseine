"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X, Instagram, Facebook, Sparkles, MapPin, Bell, Star } from "lucide-react";
import { SOCIAL } from "@/lib/social";

const GOOGLE_REVIEW_URL = SOCIAL.google.review;

const links = [
  { href: "/menu",            label: "Menu" },
  { href: "/notre-histoire",  label: "Notre histoire" },
  { href: "/privatisation",   label: "Privatisation" },
  { href: "/emplacement",     label: "Nous trouver" },
  { href: "/contact",         label: "Contact" },
];

export function Nav() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 32));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 transition-[padding] duration-300 ease-out ${scrolled ? "py-1.5" : "py-3"}`}>
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between transition-[background-color,padding,margin,border-radius,box-shadow] duration-300 ease-out ${
          scrolled
            ? "glass mt-2 rounded-full px-4 py-2 shadow-soft mx-3 sm:mx-6"
            : "bg-transparent px-4 sm:px-6"
        }`}
      >
        {/* Logo — détouré, fond transparent */}
        <Link href="/" aria-label="Glaces en Seine — accueil" className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.06 }}
            transition={{ duration: 0.5 }}
            className="relative h-12 w-12 shrink-0 drop-shadow-[0_4px_10px_rgba(226,107,92,0.25)]"
          >
            <Image
              src="/logo-transparent.png"
              alt="Glaces en Seine"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </motion.div>
          <div className="leading-tight">
            <div className="font-display text-[17px] tracking-tight text-ink">Glaces en Seine</div>
            <div className="-mt-0.5 font-script text-[13px] text-teal-700">La Frette-sur-Seine</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 md:flex lg:gap-6" aria-label="Navigation principale">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative whitespace-nowrap text-[13px] font-medium text-ink/75 transition hover:text-ink lg:text-[13.5px]"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-cherry transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Laisser un avis Google"
            title="Laisser un avis Google"
            className="grid h-9 w-9 place-items-center rounded-full bg-cream/80 text-sun-300 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:text-cherry"
          >
            <Star className="h-4 w-4 fill-current" />
          </Link>
          <Link
            href={SOCIAL.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${SOCIAL.instagram.handle}`}
            className="hidden h-9 w-9 place-items-center rounded-full bg-cream/80 text-ink/70 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:text-cherry lg:grid"
          >
            <Instagram className="h-4 w-4" />
          </Link>
          <Link
            href={SOCIAL.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Glace en Seine"
            className="hidden h-9 w-9 place-items-center rounded-full bg-cream/80 text-ink/70 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:text-cherry lg:grid"
          >
            <Facebook className="h-4 w-4" />
          </Link>
          <Link
            href="/emplacement"
            aria-label="Nous trouver"
            className="hidden h-9 w-9 place-items-center rounded-full bg-cream/80 text-ink/70 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:text-teal-600 lg:grid"
          >
            <MapPin className="h-4 w-4" />
          </Link>
          <Link
            href="/#newsletter"
            aria-label="Newsletter"
            className="hidden h-9 w-9 place-items-center rounded-full bg-cream/80 text-ink/70 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:text-teal-600 lg:grid"
          >
            <Bell className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full bg-cream/80 px-4 py-2 text-[13px] font-semibold text-ink shadow-soft transition hover:bg-cream lg:inline-flex"
          >
            Contact
          </Link>
          <Link
            href="/privatisation"
            className="btn-liquid group inline-flex items-center gap-2 rounded-full bg-cherry px-4 py-2 text-[13px] font-semibold text-cream shadow-soft hover:shadow-glow-cherry"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Privatiser
          </Link>
        </div>

        {/* Mobile-only Google review icon (visible alongside hamburger) */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Laisser un avis Google"
            title="Laisser un avis Google"
            className="grid h-11 w-11 place-items-center rounded-full bg-cream/80 text-sun-300 shadow-soft backdrop-blur transition active:scale-95"
          >
            <Star className="h-4 w-4 fill-current" />
          </Link>
        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer" : "Menu"}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-full bg-cream/80 text-ink shadow-soft backdrop-blur"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={open ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </motion.div>
          </AnimatePresence>
        </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="md:hidden"
          >
            <div className="mx-3 mt-2 overflow-hidden rounded-3xl bg-cream/95 shadow-ring backdrop-blur">
              <nav className="flex flex-col p-3" aria-label="Navigation mobile">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center rounded-2xl px-4 py-3.5 text-[15px] font-medium text-ink transition hover:bg-teal-50 active:bg-teal-100"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="grid grid-cols-2 gap-2 border-t border-ink/6 p-3">
                <Link
                  href="/privatisation"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-cherry py-3 text-sm font-semibold text-cream"
                >
                  <Sparkles className="h-4 w-4" />
                  Privatiser
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-teal-100 py-3 text-sm font-semibold text-teal-700"
                >
                  Contact
                </Link>
                <Link
                  href="/emplacement"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-ink/8 py-3 text-sm font-semibold text-ink"
                >
                  <MapPin className="h-4 w-4" />
                  Nous trouver
                </Link>
                <Link
                  href="/#newsletter"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-ink/8 py-3 text-sm font-semibold text-ink"
                >
                  <Bell className="h-4 w-4" />
                  Newsletter
                </Link>
                <Link
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="col-span-2 flex items-center justify-center gap-2 rounded-full bg-sun-100 py-3 text-sm font-semibold text-ink"
                >
                  <Star className="h-4 w-4 fill-sun-300 text-sun-300" />
                  Laisser un avis Google
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
