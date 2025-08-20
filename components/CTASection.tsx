import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight, Mail, Plus } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

export function CTASection() {
  const { t } = useI18n();
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-5xl">{t('cta.heading')}</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('cta.subheading')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70" />
                <Input 
                  type="email" 
                  placeholder={t('cta.emailPlaceholder')}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                />
              </div>
              <Button variant="secondary" size="lg" className="px-6">
                {t('cta.join')} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-sm opacity-70">
              {t('cta.existing')}
            </p>
          </div>

          <div className="space-y-3">
            <a href="mailto:growth@mindhub.club?subject=Suggest%20a%20New%20Club">
            <Button variant="outline" size="lg" className="w-full border-white/30 text-white hover:bg-white/10">

              <Plus className="w-4 h-4 mr-2" />
              {t('cta.start')}
            </Button>
              </a>
            <p className="text-sm opacity-70">
              {t('cta.bring')} {" "}
              <span className="font-mono bg-white/10 px-1 rounded">growth@mindhub.club</span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => {
                document.getElementById('clubs')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}>
            {t('cta.browse')}
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => {
                document.getElementById('framework')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}>
            {t('cta.learn')}
          </Button>
        </div>
      </div>
    </section>
  );
}