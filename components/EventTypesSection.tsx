import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Brain, Code, Palette, Scale, Rocket, Users, Lightbulb, Globe, Mail, ExternalLink } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

export function EventTypesSection() {
  const { t } = useI18n();
  const clubs = [
    {
      icon: Brain,
      titleKey: 'clubs.ai.title',
      email: "ai@mindhub.club",
      descriptionKey: 'clubs.ai.description',
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Code,
      titleKey: 'clubs.engineering.title',
      email: "engineering@mindhub.club", 
      descriptionKey: 'clubs.engineering.description',
      color: "text-green-600", 
      bgColor: "bg-green-50"
    },
    {
      icon: Palette,
      titleKey: 'clubs.design.title',
      email: "design@mindhub.club",
      descriptionKey: 'clubs.design.description',
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Scale,
      titleKey: 'clubs.law.title',
      email: "law@mindhub.club",
      descriptionKey: 'clubs.law.description',
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      icon: Rocket,
      titleKey: 'clubs.entrepreneurs.title',
      email: "entrepreneurs@mindhub.club",
      descriptionKey: 'clubs.entrepreneurs.description',
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Users,
      titleKey: 'clubs.product.title',
      email: "product@mindhub.club",
      descriptionKey: 'clubs.product.description',
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Lightbulb,
      titleKey: 'clubs.innovation.title',
      email: "innovation@mindhub.club",
      descriptionKey: 'clubs.innovation.description',
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Globe,
      titleKey: 'clubs.marketing.title',
      email: "marketing@mindhub.club",
      descriptionKey: 'clubs.marketing.description',
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <section id="clubs" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl">{t('events.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('events.blurb')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col flex-auto gap-6">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${club.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <club.icon className={`w-6 h-6 ${club.color}`} />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg">{t(club.titleKey as string)}</h3>
                  
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <span className="text-sm font-mono text-muted-foreground">{club.email}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(club.descriptionKey as string)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 mr-5 px-6 py-3 bg-muted rounded-full">
            <span className="text-sm text-muted-foreground">{t('events.notFound')}</span>
          </div>
          
          <Button
            variant="outline"
            className="mx-auto"
            asChild
          >
            <a href="mailto:growth@mindhub.club?subject=Suggest%20a%20New%20Club">
              {t('events.suggest')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}