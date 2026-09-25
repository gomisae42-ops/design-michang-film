export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || null;
export const allowIndexing =
  process.env.SITE_INDEXABLE === 'true' && Boolean(siteOrigin);
// Optional approved organization fields can be added here before production launch.
export const organizationSchema = siteOrigin
  ? {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '디자인미창',
      url: siteOrigin,
      description: '공공기관·기업 영상제작 및 디자인·콘텐츠 제작',
    }
  : null;
