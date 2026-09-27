'use client';

import { useEffect, useRef } from 'react';

export default function BrandArchive() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      section.classList.add('brand-archive-visible');
      return;
    }

    section.classList.add('brand-archive-motion');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        section.classList.add('brand-archive-visible');
        observer.unobserve(section);
      },
      { threshold: 0.18 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="about-archive brand-archive"
      aria-labelledby="archive-title"
    >
      <div className="film-wrap brand-archive-inner">
        <p className="brand-archive-kicker">SINCE 1997</p>
        <h2 id="archive-title">
          <span className="brand-archive-line brand-archive-line-one">
            <strong>한 장</strong>을 완성해 온 시간,
          </span>
          <span className="brand-archive-line brand-archive-line-two">
            이제 <strong>한 편</strong>의 이야기를 만듭니다.
          </span>
        </h2>
        <p className="brand-archive-description">
          기획·디자인·인쇄·출판에서 영상까지.
          <br />
          매체는 달라도, 사업의 목적을 이해하고 정확하게 완성하는 태도는
          변하지 않았습니다.
        </p>
        <span className="brand-archive-watermark" aria-hidden="true">
          1997
        </span>
      </div>
    </section>
  );
}
