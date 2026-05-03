"use client";

import { motion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────────
   SceneArt — hand-drawn SVG illustrations for the hero & accents.
   Designed to feel pastel, playful, gourmand. Inspired by the
   Glaces en Seine poster: pastel teal badge, pink/yellow scoops,
   waffle cone, soft strokes.
   ──────────────────────────────────────────────────────────────────── */

export function GlaceIllustration({ className = "" }: { className?: string }) {
  // Triple-scoop ice cream — the hero piece.
  return (
    <motion.svg
      className={className}
      viewBox="0 0 320 440"
      role="img"
      aria-label="Glace artisanale trois boules"
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <defs>
        <radialGradient id="scoopPink" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#FFE3E1" />
          <stop offset="60%" stopColor="#F4B6B6" />
          <stop offset="100%" stopColor="#E68F8F" />
        </radialGradient>
        <radialGradient id="scoopSun" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#FFF6D6" />
          <stop offset="60%" stopColor="#FBE08E" />
          <stop offset="100%" stopColor="#F4C95D" />
        </radialGradient>
        <radialGradient id="scoopMint" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#E6F6F0" />
          <stop offset="60%" stopColor="#9CD8CC" />
          <stop offset="100%" stopColor="#5DBAA8" />
        </radialGradient>
        <linearGradient id="cone" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F4C795" />
          <stop offset="100%" stopColor="#B97B43" />
        </linearGradient>
        <radialGradient id="cherryGrad" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#FF9C8E" />
          <stop offset="100%" stopColor="#B14637" />
        </radialGradient>
      </defs>

      {/* Soft halo */}
      <circle cx="160" cy="200" r="150" fill="#FFF1C4" opacity="0.45" />

      {/* Cone (waffle) */}
      <g>
        <path
          d="M95 240 L225 240 L168 415 C166 421 154 421 152 415 Z"
          fill="url(#cone)"
          stroke="#7A4E22"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Waffle lattice */}
        <g stroke="#7A4E22" strokeWidth="1.6" opacity="0.55">
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`d1-${i}`}
              x1={95 + i * 26}
              y1={240}
              x2={140 + i * 16}
              y2={420}
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`d2-${i}`}
              x1={225 - i * 26}
              y1={240}
              x2={180 - i * 16}
              y2={420}
            />
          ))}
        </g>
        {/* Cone rim */}
        <ellipse cx="160" cy="240" rx="68" ry="11" fill="#A56B36" />
        <ellipse cx="160" cy="237" rx="68" ry="9" fill="#D69E66" />
      </g>

      {/* Bottom scoop — mint */}
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="160" cy="225" r="78" fill="url(#scoopMint)" />
        {/* Drip */}
        <path
          d="M100 230 Q105 260 95 275 Q90 268 92 250 Z"
          fill="url(#scoopMint)"
        />
        <path
          d="M220 232 Q225 268 232 280 Q240 268 232 246 Z"
          fill="url(#scoopMint)"
        />
        <ellipse cx="135" cy="200" rx="22" ry="11" fill="#FFFFFF" opacity="0.4" />
      </motion.g>

      {/* Middle scoop — pink */}
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <circle cx="160" cy="160" r="68" fill="url(#scoopPink)" />
        <ellipse cx="138" cy="138" rx="20" ry="10" fill="#FFFFFF" opacity="0.5" />
      </motion.g>

      {/* Top scoop — sun yellow */}
      <motion.g
        animate={{ y: [0, -4, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        style={{ transformOrigin: "160px 105px" }}
      >
        <circle cx="160" cy="105" r="58" fill="url(#scoopSun)" />
        <ellipse cx="142" cy="86" rx="18" ry="9" fill="#FFFFFF" opacity="0.55" />
      </motion.g>

      {/* Cherry on top */}
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M160 50 C 175 22 210 22 215 38"
          stroke="#3F8F4A"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="160" cy="55" r="14" fill="url(#cherryGrad)" />
        <ellipse cx="155" cy="50" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.7" />
      </motion.g>

      {/* Sprinkles */}
      <g>
        {[
          [110, 130, "#E68F8F", -10],
          [205, 145, "#5DBAA8", 15],
          [128, 178, "#F4C95D", 25],
          [195, 100, "#E26B5C", -25],
          [175, 200, "#9CD8CC", 5],
        ].map(([x, y, c, r], i) => (
          <rect
            key={i}
            x={x as number}
            y={y as number}
            width="8"
            height="3"
            rx="1.5"
            fill={c as string}
            transform={`rotate(${r} ${x} ${y})`}
          />
        ))}
      </g>
    </motion.svg>
  );
}

export function ScoopIllustration({ className = "" }: { className?: string }) {
  // A single scoop on a small cone — used as a floating accent.
  return (
    <motion.svg
      className={className}
      viewBox="0 0 200 260"
      role="img"
      aria-label="Petit cornet de glace"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2 }}
    >
      <defs>
        <radialGradient id="scoopPeach" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#FFE9DA" />
          <stop offset="60%" stopColor="#FFCAB1" />
          <stop offset="100%" stopColor="#F8A684" />
        </radialGradient>
        <linearGradient id="cone2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F4C795" />
          <stop offset="100%" stopColor="#B97B43" />
        </linearGradient>
      </defs>
      <path
        d="M55 130 L145 130 L107 250 C105 254 95 254 93 250 Z"
        fill="url(#cone2)"
        stroke="#7A4E22"
        strokeWidth="2.5"
      />
      <ellipse cx="100" cy="130" rx="48" ry="8" fill="#A56B36" />
      <circle cx="100" cy="100" r="60" fill="url(#scoopPeach)" />
      <ellipse cx="80" cy="80" rx="18" ry="9" fill="#FFFFFF" opacity="0.5" />
      <circle cx="100" cy="42" r="9" fill="#E26B5C" />
      <path
        d="M100 35 C 110 18 130 18 132 28"
        stroke="#3F8F4A"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export function WafflePill({ className = "" }: { className?: string }) {
  // A folded crêpe / mini waffle accent.
  return (
    <motion.svg
      viewBox="0 0 240 180"
      className={`h-[120px] w-[160px] ${className}`}
      role="img"
      aria-label="Crêpe pliée"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4 }}
    >
      <defs>
        <radialGradient id="crepe" cx="0.5" cy="0.4" r="0.7">
          <stop offset="0%" stopColor="#FFE9C2" />
          <stop offset="80%" stopColor="#F1C77A" />
          <stop offset="100%" stopColor="#C99445" />
        </radialGradient>
      </defs>
      {/* Plate */}
      <ellipse cx="120" cy="140" rx="100" ry="14" fill="#221C12" opacity="0.08" />
      {/* Crêpe folded triangle */}
      <path
        d="M40 130 L120 28 L200 130 Z"
        fill="url(#crepe)"
        stroke="#8B5E22"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Nutella drizzle */}
      <path
        d="M70 110 C 90 100 110 122 130 108 C 150 96 170 118 190 108"
        stroke="#5B2E0E"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Powdered sugar */}
      {[
        [85, 60],
        [120, 50],
        [150, 70],
        [105, 85],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#FFFBF1" />
      ))}
    </motion.svg>
  );
}

/* ─── Decorative accents used across sections ─── */

export function Blob({
  className = "",
  color = "#FFF1C4",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        fill={color}
        d="M421.5,341.5Q393,433,302,452Q211,471,141.5,402Q72,333,113,236.5Q154,140,254,121Q354,102,420.5,176Q487,250,421.5,341.5Z"
      />
    </svg>
  );
}

export function WaveDivider({
  className = "",
  flip = false,
  color = "#FFFBF1",
}: {
  className?: string;
  flip?: boolean;
  color?: string;
}) {
  return (
    <svg
      className={`block w-full ${flip ? "rotate-180" : ""} ${className}`}
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill={color}
        d="M0,40 C240,80 480,0 720,32 C960,64 1200,80 1440,32 L1440,90 L0,90 Z"
      />
    </svg>
  );
}
