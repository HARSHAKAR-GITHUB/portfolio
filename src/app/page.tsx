import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { CyberLab } from "@/components/CyberLab";
import { Exploring } from "@/components/Exploring";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Toolkit } from "@/components/Toolkit";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Certifications />
        <Projects />
        <Toolkit />
        <CyberLab />
        <Journey />
        <Exploring />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
