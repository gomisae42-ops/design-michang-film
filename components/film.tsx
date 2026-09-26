import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { photoAssets, projects } from '@/lib/film-content';
export function FilmPhoto({
  kind = 'video',
  src,
  alt,
  className = '',
}: {
  kind?: string;
  src?: string;
  alt: string;
  className?: string;
}) {
  const source = src || photoAssets[kind]?.src;
  if (!source) return null;
  return (
    <div className={`film-photo ${className}`}>
      <Image
        src={source}
        alt={photoAssets[kind]?.alt || alt}
        fill
        sizes="(max-width: 767px) 100vw, 65vw"
      />
    </div>
  );
}
export function FilmHeading({
  label,
  title,
  desc,
}: {
  label: string;
  title: React.ReactNode;
  desc?: string;
}) {
  return (
    <div className="film-heading">
      <p className="film-kicker">{label}</p>
      <h2>{title}</h2>
      {desc && <p className="film-desc">{desc}</p>}
    </div>
  );
}
export function FilmIntro({
  label,
  title,
  desc,
}: {
  label: string;
  title: React.ReactNode;
  desc: string;
}) {
  return (
    <section className="film-intro">
      <div className="film-wrap film-intro-inner">
        <p className="film-kicker">{label}</p>
        <h1>{title}</h1>
        <p className="film-desc">{desc}</p>
      </div>
    </section>
  );
}
export function FinalCTA({
  title = '영상 프로젝트를 준비하고 계신가요?',
  source = 'home-final',
  service,
  project,
}: {
  title?: string;
  source?: string;
  service?: string;
  project?: string;
}) {
  const query = new URLSearchParams({
    source,
    ...(service ? { service } : {}),
    ...(project ? { project } : {}),
  });
  const titleLines = title.split('\n');
  return (
    <section className="film-final" id="inquiry">
      <div className="film-wrap film-final-inner">
        <div>
          <p className="film-kicker">함께 시작할 이야기</p>
          <h2>
            {titleLines.map((line, index) => (
              <span
                key={`${line}-${index}`}
                className={index === 1 ? 'film-final-title-second' : undefined}
              >
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p>
            아직 기획이 정리되지 않았어도,
            <br className="desktop-break" /> 사업 목적과 일정부터 함께
            정리합니다.
          </p>
        </div>
        <Link href={`/contact/?${query}`} className="film-button">
          프로젝트 상담하기 <ArrowRight size={19} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
export function ProjectCover({ compact = false }: { compact?: boolean }) {
  const project = projects[0];
  if (project.media.src)
    return <FilmPhoto src={project.media.src} alt={project.media.alt} />;
  return (
    <div
      className={`project-title-cover ${compact ? 'is-compact' : ''}`}
      aria-hidden="true"
    >
      <span className="project-cover-top">군포 소공인 다큐멘터리</span>
      <p>
        작은 손이 만드는
        <br />
        <span>큰 이야기.</span>
      </p>
      <div className="project-cover-bottom">
        <span>사람 · 기술 · 지역</span>
        <span>디자인미창</span>
      </div>
    </div>
  );
}
export function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <Link
      data-color-reveal="aqua"
      data-reveal-mobile
      className="film-project-card"
      href={`/projects/${project.slug}/`}
    >
      <div className="film-project-caption">
        <span>{project.type}</span>
        {project.year && <span>{project.year}</span>}
      </div>
      <div className="project-title-row">
        <h2>{project.title}</h2>
        <ArrowRight size={28} aria-hidden="true" />
      </div>
      <p>{project.client}</p>
    </Link>
  );
}
