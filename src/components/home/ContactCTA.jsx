import React, { useState } from "react";
import { ArrowUpRight, Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LangContext";

export default function ContactCTA() {
  const { tr } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase mb-2.5">{tr("contact.label")}</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              {tr("contact.title1")}<br />{tr("contact.title2")}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-sm">{tr("contact.sub")}</p>

            <div className="space-y-5">
              {[
                { icon: Mail, label: tr("contact.email"), val: "info@domyodarchitektov.sk", href: "mailto:info@domyodarchitektov.sk" },
                { icon: Phone, label: tr("contact.phone"), val: "+421 904 530 619", href: "tel:+421904530619" },
                { icon: MessageCircle, label: "WhatsApp", val: "+421 904 530 619", href: "https://wa.me/421904530619" },
                { icon: MapPin, label: tr("contact.address"), val: "Estónska 2, 821 06 Bratislava", href: "#" },
              ].map((item, i) => (
                <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors">{item.val}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {sent ? (
              <div className="bg-secondary rounded-2xl p-12 text-center border border-border h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-5 h-5 text-background" />
                </div>
                <h3 className="text-xl font-bold mb-2">{tr("contact.sent")}</h3>
                <p className="text-muted-foreground text-sm">{tr("contact.sentSub")}</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="bg-secondary rounded-2xl p-7 border border-border space-y-4"
              >
                {[
                  { key: "name", type: "text", label: tr("contact.name"), placeholder: tr("contact.namePlaceholder") },
                  { key: "email", type: "email", label: tr("contact.email"), placeholder: tr("contact.emailPlaceholder") },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      required
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm placeholder-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{tr("contact.message")}</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={tr("contact.messagePlaceholder")}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm placeholder-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-foreground text-background text-sm font-semibold rounded-xl hover:bg-foreground/90 transition-colors"
                >
                  {tr("contact.send")} <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}