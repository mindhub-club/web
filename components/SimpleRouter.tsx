import { useState, useEffect, type ReactNode } from 'react';
import { PrivacyPage } from './PrivacyPage';
import { TermsPage } from './TermsPage';

interface RouterProps {
  children: ReactNode;
}

export function SimpleRouter({ children }: RouterProps) {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [localePrefix, setLocalePrefix] = useState<string>('');

  useEffect(() => {
    const path = window.location.pathname;
    const isEs = path === '/es' || path.startsWith('/es/');
    const isDe = path === '/de' || path.startsWith('/de/');
    setLocalePrefix(isEs ? '/es' : isDe ? '/de' : '');
    const localPath = isEs ? path.slice(3) || '/' : isDe ? path.slice(3) || '/' : path;
    if (localPath === '/privacy') {
      setCurrentPage('privacy');
    } else if (localPath === '/terms') {
      setCurrentPage('terms');
    } else {
      setCurrentPage('home');
    }
  }, []);

  const navigate = (path: string) => {
    const full = `${localePrefix}${path === '/' ? '' : path}` || '/';
    window.history.pushState({}, '', full);
    if (path === '/privacy') {
      setCurrentPage('privacy');
    } else if (path === '/terms') {
      setCurrentPage('terms');
    } else {
      setCurrentPage('home');
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const isEs = path === '/es' || path.startsWith('/es/');
      const isDe = path === '/de' || path.startsWith('/de/');
      setLocalePrefix(isEs ? '/es' : isDe ? '/de' : '');
      const localPath = isEs ? path.slice(3) || '/' : isDe ? path.slice(3) || '/' : path;
      if (localPath === '/privacy') {
        setCurrentPage('privacy');
      } else if (localPath === '/terms') {
        setCurrentPage('terms');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPage === 'privacy') {
    return <PrivacyPage />;
  }

  if (currentPage === 'terms') {
    return <TermsPage />;
  }

  return <>{children}</>;
}

// Export the navigate function for use in other components
export const navigate = (path: string) => {
  const current = window.location.pathname;
  const isEs = current === '/es' || current.startsWith('/es/');
  const prefix = isEs ? '/es' : '';
  const full = `${prefix}${path === '/' ? '' : path}` || '/';
  window.history.pushState({}, '', full);
  window.dispatchEvent(new PopStateEvent('popstate'));
};
