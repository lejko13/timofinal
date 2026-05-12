import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LangContext";
import Tusucisla from '../ui/pocitanie';
import MySwiper from '../ui/swiper'

const stats = [
{ 
  znak:"+",
  value: 30, key: "stats.projects" },
{   znak:"+",
  value: 21, key: "stats.experts" },
{ 
  // znak:"+",
  value: 2018, key: "stats.since" },
{ 
  znak:"%",
  value: 100, key: "stats.transparency" }];


const obrakzy = [
  "/prvy.webp",
  "/druhy.webp",
  "/stvrty.webp",
  "/treti.webp",
];

export default function HeroSection() {
  const { tr } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col  justify-end lg:justify-center overflow-hidden">
      {/* Background */}
      
      <div className="absolute inset-0">

          <div   className="w-full h-full md:h-screen absolute inset-x-0 z-10"
           style={{
              background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 70%, hsl(var(--background)) 100%)",
            }}
              ></div>

              <div   className="w-full h-full object-cover">
                <MySwiper
                items={obrakzy}
                ></MySwiper>
              </div>

        {/* <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=85"
          alt="Interior"
        
          loading="eager" /> */}


          
        
        {/* Overlay: darkens toward bottom to ensure text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full ">
        {/* Center block — headline + sub + CTAs */}
        <div className="flex flex-col items-center text-center px-6 pb-16 pt-36">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7 }}

            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }} className="text-5xl  sm:text-6xl md:text-7xl font-semibold text-foreground leading-[1.08] tracking-wide mb-7 ">
            
            {tr("hero.headline1")} {tr("hero.headline2")}<br />
            {tr("hero.headline3")}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.6 }}
            // className = "text-muted-foreground text-sm leading-relaxed max-w-md"
            className="text-foreground text-sm sm:text-base leading-[1.75] max-w-[620px] mb-10"
            style={{ opacity: 0.72, textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}>
            
            {tr("hero.sub")}
          </motion.p>

          {/* CTAs */}
        
        </div>

        {/* Stats bar — full width, pinned to bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.72 }}
          className="w-full">
          
          <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) =>
              <>
              <Tusucisla
              index = {i}
              maxx = {stat.value}
              specialZnak = {stat.znak}
              text =      {tr(stat.key)}
              ></Tusucisla>
             
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
    </section>);

}