import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
// import { ArrowUpRight } from "lucide-react";
import { useLang } from "../../lib/LangContext";
import { motion } from "framer-motion";
import { Mousewheel, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ArrowUpRight } from "lucide-react";


import { useMediaQuery } from "react-responsive";

import "swiper/css";
import "swiper/css/free-mode";
import ServiceCard from '../ui/karta'

// import Link from "next/link";

const projects = [
{ slug: "rd-v-devin", name: "RD V Devín", year: "2025", category: "Interiérový dizajn", desc: "Rodinný dom v Devíne s pohľadovým betónom, dreveným obkladom a modernou dispozíciou.", img: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=900&q=85" },
{ slug: "rd-b-jarovce", name: "RD B Jarovce", year: "2024", category: "Rodinný dom", desc: "Vzdušný rodinný dom s veľkorysými presklenými plochami a záhradou smerujúcou na juh.", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=85" },
{ slug: "amrrecco", name: "Amrrecco", year: "2023", category: "Komerčný dizajn", desc: "Komerčný priestor navrhnutý s dôrazom na brand identitu a komfort zákazníka.", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=85" },
{ slug: "rd-s-senec", name: "RD S Senec", year: "2023", category: "Rodinný dom", desc: "Jednopodlažný dom v Senci s minimalistickou fasádou a prepojeným obývacím priestorom.", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85" },
{ slug: "rd-g-limbach", name: "RD G Limbach", year: "2022", category: "Exteriérový dizajn", desc: "Rozsiahla vila v Limbachu s terasou, bazénom a okolitým záhradným konceptom.", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85" }];


const MIDDLE = Math.floor(projects.length / 2);

// Card widths: desktop ~20vw (5 visible), tablet ~30vw, mobile ~72vw
const CARD_WIDTH = "clamp(200px, 20vw, 280px)";
const CARD_WIDTH_MD = "clamp(180px, 28vw, 280px)";
const CARD_WIDTH_SM = "clamp(220px, 70vw, 320px)";

export default function ProjectsShowcase() {


   

    const isMobile = useMediaQuery({ maxWidth: 700 });

  const { tr } = useLang();
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const [didDrag, setDidDrag] = useState(false);


  const [activeCard, setActiveCard] = useState(null);


       const projekty = tr("projekty")

       console.log(projekty);
       

  // Scroll to middle slide on mount

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const raf = requestAnimationFrame(() => {
      const cards = track.querySelectorAll("[data-card]");
      if (!cards[MIDDLE]) return;
      const card = cards[MIDDLE];
      const offset = card.offsetLeft - track.clientWidth / 2 + card.offsetWidth / 2;
      track.scrollLeft = offset;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    setDidDrag(false);
    dragStartX.current = e.pageX;
    scrollStartX.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const delta = e.pageX - dragStartX.current;
    if (Math.abs(delta) > 4) setDidDrag(true);
    trackRef.current.scrollLeft = scrollStartX.current - delta;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
    setTimeout(() => setDidDrag(false), 80);
  }, []);

  return (
    <section className="py-20 md:py-28 ">
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-2.5">
              {tr("showcase.label")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{tr("showcase.title")}</h2>
          </div>
          <Link
            to="/projekty"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
            
            {tr("showcase.all")}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Full-width snap track */}

        <Swiper
        modules={[ Mousewheel]}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
          }}
          initialSlide={2}
            slidesPerView={1}
            spaceBetween={20}
            grabCursor={true}
            allowTouchMove={true}
            simulateTouch={true}
          centeredSlides={true}
            watchSlidesProgress={true}
                  

      className="w-full pb-2"
     style={{
        paddingLeft: isMobile
          ? "16px"
          : "max(16px, calc(50vw - 20vw - 6px))",

        paddingRight: isMobile
          ? "16px"
          : "max(16px, calc(50vw - 20vw - 6px))",
      }}
    >
      {projekty.map((project,i) => (
  
<SwiperSlide>
        <ServiceCard
        onClick = {() => console.log("koko")}
              podmienka3 = "ano"
        textotom = {project.popis.kratky}
          rok = {project.rok}
               cotoje = {project.nazov}
                podmienka = "nie"
             cotoje2 = {project.kategoria}
             obrazok = {project.imgMain}

rozhoduje = {activeCard === i}

        podmienka2 = "ano"    

        otovrim = {() => setActiveCard(i)}
        zatvorim =  {() => setActiveCard(null)}
        // popis = {project.desc}
      
  

 
   
   
   




        ></ServiceCard>

</SwiperSlide>
        
    
      ))}
    </Swiper>
     

      {/* Mobile "see all" */}
      <div className="md:hidden mt-6 px-6">
        <Link
          to="/projekty"
          className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-xl text-sm font-medium hover:bg-secondary transition-colors">
          
          {tr("showcase.all")} <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>);

}

//         <SwiperSlide
//   key={project.slug}
//   style={{
//     width: "clamp(280px, 40vw, 560px)",
//   }}
// >
//   <Link href={`/projekty/${project.slug}`} className="block">
    
//     {/* CARD = motion parent */}

//     <motion.div
//       initial="rest"
//       whileHover="hover"
//       animate="rest"
//       className="relative rounded-2xl overflow-hidden bg-secondary "
//       style={{ aspectRatio: "4/3" }}
//     >

//       {/* Image */}
//       <img
//         src={project.img}
//         alt={project.name}
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       {/* Gradient */}
//       <div
//         className="absolute inset-0 z-10"
//         style={{
//           background:
//             "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.35) 60%, hsl(var(--background) / 0.75) 100%)",
//         }}
//       />

//       {/* Category */}
      
//       <div className="absolute top-3 left-3 z-20">
//         <span className="text-xs font-medium text-white/70 bg-black/35 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10">
//           {project.category}
//         </span>
//       </div>

//       {/* Arrow */}
//       <motion.div
//         variants={{
//           rest: { opacity: 0, x: 6 },
//           hover: { opacity: 1, x: 0 },
//         }}
//         transition={{ duration: 0.25 }}
//         className="absolute top-3 right-3 z-20"
//       >
//         <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
//           <ArrowUpRight className="w-3.5 h-3.5 text-black" />
//         </div>
//       </motion.div>

//       {/* BOTTOM CONTENT */}
//      <motion.div
//   variants={{
//     rest: {},
//     hover: {},
//   }}
//   className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-slate-300"
// >

//   <div className="text-white text-xl md:text-2xl font-semibold tracking-tight">
//     {project.name}
//   </div>

//   <div className="text-white/45 text-xs mt-0.5">
//     {project.year}
//   </div>

//   {/* DESCRIPTION */}
//   <motion.div
//     variants={{
//       rest: {
//         opacity: 0,
//         y: 10,
//       },
//       hover: {
//         opacity: 1,
//         y: 0,
//       },
//     }}
//     transition={{
//       duration: 0.3,
//       ease: [0.22, 1, 0.36, 1],
//     }}
//     className="text-white/70 text-xs mt-1 line-clamp-2"
//   >
//     {project.desc}
//   </motion.div>

// </motion.div>

//     </motion.div>



//   </Link>
// </SwiperSlide>


  
 


