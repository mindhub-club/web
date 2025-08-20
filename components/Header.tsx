import { Button } from "./ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "../i18n/I18nProvider";

export function Header() {
  const { t } = useI18n();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-sm">MH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg leading-tight">{t('header.brand')}</span>
              <span className="text-xs text-muted-foreground font-mono">{t('header.handle')}</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('header.nav.howItWorks')}
            </a>
            <a href="#topics" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('header.nav.clubs')}
            </a>
            <a href="#locations" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('header.nav.locations')}
            </a>
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('header.nav.benefits')}
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            <a 
              href="https://meetup.com/mindhub-club/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button>
                {t('header.joinClub')}
              </Button>
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}