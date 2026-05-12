import React from "react";
import { ArrowUpRight, Layers, Home, Maximize, BedDouble, Building2, Car } from "lucide-react";

const specs = (project) => [
  { icon: Layers, label: "Typ projektu", value: project.category },
  { icon: Home, label: "Typ domu", value: project.houseType },
  { icon: Maximize, label: "Úžitková plocha", value: project.area ? `${project.area} m²` : "—" },
  { icon: BedDouble, label: "Počet izieb", value: project.rooms ? `${project.rooms} izieb` : "—" },
  { icon: Building2, label: "Podlažnosť", value: project.floors || "—" },
  { icon: Car, label: "Garáž", value: project.garage || "1 auto" },
];

export default function ProjectSidebar({ project }) {
  return (
    <div className="bg-secondary rounded-2xl p-6 sticky top-28">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">Špecifikácie</p>
      <div className="space-y-1">
        {specs(project).map((spec) => (
          <div key={spec.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div className="flex items-center gap-2.5">
              <spec.icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">{spec.label}</span>
            </div>
            <span className="text-sm font-medium text-foreground">{spec.value}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors">
        Mám záujem <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
}