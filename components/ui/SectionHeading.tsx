import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Единый заголовок секции: глазок (eyebrow) + крупный заголовок + описание. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
          <span className="h-px w-6 bg-emerald/60" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.06] tracking-tight text-fg">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-pretty font-sans text-base leading-relaxed text-fg-muted sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
