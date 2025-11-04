import { Button } from "./ui/button";
import { useI18n } from "../i18n/I18nProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const currentLabel =
    locale === 'en' ? t('header.lang.en') :
    locale === 'es' ? t('header.lang.es') :
    locale === 'de' ? t('header.lang.de') :
    t('header.lang.ca');

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="min-w-[64px] justify-between">
          {currentLabel}
          <span className="ml-1">▾</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale('en')} disabled={locale === 'en'}>
          {t('header.lang.en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('es')} disabled={locale === 'es'}>
          {t('header.lang.es')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('ca')} disabled={locale === 'ca'}>
          {t('header.lang.ca')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('de')} disabled={locale === 'de'}>
          {t('header.lang.de')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
