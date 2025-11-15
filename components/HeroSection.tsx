import { Button } from "./ui/button";
import { Brain, Code, Palette, Rocket, Users } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";
import HeroSlideshow, { HeroSlide } from "./HeroSlideshow";
import { useState } from "react";

export function HeroSection() {
  const { t, locale } = useI18n();
  const [heroIndex, setHeroIndex] = useState(0);
  const featuredClubs = [
    { icon: Brain, email: "ai@mindhub.club", color: "text-blue-600" },
    { icon: Code, email: "engineering@mindhub.club", color: "text-green-600" },
    { icon: Palette, email: "design@mindhub.club", color: "text-purple-600" },
    { icon: Rocket, email: "entrepreneurs@mindhub.club", color: "text-red-600" }
  ];

  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 mt-24 px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl tracking-tight">
              {t('hero.welcome')} <span className="text-primary">{t('hero.brand')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{t('hero.featured')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuredClubs.map((club, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border border-primary/10">
                  <club.icon className={`w-5 h-5 ${club.color}`} />
                  <span className="text-sm font-mono text-muted-foreground truncate">{club.email}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="brand" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto" onClick={() => {
              document.getElementById('locations')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}>
              {t('hero.join')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => {
                document.getElementById('clubs')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              {t('hero.explore')}
            </Button>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{t('hero.stats')}</span>
            </div>
          </div>
        </div>
        
        <div className="relative order-first lg:order-none">
          {(() => {
            const formatShortDate = (raw: string) => {
              try {
                const d = new Date(raw);
                const opts: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
                return new Intl.DateTimeFormat(locale, opts).format(d);
              } catch {
                return raw;
              }
            };

            const slides: HeroSlide[] = [
              {
                url: "https://res.cloudinary.com/mipigu/image/upload/v1762620859/mindhub/IMG_5002_swghcd.jpg",
                alt: "MindHub @ Mallorca x Entrepreneurs",
                dateLabel: formatShortDate("2025-11-7"),
                eventLabel: t('topicsShort.startup'),
                crop: 'fit',
              },
              {
                url: "https://res.cloudinary.com/mipigu/image/upload/v1763191854/mindhub/IMG_5240_2_maxz3e.jpg",
                alt: "MindHub @ Mallorca x Software Engineers",
                dateLabel: formatShortDate("2025-11-13"),
                eventLabel: t('topicsShort.engineers'),
                crop: 'fit',
              },
              {
                url: "https://res.cloudinary.com/mipigu/image/upload/v1763191853/mindhub/IMG_5307_swnxjq.jpg",
                alt: "MindHub @ Mallorca x Entrepreneurs",
                dateLabel: formatShortDate("2025-11-14"),
                eventLabel: t('topicsShort.startup'),
                crop: 'fit',
              },
              {
                url: "https://res.cloudinary.com/mipigu/image/upload/v1762621223/mindhub/IMG_4602_sxkkoe.jpg",
                alt: "MindHub @ Mallorca x Entrepreneurs",
                dateLabel: formatShortDate("2025-10-31"),
                eventLabel: t('topicsShort.startup'),
                crop: 'fit',
              },
            ];
            const current = slides[heroIndex] || slides[0];
            return (
              <>
                <HeroSlideshow
                  slides={slides}
                  interval={6000}
                  className="rounded-lg shadow-2xl w-full lg:min-h-[520px]"
                  captionSide="right"
                  showCaptionInside={false}
                  onSlideChange={setHeroIndex}
                />
                {(current?.dateLabel || current?.eventLabel) && (
                  <div className="absolute -bottom-7 right-0 z-20">
                    <div className="flex items-center gap-2">
                      {current?.eventLabel && (
                        <span className="text-sm font-medium text-foreground">{current.eventLabel}</span>
                      )}
                      {current?.dateLabel && current?.eventLabel && (
                        <span className="text-muted-foreground">•</span>
                      )}
                      {current?.dateLabel && (
                        <span className="text-sm text-muted-foreground">{current.dateLabel}</span>
                      )}
                    </div>
                  </div>
                )}
              </>
            );
          })()}
          
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm">{t('hero.overlay.membersCount')}</p>
                <p className="text-xs text-muted-foreground">{t('hero.overlay.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
