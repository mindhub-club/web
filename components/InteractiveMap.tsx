import React, { useEffect, useRef, useState, Suspense } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Plus, Mail, Brain, Code, Palette, Rocket, Lightbulb, Megaphone, Scale, Tag, LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
// Lazy-load the heavy globe bundle when visible
const LazyGlobeMap = React.lazy(() => import("./GlobeMap").then(m => ({ default: m.GlobeMap })));
import type { GlobeLocation } from "./GlobeMap";
import { useI18n } from "../i18n/I18nProvider";

export function InteractiveMap() {
  const { t } = useI18n();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Map club ids to the same color system used in specialized clubs
  const clubColorMap: Record<string, string> = {
    ai: "bg-blue-100 text-blue-700",
    engineering: "bg-green-100 text-green-700",
    design: "bg-purple-100 text-purple-700",
    law: "bg-amber-100 text-amber-700",
    startup: "bg-red-100 text-red-700",
    product: "bg-indigo-100 text-indigo-700",
    innovation: "bg-orange-100 text-orange-700",
    marketing: "bg-teal-100 text-teal-700",
  };

  // Support aliases coming from activeLocations configuration
  const clubAliasMap: Record<string, string> = {
    software: "engineering",
    entrepreneurship: "startup",
  };

  const resolveClubKey = (id: string) => clubAliasMap[id] || id;
  const getClubColor = (id: string) => clubColorMap[resolveClubKey(id)] || "bg-muted text-foreground";

  // Icon mapping for clubs
  const clubIconMap: Record<string, LucideIcon> = {
    ai: Brain,
    engineering: Code,
    design: Palette,
    law: Scale,
    startup: Rocket,
    product: Lightbulb,
    innovation: Lightbulb,
    marketing: Megaphone,
  };

  const getClubIcon = (id: string) => clubIconMap[resolveClubKey(id)] || Tag;

  // Short, human-friendly tag labels
  const clubShortNameMap: Record<string, string> = {
    ai: "AI",
    engineering: "Engineering",
    design: "Design",
    law: "Law",
    startup: "Entrepreneurs",
    product: "Product",
    innovation: "Innovation",
    marketing: "Marketing",
  };

  const getClubLabel = (id: string) => {
    const key = resolveClubKey(id);
    // Prefer short names for tag chips; fall back to i18n title
    if (clubShortNameMap[key]) return clubShortNameMap[key];
    try { return t((`clubs.${key}.title`) as string); } catch { return key; }
  };

  type UIlocation = GlobeLocation & { countryName?: string; clubs?: string[] };

  const activeLocations: UIlocation[] = [
    {
      id: "munich",
      name: t('map.cities.munich'),
      country: "DE",
      countryName: t('map.countries.germany'),
      lat: 48.137, lng: 11.575,
      status: "active" as const,
      clubs: ['entrepreneurship'],
    },
    {
      id: "mallorca",
      name: t('map.cities.mallorca'),
      country: "ES",
      countryName: t('map.countries.spain'),
      lat: 39.5696, lng: 2.6502,
      status: "active" as const,
      clubs: ['entrepreneurship', 'software'],
    }
  ];

  const potentialLocations: UIlocation[] = [
    {
      id: "barcelona",
      name: "Barcelona",
      country: "ES",
      lat: 41.3851, lng: 2.1734,
      status: "potential" as const
    },
    {
      id: "berlin",
      name: "Berlin",
      country: "DE",
      lat: 52.52, lng: 13.405,
      status: "potential" as const
    },
    {
      id: "paris",
      name: "Paris",
      country: "FR",
      lat: 48.8566, lng: 2.3522,
      status: "potential" as const
    },
    {
      id: "milan",
      name: "Milan",
      country: "IT",
      countryName: t('map.countries.italy'),
      lat: 45.4642, lng: 9.19,
      status: "potential" as const
    },
    {
      id: "vienna",
      name: "Vienna",
      country: "AT",
      lat: 48.2082, lng: 16.3738,
      status: "potential" as const
    },
    // Added potential locations
    {
      id: "oslo",
      name: "Oslo",
      country: "NO",
      lat: 59.9139, lng: 10.7522,
      status: "potential" as const
    },
    {
      id: "bergen",
      name: "Bergen",
      country: "NO",
      lat: 60.3913, lng: 5.3221,
      status: "potential" as const
    },
    {
      id: "london",
      name: "London",
      country: "GB",
      lat: 51.5074, lng: -0.1278,
      status: "potential" as const
    },
    {
      id: "murcia",
      name: "Murcia",
      country: "ES",
      lat: 37.9922, lng: -1.1307,
      status: "potential" as const
    },
    {
      id: "madrid",
      name: "Madrid",
      country: "ES",
      lat: 40.4168, lng: -3.7038,
      status: "potential" as const
    },
    {
      id: "istanbul",
      name: "Istanbul",
      country: "TR",
      lat: 41.0082, lng: 28.9784,
      status: "potential" as const
    },
    // Further relevant hubs
    {
      id: "amsterdam",
      name: "Amsterdam",
      country: "NL",
      lat: 52.3676, lng: 4.9041,
      status: "potential" as const
    },
    {
      id: "zurich",
      name: "Zurich",
      country: "CH",
      lat: 47.3769, lng: 8.5417,
      status: "potential" as const
    },
    {
      id: "copenhagen",
      name: "Copenhagen",
      country: "DK",
      lat: 55.6761, lng: 12.5683,
      status: "potential" as const
    },
    {
      id: "stockholm",
      name: "Stockholm",
      country: "SE",
      lat: 59.3293, lng: 18.0686,
      status: "potential" as const
    },
    {
      id: "helsinki",
      name: "Helsinki",
      country: "FI",
      lat: 60.1699, lng: 24.9384,
      status: "potential" as const
    },
    {
      id: "lisbon",
      name: "Lisbon",
      country: "PT",
      lat: 38.7223, lng: -9.1393,
      status: "potential" as const
    },
    {
      id: "dublin",
      name: "Dublin",
      country: "IE",
      lat: 53.3498, lng: -6.2603,
      status: "potential" as const
    },
    {
      id: "prague",
      name: "Prague",
      country: "CZ",
      lat: 50.0755, lng: 14.4378,
      status: "potential" as const
    },
    {
      id: "warsaw",
      name: "Warsaw",
      country: "PL",
      lat: 52.2297, lng: 21.0122,
      status: "potential" as const
    },
    {
      id: "brussels",
      name: "Brussels",
      country: "BE",
      lat: 50.8503, lng: 4.3517,
      status: "potential" as const
    },
    {
      id: "frankfurt",
      name: "Frankfurt",
      country: "DE",
      lat: 50.1109, lng: 8.6821,
      status: "potential" as const
    },
    {
      id: "hamburg",
      name: "Hamburg",
      country: "DE",
      lat: 53.5511, lng: 9.9937,
      status: "potential" as const
    },
    // ——— Atlantic Islands ———
    {
      id: "reykjavik",
      name: "Reykjavík",
      country: "IS",
      lat: 64.1466, lng: -21.9426,
      status: "potential" as const
    },
    {
      id: "torshavn",
      name: "Tórshavn",
      country: "FO",
      lat: 62.0079, lng: -6.7903,
      status: "potential" as const
    },
    {
      id: "funchal",
      name: "Funchal (Madeira)",
      country: "PT",
      lat: 32.6669, lng: -16.9241,
      status: "potential" as const
    },
    {
      id: "ponta-delgada",
      name: "Ponta Delgada (Azores)",
      country: "PT",
      lat: 37.7412, lng: -25.6756,
      status: "potential" as const
    },
    {
      id: "las-palmas",
      name: "Las Palmas (Gran Canaria)",
      country: "ES",
      lat: 28.1235, lng: -15.4363,
      status: "potential" as const
    },
    {
      id: "santa-cruz-de-tenerife",
      name: "Santa Cruz de Tenerife",
      country: "ES",
      lat: 28.4636, lng: -16.2518,
      status: "potential" as const
    },
    {
      id: "praia",
      name: "Praia (Cape Verde)",
      country: "CV",
      lat: 14.9331, lng: -23.5133,
      status: "potential" as const
    },
    {
      id: "hamilton-bermuda",
      name: "Hamilton (Bermuda)",
      country: "BM",
      lat: 32.2949, lng: -64.7814,
      status: "potential" as const
    },
    {
      id: "jamestown-st-helena",
      name: "Jamestown (St Helena)",
      country: "SH",
      lat: -15.9244, lng: -5.7181,
      status: "potential" as const
    },
    {
      id: "sao-tome",
      name: "São Tomé",
      country: "ST",
      lat: 0.3365, lng: 6.7273,
      status: "potential" as const
    },
    // ——— Americas ———
    {
      id: "new-york",
      name: "New York",
      country: "US",
      lat: 40.7128, lng: -74.006,
      status: "potential" as const
    },
    {
      id: "san-francisco",
      name: "San Francisco",
      country: "US",
      lat: 37.7749, lng: -122.4194,
      status: "potential" as const
    },
    {
      id: "los-angeles",
      name: "Los Angeles",
      country: "US",
      lat: 34.0522, lng: -118.2437,
      status: "potential" as const
    },
    {
      id: "seattle",
      name: "Seattle",
      country: "US",
      lat: 47.6062, lng: -122.3321,
      status: "potential" as const
    },
    {
      id: "austin",
      name: "Austin",
      country: "US",
      lat: 30.2672, lng: -97.7431,
      status: "potential" as const
    },
    {
      id: "toronto",
      name: "Toronto",
      country: "CA",
      lat: 43.6532, lng: -79.3832,
      status: "potential" as const
    },
    {
      id: "vancouver",
      name: "Vancouver",
      country: "CA",
      lat: 49.2827, lng: -123.1207,
      status: "potential" as const
    },
    {
      id: "mexico-city",
      name: "Mexico City",
      country: "MX",
      lat: 19.4326, lng: -99.1332,
      status: "potential" as const
    },
    {
      id: "sao-paulo",
      name: "São Paulo",
      country: "BR",
      lat: -23.5505, lng: -46.6333,
      status: "potential" as const
    },
    {
      id: "buenos-aires",
      name: "Buenos Aires",
      country: "AR",
      lat: -34.6037, lng: -58.3816,
      status: "potential" as const
    },
    {
      id: "santiago",
      name: "Santiago",
      country: "CL",
      lat: -33.4489, lng: -70.6693,
      status: "potential" as const
    },
    {
      id: "bogota",
      name: "Bogotá",
      country: "CO",
      lat: 4.7110, lng: -74.0721,
      status: "potential" as const
    },
    // ——— Middle East & Africa ———
    {
      id: "dubai",
      name: "Dubai",
      country: "AE",
      lat: 25.2048, lng: 55.2708,
      status: "potential" as const
    },
    {
      id: "tel-aviv",
      name: "Tel Aviv",
      country: "IL",
      lat: 32.0853, lng: 34.7818,
      status: "potential" as const
    },
    {
      id: "cairo",
      name: "Cairo",
      country: "EG",
      lat: 30.0444, lng: 31.2357,
      status: "potential" as const
    },
    {
      id: "lagos",
      name: "Lagos",
      country: "NG",
      lat: 6.5244, lng: 3.3792,
      status: "potential" as const
    },
    {
      id: "nairobi",
      name: "Nairobi",
      country: "KE",
      lat: -1.2921, lng: 36.8219,
      status: "potential" as const
    },
    {
      id: "cape-town",
      name: "Cape Town",
      country: "ZA",
      lat: -33.9249, lng: 18.4241,
      status: "potential" as const
    },
    // ——— Asia-Pacific ———
    {
      id: "tokyo",
      name: "Tokyo",
      country: "JP",
      lat: 35.6895, lng: 139.6917,
      status: "potential" as const
    },
    {
      id: "osaka",
      name: "Osaka",
      country: "JP",
      lat: 34.6937, lng: 135.5023,
      status: "potential" as const
    },
    {
      id: "seoul",
      name: "Seoul",
      country: "KR",
      lat: 37.5665, lng: 126.9780,
      status: "potential" as const
    },
    {
      id: "singapore",
      name: "Singapore",
      country: "SG",
      lat: 1.3521, lng: 103.8198,
      status: "potential" as const
    },
    {
      id: "hong-kong",
      name: "Hong Kong",
      country: "HK",
      lat: 22.3193, lng: 114.1694,
      status: "potential" as const
    },
    {
      id: "taipei",
      name: "Taipei",
      country: "TW",
      lat: 25.0330, lng: 121.5654,
      status: "potential" as const
    },
    {
      id: "shanghai",
      name: "Shanghai",
      country: "CN",
      lat: 31.2304, lng: 121.4737,
      status: "potential" as const
    },
    {
      id: "beijing",
      name: "Beijing",
      country: "CN",
      lat: 39.9042, lng: 116.4074,
      status: "potential" as const
    },
    {
      id: "shenzhen",
      name: "Shenzhen",
      country: "CN",
      lat: 22.5431, lng: 114.0579,
      status: "potential" as const
    },
    {
      id: "bangalore",
      name: "Bangalore",
      country: "IN",
      lat: 12.9716, lng: 77.5946,
      status: "potential" as const
    },
    {
      id: "mumbai",
      name: "Mumbai",
      country: "IN",
      lat: 19.0760, lng: 72.8777,
      status: "potential" as const
    },
    {
      id: "delhi",
      name: "Delhi",
      country: "IN",
      lat: 28.6139, lng: 77.2090,
      status: "potential" as const
    },
    {
      id: "jakarta",
      name: "Jakarta",
      country: "ID",
      lat: -6.2088, lng: 106.8456,
      status: "potential" as const
    },
    {
      id: "manila",
      name: "Manila",
      country: "PH",
      lat: 14.5995, lng: 120.9842,
      status: "potential" as const
    },
    {
      id: "kuala-lumpur",
      name: "Kuala Lumpur",
      country: "MY",
      lat: 3.1390, lng: 101.6869,
      status: "potential" as const
    },
    {
      id: "bangkok",
      name: "Bangkok",
      country: "TH",
      lat: 13.7563, lng: 100.5018,
      status: "potential" as const
    },
    // ——— Oceania ———
    {
      id: "sydney",
      name: "Sydney",
      country: "AU",
      lat: -33.8688, lng: 151.2093,
      status: "potential" as const
    },
    {
      id: "melbourne",
      name: "Melbourne",
      country: "AU",
      lat: -37.8136, lng: 144.9631,
      status: "potential" as const
    },
    {
      id: "auckland",
      name: "Auckland",
      country: "NZ",
      lat: -36.8485, lng: 174.7633,
      status: "potential" as const
    }
  ];

  const allLocations: UIlocation[] = [...activeLocations, ...potentialLocations];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl">{t('map.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('map.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <LazyGlobeContainer 
            allLocations={allLocations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />

          <div className="space-y-6">
            {/* Active Locations */}
            <div className="space-y-4">
              <h3 className="text-lg">{t('map.active')}</h3>
              {activeLocations.map((location) => (
                <Card 
                  key={location.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedLocation === location.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {location.name}, {location.countryName}
                        </h4>
                        
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2">
                              {location.clubs?.map((club) => {
                                const Icon = getClubIcon(club);
                                const label = getClubLabel(club);
                                return (
                                  <Tooltip key={club}>
                                    <TooltipTrigger asChild>
                                      <div
                                        role="img"
                                        aria-label={label}
                                        className={`w-7 h-7 rounded-full flex items-center justify-center ${getClubColor(club)}`}
                                      >
                                        <Icon className="w-3.5 h-3.5" />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent sideOffset={6}>{label}</TooltipContent>
                                  </Tooltip>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center ml-4 self-center">
                        <span
                          className="text-2xl"
                          title={location.countryName}
                          aria-label={location.countryName}
                        >
                          {(() => {
                            const countryToFlag = (country: string) => {
                              const map: Record<string, string> = {
                                "Germany": "DE",
                                "France": "FR",
                                "Spain": "ES",
                                "Italy": "IT",
                                "United Kingdom": "GB",
                                "Netherlands": "NL",
                                "Belgium": "BE",
                                "Sweden": "SE",
                                "Norway": "NO",
                                "Denmark": "DK",
                                "Finland": "FI",
                                "Poland": "PL",
                                "Austria": "AT",
                                "Switzerland": "CH",
                                "Portugal": "PT",
                                "Ireland": "IE",
                                "Czech Republic": "CZ",
                                "Hungary": "HU",
                                "Greece": "GR",
                                "Romania": "RO",
                                "Bulgaria": "BG",
                                "Slovakia": "SK",
                                "Slovenia": "SI",
                                "Croatia": "HR",
                                "Estonia": "EE",
                                "Latvia": "LV",
                                "Lithuania": "LT",
                                "Luxembourg": "LU",
                                "Iceland": "IS",
                                "Ukraine": "UA",
                                "Serbia": "RS",
                                "Turkey": "TR",
                                "Russia": "RU",
                              };
                              let code = map[country] || "";
                              if (!code && country.length === 2) code = country.toUpperCase();
                              if (!code) return "🏳️";
                              return code
                                .toUpperCase()
                                .replace(/./g, char =>
                                  String.fromCodePoint(127397 + char.charCodeAt(0))
                                );
                            };
                            return countryToFlag(location.country || "");
                          })()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Expansion CTA */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/10 border-primary/20">
              <CardContent className="p-6 space-y-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg">{t('map.ctaTitle')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('map.ctaBody')}
                  </p>
                </div>

                <div className="space-y-3">
                  <a href="mailto:growth@mindhub.club?subject=Suggest%20a%20New%20Club">
                  <Button className="w-full" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    {t('map.ctaButton')}
                  </Button>
                    </a>
                  
                  <div className="text-xs text-muted-foreground">
                    {t('map.emailLead')} {" "}
                    <span className="font-mono bg-muted px-1 rounded">
                      growth@mindhub.club
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// Separate component so we can use IntersectionObserver cleanly
function LazyGlobeContainer({
  allLocations,
  selectedLocation,
  setSelectedLocation,
}: {
  allLocations: (GlobeLocation & { countryName?: string; clubs?: string[] })[];
  selectedLocation: string | null;
  setSelectedLocation: (id: string | null) => void;
}) {
  const { t } = useI18n();

  const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(e => e.isIntersecting)) {
          setShouldLoadGlobe(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: '200px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lg:col-span-2 w-full">
      <div
        ref={containerRef}
        className="relative rounded-2xl shadow-lg overflow-hidden"
        style={{ minHeight: 520, backgroundColor: '#00050eff' }}
      >
        {shouldLoadGlobe && (
          <LazyGlobeMap
            locations={allLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
            onLocationHover={setSelectedLocation}
            className="w-full"
            showPotentialLocations={true}
              customStyles={{
                potentialLocationColor: '#ca9e3ede',
              }}
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 px-1 mt-3 text-sm">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block w-3.5 h-3.5 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-600 shadow-sm"
          />
          <span className="text-muted-foreground">{t('map.active')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block w-3.5 h-3.5 rounded-full shadow-sm"
            style={{ backgroundColor: '#f9c553de' }}
          />
          <span className="text-muted-foreground">{t('map.planned')}</span>
        </div>
      </div>
    </div>
  );
}
