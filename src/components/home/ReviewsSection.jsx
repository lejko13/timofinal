import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import { useLang } from "../../lib/LangContext";

const reviews = [
  { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=85", text: "Veľmi šikovní architekti. Navrhli nám dom podľa našich predstáv, sme veľmi spokojní ďakujeme.", author: "Mária K.", location: "Bratislava", stars: 5 },
  { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=85", text: "Profesionálny prístup od začiatku do konca. Odporúčame každému kto hľadá kvalitných architektov.", author: "Tomáš B.", location: "Senec", stars: 5 },
  { img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=85", text: "Spolupráca bola na vysokej úrovni. Individuálny prístup s dôrazom na kvalitné prevedenie.", author: "Jana V.", location: "Košice", stars: 5 },
];

export default function ReviewsSection() {
  const { tr } = useLang();
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-2.5">{tr("reviews.label")}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{tr("reviews.title")}</h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-muted-foreground text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> 4.9 / 5.0 Google
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-secondary rounded-2xl border border-border"
          >
            <div className="p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-foreground text-foreground" />
                  ))}
                </div>
                <p className="text-foreground/75 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-[10px] font-bold">{r.author[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{r.author}</p>
                      <p className="text-[11px] text-muted-foreground">{r.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-semibold">{tr("reviews.google")}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA — leave a review */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">Boli ste s nami spokojní? Ohodnoťte nás na Google.</p>
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors shrink-0"
          >
            Zanechať recenziu na Google <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}