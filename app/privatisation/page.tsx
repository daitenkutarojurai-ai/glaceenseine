import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Briefcase,
  PartyPopper,
  Users,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  IceCream,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PrivatisationForm } from "@/components/PrivatisationForm";
import { SectionBanner } from "@/components/SectionBanner";

export const metadata: Metadata = {
  title: "Privatisation caravane glaces, crêpes & gaufres — mariage, séminaire, événement",
  description:
    "Privatisez la caravane Glaces en Seine pour mariage, anniversaire, séminaire ou fête de quartier en Île-de-France. Glaces artisanales, crêpes et gaufres préparées sur place. Devis gratuit sous 48 h.",
  alternates: { canonical: "/privatisation" },
};

const PRIV_FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Pour quels événements peut-on privatiser la caravane ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mariage et PACS, séminaires et événements d'entreprise, anniversaires, fêtes de quartier, baptêmes, festivals locaux et tournages. La caravane se déplace en Île-de-France.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la zone de déplacement de la caravane ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glaces en Seine intervient en Île-de-France, principalement dans le Val-d'Oise (95), les Yvelines (78), les Hauts-de-Seine (92) et Paris. Au-delà, des frais de déplacement s'appliquent.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps avant l'événement faut-il réserver ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Idéalement 6 à 8 semaines à l'avance pour les samedis de mai à septembre, qui partent vite. Les autres dates restent disponibles plus tardivement.",
      },
    },
    {
      "@type": "Question",
      name: "La caravane fonctionne-t-elle en intérieur ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La caravane se gare à l'extérieur (cour, jardin, parking, place piétonne). Pour des événements en intérieur, nous proposons une formule sans caravane avec stand mobile glaces et crêpes.",
      },
    },
    {
      "@type": "Question",
      name: "Comment obtenir un devis ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Remplissez le formulaire de demande sur la page Privatisation : on revient vers vous sous 48 heures avec une proposition personnalisée et le tarif détaillé.",
      },
    },
  ],
};

const EVENTS = [
  {
    icon: Heart,
    color: "bg-rose-100 text-cherry",
    title: "Mariage & PACS",
    desc: "Offrez à vos invités un espace gourmand et inattendu — la caravane devient votre « stand glaces » le temps d'un jour magique.",
    details: ["Personnalisation aux couleurs de l'événement", "Parfums sur-mesure", "Animation crêpes en direct"],
  },
  {
    icon: Briefcase,
    color: "bg-teal-100 text-teal-700",
    title: "Événement entreprise",
    desc: "Team building, séminaire, journée d'intégration ou simple pot de départ — la caravane sort vos équipes du bureau avec le sourire.",
    details: ["Forfait groupes à partir de 20 pers.", "Service en continu", "Facturation entreprise"],
  },
  {
    icon: PartyPopper,
    color: "bg-sun-100 text-ink",
    title: "Anniversaire & fête",
    desc: "Pour les 5 ans comme pour les 50, rien ne fait plus d'effet qu'une caravane à glaces qui débarque dans votre jardin.",
    details: ["Déplacement possible", "Gâteau surprise possible", "Animation enfants"],
  },
  {
    icon: Users,
    color: "bg-peach-100 text-cherry",
    title: "Fête de quartier & brocante",
    desc: "Vous organisez un événement local ? On s'installe, on se mêle aux voisins, et on repart quand les cornets sont vides.",
    details: ["Forfaits demi-journée", "Idéal > 50 personnes", "On apporte tout le matériel"],
  },
];

const PERKS = [
  { icon: IceCream, text: "Glaces artisanales préparées le matin même" },
  { icon: Star,     text: "Crêpes et gaufres minute, sous vos yeux" },
  { icon: MapPin,   text: "Déplacement en Île-de-France (rayon ~40 km)" },
  { icon: Clock,    text: "Service de 2 h à la journée selon vos besoins" },
  { icon: CheckCircle2, text: "Devis personnalisé sous 48 h" },
  { icon: Heart,    text: "Une équipe sœurs-fondatrices, passionnées et souriantes" },
];

export default function PrivatisationPage() {
  return (
    <div className="relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRIV_FAQ_LD) }} />
      <SectionBanner>
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-cream/90 backdrop-blur">
          <Heart className="h-3 w-3 text-cherry" />
          Privatisation
        </span>
        <h1 className="h-display text-3xl leading-tight text-cream drop-shadow-sm sm:text-4xl lg:text-5xl">
          La caravane,{" "}
          <span className="font-script text-sun-300">rien que</span>
          <br />
          pour vous.
        </h1>
        <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-cream/80 drop-shadow-sm sm:text-[15px]">
          Mariage, séminaire, anniversaire ou fête de quartier — on amène la
          caravane, la plaque chaude et les glaces artisanales.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#demande"
            className="inline-flex items-center gap-2 rounded-full bg-cherry px-6 py-2.5 text-[13px] font-semibold text-cream shadow-glow-cherry transition hover:bg-cherry/90"
          >
            <Heart className="h-3.5 w-3.5" />
            Demander un devis
          </a>
          <a
            href="#formules"
            className="inline-flex items-center gap-2 rounded-full bg-cream/20 px-6 py-2.5 text-[13px] font-semibold text-cream backdrop-blur transition hover:bg-cream/30"
          >
            Voir les formules
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </SectionBanner>

      {/* Background blobs for lower sections */}
      <div className="pointer-events-none absolute left-0 top-[60vh] h-96 w-96 -translate-x-1/2 rounded-blob bg-rose-100 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-[80vh] h-80 w-80 translate-x-1/2 rounded-blob bg-sun-100 opacity-50 blur-3xl" />

      {/* ── Event types ── */}
      <section
        id="formules"
        className="scroll-mt-24 py-16 sm:py-20"
        aria-labelledby="formules-title"
      >
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2
              id="formules-title"
              className="h-display text-center text-3xl sm:text-4xl"
            >
              Pour chaque{" "}
              <span className="font-script text-teal-700">occasion</span>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-3 text-center text-[15px] text-ink/55">
              On s'adapte à votre contexte, votre budget et votre nombre d'invités.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EVENTS.map((ev, i) => (
              <Reveal key={ev.title} delay={i * 0.07}>
                <a
                  href="#demande"
                  className="group flex h-full flex-col rounded-3xl bg-cream p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry"
                >
                  <span className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl ${ev.color}`}>
                    <ev.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[17px] font-semibold text-ink">{ev.title}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink/60">{ev.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {ev.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-[13px] text-ink/70">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-1 text-[12px] font-semibold text-cherry/70 transition group-hover:text-cherry">
                    Demander un devis <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Perks banner ── */}
      <section className="py-12" aria-label="Ce qu'on apporte">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass rounded-3xl px-8 py-10 shadow-schedule">
            <Reveal>
              <h2 className="h-display text-center text-2xl sm:text-3xl">
                Ce qu&apos;on apporte,{" "}
                <span className="font-script text-cherry">toujours</span>
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PERKS.map((p, i) => (
                <Reveal key={p.text} delay={i * 0.05}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 rounded-xl bg-cream p-2 shadow-soft">
                      <p.icon className="h-4 w-4 text-cherry" />
                    </span>
                    <span className="text-[14px] leading-snug text-ink/75">{p.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo teaser ── */}
      <section className="py-12" aria-hidden>
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-ring">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/camion-patronne.jpg"
                alt="La caravane Glaces en Seine et ses fondatrices"
                className="h-72 w-full object-cover object-[center_30%] sm:h-96"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-center text-[14px] text-ink/50">
              La caravane vert tendre et ses deux sœurs fondatrices — disponibles pour votre événement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Privatisation form ── */}
      <section
        id="demande"
        className="scroll-mt-24 py-16 sm:py-24"
        aria-labelledby="form-title"
      >
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="eyebrow text-center">Demande de devis</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              id="form-title"
              className="h-display mt-2 text-center text-3xl sm:text-4xl"
            >
              Parlons de votre{" "}
              <span className="font-script text-cherry">projet</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-center text-[15px] text-ink/55">
              Remplissez le formulaire — on vous répond sous 48 h avec un devis personnalisé.
              Pas d'engagement, juste une conversation.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 rounded-[2rem] bg-cream p-7 shadow-ring sm:p-10">
              <PrivatisationForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Back CTA ── */}
      <div className="pb-16 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] text-ink/50 transition hover:text-ink"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
