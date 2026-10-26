import { BackToTop } from "@/components/back-to-top";
import { BottomNav } from "@/components/bottom-nav";
import { BeforeAfter } from "@/components/sections/before-after";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Steps } from "@/components/sections/steps";
import { TimeStrip } from "@/components/sections/time-strip";
import { Tour } from "@/components/sections/tour";
import { Trust } from "@/components/sections/trust";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TimeStrip />
        <BeforeAfter />
        <Features />
        <Tour />
        <Steps />
        <Trust />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <BottomNav />
      <BackToTop />
    </>
  );
}
