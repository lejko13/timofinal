import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projekty/${project.slug}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-[4/3]">
        <img
          src={project.img}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* Top */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="text-xs font-medium text-white/70 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            {project.category}
          </span>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <ArrowUpRight className="w-4 h-4 text-black" />
          </div>
        </div>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white font-semibold text-base tracking-tight">{project.name}</p>
          <div className="flex items-center gap-3 mt-1.5">
            {project.area && (
              <span className="text-white/50 text-xs">{project.area} m²</span>
            )}
            {project.rooms && (
              <span className="text-white/50 text-xs">{project.rooms} izieb</span>
            )}
            {project.floors && (
              <span className="text-white/50 text-xs">{project.floors}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}