import { FilmIntro, ProjectCard, FinalCTA } from '@/components/film';
import { filmMetadata, projects } from '@/lib/film-content';
export const metadata = filmMetadata(
  '프로젝트',
  '군포 소공인 다큐멘터리 프로젝트. 사람과 기술, 지역을 담는 디자인미창의 영상 프로젝트를 소개합니다.',
);
export default function Page() {
  return (
    <>
      <FilmIntro
        label="프로젝트"
        title={
          <>
            사업의 목적을,
            <br />
            <span
              className="project-people"
              tabIndex={0}
              data-color-reveal="pink"
              data-reveal-mobile
            >
              사람의 이야기로.
            </span>
          </>
        }
        desc="사람과 기술, 지역의 가치를 바라보는 영상 프로젝트를 소개합니다."
      />
      <section className="film-wrap film-section" aria-label="프로젝트 목록">
        <div className="film-project-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <FinalCTA source="projects" />
    </>
  );
}
