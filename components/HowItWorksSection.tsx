import { Users, RotateCcw, Calendar, MapPin } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

export function HowItWorksSection() {
  const { t } = useI18n();
  const steps = [
    {
      icon: Users,
      title: t('how.steps.smallGroups.title'),
      description: t('how.steps.smallGroups.desc')
    },
    {
      icon: RotateCcw,
      title: t('how.steps.rotativeLearning.title'),
      description: t('how.steps.rotativeLearning.desc')
    },
    {
      icon: Calendar,
      title: t('how.steps.framework.title'),
      description: t('how.steps.framework.desc')
    },
    {
      icon: MapPin,
      title: t('how.steps.physicalSpaces.title'),
      description: t('how.steps.physicalSpaces.desc')
    }
  ];

  return (
    <section id="framework" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl">{t('how.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('how.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}