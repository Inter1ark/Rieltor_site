import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollBackground } from "@/components/ui/ScrollBackground";
import { BackToTop } from "@/components/ui/BackToTop";

/** Обёртка для внутренних страниц (кейсы, блог): шапка, прогресс, подвал. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <div className="relative z-10 min-h-screen">
        <ScrollBackground />
        <Header />
        {children}
        <Footer />
      </div>
      <BackToTop />
    </>
  );
}
