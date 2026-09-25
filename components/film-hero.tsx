'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Pause, Play } from 'lucide-react';
// Only approved actual project media is accepted. Empty media renders a typographic Hero.
export function FilmHero({
  poster = '',
  mobilePoster,
  video = '',
  mobileVideo,
}: {
  poster?: string;
  mobilePoster?: string;
  video?: string;
  mobileVideo?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);
  const [source, setSource] = useState('');
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 767px)');
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () => {
      if (reduced.matches || connection?.saveData) {
        setSource('');
        return;
      }
      setSource(mobile.matches ? mobileVideo || video : video);
    };
    update();
    reduced.addEventListener('change', update);
    mobile.addEventListener('change', update);
    return () => {
      reduced.removeEventListener('change', update);
      mobile.removeEventListener('change', update);
    };
  }, [video, mobileVideo]);
  useEffect(() => {
    const element = ref.current;
    if (!element || !source || failed) return;
    let visible = true;
    const sync = () => {
      if (!visible || document.hidden || manualPause.current) element.pause();
      else void element.play().catch(() => setFailed(true));
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [source, failed]);
  return (
    <section
      className={`film-hero ${poster ? 'has-media' : 'is-typographic'}`}
      id="hero"
    >
      {poster && (
        <div className="film-hero-media">
          <picture>
            {mobilePoster && (
              <source media="(max-width: 767px)" srcSet={mobilePoster} />
            )}
            <img
              src={poster}
              alt="군포 소공인 다큐멘터리의 실제 작업 현장"
              fetchPriority="high"
            />
          </picture>
          {source && !failed && (
            <video
              ref={ref}
              src={source}
              muted
              loop
              playsInline
              autoPlay
              poster={poster}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setFailed(true)}
              aria-hidden="true"
            />
          )}
          {source && !failed && (
            <button
              className="film-media-toggle"
              aria-label={playing ? '배경 영상 일시정지' : '배경 영상 재생'}
              onClick={() => {
                const element = ref.current;
                if (!element) return;
                manualPause.current = !element.paused;
                if (manualPause.current) element.pause();
                else void element.play().catch(() => setFailed(true));
              }}
            >
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
          )}
        </div>
      )}
      <div className="film-wrap film-hero-copy">
        <p className="film-kicker">공공기관과 기업을 위한 영상제작</p>
        <h1>
          사람과 사업의 가치를
          <br />
          <span>오래 남는 이야기로</span>
          <br className="mobile-break" /> 만듭니다.
        </h1>
        <div className="film-hero-bottom">
          <p className="hero-sub-desktop">
            공공기관과 기업의 사업을 이해하고
            <br />
            기획부터 촬영·편집·디자인까지 완성합니다.
          </p>
          <p className="hero-sub-mobile">
            공공기관·기업 영상,
            <br />
            기획부터 촬영·편집·디자인까지.
          </p>
          <div className="film-hero-actions">
            <a href="#selected-project" className="film-button">
              대표 프로젝트 보기 <ArrowDown size={18} aria-hidden="true" />
            </a>
            <Link href="/contact/?source=home-hero" className="film-text-link">
              영상 제작 상담 <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
