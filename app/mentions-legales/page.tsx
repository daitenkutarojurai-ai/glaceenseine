import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionBanner } from "@/components/SectionBanner";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales, informations sur l'éditeur, l'hébergeur, la politique de confidentialité et les données personnelles de Glaces en Seine.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-b border-ink/8 pb-8">
    <h2 className="h-display mb-4 text-xl text-ink">{title}</h2>
    <div className="space-y-2 text-[15px] leading-relaxed text-ink/70">{children}</div>
  </div>
);

export default function MentionsLegalesPage() {
  return (
    <div className="relative overflow-hidden">
      <SectionBanner src="/bannnersmall.png" alt="Mentions légales — Glaces en Seine">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-cream/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-cream/90 backdrop-blur">
          <Shield className="h-3 w-3 text-teal-400" />
          Mentions légales
        </span>
        <h1 className="h-display text-3xl text-cream drop-shadow-sm sm:text-4xl lg:text-5xl">
          Informations{" "}
          <span className="font-script text-cherry">légales</span>
        </h1>
        <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-cream/75 sm:text-[14px]">
          Conformément à la loi LCEN et au RGPD, les utilisateurs du site glaceenseine.fr sont informés de ce qui suit.
        </p>
      </SectionBanner>
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-blob bg-teal-100 opacity-40 blur-3xl" />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">

          <Reveal delay={0.1}>
            <div className="mt-12 space-y-8 rounded-3xl bg-cream p-8 shadow-ring sm:p-10">

              <Section title="1. Éditeur du site">
                <p><strong className="text-ink">Dénomination sociale :</strong> Glaces en Seine</p>
                <p><strong className="text-ink">Forme juridique :</strong> Entreprise individuelle</p>
                <p><strong className="text-ink">Adresse :</strong> Quai de Seine, face à la mairie — 95530 La Frette-sur-Seine</p>
                <p><strong className="text-ink">Contact :</strong>{" "}
                  <Link href="/contact" className="text-teal-700 underline underline-offset-2 hover:text-cherry transition-colors">
                    formulaire de contact
                  </Link>
                  {" "}ou Instagram{" "}
                  <a href="https://instagram.com/glacesenseine" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline underline-offset-2 hover:text-cherry transition-colors">
                    @glacesenseine
                  </a>
                </p>
                <p><strong className="text-ink">SIRET :</strong> [Numéro à compléter]</p>
                <p><strong className="text-ink">N° TVA intracommunautaire :</strong> Non assujettie (franchise en base de TVA)</p>
                <p><strong className="text-ink">Directrice de la publication :</strong> Les fondatrices de Glaces en Seine</p>
              </Section>

              <Section title="2. Hébergement">
                <p><strong className="text-ink">Hébergeur :</strong> Vercel Inc.</p>
                <p><strong className="text-ink">Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
                <p><strong className="text-ink">Site :</strong>{" "}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline underline-offset-2 hover:text-cherry transition-colors">
                    vercel.com
                  </a>
                </p>
              </Section>

              <Section title="3. Propriété intellectuelle">
                <p>
                  L'ensemble de ce site — textes, photographies, logos, images — est protégé par le
                  droit de la propriété intellectuelle. Toute reproduction, même partielle, est
                  interdite sans autorisation préalable écrite de l'éditeur.
                </p>
                <p>
                  Les photographies des produits sont la propriété exclusive de Glaces en Seine.
                  Les photos de la caravane et du quai ont été réalisées par les fondatrices ou leurs
                  proches avec leur accord.
                </p>
              </Section>

              <Section title="4. Données personnelles (RGPD)">
                <p>
                  Les données collectées via le formulaire de contact et d'inscription à la newsletter
                  (nom, email, message) sont utilisées exclusivement pour répondre à vos demandes et
                  vous tenir informé·e des ouvertures et actualités de la caravane.
                </p>
                <p><strong className="text-ink">Responsable du traitement :</strong> Glaces en Seine</p>
                <p><strong className="text-ink">Finalité :</strong> Communication directe, réponses aux demandes de privatisation, newsletter saisonnière.</p>
                <p><strong className="text-ink">Base légale :</strong> Consentement de la personne concernée (art. 6.1.a RGPD).</p>
                <p><strong className="text-ink">Durée de conservation :</strong> 3 ans à compter du dernier contact.</p>
                <p>
                  Conformément au règlement UE 2016/679 (RGPD) et à la loi Informatique et Libertés
                  n° 78-17 du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de
                  rectification, d'effacement et d'opposition. Pour exercer ces droits, utilisez{" "}
                  <Link href="/contact" className="text-teal-700 underline underline-offset-2 hover:text-cherry transition-colors">
                    notre formulaire de contact
                  </Link>.
                </p>
                <p>
                  Vous pouvez également introduire une réclamation auprès de la CNIL :{" "}
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline underline-offset-2 hover:text-cherry transition-colors">
                    cnil.fr
                  </a>
                </p>
              </Section>

              <Section title="5. Cookies">
                <p>
                  Ce site utilise un unique cookie local (<code className="rounded bg-ink/8 px-1.5 py-0.5 text-[13px] font-mono text-ink">ges_poll_w*</code>) pour
                  mémoriser votre vote au sondage hebdomadaire. Ce cookie ne contient aucune donnée
                  personnelle et n'est pas partagé avec des tiers.
                </p>
                <p>
                  Aucun cookie publicitaire ou traceur tiers n'est utilisé sur ce site.
                </p>
              </Section>

              <Section title="6. Limitation de responsabilité">
                <p>
                  Les informations contenues dans ce site sont aussi précises que possible. Toutefois,
                  Glaces en Seine ne peut être tenu responsable des omissions, inexactitudes et
                  carences dans la mise à jour, qu'elles soient de son fait ou des tiers qui lui
                  fournissent ces informations.
                </p>
                <p>
                  Les prix, horaires et disponibilités affichés sont indicatifs et peuvent varier en
                  fonction de la saison, des arrivages et de la météo.
                </p>
              </Section>

              <Section title="7. Droit applicable">
                <p>
                  Tout litige en relation avec l'utilisation du site glaceenseine.fr est soumis au
                  droit français. Il est fait attribution exclusive de juridiction aux tribunaux
                  compétents de Paris.
                </p>
                <p className="text-[13px] text-ink/45">Dernière mise à jour : mai 2026</p>
              </Section>

            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink shadow-soft transition hover:shadow-ring"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                Retour à l&apos;accueil
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
