'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Pause, Play } from 'lucide-react';

const base = '/media/home-gunpo/';
// 24 fps edit: 42 + 60 + 54 + 72 frames = 9.5 seconds.
const sceneStarts = [0, 1.75, 4.25, 6.5];
const lines = [
  '보이지 않는 기술이 있습니다.',
  '그 기술을 지켜온 사람들이 있습니다.',
  '그들의 손끝에서',
  '우리의 하루가 시작됩니다.',
];

export default function SignatureOpening() {
  const section = useRef<HTMLElement>(null);
  const cancelCopyLoop = useRef<() => void>(() => {});
  const film = useRef<HTMLVideoElement>(null);
  const hasOpened = useRef(false);
  const [opened, setOpened] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [still, setStill] = useState(true);
  const [reduce, setReduce] = useState(false);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const variant = mobile ? 'mobile' : 'desktop';

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const width = matchMedia('(max-width: 767px)');
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const sync = () => {
      setMobile(width.matches);
      setReduce(motion.matches);
      setStill(
        motion.matches ||
          !!connection?.saveData ||
          /(^|-)2g$/.test(connection?.effectiveType || ''),
      );
      if (motion.matches) {
        cancelCopyLoop.current();
        setLineIndex(3);
      }
    };
    sync();
    setReady(true);
    const open = () => {
      if (hasOpened.current) return;
      hasOpened.current = true;
      cancelCopyLoop.current();
      // Input skips immediately to the human/workshop scene; no copy timer gates navigation.
      if (film.current && film.current.readyState >= 1) {
        film.current.currentTime = sceneStarts[3];
      }
      setLineIndex(3);
      setOpened(true);
    };
    const scroll = () => {
      if (window.scrollY > 0) open();
    };
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('wheel', open, { passive: true, once: true });
    window.addEventListener('touchmove', open, { passive: true, once: true });
    window.addEventListener('touchstart', open, { passive: true, once: true });
    window.addEventListener('keydown', open, { once: true });
    width.addEventListener('change', sync);
    motion.addEventListener('change', sync);
    scroll();
    return () => {
      cancelCopyLoop.current();
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('wheel', open);
      window.removeEventListener('touchmove', open);
      window.removeEventListener('touchstart', open);
      window.removeEventListener('keydown', open);
      width.removeEventListener('change', sync);
      motion.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    const video = film.current;
    if (!video || !ready || still || reduce) return;
    let cancelled = false;
    let frame: number | undefined;
    const syncCopy = () => {
      if (cancelled) return;
      const time = video.currentTime;
      const index =
        time < sceneStarts[1]
          ? 0
          : time < sceneStarts[2]
            ? 1
            : time < sceneStarts[3]
              ? 2
              : 3;
      setLineIndex(index);
    };
    const tick = () => {
      syncCopy();
      if (!cancelled && !video.paused && !video.ended && visible) {
        frame = video.requestVideoFrameCallback(tick);
      }
    };
    const start = () => {
      if (frame !== undefined) video.cancelVideoFrameCallback(frame);
      syncCopy();
      if ('requestVideoFrameCallback' in video)
        frame = video.requestVideoFrameCallback(tick);
    };
    const cancel = () => {
      cancelled = true;
      if (frame !== undefined) video.cancelVideoFrameCallback(frame);
    };
    cancelCopyLoop.current = cancel;
    video.addEventListener('timeupdate', syncCopy);
    video.addEventListener('seeking', syncCopy);
    video.addEventListener('playing', start);
    start();
    return () => {
      cancel();
      video.removeEventListener('timeupdate', syncCopy);
      video.removeEventListener('seeking', syncCopy);
      video.removeEventListener('playing', start);
    };
  }, [ready, still, reduce, variant, opened, visible]);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    const visibility = () =>
      setVisible(
        document.visibilityState === 'visible' &&
          el.getBoundingClientRect().bottom > 0,
      );
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const current = film.current;
    if (!current || still || paused || !visible || failed) {
      current?.pause();
      setPlaying(false);
      return;
    }
    current
      .play()
      .then(() => {
        if (!cancelled) setPlaying(true);
      })
      .catch(() => {
        if (!cancelled) setPlaying(false);
      });
    return () => {
      cancelled = true;
      current.pause();
    };
  }, [still, paused, visible, failed, variant, ready]);

  return (
    <section
      ref={section}
      className={`signature-opening signature-gallery ${opened ? 'is-open' : ''} ${ready && !reduce ? 'is-animated' : ''}`}
      aria-label="군포 소공인 다큐멘터리 시그니처 오프닝"
    >
      <div className="signature-stage">
        <div className="signature-frame">
          <div className="signature-scene is-active">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={`${base}hero-film-poster-mobile.webp`}
              />
              <img
                src={`${base}hero-film-poster-desktop.webp`}
                alt="군포 소공인의 작업대 위 정밀 공구와 금속 질감"
                width="1440"
                height="810"
                fetchPriority="high"
              />
            </picture>
            {!still && ready && (
              <video
                ref={film}
                key={variant}
                src={`${base}hero-film-${variant}.mp4`}
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
                className={loaded && !failed ? 'is-loaded' : ''}
                onLoadStart={() => {
                  setLoaded(false);
                  setFailed(false);
                }}
                onLoadedData={() => setLoaded(true)}
                onPlaying={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onError={() => {
                  setFailed(true);
                  setPlaying(false);
                }}
              />
            )}
          </div>
          <div className="signature-shade" />
        </div>
        <div className="signature-content">
          <h1 aria-label={lines.join(' ')}>
            {lines.map((line, i) => (
              <span
                key={line}
                className={`signature-line signature-line-${i + 1} ${lineIndex === i ? 'is-current' : ''}`}
                aria-hidden={reduce ? undefined : lineIndex !== i}
              >
                {line}
              </span>
            ))}
          </h1>
        </div>
        <div className="signature-actions">
          <Link href="#selected-project" className="signature-primary">
            대표 프로젝트 보기 <ArrowDown size={17} aria-hidden="true" />
          </Link>
          <Link href="/contact/" className="signature-secondary">
            프로젝트 상담하기 <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="signature-caption">
          <span>군포 소공인 다큐멘터리</span>
          <span>군포산업진흥원 소공인지원센터 · 2026</span>
        </div>
        {ready && !still && !failed && (
          <button
            type="button"
            className="signature-play"
            onClick={() => {
              setPaused(playing);
              if (!playing) {
                setPaused(false);
                const v = film.current;
                void v
                  ?.play()
                  .then(() => setPlaying(true))
                  .catch(() => setPlaying(false));
              }
            }}
            aria-label={playing ? '배경 영상 일시정지' : '배경 영상 재생'}
          >
            {playing ? (
              <Pause size={17} aria-hidden="true" />
            ) : (
              <Play size={17} aria-hidden="true" />
            )}
            <span>{playing ? '일시정지' : '재생'}</span>
          </button>
        )}
      </div>
    </section>
  );
}
