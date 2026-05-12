import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Check, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "../lib/LangContext";

const included = [
  "Úvodná konzultácia s architektom",
  "Architektonická štúdia (dispozície + vizualizácie)",
  "Projekt pre stavebné povolenie",
  "Realizačný projekt (detaily, materiály, profesie)",
  "Konzultácie počas stavby",
  "Možnosť nadväzujúcej výstavby",
];

const steps = [
  { n: "01", title: "Úvodná konzultácia", time: "1–2 týždne", desc: "Stretneme sa, obhliadneme pozemok a preberieme vaše predstavy." },
  { n: "02", title: "Architektonická štúdia", time: "4–6 týždňov", desc: "Vypracujeme návrh s ohľadom na funkciu, štýl, pozemok a rozpočet." },
  { n: "03", title: "Stavebné povolenie", time: "4–8 týždňov", desc: "Pripravíme kompletnú dokumentáciu pre stavebný úrad." },
  { n: "04", title: "Realizačný projekt", time: "6–10 týždňov", desc: "Detailný projekt so všetkými podrobnosťami pre výstavbu." },
  { n: "05", title: "Výstavba", time: "8–14 mesiacov", desc: "Vlastná stavebná firma realizuje projekt pod architektonickým dohľadom." },
];

export default function ServiceCustomHouse() {
  const { tr } = useLang();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24 max-w-screen-xl mx-auto px-6 lg:px-16">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-20">
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-3">Služby</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.0] mb-10">
              Rodinný dom<br />na mieru
            </h1>
            <div className="bg-secondary rounded-2xl p-6 border border-border">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-5">Čo je zahrnuté?</p>
              <div className="space-y-3.5">
                {included.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-foreground/10 border border-border flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-foreground" />
                    </div>
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-7 flex items-center justify-center gap-2 py-3.5 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors">
                Mám záujem <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85"
                alt="Custom house"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Každý dom navrhujeme od nuly – podľa vašich predstáv, pozemku a rozpočtu. Výsledkom je premyslený projekt pripravený na realizáciu.
            </p>
          </motion.div>
        </div>

        {/* Process timeline */}
        <div className="border-t border-border pt-16">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-2.5">Proces</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-14">Ako prebieha spolupráca</h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border hidden md:block" />
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[32px_1fr] gap-6 md:gap-10 pb-12 last:pb-0">
                  <div className="hidden md:flex items-start justify-center pt-1">
                    <div className="w-2 h-2 rounded-full bg-foreground border-2 border-background relative z-10 mt-1.5" />
                  </div>
                  <div className="pl-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-muted-foreground">{step.n}</span>
                      <h3 className="font-semibold tracking-tight">{step.title}</h3>
                      <span className="text-xs text-muted-foreground border border-border px-2.5 py-1 rounded-full">{step.time}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}