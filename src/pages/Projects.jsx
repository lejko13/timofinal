import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ArrowUpRight, X, SlidersHorizontal, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang ,} from "../lib/LangContext";

const allProjects = [
  { slug: "rd-v-devin",            name: "RD V Devín",           category: "Rodinný dom",       area: "192", rooms: "5", floors: "2 podlažia", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=85",  type: "exterior",   style: "modern",      status: "completed",  usage: "living-room" },
  { slug: "interier-k-bratislava", name: "Interiér K Bratislava", category: "Interiérový dizajn", area: "",    rooms: "",  floors: "",           img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=85",  type: "interior",   style: "minimalist",  status: "completed",  usage: "living-room" },
  { slug: "rd-b-jarovce",          name: "RD B Jarovce",         category: "Rodinný dom",       area: "184", rooms: "5", floors: "2 podlažia", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=85",  type: "exterior",   style: "modern",      status: "completed",  usage: "bedroom" },
  { slug: "rd-b-boldog",           name: "RD B Boldog",          category: "Rodinný dom",       area: "155", rooms: "4", floors: "2 podlažia", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=85",  type: "exterior",   style: "minimalist",  status: "concept",    usage: "living-room" },
  { slug: "rd-j-microvo",          name: "RD J Microvo",         category: "Rodinný dom",       area: "222", rooms: "5", floors: "2 podlažia", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&q=85",  type: "exterior",   style: "luxury",      status: "completed",  usage: "bedroom" },
  { slug: "rd-s-senec",            name: "RD S Senec",           category: "Rodinný dom",       area: "236", rooms: "4", floors: "1 podlažie", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&q=85",  type: "exterior",   style: "rustic",      status: "completed",  usage: "kitchen" },
  { slug: "rd-j-velka-lomnica",    name: "RD J Veľká Lomnica",  category: "Katalógový projekt", area: "155", rooms: "4", floors: "2 podlažia", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=85",  type: "exterior",   style: "modern",      status: "3d-viz",     usage: "living-room" },
  { slug: "rd-k-galanta",          name: "RD K Galanta",         category: "Rodinný dom",       area: "123", rooms: "4", floors: "1 podlažie", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=85",  type: "interior",   style: "minimalist",  status: "concept",    usage: "kitchen" },
  { slug: "rd-g-limbach",          name: "RD G Limbach",         category: "Komerčný dizajn",   area: "365", rooms: "6", floors: "3 podlažia", img: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=700&q=85",  type: "commercial", style: "luxury",      status: "completed",  usage: "commercial" },
  { slug: "amrrecco",              name: "Amrrecco",             category: "Komerčný dizajn",   area: "",    rooms: "",  floors: "",           img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=85",  type: "commercial", style: "modern",      status: "completed",  usage: "commercial" },
];

// const FILTER_GROUPS = [
//   {
//     id: "type",
//     label: "Typ projektu",
//     options: [
//       { id: "commercial", label: "Komerčný" },
//       { id: "interior",   label: "Interiér" },
//       { id: "exterior",   label: "Exteriér" },
//     ],
//   },
//   {
//     id: "style",
//     label: "Štýl dizajnu",
//     options: [
//       { id: "minimalist", label: "Minimalistický" },
//       { id: "modern",     label: "Moderný" },
//       { id: "rustic",     label: "Rustikálny" },
//       { id: "luxury",     label: "Luxusný" },
//     ],
//   },
//   {
//     id: "status",
//     label: "Stav projektu",
//     options: [
//       { id: "completed", label: "Dokončené" },
//       { id: "concept",   label: "Koncept / Dizajn" },
//       { id: "3d-viz",    label: "3D vizualizácia" },
//     ],
//   },
//   {
//     id: "usage",
//     label: "Typ využitia",
//     options: [
//       { id: "kitchen",    label: "Kuchyňa" },
//       { id: "living-room",label: "Obývačka" },
//       { id: "bedroom",    label: "Spálňa" },
//       { id: "commercial", label: "Komerčný priestor" },
//     ],
//   },
// ];


const emptyFilters = { type: null, style: null, status: null, usage: null };

export default function Projects() {
  const { tr } = useLang();


const FILTER_GROUPS = [
  {
    id: "typ_projektu",
    label: tr("filter.nazovtyp"),
    data: tr("filter.typ_projektu"),
  },

  {
    id: "stav_projektu",
    label: tr("filter.nazov2"),
    data: tr("filter.stav_projektu"),
  },

  {
    id: "styl_dizajnu",
    label: tr("filter.nazov4"),
    data: tr("filter.styl_dizajnu"),
  },

  {
    id: "typ_vyuzitia",
    label: tr("filter.nazov5"),
    data: tr("filter.typ_vyuzitia"),
  },
];
  
  const [panelOpen, setPanelOpen] = useState(false);
  const [pendingFilters, setPendingFilters] = useState(emptyFilters);
  const [activeFilters, setActiveFilters] = useState(emptyFilters);

  const panelRef = useRef(null);

  const togglePending = (groupId, optionId) => {
    setPendingFilters((prev) => ({
      ...prev,
      [groupId]: prev[groupId] === optionId ? null : optionId,
    }));
  };

  const applyFilters = () => {
    setActiveFilters({ ...pendingFilters });
    setPanelOpen(false);
  };

  const resetFilters = () => {
    setPendingFilters(emptyFilters);
    setActiveFilters(emptyFilters);
  };

  const openPanel = () => {
    setPendingFilters({ ...activeFilters });
    setPanelOpen(true);
  };

  // Close on ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setPanelOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);
  const activeCount = Object.values(activeFilters).filter(Boolean).length;

  const filtered = allProjects.filter((p) => {
    if (activeFilters.type   && p.type   !== activeFilters.type)   return false;
    if (activeFilters.style  && p.style  !== activeFilters.style)  return false;
    if (activeFilters.status && p.status !== activeFilters.status) return false;
    if (activeFilters.usage  && p.usage  !== activeFilters.usage)  return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

          {/* Page header */}
          <div className="mb-10">
            <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-2.5">
              {tr("projects.label")}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              {tr("projects.title")}
            </h1>
          </div>

          {/* Filter trigger row */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={openPanel}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {tr("filter.main")}
              {activeCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <>
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3 h-3" /> Zrušiť filtre
                </button>
                <span className="text-xs text-muted-foreground">
                  {filtered.length} {filtered.length === 1 ? "projekt" : "projektov"}
                </span>
              </>
            )}
          </div>

          {/* Filter panel overlay */}
          <AnimatePresence>
            {panelOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="fixed inset-0 z-40 bg-black/40"
                  onClick={() => setPanelOpen(false)}
                />

                {/* Panel — bottom sheet on mobile, side panel on desktop */}
                <motion.div
                  ref={panelRef}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 340, damping: 32 }}
                  className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border rounded-t-3xl p-6 md:p-8 shadow-2xl md:max-h-[80vh] overflow-y-auto"
                >
                  {/* Handle */}
                  <div className="w-10 h-1 rounded-full bg-border mx-auto mb-6" />

                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-base font-semibold"> {tr("filter.nazov1")}</h3>
                    <button
                      onClick={() => setPanelOpen(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-8">
                    {FILTER_GROUPS.map((group) => (
                        <div key={group.id}>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                            {group.label}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {Object.entries(group.data).map(([id, label]) => {
                              const isSelected = pendingFilters[group.id] === id;

                              return (
                                <button
                                  key={id}
                                  onClick={() => togglePending(group.id, id)}
                                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                                    isSelected
                                      ? "bg-foreground text-background"
                                      : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-border"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3" />}
                                  {label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                  </div>



                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-5 border-t border-border">
                    <button
                      onClick={applyFilters}
                      className="flex-1 py-3 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors"
                    >
                     {tr("filter.potvrditFilter")}
                    </button>
                    <button
                      onClick={() => setPendingFilters(emptyFilters)}
                      className="px-5 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground border border-border hover:bg-secondary transition-colors"
                    >
                     {tr("filter.resetovat")}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Project grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={JSON.stringify(activeFilters)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-28 text-center">
                  <p className="text-2xl font-bold tracking-tight mb-2">Žiadne projekty nenájdené</p>
                  <p className="text-muted-foreground text-sm mb-6">Skúste zmeniť alebo resetovať filtre.</p>
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors"
                  >
                    Resetovať filtre
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((project) => (
                    <Link key={project.slug} to={`/projekty/${project.slug}`} className="group block">
                      <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-[4/3]">
                        <img
                          src={project.img}
                          alt={project.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="text-xs font-medium text-white/70 bg-black/35 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10">
                            {project.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-250 translate-x-1 group-hover:translate-x-0">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <ArrowUpRight className="w-4 h-4 text-black" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <p className="text-white font-semibold tracking-tight">{project.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            {project.area   && <span className="text-white/45 text-xs">{project.area} m²</span>}
                            {project.rooms  && <span className="text-white/45 text-xs">{project.rooms} izieb</span>}
                            {project.floors && <span className="text-white/45 text-xs">{project.floors}</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      <Footer />
    </div>
  );
}