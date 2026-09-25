// Only the photographic regions of the supplied reference are shown.
// Text, navigation, labels and controls are rendered as real HTML outside these crops.
const regions: Record<string, [number, number, number, number]> = {
  hero: [437, 44, 602, 285],
  branding: [34, 403, 196, 128],
  video: [242, 403, 192, 128],
  website: [449, 403, 192, 128],
  catalog: [653, 403, 192, 128],
  editorial: [858, 403, 193, 128],
  'work-branding': [34, 823, 333, 134],
  // The reference's play-button overlay is excluded: there is no playable video yet.
  'work-video': [243, 404, 190, 126],
  'work-website': [720, 824, 333, 131],
  'work-catalog': [34, 987, 505, 96],
  'work-editorial': [551, 987, 501, 96],
  about: [383, 1126, 456, 114],
  contact: [365, 1265, 512, 94],
};
export function MockupPhoto({kind,alt,className=''}:{kind:string;alt:string;className?:string}) {
  const region=regions[kind]??regions.hero;
  return <svg className={'reference-photo '+className} role="img" aria-label={alt} viewBox={region.join(' ')} preserveAspectRatio="xMidYMid slice"><image href="/images/mockup-v4.png" width="1086" height="1448"/></svg>;
}
