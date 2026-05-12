import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const open = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const next = () => setLightboxIndex((lightboxIndex + 1) % images.length);
  const prev = () => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            className={`rounded-xl overflow-hidden cursor-pointer group ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
            onClick={() => open(i)}
          >
            <img
              src={img}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
            onClick={close}
          >
            {/* Close */}
            <button className="absolute top-6 right-6 text-white/60 hover:text-white z-10 p-2" onClick={close}>
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 md:left-8 text-white/40 hover:text-white z-10 p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 md:right-8 text-white/40 hover:text-white z-10 p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <img
              src={images[lightboxIndex]}
              alt="Full"
              className="max-h-[80vh] max-w-[88vw] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <p className="absolute bottom-20 text-white/40 text-sm font-medium">
              {lightboxIndex + 1} / {images.length}
            </p>

            {/* Thumbnails */}
            <div className="absolute bottom-6 flex gap-2" onClick={(e) => e.stopPropagation()}>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? "border-white opacity-100" : "border-transparent opacity-35 hover:opacity-60"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}