"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyAddressButton({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* fallback for older browsers */
    }
  }

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-cream/80 px-5 py-3 text-[13px] font-semibold text-ink shadow-soft transition hover:bg-cream hover:shadow-ring active:scale-95"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-teal-500" />
          Adresse copiée !
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copier l&apos;adresse
        </>
      )}
    </button>
  );
}
