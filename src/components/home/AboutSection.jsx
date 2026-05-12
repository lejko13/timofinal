import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLang } from "../../lib/LangContext";

export default function AboutSection() {
  const { tr } = useLang();
  const values = tr("about.values");

  return (
    <section id="about" className="py-20 md:py-28 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        {/* Section label + title */}
        <div className="mb-14">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-3">{tr("about.label")}</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl">{tr("about.title")}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — image + person card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-secondary mb-5">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
                alt={tr("about.name")}
                className="w-full h-full object-cover"
              />
              {/* Person info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <p className="text-white font-bold text-xl tracking-tight">{tr("about.name")}</p>
                <p className="text-white/55 text-sm mt-1">{tr("about.role")}</p>
              </div>
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: "300+", lbl: tr("stats.projects") },
                { val: "21+", lbl: tr("stats.experts") },
                { val: "2018", lbl: tr("stats.since") },
                { val: "SK + CZ", lbl: tr("stats.markets") },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-secondary border border-border">
                  <p className="text-xl font-bold tracking-tight mb-0.5">{s.val}</p>
                  <p className="text-muted-foreground text-xs">{s.lbl}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-start pt-0 lg:pt-4"
          >
            <p className="text-foreground/75 text-lg leading-relaxed mb-6">{tr("about.bio")}</p>
            <p className="text-muted-foreground text-base leading-relaxed mb-10">{tr("about.bio2")}</p>

            {/* Values checklist */}
            {Array.isArray(values) && (
              <div className="space-y-3">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-4">Naše hodnoty</p>
                {values.map((val, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                    <div className="w-6 h-6 rounded-full bg-foreground/8 border border-border flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}