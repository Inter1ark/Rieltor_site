"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FAQ } from "@/lib/site.content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-3xl px-6 py-28 lg:py-36"
    >
      <SectionHeading
        eyebrow="Вопросы и ответы"
        title="Частые вопросы"
        align="center"
      />

      <div className="mt-14 divide-y divide-line border-y border-line">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={(i % 4) * 0.05}>
              <div>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-medium text-fg">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-300 ${
                      isOpen ? "rotate-45 border-emerald/60 text-emerald" : "text-fg-muted"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-[15px] leading-relaxed text-fg-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
