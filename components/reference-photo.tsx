// Only photo rectangles are rendered from the supplied mockup; all UI is HTML.
const regions: Record<string, [number, number, number, number]> = {
  documentary: [232, 744, 137, 84],
  industrial: [383, 744, 137, 84],
  meeting: [534, 744, 137, 84],
  interview: [686, 744, 137, 84],
  camera: [839, 744, 138, 84],
  planning: [329, 927, 113, 70],
  storyboard: [464, 927, 113, 70],
  shooting: [598, 927, 113, 70],
  editing: [733, 927, 113, 70],
  delivery: [867, 927, 111, 70],
  cta: [375, 1335, 425, 110],
};
const aliases: Record<string, string> = {
  video: 'documentary',
  website: 'industrial',
  editorial: 'meeting',
  about: 'interview',
  'work-video': 'camera',
  catalog: 'storyboard',
  hero: 'editing',
};
export function ReferencePhoto({
  kind,
  alt,
  className = '',
}: {
  kind: string;
  alt: string;
  className?: string;
}) {
  const rect = regions[aliases[kind] || kind] || regions.camera;
  return (
    <svg
      className={`reference-photo ${className}`}
      role="img"
      aria-label={alt}
      viewBox={rect.join(' ')}
      preserveAspectRatio="xMidYMid slice"
    >
      <image href="/images/reference/bright.png" width="1024" height="1536" />
    </svg>
  );
}
