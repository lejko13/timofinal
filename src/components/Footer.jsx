import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../lib/LangContext";

export default function Footer() {
  const { tr } = useLang();

  const navLinks = [
    { label: "Domov", href: "/" },
    { label: tr("nav.projects"), href: "/projekty" },
    { label: tr("nav.servicesDropdown.interior"), href: "/sluzby/rodinny-dom" },
    { label: tr("nav.servicesDropdown.exterior"), href: "/projekty" },
    { label: tr("nav.about"), href: "/#about" },
  ];

  const contactLinks = [
    { label: "info@domyodarchitektov.sk", href: "mailto:info@domyodarchitektov.sk" },
    { label: "+421 904 530 619", href: "tel:+421904530619" },
    { label: "Estónska 2, Bratislava", href: "#" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com", external: true },
    { label: "Facebook", href: "https://facebook.com", external: true },
    { label: "WhatsApp", href: "https://wa.me/421904530619", external: true },
  ];

  return (
    <footer className="border-t border-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background text-[11px] font-black">DA</span>
              </div>
              <span className="font-semibold text-sm">Studio</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-[180px]">
              Architektonické štúdio so sídlom v Bratislave od roku 2018.
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>{tr("footer.ico")}: 12345678</p>
              <p>{tr("footer.dic")}: SK2024001234</p>
            </div>
          </div>

          {[
            { title: tr("footer.nav"), links: navLinks },
            { title: tr("footer.contact"), links: contactLinks },
            { title: tr("footer.social"), links: socialLinks },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/65 hover:text-foreground transition-colors flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                      </a>
                    ) : (
                      <Link to={link.href} className="text-sm text-foreground/65 hover:text-foreground transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Domy od Architektov. {tr("footer.rights")}</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">{tr("footer.privacy")}</a>
            <a href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">{tr("footer.terms")}</a>
          </div>
        </div>
      </div>

      {/* Wordmark */}
      <div className="border-t border-border overflow-hidden">
        <p
          className="font-black text-foreground/[0.04] leading-none px-4 py-3 whitespace-nowrap select-none"
          style={{ fontSize: "clamp(60px, 12vw, 160px)", letterSpacing: "-0.04em" }}
        >
          DOMY OD ARCHITEKTOV
        </p>
      </div>
    </footer>
  );
}