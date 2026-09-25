'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, Menu, X } from 'lucide-react';
import { company } from '@/lib/content';
const navigation = [
  ['/', '홈'],
  ['/video/', '영상제작'],
  ['/projects/', '프로젝트'],
  ['/process/', '제작과정'],
  ['/about/', '디자인미창'],
  ['/contact/', '제작문의'],
];
function Brand({ quiet = false }: { quiet?: boolean }) {
  return (
    <>
      <svg className="film-brand-mark" viewBox="0 0 40 46" aria-hidden="true">
        <path d="M20 2 35 16v24L20 45 5 37V18Z" fill="currentColor" />
        <path d="m18 15 11 7v16l-11 4L8 35V23Z" fill="#f7f6f2" />
        <path d="m18 11 5 5-6 3-5-3Z" fill="#f7f6f2" />
      </svg>
      <span className="film-brand-name">
        디자인미창{!quiet && <small>사람과 사업의 이야기를 만듭니다.</small>}
      </span>
    </>
  );
}
export function FilmHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const size = matchMedia('(min-width: 1024px)');
    const reset = () => {
      if (size.matches) setOpen(false);
    };
    size.addEventListener('change', reset);
    return () => size.removeEventListener('change', reset);
  }, []);
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => {
      if (header.current && !header.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  return (
    <>
      <header
        ref={header}
        className={
          path === '/' ? 'film-header film-header-quiet' : 'film-header'
        }
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        <div className="film-wrap film-header-inner">
          <Link
            href="/"
            className="film-logo"
            onClick={() => setOpen(false)}
            aria-label="디자인미창 홈"
          >
            <Brand quiet={path === '/'} />
          </Link>
          <nav
            id="film-navigation"
            aria-label="주 메뉴"
            className={open ? 'film-nav is-open' : 'film-nav'}
          >
            {navigation
              .filter(([href]) => path !== '/' || href !== '/')
              .map(([href, label]) => (
                <Link
                  key={href}
                  href={href === '/contact/' ? '/contact/?source=header' : href}
                  className={href === '/contact/' ? 'film-nav-cta' : ''}
                  aria-current={
                    (
                      href === '/'
                        ? path === '/'
                        : path.startsWith(href.replace(/\/$/, ''))
                    )
                      ? 'page'
                      : undefined
                  }
                  onClick={() => setOpen(false)}
                >
                  {label}
                  {href === '/contact/' && (
                    <ArrowRight size={16} aria-hidden="true" />
                  )}
                </Link>
              ))}
          </nav>
          <button
            ref={toggle}
            className="film-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="film-navigation"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <MobileConsult hidden={open} path={path} />
    </>
  );
}
function MobileConsult({ hidden, path }: { hidden: boolean; path: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let bottomVisible = false;
    const sync = () => setVisible(window.scrollY > 400 && !bottomVisible);
    const end =
      document.querySelector('#inquiry') ||
      document.querySelector('.film-footer');
    const observer = new IntersectionObserver((entries) => {
      bottomVisible = entries.some((e) => e.isIntersecting);
      sync();
    });
    if (end) observer.observe(end);
    window.addEventListener('scroll', sync, { passive: true });
    sync();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', sync);
    };
  }, [path]);
  if (hidden || !visible || path.startsWith('/contact')) return null;
  return (
    <Link className="mobile-consult" href="/contact/?source=mobile-sticky">
      프로젝트 상담 <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function FilmFooter() {
  return (
    <footer className="film-footer">
      <div className="film-wrap">
        <div className="film-footer-top">
          <Link className="film-logo" href="/" aria-label="디자인미창 홈">
            <Brand />
          </Link>
          <div className="film-footer-details">
            <a href={company.tel}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          <a className="film-top-link" href="#main" aria-label="본문 처음으로">
            <ArrowUp size={22} />
          </a>
        </div>
        <div className="film-footer-bottom">
          <p>© {new Date().getFullYear()} 디자인미창</p>
          <Link href="/contact/#privacy">문의 작성·개인정보 안내</Link>
        </div>
      </div>
    </footer>
  );
}
