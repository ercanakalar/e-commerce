import { useEffect, useState } from 'react';

import { Props } from '../type/hooks/useScroll-type';

const useScroll = (): Props => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      setScrollY(scrollY);
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction as any);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return {
    direction: scrollDirection as any,
    distance: scrollY ?? 0,
  };
};

export { useScroll };
