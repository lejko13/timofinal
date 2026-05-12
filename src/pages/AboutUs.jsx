import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import ContactCTA from "../components/home/ContactCTA";

const team = [
  {
    name: "Timotej Šmondrk",
    role: "CEO & Lead Architect",
    accent: "Zakladateľ štúdia",
    bio: "Architekt s viac ako 10 rokmi skúseností. Vedie celý ateliér, dozerá na kvalitu každého projektu a buduje vzťahy s klientmi od prvého stretnutia.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
    linkedin: "#",
    web: "#",
  },
  {
    name: "Lucia Kováčová",
    role: "Head of Interior Design",
    accent: "Interiérový dizajn",
    bio: "Špecialistka na bytové a komerčné interiéry. Každý priestor navrhuje s dôrazom na funkčnosť, materiály a detail, ktorý vydrží desaťročia.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
    linkedin: "#",
    web: "#",
  },
  {
    name: "Martin Blaho",
    role: "Senior Project Architect",
    accent: "Projektovanie stavieb",
    bio: "Zodpovedá za kompletnú projektovú dokumentáciu — od štúdie až po realizačný projekt. Perfekcionista s citom pre konštrukciu a detail.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=85",
    linkedin: "#",
    web: "#",
  },
  {
    name: "Jana Slobodová",
    role: "Exterior & Landscape",
    accent: "Exteriér a záhrady",
    bio: "Navrhuje fasády, terasy a záhradné koncepty, ktoré dopĺňajú architektúru domu. Pracuje s krajinnými architektmi a prírodnými materiálmi.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85",
    linkedin: "#",
    web: "#",
  },
  {
    name: "Peter Horváth",
    role: "Construction Manager",
    accent: "Stavebný dozor",
    bio: "Riadi realizáciu na stavbe — koordinuje dodávateľov, kontroluje kvalitu a zabezpečuje, že každý projekt sa odovzdá načas a v plnej kvalite.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85",
    linkedin: "#",
    web: "#",
  },
  {
    name: "Zuzana Mrázová",
    role: "Client Relations",
    accent: "Klientsky servis",
    bio: "Stará sa o každého klienta od prvého kontaktu po odovzdanie kľúčov. Zabezpečuje, že komunikácia je transparentná, rýchla a príjemná.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=85",
    linkedin: "#",
    web: "#",
  },

];



const steps = [
  {
    title: "Úvodná konzultácia",
    time: "1–2 týždne",
    desc: "Stretneme sa, obhliadneme pozemok a preberieme vaše predstavy.",
  },
  {
    title: "Architektonická štúdia",
    time: "4–6 týždňov",
    desc: "Vypracujeme návrh s ohľadom na funkciu, štýl a rozpočet.",
  },
  {
    title: "Stavebné povolenie",
    time: "4–8 týždňov",
    desc: "Pripravíme kompletnú dokumentáciu pre stavebný úrad.",
  },
  {
    title: "Realizačný projekt",
    time: "6–10 týždňov",
    desc: "Detailný projekt so všetkými podrobnosťami pre výstavbu.",
  },
];


export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24 max-w-screen-xl mx-auto px-6 lg:px-16">
        <div className="mb-14">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-3">
            {/* {tr("faq.label")} */}
            Ako fungujeme
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {/* {tr("faq.title1")}<br />{tr("faq.title2")} */}
                  Ako prebieha návrh
          </h1>
        </div>
          <section className="">
        <div className="max-w-screen-xl mx-auto ">
          {/* <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-14">
            Ako prebieha návrh
          </h2> */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, i)  => (
<div key={i} className="p-6 bg-secondary rounded-2xl">   

              <div key={i} className="flex gap-6 items-start  h-full">
               <div className="mt-2 w-2 h-2 rounded-full bg-foreground shrink-0" />
              <div>
             <h3 className="font-semibold text-lg tracking-tight mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{step.time}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
   </div>


            ))}
          </div>
        </div>
      </section>


       <section className=" py-20">
        <div className="max-w-screen-xl mx-auto ">
          <div className="mb-12">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              Tím
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Ľudia za projektmi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative bg-secondary border border-border rounded-2xl overflow-hidden flex flex-col"
              >
                {/* Portrait */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="px-5 pb-5 pt-4 flex flex-col gap-1.5 flex-1">
                  <p className="font-bold text-lg tracking-tight leading-snug">{member.name}</p>
                  <p className="text-sm font-semibold" style={{ color: "hsl(var(--muted-foreground))", opacity: 0.7 }}>
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1 flex-1">
                    {member.bio}
                  </p>

                  {/* Social links */}
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                    <a
                      href={member.linkedin}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.web}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      </div>
        

     

      {/* ── PROCESS ── */}
    

      {/* ── TEAM ── */}
     

      {/* ── CTA ── */}

            <ContactCTA />
      {/* <section className="border-t border-border py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Spolupráca
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Začnime váš projekt
            </h2>
          </div>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors shrink-0"
          >
            Kontaktovať nás <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}