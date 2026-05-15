import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lightbox from "../components/Lightbox";
import { ArrowUpRight, Layers, Home, Maximize, BedDouble, Building2, Car } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useLang ,} from "../lib/LangContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const project = {
  name: "RD V Devín",
  category: "Rodinné domy na mieru",
  houseType: "Rodinné domy",
  area: "192", rooms: "5", floors: "2 podlažia", garage: "1 auto",
  img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85",
  description: "Rodinný dom sa nachádza v obývanej zóne na Devíne, len 10 minút od Bratislavy. Lokalita je charakteristická príjemnou zástavbou rodinných domov a rekreačných chát. Prístup na pozemok je z juhozápadnej strany priamo z ulice, pričom hlavný vstup do domu je orientovaný rovnakým smerom.",
  layout: "Hlavný vstup do domu je situovaný na juhozápadnej strane a vedie do vstupnej haly so šatníkom, ktorá poskytuje prístup do kúpeľne. Z haly sú prístupné práčovňa, technická miestnosť, garáž a sklad.",
  benefits: ["Oddelenie súkromnej a dennej zóny", "Detské izby a pracovňa – samostatné priestory", "Samostatné WC pre členov rodiny aj hostí", "Rodičovská spálňa so šatníkom", "Vlastná kúpeľňa pri spálni"],
  materials: ["Pohľadový betón — fasáda", "Drevený obklad — terasy", "Veľkoformátová dlažba — interiér", "Hliníkové okná — celoobjektovo"],
  images: [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=85"]

};



const processSteps = [
{ title: "Úvodná konzultácia", time: "1–2 týždne", desc: "Stretneme sa, obhliadneme pozemok a preberieme vaše predstavy." },
{ title: "Architektonická štúdia", time: "4–6 týždňov", desc: "Vypracujeme návrh s ohľadom na funkciu, štýl a rozpočet." },
{ title: "Stavebné povolenie", time: "4–8 týždňov", desc: "Pripravíme kompletnú dokumentáciu pre stavebný úrad." },
{ title: "Realizačný projekt", time: "6–10 týždňov", desc: "Detailný projekt so všetkými podrobnosťami pre výstavbu." }];


const specs = [
{ icon: Layers, label: "Typ projektu", value: project.category },
{ icon: Home, label: "Typ domu", value: project.houseType },
{ icon: Maximize, label: "Úžitková plocha", value: `${project.area} m²` },
{ icon: BedDouble, label: "Počet izieb", value: `${project.rooms} izieb` },
{ icon: Building2, label: "Podlažnosť", value: project.floors },
{ icon: Car, label: "Garáž", value: project.garage }];



export default function ProjectDetail() {
    const { slug } = useParams();

    const { tr } = useLang();
      const projekty = tr("projekty")
//  console.log(projekty);
 

      

     const project = projekty.find((p) => p.slug === slug);
     const toto = project.benefity
     const materialy = project.materialy

     console.log(materialy);
     

  const [lbIndex, setLbIndex] = useState(null);
  const[otovrenie,setOtvorenie] = useState(null)
const images = project?.imgGallery ?? [];
 const nextImg = () => {
  if (!images.length) return;

  setLbIndex((lbIndex + 1) % images.length);
};

const prevImg = () => {
  if (!images.length) return;

  setLbIndex((lbIndex - 1 + images.length) % images.length);
};

  return (
    <div className="min-h-screen bg-background">


      <motion.div
 initial={{ opacity: 0 }}
  animate={{
    opacity: otovrenie ? 1 : 0,
  }}
  transition={{
    duration: 0.25,
    ease: "easeInOut",
  }}
  className={`
    fixed inset-0 z-40 bg-background/20 backdrop-blur-md
    ${otovrenie ? "pointer-events-auto" : "pointer-events-none"}
  `}
/>


      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] md:h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={project.imgFull} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/25 to-transparent" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-16 w-full pb-12">
          <p className="text-white/45 text-sm mb-2">{project.kategoria} — {project.style} — {project.stav}</p>
          <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-5">{project.nazov}</h1>
          
          {project.exterier &&
           <div className="flex flex-wrap gap-2.5">
                        {[
                  `${project.exterier?.plocha} m²`,
                  `${project.exterier?.izby} izieb`,
                  `${project.exterier?.podlazia} podlažia`
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-white/75 text-sm"
                  >
                    {tag}
                  </span>
                ))}
          </div>
        }
         
        </div>
      </section>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[330px_1fr]">
          {/* Sidebar */}
          <div className="order-2 lg:order-1">
            <div className="bg-secondary rounded-2xl p-5 border border-border sticky top-28">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">Špecifikácie</p>
              <div className="space-y-0">
                {specs.map((s) =>
                <div key={s.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-2.5">
                      <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                    <span className="text-xs font-semibold">{s.value}</span>
                  </div>
                )}
              </div>
              <button className="w-full mt-5 flex items-center justify-center gap-2 py-3 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors">
                Mám záujem <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="order-1 lg:order-2 space-y-14">
            <p className="text-foreground/70 leading-relaxed text-base md:text-lg">{project.popis.dlhy}</p>

            {/* Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.imgGallery.map((img, i) =>
              
              <div
                key={i}
                className={`rounded-xl overflow-hidden cursor-pointer group bg-secondary ${i === 0 ? "col-span-2 aspect-video" : "aspect-[4/3]"}`}
                onClick={() => {setLbIndex(i),setOtvorenie(true)}}>
                
                  <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
            </div>

            {/* Layout */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Dispozičné riešenie</h2>
              <p className="text-foreground/65 leading-relaxed text-sm">{project.popis.dispozicia}</p>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">Kľúčové benefity</h2>
              <ul className="space-y-3">
                {toto.map((b, i) => 
                <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                    <span className="text-foreground/65 text-sm leading-relaxed">{b}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Materials */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">Použité materiály</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             {materialy.map((m, i) => (
                <div
                  key={i}
                  className="px-4 py-3 bg-secondary border border-border rounded-xl"
                >
                  <h3 className="text-sm font-medium text-foreground">
                    {m.nazov}
                  </h3>

                  <p className="text-sm text-foreground/75 mt-1">
                    {m.pouzitie}
                  </p>
                </div>
              ))}
              </div>
            </div>

            {/* FAQ */}
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="docs" className="border border-border rounded-xl px-5">
                <AccordionTrigger className="font-medium text-sm py-4 hover:no-underline">Čo obsahuje projektová dokumentácia?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  Projektová dokumentácia obsahuje všetky nevyhnutné informácie pre získanie stavebného povolenia vrátane statiky, elektroinštalácií, vodovodu a kúrenia.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Process */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">Ako prebieha návrh</h2>
              <div>
                {processSteps.map((step, i) =>
                <div key={i} className="relative pl-7 pb-9 border-l border-border last:border-transparent last:pb-0">
                    <div className="absolute left-[-4px] top-0.5 w-2 h-2 rounded-full bg-foreground border-2 border-background" />
                    <h3 className="font-semibold tracking-tight mb-0.5">{step.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">{step.time}</p>
                    <p className="text-foreground/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lbIndex !== null &&
        <Lightbox
        setter = {setOtvorenie}
         images={project.imgGallery} index={lbIndex}
          onClose={() => {setLbIndex(null),setOtvorenie(false)}} onNext={nextImg} onPrev={prevImg} />
        }
      </AnimatePresence>

      <Footer />
    </div>);

}