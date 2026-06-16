"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Clock, MapPin, Sun } from "lucide-react";
import Link from "next/link";

const messages = [
  { icon: Sun,      text: "Ouvert de mai à septembre · saison estivale",          href: "/emplacement" },
  { icon: Clock,    text: "Weekends & jours fériés · 15h – 18h",                  href: "/emplacement" },
  { icon: MapPin,   text: "Face à la mairie · Quai de Seine, La Frette-sur-Seine",href: "/emplacement" },
  { icon: Sparkles, text: "Glaces · crêpes · gaufres sur les quais de Seine",    href: "/menu" },
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % messages.length), 4200);
    return () => clearInterval(id);
  }, []);
  const M = messages[i];
  const Icon = M.icon;
  return (
    <div className="relative z-50 overflow-hidden bg-gradient-to-r from-teal-700 via-teal-500 to-cherry text-cream">
      <Link
        href={M.href}
        className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-4 text-[12.5px] font-medium tracking-wide transition hover:opacity-85"
        aria-label={M.text}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex items-center gap-2"
          >
            <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
            <span>{M.text}</span>
          </motion.div>
        </AnimatePresence>
      </Link>
    </div>
  );
}
