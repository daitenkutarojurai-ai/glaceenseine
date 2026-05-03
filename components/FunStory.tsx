"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const STORY_PARTS = [
  {
    emoji: "☀️",
    text: "C'est un dimanche qui sent la tonte de gazon et la crème solaire. Vous n'avez rien prévu de particulier, juste une promenade le long de la Seine.",
  },
  {
    emoji: "👃",
    text: "Et là — une odeur. Sucrée. Chaude. Beurre fondu, vanille et quelque chose d'indéfinissable qui ressemble très fort au bonheur d'enfance.",
  },
  {
    emoji: "🚙",
    text: "Vos pieds décident avant votre tête. Ils connaissent le chemin. Une petite caravane vert tendre apparaît au détour du quai.",
  },
  {
    emoji: "🧇",
    text: "Sur la pancarte, il est écrit « Glaces artisanales · Crêpes · Gaufres ». Vous lisez « Ce n'est pas la peine de rentrer dîner, on a tout ce qu'il faut ici. »",
  },
  {
    emoji: "🍦",
    text: "Vous commandez une crêpe beurre-sucre. Puis une gaufre. Puis une boule de glace vanille. Par accident, évidemment.",
  },
  {
    emoji: "💙",
    text: "Les pieds dans l'herbe, face à la Seine, vous vous demandez pourquoi vous n'avez pas fait ça tous les dimanches. La réponse : vous le ferez maintenant.",
  },
];

function StoryBubble({
  part,
  index,
}: {
  part: (typeof STORY_PARTS)[0];
  index: number;
}) {
  const isRight = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      className={`flex items-start gap-4 ${isRight ? "flex-row-reverse" : ""}`}
    >
      {/* Emoji bubble */}
      <div className="shrink-0">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 3 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
          className="grid h-14 w-14 place-items-center rounded-2xl bg-cream shadow-soft text-2xl"
        >
          {part.emoji}
        </motion.div>
      </div>

      {/* Text bubble */}
      <div
        className={`glass relative max-w-sm rounded-3xl px-5 py-4 shadow-soft ${
          isRight ? "rounded-tr-sm" : "rounded-tl-sm"
        }`}
      >
        <p className="text-[15px] leading-relaxed text-ink/80">{part.text}</p>
      </div>
    </motion.div>
  );
}

export function FunStory() {
  return (
    <section
      id="histoire"
      className="scroll-mt-24 py-16 sm:py-24 overflow-hidden"
      aria-labelledby="story-title"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow text-center">Une petite histoire</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            id="story-title"
            className="h-display mt-2 text-center text-3xl sm:text-4xl"
          >
            Comment ça commence,{" "}
            <span className="font-script text-cherry">toujours</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-center text-[15px] text-ink/55">
            (Vrai. Sauf le dernier point — celui-là on l&apos;invente. Ou pas.)
          </p>
        </Reveal>

        {/* Story thread */}
        <div className="relative mt-12 space-y-6">
          {/* Vertical line */}
          <div
            className="pointer-events-none absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-teal-200 via-sun-300 to-transparent"
            aria-hidden
          />
          {STORY_PARTS.map((part, i) => (
            <StoryBubble key={i} part={part} index={i} />
          ))}
        </div>

        {/* CTA nudge */}
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <motion.p
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block rounded-full bg-sun-100 px-6 py-3 text-[15px] font-semibold text-ink shadow-soft"
            >
              La prochaine fois que vous sentez l&apos;odeur… suivez-la. 👃🍦
            </motion.p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
