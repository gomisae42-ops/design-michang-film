import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { FilmIntro, ProjectCover, FinalCTA } from '@/components/film';
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
      <FilmIntro
        label="프로젝트 · 소공인 다큐멘터리"
        title={
          <>
            군포의 작은 손이
            <br />
            만드는 큰 이야기
          </>
        }
        desc={study.intro}
      />
      <div className="film-wrap film-section">
        <ProjectCover />
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
        <p className="case-availability">
          완성 영상과 상세 제작 자료는 공개 가능한 범위를 확인해 순차적으로
          소개합니다.
        </p>
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
                <h2>{s.title}</h2>
                <p>{s.body}</p>
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
              <h3>비슷한 사업을 준비하고 계신가요?</h3>
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
          title="비슷한 프로젝트를 준비하고 계신가요?"
        />
      </div>
    </>
  );
}
