import type { MetadataRoute } from 'next';
import { siteOrigin, allowIndexing } from '@/lib/site-config';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(allowIndexing ? { allow: '/' } : { disallow: '/' }),
    },
    ...(siteOrigin ? { sitemap: `${siteOrigin}/sitemap.xml` } : {}),
  };
}

export const dynamic = 'force-static';
