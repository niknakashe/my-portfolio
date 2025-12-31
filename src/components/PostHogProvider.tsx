import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from '@/lib/posthog';

export const PostHogProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    posthog.capture('$pageview');
  }, [location]);

  return <>{children}</>;
};
