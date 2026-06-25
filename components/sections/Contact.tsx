"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACTS, CONTACT_SEND, CONTACT_GET } from "@/lib/site.content";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative border-t border-line py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="mb-5 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
                <span className="h-px w-6 bg-emerald/60" />
                Не уверены в объекте?
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.08] tracking-tight text-fg">
                Отправьте объект на разбор
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
                Любое решение начинается с одного вопроса: стоит ли вкладывать
                деньги именно в этот объект? Пришлите адрес, ссылку или описание,
                и мы посмотрим на ситуацию со стороны, выявим риски и оценим
                потенциал.
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <List title="Что можно прислать" items={CONTACT_SEND} />
                <List title="Что вы получите" items={CONTACT_GET} accent />
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-fg-muted transition-colors hover:text-emerald">
                  {CONTACTS.telegramLabel}
                </a>
                <a href={`mailto:${CONTACTS.email}`} className="font-sans text-sm text-fg-muted transition-colors hover:text-emerald">
                  {CONTACTS.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-line bg-white/[0.02] p-8 lg:p-10"
            >
              <div className="space-y-5">
                <Field name="name" label="Как вас зовут" placeholder="Имя" required />
                <Field
                  name="contact"
                  label="Телефон или Telegram"
                  placeholder="Как с вами связаться"
                  required
                />
                <Field
                  name="object"
                  label="Объект и задача"
                  placeholder="Ссылка, адрес или краткое описание"
                  textarea
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(
                  "mt-8 w-full rounded-full bg-emerald px-7 py-4 font-sans text-sm font-semibold text-[#04130d] transition-all duration-300",
                  "hover:shadow-[0_12px_40px_-8px_rgba(47,224,166,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
                )}
              >
                {status === "sending" ? "Отправляем…" : "Отправить на разбор"}
              </button>

              <p className="mt-4 text-center text-[12px] leading-relaxed text-fg-dim">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
              </p>

              {status === "ok" && (
                <p className="mt-3 text-center text-sm text-emerald">
                  Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-center text-sm text-fg-muted">
                  Не удалось отправить. Напишите нам в{" "}
                  <a href={CONTACTS.telegram} className="text-emerald underline">
                    Telegram
                  </a>
                  .
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function List({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div>
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-fg-dim">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[14px] leading-relaxed text-fg-muted">
            <span
              className={cn(
                "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                accent ? "bg-emerald" : "bg-fg-dim"
              )}
            />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Field({
  name,
  label,
  placeholder,
  required,
  textarea,
}: {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-xl border border-line bg-bg px-4 py-3.5 font-sans text-[15px] text-fg placeholder:text-fg-dim outline-none transition-colors focus:border-emerald/60";
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-xs uppercase tracking-[0.18em] text-fg-dim">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={3} className={base} />
      ) : (
        <input name={name} placeholder={placeholder} required={required} className={base} />
      )}
    </label>
  );
}
