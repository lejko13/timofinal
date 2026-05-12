// Shared template for all 3 service pages
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Check, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../lib/LangContext";
import { Link } from "react-router-dom";

function Lightbox({ images, index, onClose, onNext, onPrev }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/96 flex items-center justify-center"
      onClick={onClose}
    >
      <button className="absolute top-5 right-5 text-white/50 hover:text-white" onClick={onClose}><X className="w-6 h-6" /></button>
      <button className="absolute left-4 text-white/40 hover:text-white" onClick={(e) => { e.stopPropagation(); onPrev(); }}><ChevronLeft className="w-9 h-9" /></button>
      <button className="absolute right-4 text-white/40 hover:text-white" onClick={(e) => { e.stopPropagation(); onNext(); }}><ChevronRight className="w-9 h-9" /></button>
      <img src={images[index]} alt="" className="max-h-[80vh] max-w-[88vw] object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
      <p className="absolute bottom-20 text-white/35 text-xs">{index + 1} / {images.length}</p>
      <div className="absolute bottom-5 flex gap-2" onClick={(e) => e.stopPropagation()}>
        {images.map((img, i) => (
          <button key={i} className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all ${i === index ? "border-white" : "border-transparent opacity-30 hover:opacity-60"}`}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function ServicePage({ serviceKey, heroImg }) {
  const { tr } = useLang();
  const [lbIndex, setLbIndex] = useState(null);

  const data = tr(`servicePage.${serviceKey}`);
  const gallery = data?.gallery || [];
  const process = data?.process || [];
  const included = data?.included || [];

  const nextImg = () => setLbIndex((lbIndex + 1) % gallery.length);
  const prevImg = () => setLbIndex((lbIndex - 1 + gallery.length) % gallery.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt={data?.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-black/20" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-16 w-full pb-12">
          <p className="text-white/45 text-xs font-semibold tracking-widest uppercase mb-3">{tr("services.label")}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.0]">
            {data?.headline}
          </h1>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-16 space-y-20">
        {/* Sub + Included */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-foreground/70 text-lg leading-relaxed mb-8">{data?.sub}</p>
            <Link to="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors">
              {tr("services.cta")} <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-secondary rounded-2xl p-6 border border-border">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              {serviceKey === "interior" ? "Čo je zahrnuté" : serviceKey === "commercial" ? "Čo je zahrnuté" : "Čo je zahrnuté"}
            </p>
            <div className="space-y-3">
              {included.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-foreground/10 border border-border flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-foreground" />
                  </div>
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-6">Galéria</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className={`rounded-xl overflow-hidden cursor-pointer group bg-secondary ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
                  onClick={() => setLbIndex(i)}
                >
                  <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process */}
        {process.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">Proces</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">Ako prebieha spolupráca</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {process.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 bg-secondary rounded-2xl border border-border"
                >
                  <p className="text-xs font-mono text-muted-foreground mb-3">0{i + 1}</p>
                  <h3 className="font-semibold tracking-tight mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 font-medium">{step.time}</p>
                  <p className="text-sm text-foreground/60 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CTA banner */}
        <div className="bg-secondary rounded-2xl p-10 md:p-14 border border-border text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">{data?.headline}</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">{data?.sub}</p>
          <Link to="/#contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors">
            {tr("services.cta")} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {lbIndex !== null && (
          <Lightbox images={gallery} index={lbIndex} onClose={() => setLbIndex(null)} onNext={nextImg} onPrev={prevImg} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}