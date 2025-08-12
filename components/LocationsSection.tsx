import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Users, Calendar, Clock, Globe } from "lucide-react";
import { Button } from "./ui/button";

export function LocationsSection() {
  const locations = [
    {
      city: "Mallorca",
      country: "Spain",
      image: "https://images.unsplash.com/photo-1617093888347-f73de2649f94?w=600&h=300&fit=crop",
      members: "50+ Members",
      sessions: "Weekly Sessions",
      timezone: "CET (UTC+1)",
      nextEvents: [
        { topic: "AI & Machine Learning", date: "Jan 15", type: "ai" },
        { topic: "Startup Funding", date: "Jan 22", type: "startup" },
        { topic: "UX Design Principles", date: "Jan 29", type: "design" }
      ],
      description: "Join our vibrant Mediterranean community where tech innovation meets relaxed lifestyle. Perfect for remote workers and local professionals.",
      highlights: ["Beachside coworking spaces", "International community", "Year-round events"]
    },
    {
      city: "Munich",
      country: "Germany",
      image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=600&h=300&fit=crop",
      members: "80+ Members",
      sessions: "Bi-weekly Sessions",
      timezone: "CET (UTC+1)",
      nextEvents: [
        { topic: "Software Architecture", date: "Jan 18", type: "engineering" },
        { topic: "Legal Tech Innovation", date: "Feb 1", type: "law" },
        { topic: "Product Strategy", date: "Feb 15", type: "product" }
      ],
      description: "Be part of Germany's thriving tech ecosystem in Munich, where traditional business meets cutting-edge innovation.",
      highlights: ["Tech hub access", "Corporate partnerships", "Industry networking"]
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

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl">Community Spotlight</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get to know our active communities and discover what makes each location unique
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={location.image}
                  alt={`${location.city}, ${location.country}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm">{location.city}, {location.country}</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{location.timezone}</span>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-xl">{location.city}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {location.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{location.members}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{location.sessions}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Upcoming Events
                  </h4>
                  <div className="space-y-2">
                    {location.nextEvents.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-center justify-between">
                        <span className="text-sm">{event.topic}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getTopicColor(event.type)}`}>
                            {event.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Community Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {location.highlights.map((highlight, highlightIndex) => (
                      <span key={highlightIndex} className="text-xs px-2 py-1 bg-muted rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Join {location.city} Community
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}