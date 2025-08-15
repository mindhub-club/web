import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, MapPin, Plus, Mail } from "lucide-react";
import { EuropeMap } from "./EuropeMap";

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const activeLocations = [
    {
      id: "munich",
      name: "Munich",
      country: "Germany",
      coordinates: { x: 167.5, y: 162.5 },
      status: "active" as const,
      sessions: "Weekly Sessions",
      nextEvent: "Software Architecture"
    },
    {
      id: "mallorca",
      name: "Mallorca",
      country: "Spain", 
      coordinates: { x: 140, y: 204 },
      status: "active" as const,
      sessions: "Weekly Sessions",
      nextEvent: "AI & Machine Learning"
    }
  ];

  const potentialLocations = [
    {
      id: "barcelona",
      name: "Barcelona",
      country: "Spain",
      coordinates: { x: 140, y: 190 },
      status: "potential" as const
    },
    {
      id: "berlin",
      name: "Berlin",
      country: "Germany",
      coordinates: { x: 170, y: 140 },
      status: "potential" as const
    },
    {
      id: "paris",
      name: "Paris",
      country: "France",
      coordinates: { x: 140, y: 160 },
      status: "potential" as const
    },
    {
      id: "milan",
      name: "Milan",
      country: "Italy",
      coordinates: { x: 160, y: 180 },
      status: "potential" as const
    },
    {
      id: "vienna",
      name: "Vienna",
      country: "Austria",
      coordinates: { x: 460, y: 300 },
      status: "potential" as const
    }
  ];

  const allLocations = [...activeLocations, ...potentialLocations];

  const selectedLocationData = allLocations.find(loc => loc.id === selectedLocation);

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl">Our European Network</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Currently active in 2 locations with plans to expand across Europe. Help us bring MindHub to your city.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <div className="relative bg-white rounded-xl shadow-lg">
              <EuropeMap
                locations={allLocations}
                selectedLocation={selectedLocation}
                onLocationSelect={setSelectedLocation}
                onLocationHover={setSelectedLocation}
                className="w-full"
                showPotentialLocations={true}
                customStyles={{
                  activeLocationColor: '#388cf3',
                  potentialLocationColor: '#bcdaff',
                                hoverColor: 'hsl(var(--primary))'
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Active Locations */}
            <div className="space-y-4">
              <h3 className="text-lg">Active Communities</h3>
              {activeLocations.map((location) => (
                <Card 
                  key={location.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedLocation === location.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                  }`}
                  onMouseEnter={() => setSelectedLocation(location.id)}
                  onMouseLeave={() => setSelectedLocation(null)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {location.name}, {location.country}
                        </h4>
                        
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{location.sessions}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center ml-4 self-center">
                        <span
                          className="text-2xl"
                          title={location.country}
                          aria-label={location.country}
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
                            return countryToFlag(location.country);
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
                  <h4 className="text-lg">Bring MindHub to Your City</h4>
                  <p className="text-sm text-muted-foreground">
                    Help us expand our network. We're looking for passionate community leaders to establish MindHub chapters across Europe.
                  </p>
                </div>

                <div className="space-y-3">
                  <a href="mailto:growth@mindhub.club?subject=Suggest%20a%20New%20Club">
                  <Button className="w-full" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Start a Chapter
                  </Button>
                    </a>
                  
                  <div className="text-xs text-muted-foreground">
                    Email us at{" "}
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