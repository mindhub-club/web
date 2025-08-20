import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './locales/en';
import es from './locales/es';

type LocaleKey = 'en' | 'es';

type Messages = typeof en;

type I18nContextValue = {
  locale: LocaleKey;
  messages: Messages;
  t: (key: string) => string;
  setLocale: (locale: LocaleKey) => void;
  get: <T = any>(key: string) => T | undefined;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const allMessages: Record<LocaleKey, Messages> = { en, es };

function detectLocaleFromPathname(pathname: string): LocaleKey {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
}

function buildPathForLocale(pathname: string, locale: LocaleKey): string {
  // Remove existing /es prefix if present
  const withoutLocale = pathname === '/es'
    ? '/'
    : pathname.startsWith('/es/')
      ? pathname.slice(3) || '/'
      : pathname || '/';
  if (locale === 'es') {
    return withoutLocale === '/' ? '/es' : `/es${withoutLocale}`;
  }
  return withoutLocale;
}

function getByPath(obj: Record<string, any>, path: string): string | undefined {
  return path.split('.').reduce<any>((acc, part) => (acc ? acc[part] : undefined), obj) as string | undefined;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleKey>(() => detectLocaleFromPathname(window.location.pathname));

  // Keep locale in sync with URL changes (back/forward, programmatic)
  useEffect(() => {
    const onPop = () => {
      setLocaleState(detectLocaleFromPathname(window.location.pathname));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const messages = useMemo(() => allMessages[locale], [locale]);

  const t = useCallback((key: string) => {
    const value = getByPath(messages as unknown as Record<string, any>, key);
    return typeof value === 'string' ? value : key;
  }, [messages]);

  const setLocale = useCallback((next: LocaleKey) => {
    if (next === locale) return;
    const newPath = buildPathForLocale(window.location.pathname, next);
    window.history.pushState({}, '', newPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, [locale]);

  const get = useCallback(<T = any,>(key: string) => {
    return getByPath(messages as unknown as Record<string, any>, key) as T | undefined;
  }, [messages]);

  const value = useMemo<I18nContextValue>(() => ({ locale, messages, t, setLocale, get }), [locale, messages, t, setLocale, get]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
