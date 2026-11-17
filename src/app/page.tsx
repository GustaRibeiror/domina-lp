import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Differentials } from "@/components/sections/Differentials";
import { Platform } from "@/components/sections/Platform";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Problem />
        <div className="on-dark bg-tinta text-papel">
          <Solution />
          <HowItWorks />
        </div>
        <Differentials />
        <div className="on-dark bg-tinta text-papel">
          <Platform />
        </div>
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
