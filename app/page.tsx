import { Hero } from "@/components/hero/Hero";
import { Header } from "@/components/Header";
import { Marquee } from "@/components/sections/Marquee";
import { Concept } from "@/components/sections/Concept";
import { Audience } from "@/components/sections/Audience";
import { HorizontalShowcase } from "@/components/sections/HorizontalShowcase";
import { Showcase } from "@/components/sections/Showcase";
import { CostOfError } from "@/components/sections/CostOfError";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Cases } from "@/components/sections/Cases";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollBackground } from "@/components/ui/ScrollBackground";
import { BackToTop } from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />

      <main id="top" className="relative z-10">
        <ScrollBackground />
        <Header />
        <Marquee />
        <Concept />
        <Audience />
        <HorizontalShowcase />
        <Showcase />
        <CostOfError />
        <Process />
        <WhyUs />
        <Cases />
        <BlogTeaser />
        <Faq />
        <Contact />
        <Footer />
      </main>

      <BackToTop />
    </>
  );
}
