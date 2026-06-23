import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { OpenSource } from "@/components/OpenSource";
import { Projects } from "@/components/Projects";
import { TechnicalStack } from "@/components/TechnicalStack";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <main className="relative z-10 overflow-hidden">
        <Navbar />
        <Hero />
        <About />
        <TechnicalStack />
        <Projects />
        <OpenSource />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
