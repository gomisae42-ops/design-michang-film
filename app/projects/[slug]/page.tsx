import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { FinalCTA } from '@/components/film';
import { VideoPlayer } from '@/components/film-interactions';
import { CaseNavigation } from '@/components/case-navigation';
import { filmMetadata, projects } from '@/lib/film-content';
import { caseStudies, caseGroupLabels } from '@/lib/case-studies';
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return filmMetadata(
    project?.title ?? '프로젝트를 찾을 수 없습니다',
    project?.description ?? '디자인미창 영상 프로젝트',
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const study = caseStudies[slug];
  if (!project || !study) notFound();
  const sections = study.sections.filter(
    (s) =>
      s.status === 'approved' && (s.kind !== 'film' || !!project.media.video),
  );
  const groups = [...new Set(sections.map((s) => s.group))];
  const items = groups.map((group) => ({
    id: sections.find((s) => s.group === group)!.id,
    label: caseGroupLabels[group],
  }));
  return (
    <>
      <section
        className="case-hero"
        style={{
          minHeight: 'min(620px, calc(100svh - 80px))',
          background: '#18212a',
          alignItems: 'center',
        }}
      >
        <div className="film-wrap case-hero-copy">
          <p className="film-kicker">프로젝트 · 소공인 다큐멘터리</p>
          <h1>군포의 작은 손이<br />만드는 큰 이야기</h1>
          <p>{study.intro}</p>
          <span>군포산업진흥원 소공인지원센터 · 군포 · 2026</span>
          <a className="case-hero-link" href="#overview">
            소공인지원센터 프로젝트 소개 보기{' '}
            <ArrowRight size={20} aria-hidden="true" />
          </a>
        </div>
      </section>
      <div className="film-wrap film-section case-document">
        <p className="film-kicker">Quick facts</p>
        <dl className="film-case-meta">
          {study.facts
            .filter((f) => f.value)
            .map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
        </dl>
        <p className="case-availability">공개 승인되지 않은 세부 역할·납품 범위·성과 수치는 표시하지 않습니다.</p>
        <div
          className={
            items.length > 1
              ? 'film-case-layout'
              : 'film-case-layout is-summary'
          }
        >
          <CaseNavigation items={items} />
          <div>
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="film-case-section">
                <div className="case-section-copy">
                  <p className="film-kicker">{caseGroupLabels[s.group]}</p>
                  <h2>
                    {s.title.split('\n').map((line, index) => (
                      <span
                        key={line}
                        className={index === 1 ? 'case-title-second' : undefined}
                      >
                        {index > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </h2>
                  <p>{s.body}</p>
                </div>
                {s.image && (
                  <figure className="case-evidence">
                    <Image src={s.image.src} alt={s.image.alt} width={1600} height={708} sizes="(max-width: 767px) 100vw, 70vw" />
                    <figcaption>{s.image.caption}</figcaption>
                  </figure>
                )}
                {s.kind === 'film' && (
                  <VideoPlayer
                    src={project.media.video}
                    captions={project.media.captions}
                    label={`${project.title} 완성 영상 보기`}
                  />
                )}
                {s.evidenceUrl && (
                  <a className="film-text-link" href={s.evidenceUrl}>
                    공개 자료 확인하기{' '}
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                )}
              </section>
            ))}
            <aside className="case-next">
              <h3>
                비슷한 사업을<br />
                <span>준비하고 계신가요?</span>
              </h3>
              <p>
                다큐멘터리가 어떤 목적에 어울리는지, 제작 과정에서 무엇을
                준비하면 되는지 살펴보세요.
              </p>
              <div className="film-links">
                <Link href="/video/#documentary" className="film-text-link">
                  다큐멘터리 제작 안내{' '}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link href="/process/" className="film-text-link">
                  제작과정과 준비 자료{' '}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <div id="project-inquiry">
        <FinalCTA
          source="case-final"
          service="documentary"
          project={slug}
          title={'비슷한 프로젝트를\n준비하고 계신가요?'}
        />
      </div>
    </>
  );
}
