import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import { useLang } from "../lib/LangContext";
import ContactCTA from "../components/home/ContactCTA";

export default function FAQ() {
  const { tr } = useLang();
  const categories = tr("faq.categories");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState("general-0");

  if (!Array.isArray(categories)) return null;

  const allItems = categories.flatMap((cat) =>
    (cat.items || []).map((item, i) => ({ ...item, catId: cat.id, id: `${cat.id}-${i}` }))
  );

  const filtered =
    activeCategory === "all"
      ? allItems
      : allItems.filter((item) => item.catId === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24 max-w-screen-xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-14">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-3">
            {tr("faq.label")}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {tr("faq.title1")}<br />{tr("faq.title2")}
          </h1>
        </div>

        {/* Main layout: sidebar + content */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {/* Sidebar categories */}
          <div className="lg:sticky lg:top-28 self-start">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              {tr("faq.categoriesLabel")}
            </p>
            <div className="flex flex-row lg:flex-col gap-1.5 flex-wrap">
              <button
                onClick={() => setActiveCategory("all")}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {tr("faq.all")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ accordion */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {filtered.map((item) => (
                  <div key={item.id} className="border-t border-border last:border-b">
                    <button
                      className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                      onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    >
                      <span className={`text-sm font-medium leading-snug transition-colors ${openId === item.id ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"}`}>
                        {item.q}
                      </span>
                      <Plus className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${openId === item.id ? "rotate-45" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openId === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-muted-foreground text-sm leading-relaxed pb-6 pr-8">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Contact CTA */}
        {/* <div className="mt-20 pt-14 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {tr("contact.label")}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{tr("contact.title1")} {tr("contact.title2")}</h2>
          </div>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors shrink-0"
          >
            {tr("contact.send")} <ArrowUpRight className="w-4 h-4" />
          </a>
        </div> */}
          
      </div>
       <ContactCTA />

      <Footer />
    </div>
  );
}