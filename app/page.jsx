import { Archive } from "@/components/sections/Archive";
import { Contact } from "@/components/sections/Contact";
import { Cover } from "@/components/sections/Cover";
import { Feature } from "@/components/sections/Feature";
import { Focus } from "@/components/sections/Focus";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { SideIndex } from "@/components/ui/SideIndex";
import { Ticker } from "@/components/ui/Ticker";

export default function HomePage() {
  return (
    <>
      <SideIndex />
      <main id="publication">
        <Cover />
        <Ticker />
        <Feature />
        <Projects />
        <Skills />
        <Focus />
        <Archive />
        <Contact />
      </main>
    </>
  );
}
