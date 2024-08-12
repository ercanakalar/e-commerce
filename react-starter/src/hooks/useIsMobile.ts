import { useEffect, useState, useCallback } from 'react';

const useIsMobile = (mobileScreenSize = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window === 'undefined'
      ? false
      : window?.matchMedia?.(`(max-width: ${mobileScreenSize}px)`)?.matches
  );

  const checkIsMobile = useCallback((event: any) => {
    setIsMobile(event.matches);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaListener = window?.matchMedia(
      `(max-width: ${mobileScreenSize}px)`
    );
    // try catch used to fallback for browser compatibility
    try {
      mediaListener.addEventListener('change', checkIsMobile);
    } catch {
      mediaListener.addListener(checkIsMobile);
    }
    return () => {
      try {
        mediaListener.removeEventListener('change', checkIsMobile);
      } catch {
        mediaListener.removeListener(checkIsMobile);
      }
    };
  }, [checkIsMobile, mobileScreenSize]);

  if (
    typeof window !== 'undefined' &&
    typeof window?.matchMedia !== 'function'
  ) {
    return null;
  }

  return isMobile;
};

export default useIsMobile;
