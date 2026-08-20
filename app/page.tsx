import Header from "@/components/redesign/sections/Header";
import Hero from "@/components/redesign/sections/Hero";
import WhatIDo from "@/components/redesign/sections/WhatIDo";
import BeforeAfter from "@/components/redesign/sections/BeforeAfter";
import ServicesGrid from "@/components/redesign/sections/ServicesGrid";
import About from "@/components/redesign/sections/About";
import CtaBanner from "@/components/redesign/sections/CtaBanner";
import Footer from "@/components/redesign/sections/Footer";

export default function Home() {
  return (
    <div className="redesign-theme flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1 pb-24">
        <Hero />
        <WhatIDo />
        <BeforeAfter />
        <ServicesGrid />
        <About />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
