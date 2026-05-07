// Glace en Seine — newsletter renderer used by the weekly cron route.
// Variation pools live in `newsletter/content.json`; HTML skeletons live in
// `newsletter/templates/*.html`. Rotation is deterministic per week index.

import { readFileSync } from "fs";
import { join } from "path";

import contentJson from "../newsletter/content.json";

export type Hook = { kicker: string; title: string; body: string };

export type NewsletterTemplate = {
  id: number;
  key: string;
  file: string;
  subject: string;
  menuButton: string;
  hooks: Hook[];
  shoutouts: string[][];
  polls: string[];
  funfacts: string[];
};

export type Variant = {
  hook: Hook;
  shoutout: string[];
  poll: string;
  funfact: string;
};

export type WeeklyPick = {
  template: NewsletterTemplate;
  variant: Variant;
  week: number;
};

const TEMPLATES = (contentJson as { templates: NewsletterTemplate[] }).templates;

// Reference epoch — Sat 2026-05-02 00:00 Europe/Paris (CEST, UTC+2). Matches
// `WEEK_EPOCH_MS` in newsletter/sendEmail.js so the CLI and the cron pick
// the same template+variant for any given week.
const WEEK_EPOCH_MS = Date.UTC(2026, 4, 1, 22, 0, 0);
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function weekIndex(date: Date = new Date()): number {
  return Math.floor((date.getTime() - WEEK_EPOCH_MS) / WEEK_MS);
}

function modIndex(i: number, len: number): number {
  return ((i % len) + len) % len;
}

export function pickForWeek(week: number): WeeklyPick {
  const template = TEMPLATES[modIndex(week, TEMPLATES.length)];
  const cycle = Math.floor(week / TEMPLATES.length);
  const pick = <T>(pool: T[]): T => pool[modIndex(cycle, pool.length)];
  return {
    template,
    week,
    variant: {
      hook: pick(template.hooks),
      shoutout: pick(template.shoutouts),
      poll: pick(template.polls),
      funfact: pick(template.funfacts),
    },
  };
}

/** Read the HTML skeleton for a template and substitute every placeholder. */
export function renderTemplate(template: NewsletterTemplate, variant: Variant): string {
  const file = join(process.cwd(), "newsletter", template.file);
  const skeleton = readFileSync(file, "utf8");
  return skeleton
    .replace(/\{\{KICKER\}\}/g, variant.hook.kicker)
    .replace(/\{\{HOOK_TITLE\}\}/g, variant.hook.title)
    .replace(/\{\{HOOK_BODY\}\}/g, variant.hook.body)
    .replace(/\{\{NAME1\}\}/g, variant.shoutout[0])
    .replace(/\{\{NAME2\}\}/g, variant.shoutout[1])
    .replace(/\{\{NAME3\}\}/g, variant.shoutout[2])
    .replace(/\{\{POLL\}\}/g, variant.poll)
    .replace(/\{\{FUNFACT\}\}/g, variant.funfact)
    .replace(/\{\{MENU_BUTTON\}\}/g, template.menuButton);
}

/** One-shot helper: pick + render based on the current date. */
export function prepareWeeklySend(date: Date = new Date()): WeeklyPick & { html: string } {
  const pick = pickForWeek(weekIndex(date));
  return { ...pick, html: renderTemplate(pick.template, pick.variant) };
}
