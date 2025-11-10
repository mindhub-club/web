import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight, Mail, Plus } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

export function CTASection() {
  const { t } = useI18n();
  return (
    <section className="py-16 bg-primary text-primary-foreground">
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
              <Button variant="secondary" size="lg" className="w-full" onClick={() => {
                document.getElementById('locations')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}>

{t('cta.join')} <ArrowRight className="w-4 h-4 ml-2" />
</Button>
                    </div>
            </div>
            <p className="text-sm opacity-70">
              {t('cta.existing')}
            </p>
          </div>

          <div className="space-y-3">
            <a href="mailto:growth@mindhub.club?subject=Suggest%20a%20New%20Club">
            <Button variant="outline" size="lg" className="w-full text-white hover:bg-white/10">

              <Plus className="w-4 h-4 mr-2" />
              {t('cta.start')}
            </Button>
              </a>
            <p className="text-sm opacity-70">
              {t('cta.bring')} {" "}
              <span className="font-mono px-1 rounded">growth@mindhub.club</span>
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
