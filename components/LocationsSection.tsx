import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Users, Calendar, Clock, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useI18n } from "../i18n/I18nProvider";

export function LocationsSection() {
  const { t, get } = useI18n();
  const locations = [
    {
      city: "Mallorca",
      country: t('locationsData.mallorca.country'),
      image: "https://images.unsplash.com/photo-1617093888347-f73de2649f94?w=600&h=300&fit=crop",
      members: t('locationsData.mallorca.members'),
      sessions: t('locationsData.mallorca.sessions'),
      timezone: "CET (UTC+1)",
      nextEvents: [
        { topic: "AI & Machine Learning", date: "Aug 20", type: "ai" },
        { topic: "Software Engineering", date: "Aug 27", type: "engineering" },
        { topic: "UI / UX Design", date: "Sep 4", type: "design" }
      ],
      description: t('locationsData.mallorca.description'),
      highlights: (get<string[]>('locationsData.mallorca.highlights') || []),
      link: "https://meetup.com/mindhub-club"
    },
    {
      city: "Munich",
      country: t('locationsData.munich.country'),
      image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=600&h=300&fit=crop",
      members: t('locationsData.munich.members'),
      sessions: t('locationsData.munich.sessions'),
      timezone: "CET (UTC+1)",
      nextEvents: [
        { topic: "AI & Machine Learning", date: "Sep 3", type: "ai" }
      ],
      description: t('locationsData.munich.description'),
      highlights: (get<string[]>('locationsData.munich.highlights') || []),
      link: "https://meetup.com/mindhub-club-in-munchen"
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
          <h2 className="text-3xl lg:text-5xl">{t('locations.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('locations.subtitle')}
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
              
              <CardContent className="p-6 gap-y-6 flex flex-col flex-auto">
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
                    {t('locations.upcoming')}
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
                  <h4 className="text-sm font-medium">{t('locations.highlights')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {location.highlights.map((highlight, highlightIndex) => (
                      <span key={highlightIndex} className="text-xs px-2 py-1 bg-muted rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-auto" variant="outline">
                  <a href={location.link} target="_blank" rel="noopener noreferrer">
                    {t('locations.joinButton').replace('{city}', location.city)}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}