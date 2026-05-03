import Link from "next/link";
import { Instagram, MapPin, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-ink text-cream">
      <Wave />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-12 pt-24 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-script text-3xl text-sun-300">Glaces en Seine</div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">
            Glacier de quai, artisan et saisonnier. On installe la caravane face à la mairie de
            La Frette-sur-Seine, on prépare les pâtes le matin, et on vous attend au bord de l'eau.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <Link
              href="https://instagram.com/glacesenseine"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @glacesenseine"
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 transition hover:bg-cream/20"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 transition hover:bg-cream/20"
              aria-label="Contact"
            >
              <Mail className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.google.com/maps/search/?api=1&query=mairie+La+Frette-sur-Seine"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 transition hover:bg-cream/20"
              aria-label="Google Maps"
            >
              <MapPin className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-cream/50">Naviguer</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/menu" className="hover:text-sun-300">Le menu</Link></li>
            <li><Link href="/privatisation" className="hover:text-sun-300">Privatisation</Link></li>
            <li><Link href="/emplacement" className="hover:text-sun-300">Nous trouver</Link></li>
            <li><Link href="/#newsletter" className="hover:text-sun-300">Newsletter</Link></li>
            <li><Link href="/notre-histoire" className="hover:text-sun-300">Notre histoire</Link></li>
            <li><Link href="/contact" className="hover:text-sun-300">Contact & Avis</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-cream/50">Pratique</div>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-cream/80">
            <li className="font-semibold text-sun-300">Quai de Seine</li>
            <li>Face à la mairie de La Frette</li>
            <li className="text-cream/55 text-xs italic">Place de la Mairie · 95530 La Frette-sur-Seine</li>
            <li className="text-cream/45 text-[11px]">Vous pouvez pas nous louper 😉</li>
            <li className="pt-1">Sam · Dim · fériés</li>
            <li>14h – 19h, mai → septembre</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-cream/50 md:flex-row">
          <div className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Glaces en Seine · fait avec
            <Heart className="h-3 w-3 text-cherry" /> sur les quais
          </div>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-cream">Mentions légales</Link>
            <Link href="/privatisation" className="hover:text-cream">Privatisation</Link>
            <Link href="/notre-histoire" className="hover:text-cream">Notre histoire</Link>
            <Link href="/contact" className="hover:text-cream">Contact & Avis</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Wave() {
  return (
    <svg
      className="absolute inset-x-0 top-0 -translate-y-[1px] text-cream"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,40 C240,80 480,0 720,32 C960,64 1200,80 1440,32 L1440,0 L0,0 Z"
      />
    </svg>
  );
}
