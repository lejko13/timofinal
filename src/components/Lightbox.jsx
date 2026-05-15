import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images, index, onClose, onNext, onPrev,setter }) {
  const [dragging, setDragging] = useState(false);
  const touchStartX = useRef(null);
  const dragStartX = useRef(null);
  const [dragDelta, setDragDelta] = useState(0);

  // Keyboard navigation
  console.log(setter);
  
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onPrev, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? onNext() : onPrev();
    }
    touchStartX.current = null;
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
    setDragging(true);
    setDragDelta(0);
  };
  const handleMouseMove = (e) => {
    if (!dragging || dragStartX.current === null) return;
    setDragDelta(e.clientX - dragStartX.current);
  };
  const handleMouseUp = (e) => {
    if (!dragging) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 60) {
      delta < 0 ? onNext() : onPrev();
    }
    setDragging(false);
    setDragDelta(0);
    dragStartX.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] bg-black/97 flex flex-col select-none"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        <span className="text-white/40 text-sm font-medium">{index + 1} / {images.length}</span>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev / Next arrows */}
        <button
          className="absolute left-3 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-3 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Active image with fade transition */}
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt=""
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1, x: dragging ? dragDelta * 0.3 : 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="max-h-full max-w-ful object-contain rounded-lg  bg-red-300"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      <div
        className="shrink-0 px-4 py-4 flex items-center justify-center gap-2 overflow-x-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { /* go to index */ onClose(); }}
            className={`shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
              i === index
                ? "w-14 h-10 border-2 border-white opacity-100"
                : "w-12 h-9 border-2 border-transparent opacity-40 hover:opacity-70"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
          </button>
        ))}
      </div>
    </motion.div>
  );
}