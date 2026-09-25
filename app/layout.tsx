import type { Metadata } from 'next';
import { FilmHeader, FilmFooter } from '@/components/film-shell';
import { RouteReset } from '@/components/film-interactions';
import {
  siteOrigin,
  allowIndexing,
  organizationSchema,
} from '@/lib/site-config';
import './globals.css';
import './film.css';
import './color-reveal.css';
import ColorReveal from '@/components/color-reveal';

export const metadata: Metadata = {
  title: { default: '디자인미창', template: '%s | 디자인미창' },
  icons: { icon: '/favicon.svg' },
  description: '공공기관과 기업을 위한 다큐멘터리·홍보영상·사업성과 영상 제작',
  ...(siteOrigin ? { metadataBase: new URL(siteOrigin) } : {}),
  robots: { index: allowIndexing, follow: allowIndexing },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {organizationSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema).replace(
                /</g,
                '\\u003c',
              ),
            }}
          />
        )}
        <a href="#main" className="skip">
          본문 바로가기
        </a>
        <FilmHeader />
        <RouteReset />
        <ColorReveal />
        <main id="main">{children}</main>
        <FilmFooter />
      </body>
    </html>
  );
}
