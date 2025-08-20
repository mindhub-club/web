import { Clock, Home, FileText, Network } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useI18n } from "../i18n/I18nProvider";

export function BenefitsSection() {
  const { t } = useI18n();
  const benefits = [
    {
      icon: Home,
      titleKey: 'benefits.items.dedicatedSpaces.title',
      descriptionKey: 'benefits.items.dedicatedSpaces.description'
    },
    {
      icon: Clock,
      titleKey: 'benefits.items.structuredTime.title',
      descriptionKey: 'benefits.items.structuredTime.description'
    },
    {
      icon: FileText,
      titleKey: 'benefits.items.framework.title',
      descriptionKey: 'benefits.items.framework.description'
    },
    {
      icon: Network,
      titleKey: 'benefits.items.network.title',
      descriptionKey: 'benefits.items.network.description'
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-6 mb-12">
              <h2 className="text-3xl lg:text-5xl">{t('benefits.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('benefits.subtitle')}
              </p>
            </div>
            
            <div className="grid gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">{t(benefit.titleKey as string)}</h3>
                    <p className="text-muted-foreground">{t(benefit.descriptionKey as string)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative order-first lg:order-none">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=500&fit=crop"
              alt="Modern collaborative workspace"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}