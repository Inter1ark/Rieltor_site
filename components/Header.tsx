"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site.content";
import { cn } from "@/lib/utils";

/** Шапка статичной части: логотип, навигация по якорям, CTA. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-20 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-bg/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="/" className="flex items-center gap-2.5">
          <span className="h-2 w-2 rotate-45 bg-emerald" />
          <span className="font-display text-base font-semibold tracking-tight text-fg">
            Правильная&nbsp;Локация
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="cursor-pointer font-sans text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/#contact"
          className="cursor-pointer rounded-full bg-emerald px-5 py-2.5 font-sans text-sm font-semibold text-[#04130d] transition-shadow duration-300 hover:shadow-[0_10px_30px_-8px_rgba(47,224,166,0.55)]"
        >
          Отправить объект
        </a>
      </div>
    </header>
  );
}
