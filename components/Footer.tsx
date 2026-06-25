import { NAV_LINKS, CONTACTS } from "@/lib/site.content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rotate-45 bg-emerald" />
              <span className="font-display text-base font-semibold tracking-tight text-fg">
                Правильная Локация
              </span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
              Помогаем понять, где бизнес действительно сможет заработать, а
              инвестиция окупиться.
            </p>
            <p className="mt-4 font-sans text-[12px] uppercase tracking-[0.22em] text-fg-dim">
              Недвижимость · Бизнес · Инвестиции
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-sans text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2 font-sans text-sm">
            <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="text-fg-muted transition-colors hover:text-emerald">
              {CONTACTS.telegramLabel}
            </a>
            <a href={`mailto:${CONTACTS.email}`} className="text-fg-muted transition-colors hover:text-emerald">
              {CONTACTS.email}
            </a>
            <span className="text-fg-dim">Телефон: по запросу</span>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6">
          <p className="max-w-3xl text-[12px] leading-relaxed text-fg-dim">
            Информация на сайте не является индивидуальной инвестиционной
            рекомендацией. Итоговые решения принимаются клиентом самостоятельно
            после оценки всех обстоятельств.
          </p>
          <p className="mt-4 font-sans text-[13px] text-fg-dim">
            © {year} Правильная Локация
          </p>
        </div>
      </div>
    </footer>
  );
}
