import { siteOrigin, allowIndexing } from '@/lib/site-config';
import { projects } from '@/lib/film-content';
export function GET() {
  const paths = [
    '/',
    '/video',
    '/projects',
    ...projects.map((p) => `/projects/${p.slug}`),
    '/process',
    '/about',
    '/contact',
  ];
  const escapeXml = (value: string) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('"', '&quot;');
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    (siteOrigin
      ? paths
          .map(
            (path) => `<url><loc>${escapeXml(siteOrigin + path)}</loc></url>`,
          )
          .join('')
      : '') +
    '</urlset>';
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      ...(allowIndexing ? {} : { 'X-Robots-Tag': 'noindex, nofollow' }),
    },
  });
}

export const dynamic = 'force-static';
