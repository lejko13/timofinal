import React from "react";

export default function ProjectHero({ project }) {
  return (
    <section className="relative h-[70vh] md:h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={project.img}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-black/20" />
      </div>
      <div className="relative z-10 w-full pb-12 px-6 lg:px-16 max-w-screen-xl mx-auto">
        <p className="text-white/50 text-sm mb-3 font-medium">
          {project.houseType} — {project.category}
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
          {project.name}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          {project.area && (
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-white/80 text-sm">
              {project.area} m²
            </span>
          )}
          {project.floors && (
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-white/80 text-sm">
              {project.floors}
            </span>
          )}
          {project.rooms && (
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-white/80 text-sm">
              {project.rooms} izieb
            </span>
          )}
        </div>
      </div>
    </section>
  );
}