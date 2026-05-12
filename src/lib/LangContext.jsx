import React, { createContext, useContext, useState } from "react";
import { translations, defaultLang, availableLangs } from "./i18n";

const LangContext = createContext(null);

export function LangProvider({ children }) {

  const [lang, setLang] = useState(() => {

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("studio-lang");
      if (saved && availableLangs.includes(saved)) return saved;
    }
    return defaultLang;
  });

  const changeLang = (l) => {
    if (!availableLangs.includes(l)) return;
    setLang(l);
    if (typeof window !== "undefined") localStorage.setItem("studio-lang", l);
    
  };

  const tr = (path) => {
    
    const keys = path.split(".");

    let val = translations[lang];

    for (const k of keys) {

      val = val?.[k];

      if (val === undefined) {

        let fb = translations[defaultLang];

        for (const fk of keys) fb = fb?.[fk];

        return fb ?? path;
      }
    }
    return val;
  };

  return (
    <LangContext.Provider value={{ lang, changeLang, tr, langs: availableLangs }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}