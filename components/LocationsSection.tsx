import { Card, CardContent } from "./ui/card";
import { CloudinaryImage } from "./CloudinaryImage";
import { MapPin, Users, Calendar, Clock, Globe, Brain, Code, Palette, Scale, Rocket, Lightbulb, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { useI18n } from "../i18n/I18nProvider";

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

export function LocationsSection() {
  const { t, get } = useI18n();
  const locations = [
    {
      city: "Mallorca",
      country: t('locationsData.mallorca.country'),
      image: "https://res.cloudinary.com/mipigu/image/upload/v1761726872/mindhub/mallorca.jpg",
      members: 10,
      sessions: t('locationsData.mallorca.sessions'),
      nextEvents: [
        { topic: t('locations.topics.startup'), date: "Oct 31", type: "startup" }
      ],
      description: t('locationsData.mallorca.description'),
      highlights: (get<string[]>('locationsData.mallorca.highlights') || []),
      link: "https://meetup.com/mindhub-at-mallorca"
    },
    {
      city: "Munich",
      country: t('locationsData.munich.country'),
      image: {
        url: "https://res.cloudinary.com/mipigu/image/upload/v1761731445/mindhub/munich.jpg",
        crop: 'crop',
        gravity: 'north',
      } as ImageSettings,
      members: 20,
      sessions: t('locationsData.munich.sessions'),
      nextEvents: [
        { topic: t('locations.topics.startup'), date: "Nov 21", type: "startup" }
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
                        alt={`${location.city}, ${location.country}`}
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
                      alt={`${location.city}, ${location.country}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  );
                })()}
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
                    <Calendar className="w-4 h-4" />
                    <span>{t('locations.frequency')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{t('locations.members').replace('{count}', location.members.toString())}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {t('locations.upcoming')}
                  </h4>
                  <div className="space-y-2">
                    {location.nextEvents.map((event, eventIndex) => {
                      const Icon = getTopicIcon(event.type);
                      return (
                      <div key={eventIndex} className="flex justify-between gap-3 items-start">
                        <div className="flex items-start gap-2 flex-1 min-w-0">
                          <Icon className={`w-4 h-4 mt-0.5 ${getTopicIconColor(event.type)}`} />
                          <span className="text-sm leading-snug">{event.topic}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-start">
                          <span className={`inline-flex items-center whitespace-nowrap text-xs px-2 py-1 rounded-full ${getTopicColor(event.type)}`}>
                            {event.date}
                          </span>
                        </div>
                      </div>
                      );
                    })}
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

                <Button
                  asChild
                  variant="brand"
                  className="w-full mt-auto group relative overflow-hidden"
                >
                  <a
                    href={location.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>{t('locations.joinButton').replace('{city}', location.city)}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
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
