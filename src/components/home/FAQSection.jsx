import React from "react";
import { useLang } from "../../lib/LangContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const { tr } = useLang();
  const items = tr("faq.items");

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-14">
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-2.5">{tr("faq.label")}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {tr("faq.title1")}<br />{tr("faq.title2")}
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-0">
            {Array.isArray(items) && items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border last:border-b-0">
                <AccordionTrigger className="text-left font-medium py-5 text-sm hover:no-underline hover:text-foreground text-foreground/85">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}