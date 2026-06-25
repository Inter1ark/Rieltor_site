import Image from "next/image";
import { SHOWCASE_QUOTE } from "@/lib/site.content";
import { Reveal } from "@/components/ui/Reveal";

/** Полноширинная полоса с изображением и крупной цитатой. */
export function Showcase() {
  return (
    <section className="relative my-8 overflow-hidden">
      <div className="relative h-[60vh] min-h-[420px] w-full">
        <Image
          src="/images/interior.jpg"
          alt="Премиальный интерьер"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald">
              Философия
            </span>
            <p className="mt-5 font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-medium leading-[1.15] tracking-tight text-fg">
              {SHOWCASE_QUOTE}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
