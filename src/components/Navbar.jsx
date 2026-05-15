import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../lib/ThemeContext";
import { useLang } from "../lib/LangContext";
import ServiceCard from './ui/karta'

const LANG_LABELS = { sk: "Slovensky", en: "English", cz: "Česky", it: "Italiano", de: "Deutsch" };



const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.38, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggle } = useTheme();


    const [activeCard, setActiveCard] = useState(null);


  const { lang, changeLang, tr } = useLang();


  const najdene = tr("filter")
  console.log(najdene);
  


  const location = useLocation();
  const navRef = useRef(null);
  const langRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setLangOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openServices = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const serviceTitle = (key) => {

    const map = {

      interior: tr("nav.servicesDropdown.interior"),
      commercial: tr("nav.servicesDropdown.commercial"),
      exterior: tr("nav.servicesDropdown.exterior"),
      house: tr("nav.servicesDropdown.house") || "Rodinný dom na mieru",
      moj:tr("nav.services.items")

    };
    return map[key] || key;
  };





  const karty = tr("services.items")
  
    console.log(karty);
  return (
    <>
<motion.div
 initial={{ opacity: 0 }}
  animate={{
    opacity: servicesOpen ? 1 : 0,
  }}
  transition={{
    duration: 0.25,
    ease: "easeInOut",
  }}
  className={`
    fixed inset-0 z-10 bg-background/20 backdrop-blur-md
    ${servicesOpen ? "pointer-events-auto" : "pointer-events-none"}
  `}
/>
      {/* ── NAV BAR ── */}
      <nav
        ref={navRef}
     className="fixed top-4 left-1/2 -translate-x-1/2 z-20 bg-background border border-border rounded-2xl w-[calc(100%-2rem)] lg:max-w-[1160px]">
        
        <div className=" mx-auto pr-6 pl-2 h-[64px] flex items-center justify-between">

          {/* LEFT — nav links */}
          <div className="hidden md:flex items-center gap-0">
            {/* Services trigger */}
            <div
              onMouseEnter={openServices}
              onMouseLeave={scheduleClose}
              className="relative">
              
              <button
                onClick={() => setServicesOpen((v) => !v)}
                className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                
                {tr("nav.services")}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                
              </button>
            </div>

            <Link
              to="/projekty"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              
              {tr("nav.projects")}
            </Link>
            <Link
              to="/onas"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              
              {tr("nav.about")}
            </Link>
            <Link
              to="/faq"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              
              FAQ
            </Link>
          </div>

          {/* CENTER — stacked logo (absolutely centered) */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none select-none">
            
            <span
              className="text-foreground font-bold tracking-tight"
              style={{  fontSize: "clamp(14px, 1.6vw, 18px)", letterSpacing: "-0.01em" }}>
              
              Timothy Smon
            </span>
           
          </Link>

          {/* RIGHT — lang + theme + CTA */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
              aria-label="Toggle theme">
              
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language switcher */}
            <div ref={langRef} className="relative hidden md:block">
              <button
                onClick={() => {setLangOpen((v) => !v),console.log(langOpen);
                }}
                className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                
                {LANG_LABELS[lang] || lang.toUpperCase()}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langOpen &&
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 bg-popover border border-border rounded-xl shadow-xl py-1.5 min-w-[130px]">
                  
                    {Object.entries(LANG_LABELS).map(([code, name]) =>
                  <button
                    key={code}
                    onClick={() => {changeLang(code);setLangOpen(false);}}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                    lang === code ?
                    "text-foreground font-medium" :
                    "text-muted-foreground hover:text-foreground hover:bg-secondary"}`
                    }>
                    
                        {name}
                        {lang === code && <span className="w-1.5 h-1.5 rounded-full bg-foreground" />}
                      </button>
                  )}
                  </motion.div>
                }
              </AnimatePresence>
            </div>

            {/* CTA — sharp-edged black button */}
            <Link
              to="/#contact"
              className="hidden md:flex items-center gap-1.5 px-5 py-2.5 bg-foreground text-background text-sm font-semibold transition-colors rounded-xl hover:bg-foreground/88 "
             >
              
              {tr("nav.contact")} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}>
              
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── MEGA-MENU ── */}

        <AnimatePresence>
          {servicesOpen &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="overflow-hidden border-t border-border bg-background rounded-b-2xl"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}>
            
              <div className="max-w-screen-xl mx-auto px-6  py-6">
                
                
                <div className="flex  gap-4 pb-2">
                  {karty.map((card, i) =>

             <ServiceCard
             podmienka3 = "nie"

               textotom = {card.desc}
              rok = "Lplpl"
               cotoje = {card.title}
    
             cotoje2 = "vubhv"
             obrazok = {card.obrazok}

rozhoduje = {activeCard === i}

        podmienka2 = "nie"    

        otovrim = {() => setActiveCard(i)}
        zatvorim =  {() => setActiveCard(null)}
             

          //  odkaz = "kkk"
          //  podmienka = "nie"
             ></ServiceCard>
                )}
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-x-4 top-[76px] z-40 bg-popover border border-border rounded-2xl shadow-2xl p-4">
          
            <div className="flex flex-col gap-1 mb-4">
              {SERVICE_CARDS.map((card) =>
            <Link
              key={card.key}
              to={card.href}
              className="px-4 py-3 text-sm text-foreground rounded-xl hover:bg-secondary transition-colors flex items-center justify-between">
              
                  {serviceTitle(card.key)}
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
            )}
              <div className="h-px bg-border my-1" />
              <Link to="/projekty" className="px-4 py-3 text-sm text-foreground rounded-xl hover:bg-secondary transition-colors">{tr("nav.projects")}</Link>
              <Link to="/onas" className="px-4 py-3 text-sm text-foreground rounded-xl hover:bg-secondary transition-colors">{tr("nav.about")}</Link>
              <Link to="/faq" className="px-4 py-3 text-sm text-foreground rounded-xl hover:bg-secondary transition-colors">FAQ</Link>
              <Link to="/#contact" className="px-4 py-3 text-sm text-foreground rounded-xl hover:bg-secondary transition-colors">{tr("nav.contact")}</Link>
            </div>

            <div className="flex items-center gap-2">
              {Object.entries(LANG_LABELS).map(([code, name]) =>
            <button
              key={code}
              onClick={() => changeLang(code)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              lang === code ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground"}`
              }>
              
                  {code.toUpperCase()}
                </button>
            )}
              <div className="ml-auto">
                <button onClick={toggle} className="w-9 h-9 rounded-xl flex items-center justify-center border border-border text-muted-foreground hover:text-foreground transition-colors">
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Spacer so content sits below fixed nav (top-4 + 64px height + 4px gap) */}
      <div />
    </>);

}



