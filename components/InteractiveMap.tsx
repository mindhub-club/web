import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Users, Calendar, MapPin, Plus, Mail, ArrowRight } from "lucide-react";

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const activeLocations = {
    mallorca: {
      name: "Mallorca",
      country: "Spain",
      members: "50+ Members",
      sessions: "Weekly Sessions",
      nextEvent: "AI & Machine Learning",
      coordinates: { x: 280, y: 420 }, // Updated for more accurate positioning
      status: "active"
    },
    munich: {
      name: "Munich", 
      country: "Germany",
      members: "80+ Members",
      sessions: "Bi-weekly Sessions",
      nextEvent: "Software Architecture",
      coordinates: { x: 420, y: 280 },
      status: "active"
    }
  };

  const potentialCities = [
    { name: "Amsterdam", coordinates: { x: 380, y: 240 } },
    { name: "Barcelona", coordinates: { x: 300, y: 380 } },
    { name: "Berlin", coordinates: { x: 440, y: 240 } },
    { name: "Paris", coordinates: { x: 320, y: 280 } },
    { name: "Milan", coordinates: { x: 420, y: 340 } },
    { name: "Vienna", coordinates: { x: 460, y: 300 } }
  ];

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
            <div className="relative bg-white rounded-xl p-8 shadow-lg">
              <svg
                viewBox="0 0 800 600"
                className="w-full h-auto"
                style={{ maxHeight: "500px" }}
              >
                {/* Detailed Europe Map */}
                <path
                  d="M150 200 Q180 180 220 190 L260 185 Q300 180 340 190 L380 185 Q420 175 460 185 L500 180 Q540 175 580 190 L620 185 Q660 180 700 200 L720 220 Q730 260 720 300 L710 340 Q700 380 680 420 L660 440 Q620 460 580 465 L540 470 Q500 475 460 470 L420 475 Q380 480 340 475 L300 470 Q260 465 220 460 L180 455 Q140 435 130 400 L125 360 Q120 320 125 280 L130 240 Q135 220 150 200 Z"
                  fill="#f8fafc"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                  className="transition-colors duration-300"
                />

                {/* Country borders - simplified */}
                <path d="M200 250 Q250 240 300 250 L350 245 Q380 240 400 250" stroke="#e2e8f0" strokeWidth="1" fill="none" />
                <path d="M300 250 Q340 280 380 300 L420 320" stroke="#e2e8f0" strokeWidth="1" fill="none" />
                <path d="M420 250 Q460 260 500 270 L540 280" stroke="#e2e8f0" strokeWidth="1" fill="none" />
                
                {/* Active Location Markers */}
                {Object.entries(activeLocations).map(([key, location]) => (
                  <g key={key}>
                    {/* Glow effect */}
                    <circle
                      cx={location.coordinates.x}
                      cy={location.coordinates.y}
                      r="20"
                      fill="hsl(var(--primary))"
                      opacity="0.1"
                      className="animate-pulse"
                    />
                    <circle
                      cx={location.coordinates.x}
                      cy={location.coordinates.y}
                      r="12"
                      fill="hsl(var(--primary))"
                      stroke="white"
                      strokeWidth="3"
                      className="cursor-pointer transition-all duration-300 hover:scale-110"
                      onMouseEnter={() => setSelectedLocation(key)}
                      onMouseLeave={() => setSelectedLocation(null)}
                    />
                    <circle
                      cx={location.coordinates.x}
                      cy={location.coordinates.y}
                      r="6"
                      fill="white"
                      className="pointer-events-none"
                    />
                    
                    {/* Location Label */}
                    <text
                      x={location.coordinates.x}
                      y={location.coordinates.y - 25}
                      textAnchor="middle"
                      className="text-xs fill-current font-medium"
                      style={{ fontSize: "12px" }}
                    >
                      {location.name}
                    </text>
                  </g>
                ))}

                {/* Potential Location Dots */}
                {potentialCities.map((city, index) => (
                  <g key={index} className="group cursor-pointer">
                    <circle
                      cx={city.coordinates.x}
                      cy={city.coordinates.y}
                      r="6"
                      fill="#cbd5e1"
                      stroke="white"
                      strokeWidth="2"
                      className="transition-all duration-300 group-hover:fill-primary/50 group-hover:scale-125"
                    />
                    <text
                      x={city.coordinates.x}
                      y={city.coordinates.y - 15}
                      textAnchor="middle"
                      className="text-xs fill-slate-400 group-hover:fill-primary transition-colors opacity-0 group-hover:opacity-100"
                      style={{ fontSize: "10px" }}
                    >
                      {city.name}
                    </text>
                  </g>
                ))}
              </svg>
              
              <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Active Communities</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                  <span>Potential Locations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Active Locations */}
            <div className="space-y-4">
              <h3 className="text-lg">Active Communities</h3>
              {Object.entries(activeLocations).map(([key, location]) => (
                <Card 
                  key={key}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedLocation === key ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                  }`}
                  onMouseEnter={() => setSelectedLocation(key)}
                  onMouseLeave={() => setSelectedLocation(null)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {location.name}, {location.country}
                      </h4>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          <span>{location.members}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{location.sessions}</span>
                        </div>
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
                  <Button className="w-full" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Start a Chapter
                  </Button>
                  
                  <div className="text-xs text-muted-foreground">
                    Email us at{" "}
                    <span className="font-mono bg-muted px-1 rounded">
                      expand@mindhub.club
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon */}
            <div className="space-y-3">
              <h4 className="text-sm text-muted-foreground">Coming Soon</h4>
              <div className="grid grid-cols-2 gap-2">
                {potentialCities.slice(0, 4).map((city, index) => (
                  <div key={index} className="p-2 bg-muted/50 rounded text-center">
                    <span className="text-xs text-muted-foreground">{city.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}