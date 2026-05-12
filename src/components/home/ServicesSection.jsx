import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../../lib/LangContext";

const serviceImgs = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=85",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=85",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=85",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=85",
];

export default function ServicesSection() {
  const { tr } = useLang();
  // One-open accordion: default first item open
  const [openIndex, setOpenIndex] = useState(0);
  const items = tr("services.items");

  console.log(items);
  
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-2.5">{tr("services.label")}</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {tr("services.title1")}<br />{tr("services.title2")}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{tr("services.sub")}</p>
          </div>
        </div>

        <div>
          {Array.isArray(items) && items.map((service, i) => (
            <div key={i} className="border-t border-border last:border-b">
              <button className="w-full text-left" onClick={() => toggle(i)}>
                <div className="flex items-center justify-between py-6">
                  <div className="flex items-center gap-5 min-w-0">
                    <span className="text-muted-foreground text-xs font-mono shrink-0">{service.num}</span>
                    <h3 className={`text-xl md:text-2xl font-semibold tracking-tight truncate transition-colors ${openIndex === i ? "text-foreground" : "text-foreground/65"}`}>
                      {service.title}
                    </h3>
                    <div className="hidden lg:flex items-center gap-2 ml-2 flex-wrap">
                      {service.tags.map((tag) => (
                        <span key={tag} className="text-xs text-muted-foreground border border-border px-2.5 py-1 rounded-full whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Plus className={`w-5 h-5 text-muted-foreground shrink-0 ml-4 transition-transform duration-250 ${openIndex === i ? "rotate-45" : ""}`} />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 pl-0 md:pl-12">
                      <div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.desc}</p>
                        <Link
                          to={service.href}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground border-b border-foreground/25 pb-0.5 hover:border-foreground transition-colors"
                        >
                          {tr("services.more")} <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <div className="rounded-xl overflow-hidden aspect-video bg-secondary">
                        <img src={serviceImgs[i]} alt={service.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}