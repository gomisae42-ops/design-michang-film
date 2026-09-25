'use client';

import { useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove('reveal-pending');
            observer.unobserve(el);
          }
        }),
      { threshold: 0.08 },
    );
    el.classList.add('reveal-pending');
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.classList.remove('reveal-pending');
    };
  }, []);
  return (
    <div className={`film-reveal ${className}`} ref={ref}>
      {children}
    </div>
  );
}

export function RouteReset() {
  const path = usePathname();
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
    const restoreCaseAnchor = () => {
      if (!path.startsWith('/projects/')) return;
      const hash = location.hash.slice(1);
      const legacy = /^case-(\d+)$/.exec(hash);
      if (legacy) {
        const target =
          Number(legacy[1]) === 14 ? 'project-inquiry' : 'overview';
        document.getElementById(target)?.scrollIntoView();
      } else if (hash && !document.getElementById(hash)) {
        document.getElementById('overview')?.scrollIntoView();
      }
    };
    restoreCaseAnchor();
    window.addEventListener('hashchange', restoreCaseAnchor);
    return () => window.removeEventListener('hashchange', restoreCaseAnchor);
  }, [path]);
  return null;
}

export function VideoPlayer({
  src = '',
  poster,
  captions,
  label = '대표영상 보기',
  round = false,
}: {
  src?: string;
  poster?: string;
  captions?: string;
  label?: string;
  round?: boolean;
}) {
  if (!src) return null;
  return (
    <Dialog>
      <DialogTrigger
        className={round ? 'film-play-round' : 'button film-play'}
        aria-label={label}
      >
        <Play size={round ? 26 : 17} fill="currentColor" aria-hidden="true" />
        {!round && label}
      </DialogTrigger>
      <DialogContent className="film-video-dialog" showCloseButton={false}>
        <DialogClose className="film-dialog-close" aria-label="영상 닫기">
          <X size={24} />
        </DialogClose>
        <DialogTitle className="film-dialog-title">{label}</DialogTitle>
        <DialogDescription>
          {src
            ? '재생 버튼을 눌러 영상을 감상해 주세요.'
            : '대표영상 공개 준비 중입니다. 공개 가능한 영상이 등록되면 이곳에서 감상하실 수 있습니다.'}
        </DialogDescription>
        {src ? (
          <video controls playsInline preload="metadata" poster={poster}>
            <source src={src} />
            {captions && (
              <track
                default
                kind="captions"
                src={captions}
                srcLang="ko"
                label="한국어"
              />
            )}
            브라우저가 영상 재생을 지원하지 않습니다.
          </video>
        ) : (
          <div className="film-video-empty">
            <Play size={42} strokeWidth={1} />
            <p>
              이야기를 담은 영상으로
              <br />곧 만나겠습니다.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
