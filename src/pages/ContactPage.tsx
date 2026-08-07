import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { useSiteContent } from "@/hooks/use-site-content";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EASE = [0.16, 1, 0.3, 1] as const;

const EMAIL = "hello@whycreatives.in";
const PHONE_DISPLAY = "+91 82101 98880";
const PHONE_E164 = "918210198880";

const CHANNELS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
  {
    label: "Phone / WhatsApp",
    value: PHONE_DISPLAY,
    href: `tel:+${PHONE_E164}`,
    icon: Phone,
  },
  {
    label: "Studio",
    value: "Guwahati, Assam, India",
    href: null,
    icon: MapPin,
  },
];

/*
  Only accounts we can actually point at. The previous version listed LinkedIn
  and X with `#linkedin` and `#twitter` as their hrefs — two buttons that looked
  like profiles and went nowhere. Add them back here once the real URLs exist.
*/
const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/why.creatives/",
    icon: Instagram,
  },
];

const SERVICES = [
  "Video Editing",
  "Website Design",
  "Web App",
  "E-Commerce",
  "Brand Identity",
  "UGC & Collabs",
  "Social Media",
  "Ad Campaigns",
  "Something else",
];

const ContactPage = () => {
  const { text } = useSiteContent();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selected, setSelected] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

  const toggleService = (service: string) =>
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    /*
      The form used to hand its data to an `onSubmit` prop that only ran
      `console.log`, which also suppressed the WhatsApp fallback underneath it —
      so every enquiry submitted from this page was silently discarded. It now
      writes to `contact_submissions` (anonymous insert is allowed by RLS, reads
      are restricted to authenticated users) and *then* opens WhatsApp, so the
      lead survives even if the hand-off is blocked by a popup blocker.
    */
    const services = selected.length ? selected.join(", ") : "Not specified";
    const messageWithScope = `Services: ${services}\n\n${form.message}`;

    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: messageWithScope,
    });

    setSending(false);

    if (error) {
      toast({
        title: "That did not send",
        description: `${error.message}. You can reach us directly at ${EMAIL}.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Enquiry received",
      description: "We reply within one working day. Opening WhatsApp so you can add anything else.",
    });

    const waText = encodeURIComponent(
      `New project enquiry\n\nName: ${form.name}\nEmail: ${form.email}${
        form.phone ? `\nPhone: ${form.phone}` : ""
      }\nServices: ${services}\n\n${form.message}`,
    );
    window.open(`https://wa.me/${PHONE_E164}?text=${waText}`, "_blank", "noopener");

    setForm({ name: "", email: "", phone: "", message: "" });
    setSelected([]);
  };

  const headingOne = text("contact.heading_line_1", "Tell us what");
  const headingTwo = text("contact.heading_line_2", "you need built");

  const fieldClass =
    "w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/60 transition-colors duration-300 focus:border-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20";

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground font-['Schibsted_Grotesk',sans-serif]">
      <Helmet>
        <title>Contact WhyCreatives | Start a Project</title>
        <meta
          name="description"
          content="Talk to WhyCreatives about video editing, web and app development, brand identity or performance marketing. Based in Guwahati, Assam."
        />
        <link rel="canonical" href="https://whycreatives.in/contact" />
      </Helmet>

      <Navigation />

      <main
        className="px-4 md:px-[clamp(20px,2.6vw,52px)]"
        style={{
          paddingTop: "clamp(104px, 12vw, 168px)",
          paddingBottom: "clamp(56px, 7vw, 120px)",
        }}
      >
        <div className="mx-auto max-w-[1920px]">
          <PageHeader
            key={`${headingOne}|${headingTwo}`}
            eyebrow={text("contact.eyebrow", "Contact")}
            lines={[headingOne, headingTwo]}
            support={text(
              "contact.intro",
              "Send the goal, the deadline and anything you already have. You get a scope and a straight answer on fit — not a sales sequence.",
            )}
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ── CHANNELS ── plain rows on rules, matching the rest of the
                site. Previously each was a tinted card with a gradient circle
                behind a `text-primary` glyph. */}
            <motion.aside
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <ul>
                {CHANNELS.map(({ label, value, href, icon: Icon }) => {
                  const inner = (
                    <>
                      <span className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {label}
                      </span>
                      <span
                        className="mt-2 block text-foreground"
                        style={{
                          fontSize: "clamp(1.25rem, 2.1vw, 2rem)",
                          lineHeight: 1.1,
                          letterSpacing: "-0.035em",
                          fontWeight: 700,
                        }}
                      >
                        {value}
                      </span>
                    </>
                  );

                  return (
                    <li key={label} className="border-t border-border last:border-b">
                      {href ? (
                        <a
                          href={href}
                          className="block py-6 transition-opacity duration-300 hover:opacity-55 lg:py-8"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="py-6 lg:py-8">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Elsewhere
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {SOCIALS.map(({ name, href, icon: Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                  <a
                    href={`https://wa.me/${PHONE_E164}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <p className="mt-10 max-w-[38ch] text-base leading-relaxed text-muted-foreground">
                Replies land within one working day. If it is urgent, WhatsApp is
                the fastest route.
              </p>
            </motion.aside>

            {/* ── FORM ── */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-[20px] border border-border p-6 sm:p-8 lg:rounded-[34px] lg:p-12"
              >
                <h2
                  className="text-foreground"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.75rem)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.04em",
                    fontWeight: 700,
                  }}
                >
                  Start a project
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  Four fields, then pick what you need. Nothing else required.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-bold text-foreground"
                    >
                      Your name <span className="text-muted-foreground">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    {/*
                      This input carried `name="name"`, so the change handler
                      wrote every keystroke into the name field and the email
                      was never captured at all.
                    */}
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-bold text-foreground"
                    >
                      Email <span className="text-muted-foreground">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-bold text-foreground"
                  >
                    Phone{" "}
                    <span className="font-medium text-muted-foreground">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91"
                    className={fieldClass}
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-bold text-foreground"
                  >
                    What are you trying to achieve?{" "}
                    <span className="text-muted-foreground">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="The goal, the deadline, and anything that already exists."
                    className={`${fieldClass} min-h-[140px] resize-y`}
                  />
                </div>

                {/* Nine stacked checkbox rows made the form look twice as long
                    as it is. Same real checkboxes, rendered as toggle pills:
                    the input stays in the tab order and drives the pill styling
                    through `peer`. */}
                <fieldset className="mt-8">
                  <legend className="mb-3 text-sm font-bold text-foreground">
                    What do you need?{" "}
                    <span className="font-medium text-muted-foreground">
                      (pick any)
                    </span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((service) => (
                      <label key={service} className="cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={selected.includes(service)}
                          onChange={() => toggleService(service)}
                        />
                        <span className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-bold text-muted-foreground transition-colors duration-300 hover:border-foreground/40 peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-2 peer-focus-visible:ring-foreground/30 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={sending}
                  className="group mt-9 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 text-base font-bold text-background transition-opacity duration-300 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-55 sm:h-16"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <Send
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Sent straight to the studio. We never pass your details on.
                </p>
              </form>
            </motion.div>
          </div>

          {/* ── SECONDARY ── */}
          <section className="mt-20 border-t border-border pt-12 lg:mt-32 lg:pt-20">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2
                  className="text-foreground"
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 3.75rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.045em",
                    fontWeight: 700,
                  }}
                >
                  Not sure what you need yet?
                </h2>
                <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Look through the work or the service breakdown first. Either
                  one is a faster way to work out whether we are the right fit.
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:justify-end">
                <Link
                  to="/portfolio-gallery"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-opacity duration-300 hover:opacity-85 sm:h-14 sm:px-8 sm:text-base"
                >
                  See the work
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
                </Link>
                <Link
                  to="/what-we-do"
                  className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-bold text-foreground transition-colors duration-300 hover:border-foreground/40 sm:h-14 sm:px-8 sm:text-base"
                >
                  View services
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
