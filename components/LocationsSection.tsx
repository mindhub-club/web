import { Card, CardContent } from "./ui/card";
import { CloudinaryImage } from "./CloudinaryImage";
import { MapPin, Users, Calendar, Clock, Globe, Brain, Code, Palette, Scale, Rocket, Lightbulb, ArrowUpRight, X, Mail, AlarmClock, ExternalLink, DollarSign, Euro, PoundSterling, IndianRupee, JapaneseYen } from "lucide-react";
import { CALLING_CODES, isoToFlag } from "../lib/callingCodes";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { useI18n } from "../i18n/I18nProvider";
import { useState } from "react";

type ImageSettings = {
  url: string;
  width?: number;
  height?: number;
  aspectRatio?: number | string;
  crop?: 'fill' | 'fit' | 'crop' | 'scale' | 'thumb';
  gravity?: 'auto' | 'center' | 'north' | 'south' | 'east' | 'west' | 'north_east' | 'north_west' | 'south_east' | 'south_west';
  offsetX?: number;
  offsetY?: number;
  format?: 'auto' | 'jpg' | 'png' | 'webp' | 'avif';
  quality?: 'auto' | number;
};

type PreRegState = {
  city: string;
  eventTopic: string;
  eventDate: string;
  eventType: string;
  eventLocation?: string;
  eventTime?: string;
  status?: 'open' | 'planned';
} | null;

export function LocationsSection() {
  const { t, get, locale } = useI18n();
  const [openPrereg, setOpenPrereg] = useState<PreRegState>(null);
  const PREREG_WEBHOOK = "https://n8n.mipigu.com/webhook/mindhub-preregister";
  const locations = [
    {
      id: 'mallorca',
      name: t('map.cities.mallorca'),
      country: t('locationsData.mallorca.country'),
      image: "https://res.cloudinary.com/mipigu/image/upload/v1761726872/mindhub/mallorca.jpg",
      members: 10,
      sessions: t('locationsData.mallorca.sessions'),
      languages: [t('languageNames.catalan'), t('languageNames.spanish'), t('languageNames.english')],
      nextEvents: [
        {
          topic: t('locations.topics.startup'),
          date: "2025-11-14",
          type: "startup",
          status: 'open',
          time: "18:00",
          location: "Reverb Mallorca",
          price: { amount: 0, currency: 'EUR' },
        },
        {
          topic: t('locations.topics.startup'),
          date: "2025-11-21",
          type: "startup",
          status: 'planned',
          time: "18:00",
          location: "Reverb Mallorca",
          price: { amount: 0, currency: 'EUR' },
        },
        {
          topic: t('locations.topics.startup'),
          date: "2025-11-28",
          type: "startup",
          status: 'planned',
          time: "18:00",
          location: "Reverb Mallorca",
          price: { amount: 0, currency: 'EUR' },
        }
      ],
      description: t('locationsData.mallorca.description'),
      highlights: (get<string[]>('locationsData.mallorca.highlights') || []),
      link: "https://meetup.com/mindhub-at-mallorca"
    },
    {
      id: 'munich',
      name: t('map.cities.munich'),
      country: t('locationsData.munich.country'),
      image: {
        url: "https://res.cloudinary.com/mipigu/image/upload/v1761731445/mindhub/munich.jpg",
        crop: 'crop',
        gravity: 'north',
      } as ImageSettings,
      members: 20,
      sessions: t('locationsData.munich.sessions'),
      languages: [t('languageNames.german'), t('languageNames.english')],
      nextEvents: [
        {
          topic: t('locations.topics.startup'),
          date: "2025-11-21",
          type: "startup",
          status: 'planned',
          time: "18:00",
          price: { amount: 0, currency: 'EUR' }
        },
        {
          topic: t('locations.topics.startup'),
          date: "2025-11-28",
          type: "startup",
          status: 'planned',
          time: "18:00",
          price: { amount: 0, currency: 'EUR' }
        },
        {
          topic: t('locations.topics.startup'),
          date: "2025-12-05",
          type: "startup",
          status: 'planned',
          time: "18:00",
          price: { amount: 0, currency: 'EUR' }
        }
      ],
      description: t('locationsData.munich.description'),
      highlights: (get<string[]>('locationsData.munich.highlights') || []),
      link: "https://meetup.com/mindhub-munchen"
    }
  ];

  const getTopicColor = (type: string) => {
    const colors = {
      ai: "bg-blue-100 text-blue-700",
      startup: "bg-red-100 text-red-700",
      design: "bg-purple-100 text-purple-700",
      engineering: "bg-green-100 text-green-700",
      law: "bg-amber-100 text-amber-700",
      product: "bg-indigo-100 text-indigo-700"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getTopicIcon = (type: string) => {
    const map: Record<string, any> = {
      ai: Brain,
      engineering: Code,
      design: Palette,
      law: Scale,
      startup: Rocket,
      product: Users,
      innovation: Lightbulb,
      marketing: Globe,
    };
    return map[type] || Globe;
  };

  const getTopicIconColor = (type: string) => {
    const colors: Record<string, string> = {
      ai: "text-blue-600",
      engineering: "text-green-600",
      design: "text-purple-600",
      law: "text-amber-600",
      startup: "text-red-600",
      product: "text-indigo-600",
      innovation: "text-orange-600",
      marketing: "text-teal-600",
    };
    return colors[type] || "text-muted-foreground";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: "bg-emerald-100 text-emerald-700",
      planned: "bg-gray-100 text-gray-700",
    };
    return colors[status] || "bg-muted text-muted-foreground";
  };

  const formatEventPrice = (price?: { amount: number; currency: string }) => {
    if (!price) return '';
    if (price.amount <= 0) return t('locations.price.free');
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: price.currency || 'EUR',
        maximumFractionDigits: 0,
      }).format(price.amount);
    } catch {
      return `${price.amount} ${price.currency || ''}`.trim();
    }
  };

  const getPriceBadgeColor = (price?: { amount: number }) => {
    if (!price) return 'bg-muted text-muted-foreground';
    return price.amount <= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700';
  };

  const getCurrencyIcon = (currency?: string) => {
    const c = (currency || '').toUpperCase();
    switch (c) {
      case 'EUR':
        return Euro;
      case 'GBP':
        return PoundSterling;
      case 'INR':
        return IndianRupee;
      case 'JPY':
        return JapaneseYen;
      case 'USD':
      case 'AUD':
      case 'CAD':
      case 'NZD':
      case 'ARS':
      case 'MXN':
      case 'BRL':
      default:
        return DollarSign;
    }
  };

  const parseEventDate = (raw: string | undefined) => {
    if (!raw) return undefined;
    // ISO or RFC-parseable
    const isoTry = new Date(raw);
    if (!isNaN(isoTry.getTime())) return isoTry;
    // Parse formats like "Nov 7"
    const m = /^([A-Za-z]{3,})\s+(\d{1,2})$/.exec(raw.trim());
    if (m) {
      const monthName = m[1].toLowerCase();
      const day = parseInt(m[2], 10);
      const months = {
        jan: 0, january: 0,
        feb: 1, february: 1,
        mar: 2, march: 2,
        apr: 3, april: 3,
        may: 4,
        jun: 5, june: 5,
        jul: 6, july: 6,
        aug: 7, august: 7,
        sep: 8, sept: 8, september: 8,
        oct: 9, october: 9,
        nov: 10, november: 10,
        dec: 11, december: 11,
      } as Record<string, number>;
      const month = months[monthName];
      if (month !== undefined && day >= 1 && day <= 31) {
        const year = new Date().getFullYear();
        return new Date(year, month, day);
      }
    }
    return undefined;
  };

  const formatEventDate = (raw: string | undefined) => {
    const d = parseEventDate(raw);
    if (!d) return raw ?? '';
    try {
      const nowYear = new Date().getFullYear();
      const opts: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      };
      if (d.getFullYear() !== nowYear) {
        opts.year = 'numeric';
      }
      return new Intl.DateTimeFormat(locale, opts).format(d);
    } catch {
      return raw ?? '';
    }
  };

  function PreRegisterForm({
    city,
    eventTopic,
    eventDate,
    eventType,
    eventLocation,
    eventTime,
    status,
    onSubmitted
  }: { city: string; eventTopic: string; eventDate: string; eventType: string; eventLocation?: string; eventTime?: string; status?: 'open' | 'planned'; onSubmitted?: () => void }) {
    const [name, setName] = useState("");
    const [method, setMethod] = useState<"email" | "whatsapp">("whatsapp");
    const [contact, setContact] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<null | "success" | "error">(null);
    const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
    const [attempted, setAttempted] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // E.164 format: +<countrycode><national number>, typically 8-15 digits total excluding '+'
    const phoneRegex = /^\+[1-9]\d{7,14}$/;
    const defaultIso = (() => {
      try {
        const lang = (navigator?.language || 'en').toLowerCase();
        if (lang.startsWith('de')) return 'DE';
        if (lang.startsWith('es') || lang.startsWith('ca')) return 'ES';
        if (lang.startsWith('fr')) return 'FR';
        if (lang.startsWith('it')) return 'IT';
        if (lang.endsWith('-at')) return 'AT';
        if (lang.endsWith('-gb')) return 'GB';
        if (lang.endsWith('-us')) return 'US';
      } catch {}
      return 'ES';
    })();
    const [countryIso, setCountryIso] = useState<string>(defaultIso);

    const validate = () => {
      const next: { name?: string; contact?: string } = {};
      if (!name.trim()) next.name = t('locations.form.nameRequired');
      if (!contact.trim()) {
        next.contact = t('locations.form.contactRequired');
      } else if (method === 'email' && !emailRegex.test(contact.trim())) {
        next.contact = t('locations.form.invalidEmail');
      } else if (method === 'whatsapp') {
        const digits = contact.replace(/\D+/g, '');
        const entry = CALLING_CODES.find((c) => c.iso2 === countryIso);
        const code = entry?.code || '+34';
        const full = `${code}${digits}`;
        if (!phoneRegex.test(full)) {
          next.contact = t('locations.form.invalidWhatsapp');
        }
      }
      setErrors(next);

      const valid = Object.keys(next).length === 0;

      return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setAttempted(true);
      if (!validate()) return;
      setSubmitting(true);
      setResult(null);
      try {
        const entry = CALLING_CODES.find((c) => c.iso2 === countryIso);
        const code = entry?.code || '+34';
        const payload: any = {
          name,
          contactType: method === 'whatsapp' ? 'Whatsapp' : 'Email',
          email: method === 'email' ? contact : null,
          phone: method === 'whatsapp' ? `${code}${contact.replace(/\D+/g, '')}` : null,
          city,
          eventDate,
          eventType,
          locale
        };
        const res = await fetch(PREREG_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Failed");
        setResult("success");
        setName("");
        setContact("");
        if (onSubmitted) onSubmitted();
      } catch (err) {
        setResult("error");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="mt-2 p-3 bg-muted/40 rounded-md space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <input
              type="text"
              name="name"
              autoComplete="name"
              autoCapitalize="words"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => { if (attempted) validate(); }}
              placeholder={t('locations.form.namePlaceholder')}
              aria-invalid={!!errors.name}
              className={`w-full rounded border bg-background px-3 py-2 text-sm ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : 'border-input'}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button
              type="button"
              aria-pressed={method === 'whatsapp'}
              onClick={() => { setMethod('whatsapp'); setContact(''); setErrors((e) => ({ ...e, contact: undefined })); }}
              className={`inline-flex items-center flex-1 gap-1 px-2 py-2 justify-center rounded-md border ${method === 'whatsapp' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80'}`}
            >
              <img src={method === 'whatsapp' ? "whatsapp_white.svg" : "whatsapp_black.svg"} alt="WhatsApp" className="w-4 h-4" /> {t('locations.form.whatsapp')}
            </button>
            <button
              type="button"
              aria-pressed={method === 'email'}
              onClick={() => { setMethod('email'); setContact(''); setErrors((e) => ({ ...e, contact: undefined })); }}
              className={`inline-flex items-center flex-1 gap-1 px-2 py-2 justify-center rounded-md border ${method === 'email' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80'}`}
            >
              <Mail className="w-4 h-4" /> {t('locations.form.email')}
            </button>
          </div>
          <div className="sm:col-span-2">
            <div className="flex gap-2">
              {method === 'whatsapp' && (
                <CountryPicker
                  countryIso={countryIso}
                  onChange={(iso) => { setCountryIso(iso); setErrors({}); }}
                />
              )}
              {method === 'whatsapp' && (
                <input
                  type="hidden"
                  name="tel-country-code"
                  value={(CALLING_CODES.find((c) => c.iso2 === countryIso)?.code || '+34').replace('+', '')}
                />
              )}
              <input
                type={method === 'email' ? 'email' : 'tel'}
                value={contact}
                name={method === 'email' ? 'email' : 'tel-national'}
                autoComplete={method === 'email' ? 'email' : 'tel-national'}
                inputMode={method === 'email' ? undefined : 'numeric'}
                onChange={(e) => setContact(e.target.value)}
                onBlur={() => { if (attempted) validate(); }}
                placeholder={method === 'email' ? t('locations.form.emailPlaceholder') : t('locations.form.whatsappPlaceholder')}
                aria-invalid={!!errors.contact}
                className={`flex-1 rounded border bg-background px-3 py-2 text-sm ${errors.contact ? 'border-red-500 focus-visible:ring-red-500' : 'border-input'}`}
              />
            </div>
            {errors.contact && <p className="mt-1 text-xs text-red-600">{errors.contact}</p>}
          </div>
        </div>
        <Button type="submit" variant="brand" onClick={validate} disabled={submitting} className="w-full sm:w-auto">
          {submitting
            ? t('locations.form.submitting')
            : (status === 'open' ? t('locations.form.imIn') : t('locations.form.submit'))}
        </Button>
        {result === 'success' && (
          <p className="text-xs text-emerald-700">{t('locations.form.success')}</p>
        )}
        {result === 'error' && (
          <p className="text-xs text-red-600">{t('locations.form.error')}</p>
        )}
      </form>
    );
  }

  function CountryPicker({ countryIso, onChange }: { countryIso: string; onChange: (iso: string) => void }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const selected = CALLING_CODES.find((c) => c.iso2 === countryIso) || CALLING_CODES.find((c) => c.iso2 === 'ES');
    const base = (() => {
      const seen = new Set<string>();
      const out: typeof CALLING_CODES = [] as any;
      for (const c of CALLING_CODES) {
        if (seen.has(c.iso2)) continue;
        seen.add(c.iso2);
        out.push(c);
      }
      return out;
    })();
    const list = base.filter((c) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        c.country.toLowerCase().includes(q) ||
        c.code.replace('+','').includes(q.replace('+','')) ||
        c.iso2.toLowerCase().includes(q)
      );
    });

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button type="button" className="inline-flex items-center gap-2 rounded border border-input bg-background px-2 py-2 text-sm w-44 sm:w-56 justify-between">
            <span className="inline-flex items-center gap-2 truncate">
              <span>{selected ? isoToFlag(selected.iso2) : '🏳️'}</span>
              <span className="truncate">{selected ? `${selected.country} (${selected.code})` : 'Select country'}</span>
            </span>
            <span className="text-muted-foreground">▾</span>
          </button>
        </Popover.Trigger>
        <Popover.Content sideOffset={6} className="z-50 rounded-md border border-input bg-popover p-2 shadow-md w-64 sm:w-80">
          <div className="mb-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('locations.form.searchCountry')}
              className="w-full rounded border border-input bg-background px-2 py-1.5 text-sm"
            />
          </div>
          <div className="max-h-64 overflow-auto text-sm">
            {list.map((c) => (
              <button
                key={`${c.iso2}-${c.code}`}
                type="button"
                onClick={() => { onChange(c.iso2); setOpen(false); setQuery(""); }}
                className={`w-full text-left px-2 py-1.5 rounded hover:bg-muted inline-flex items-center gap-2 ${c.iso2 === countryIso ? 'bg-muted' : ''}`}
              >
                <span>{isoToFlag(c.iso2)}</span>
                <span className="flex-1 truncate">{c.country}</span>
                <span className="shrink-0 text-muted-foreground">{c.code}</span>
              </button>
            ))}
            {list.length === 0 && (
              <div className="px-2 py-3 text-muted-foreground">{t('locations.form.noResults')}</div>
            )}
          </div>
        </Popover.Content>
      </Popover.Root>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl">{t('locations.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('locations.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-[236px] overflow-hidden">
                {(() => {
                  const img = location.image as string | ImageSettings;
                  const defaults = { height: 600 as number, crop: 'fill' as const };
                  if (typeof img === 'string') {
                    return (
                      <CloudinaryImage
                        src={img}
                        {...defaults}
                        alt={`${location.name}, ${location.country}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    );
                  }
                  return (
                    <CloudinaryImage
                      src={img.url}
                      width={img.width}
                      height={img.height ?? defaults.height}
                      aspectRatio={img.aspectRatio}
                      crop={img.crop ?? defaults.crop}
                      gravity={img.gravity}
                      offsetX={img.offsetX}
                      offsetY={img.offsetY}
                      format={img.format}
                      quality={img.quality}
                      alt={`${location.name}, ${location.country}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  );
                })()}
              </div>
              
              <CardContent className="p-6 pt-1 gap-y-6 flex flex-col flex-auto">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-3xl">
                      {location.name}
                      <span className="text-base font-normal text-muted-foreground">, {location.country}</span>
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {location.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{t('locations.frequency')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{t('locations.members').replace('{count}', location.members.toString())}</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Globe className="w-4 h-4" />
                    <span className="sr-only">{t('locations.languages')}</span>
                    <div className="flex flex-wrap gap-2">
                      {(location as any).languages?.map((lng: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-muted rounded-full">{lng}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {t('locations.upcoming')}
                  </h4>
                  {(() => {
                    const hasOpen = location.nextEvents?.some((e: any) => e.status === 'open');
                    const hasPreregister = location.nextEvents?.some((e: any) => e.status === 'planned' && !!(e as any).preregUrl);
                    return (
                      <p className="text-xs text-muted-foreground">
                        {t('locations.clickToRsvpOrPreregister')}
                      </p>
                    );
                  })()}
                  <div className="space-y-2">
                    {location.nextEvents.map((event, eventIndex) => {
                      const Icon = getTopicIcon(event.type);
                      const eventUrl = (event as any).url as string | undefined;
                      const isOpenLink = event.status === 'open' && !!eventUrl;
                      const shouldOpenPopup = event.status === 'planned' || (event.status === 'open' && !eventUrl);
                      const clickable = isOpenLink || shouldOpenPopup;
                      const Wrapper: any = isOpenLink ? 'a' : (shouldOpenPopup ? 'button' : 'div');
                      const wrapperProps: any = isOpenLink
                        ? { href: eventUrl, target: "_blank", rel: "noopener noreferrer", 'aria-label': `${event.topic} — ${t('locations.upcoming')}` }
                        : shouldOpenPopup
                          ? { type: 'button', onClick: () => setOpenPrereg({
                                city: location.name,
                                eventTopic: event.topic,
                                eventDate: event.date,
                                eventType: (event as any).type,
                                eventLocation: (event as any).location,
                                eventTime: (event as any).time,
                                status: (event as any).status,
                              }) }
                          : {};
                      const formKey = `${index}-${eventIndex}`;
                      return (
                      <Wrapper
                        key={eventIndex}
                        className={`flex justify-between gap-3 items-start rounded-md px-2 py-2 transition-colors w-full text-left ${clickable ? 'hover:bg-muted/50' : ''}`}
                        {...wrapperProps}
                      >
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <Icon className={`w-4 h-4 mt-0.5 ${getTopicIconColor(event.type)}`} />
                          <div className="min-w-0">
                            <div className={`text-sm leading-snug ${clickable ? 'hover:underline' : ''}`}>{event.topic}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatEventDate(event.date)}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {(event as any).time || t('locations.tbd')}
                              </span>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {(event as any).location || t('locations.tbd')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-start">
                          {(() => {
                            const price = (event as any).price as { amount: number; currency: string } | undefined;
                            const label = formatEventPrice(price);
                            const CurIcon = getCurrencyIcon(price?.currency);
                            return label ? (
                              <span className={`inline-flex items-center gap-1 whitespace-nowrap text-xs px-2 py-1 rounded-full ${getPriceBadgeColor(price)}`}>
                                <CurIcon className="w-3.5 h-3.5" aria-hidden="true" />
                                {label}
                              </span>
                            ) : null;
                          })()}
                          {((event as any).status === 'open') ? (
                            <span className="inline-flex items-center whitespace-nowrap text-xs px-2 py-1 rounded-full bg-brand-gradient text-white">
                              {t('locations.rsvp')}
                            </span>
                          ) : (
                            <span className="inline-flex items-center whitespace-nowrap text-xs px-2 py-1 rounded-full bg-blue-600 text-white">
                              {t('locations.preregister')}
                            </span>
                          )}
                          {event.status === 'open' ? (
                            <ExternalLink className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                          ) : (
                            <AlarmClock className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                          )}
                        </div>
                      </Wrapper>
                      );
                    })}
                  </div>
                  {/* Modal for pre-registration */}
                  {openPrereg && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                      <div className="absolute inset-0 bg-black/50" onClick={() => setOpenPrereg(null)} />
                      <div className="relative w-full sm:max-w-lg bg-background rounded-t-2xl sm:rounded-xl p-4 sm:p-6 shadow-lg">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h5 className="text-base sm:text-lg font-medium truncate">{openPrereg.eventTopic}</h5>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-2 flex-wrap">
                                {openPrereg.city && (<><span className="inline-flex items-center gap-1"><Globe className="w-3 h-3" /> {openPrereg.city}</span><span>•</span></>)}
                                <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{formatEventDate(openPrereg.eventDate)}</span>
                                {openPrereg.eventTime && (<><span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {openPrereg.eventTime}</span></>)}
                                {openPrereg.eventLocation && (<><span>•</span><span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {openPrereg.eventLocation}</span></>)}
                              </div>
                            </div>
                          </div>
                          <button aria-label={t('locations.form.close')} className="p-1 rounded hover:bg-muted" onClick={() => setOpenPrereg(null)}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <PreRegisterForm
                          city={openPrereg.city}
                          eventTopic={openPrereg.eventTopic}
                          eventDate={openPrereg.eventDate}
                          eventType={openPrereg.eventType}
                          eventLocation={openPrereg.eventLocation}
                          eventTime={openPrereg.eventTime}
                          status={openPrereg.status}
                          onSubmitted={() => setOpenPrereg(null)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">{t('locations.highlights')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {location.highlights.map((highlight, highlightIndex) => (
                      <span key={highlightIndex} className="text-xs px-2 py-1 bg-muted rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
