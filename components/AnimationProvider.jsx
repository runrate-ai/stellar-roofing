'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnimationProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('before-animate');
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px', threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom >= 0;
      if (inViewport) {
        // Already visible — no animation needed
        el.classList.add('animate-in');
      } else {
        // Off-screen — hide it and animate it in on scroll
        el.classList.add('before-animate');
        observer.observe(el);
      }
    });

    return () => {
      elements.forEach((el) => el.classList.remove('before-animate', 'animate-in'));
      observer.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
