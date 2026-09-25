'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** One reveal owner across the page, including mixed pointer/keyboard input. */
export default function ColorReveal() {
  const path = usePathname();
  useEffect(() => {
    const coarse = matchMedia(
      '(hover: none), (pointer: coarse), (max-width: 767px)',
    );
    let active: HTMLElement | null = null;
    const seen = new Set<Element>();
    const select = (next: HTMLElement | null) => {
      if (active === next) return;
      active?.removeAttribute('data-reveal-active');
      active = next;
      active?.setAttribute('data-reveal-active', 'true');
    };
    const target = (node: EventTarget | null) =>
      node instanceof Element
        ? node.closest<HTMLElement>('[data-color-reveal]')
        : null;
    const enter = (event: PointerEvent) => {
      if (!coarse.matches && event.pointerType !== 'touch')
        select(target(event.target));
    };
    const leave = (event: PointerEvent) => {
      if (
        !coarse.matches &&
        target(event.target) === active &&
        target(event.relatedTarget) !== active
      )
        select(null);
    };
    const focus = (event: FocusEvent) => select(target(event.target));
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') select(null);
      else if (target(event.target)) select(target(event.target));
    };
    const blur = (event: FocusEvent) => {
      if (target(event.relatedTarget) !== active) select(null);
    };
    const tap = (event: PointerEvent) => {
      if (coarse.matches || event.pointerType === 'touch')
        select(target(event.target));
    };
    const scroll = () => {
      if (!active) return;
      const rect = active.getBoundingClientRect();
      if (rect.bottom < 80 || rect.top > innerHeight) select(null);
    };
    // Only one nominated element per section, once per route visit. No rainbow
    // sweep through every row while scrolling; taps can still select any row.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!coarse.matches) return;
        const entry = entries
          .filter((e) => e.isIntersecting && !seen.has(e.target))
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - innerHeight / 2) -
              Math.abs(b.boundingClientRect.top - innerHeight / 2),
          )[0];
        if (entry) {
          seen.add(entry.target);
          select(entry.target as HTMLElement);
        }
      },
      { rootMargin: '-40% 0px -40% 0px' },
    );
    document
      .querySelectorAll('[data-reveal-mobile]')
      .forEach((el) => observer.observe(el));
    const reset = () => select(null);
    document.addEventListener('pointerover', enter);
    document.addEventListener('pointerout', leave);
    document.addEventListener('pointerdown', tap, { passive: true });
    document.addEventListener('focusin', focus);
    document.addEventListener('focusout', blur);
    document.addEventListener('keydown', key);
    select(target(document.activeElement));
    window.addEventListener('scroll', scroll, { passive: true });
    coarse.addEventListener('change', reset);
    return () => {
      observer.disconnect();
      reset();
      document.removeEventListener('pointerover', enter);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('pointerdown', tap);
      document.removeEventListener('focusin', focus);
      document.removeEventListener('focusout', blur);
      document.removeEventListener('keydown', key);
      window.removeEventListener('scroll', scroll);
      coarse.removeEventListener('change', reset);
    };
  }, [path]);
  return null;
}
