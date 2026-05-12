import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const filterGroups = [
  {
    label: "TYP PROJEKTU",
    options: ["Katalógové projekty", "Interiérové dizajny", "Rodinné domy na mieru", "Developerské projekty"],
  },
  {
    label: "TYP DOMU",
    options: ["Dvojdomy", "Rodinné domy", "Vily"],
  },
  {
    label: "POČET PODLAŽÍ",
    options: ["1 podlažie", "2 podlažia", "3 a viac podlaží"],
  },
  {
    label: "POČET IZIEB",
    options: ["3 izby", "4 izby", "5 izieb", "6 a viac izieb"],
  },
  {
    label: "PLOCHA (m²)",
    options: ["do 150", "151–250", "nad 250"],
  },
  {
    label: "GARÁŽ",
    options: ["Bez garáže", "1 auto", "2 autá", "3+ áut"],
  },
];

export default function ProjectFilters({ isOpen, activeFilters, onToggle }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden border-b border-border"
        >
          <div className="px-6 lg:px-16 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {filterGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                  {group.label}
                </p>
                <div className="space-y-2.5">
                  {group.options.map((opt) => {
                    const active = activeFilters.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => onToggle(opt)}
                        className={`block text-sm transition-colors text-left ${
                          active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}