import { useState, useEffect } from 'react';
import { PrivacyPage } from './PrivacyPage';
import { TermsPage } from './TermsPage';

interface RouterProps {
  children: React.ReactNode;
}

export function SimpleRouter({ children }: RouterProps) {
  const [currentPage, setCurrentPage] = useState<string>('home');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/privacy') {
      setCurrentPage('privacy');
    } else if (path === '/terms') {
      setCurrentPage('terms');
    } else {
      setCurrentPage('home');
    }
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
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
      if (path === '/privacy') {
        setCurrentPage('privacy');
      } else if (path === '/terms') {
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
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};
