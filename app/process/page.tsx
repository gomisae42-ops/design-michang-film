import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FilmIntro, FinalCTA } from '@/components/film';
import { ProcessDetails } from '@/components/process-details';
import { filmMetadata } from '@/lib/film-content';
import { processStages } from '@/lib/film-design';

const processImages: Record<number, { src: string; alt: string }> = {
  0: {
    src: '/images/process-stock/planning.jpg',
    alt: '화이트보드 앞에서 프로젝트 방향을 논의하는 기획 장면',
  },
  4: {
    src: '/images/process-stock/filming.jpg',
    alt: '전문 카메라와 촬영팀이 함께하는 영상 촬영 현장',
  },
  5: {
    src: '/images/process-stock/editing.jpg',
    alt: '듀얼 모니터로 영상을 편집하는 후반 제작 작업실',
  },
};
export const metadata = filmMetadata(
  '제작과정',
  '문의·브리핑부터 기획, 촬영, 편집, 검수, 납품까지 8단계. 담당자가 확인할 내용과 단계별 공유 자료를 안내합니다.',
);
export default function Page() {
  return (
    <div className="process-page">
      <FilmIntro
        label="제작과정"
        title={
          <>
            <span className="title-line title-line-strong">좋은 영상은,</span>
            <br />
            <span className="title-line title-line-middle">함께 확인하는 과정에서</span>
            <br />
            <span className="title-line title-line-complete">완성</span>
            <span className="title-line title-line-soft">됩니다.</span>
          </>
        }
        desc="처음 영상을 준비하는 담당자도 흐름을 이해할 수 있도록. 우리가 하는 일과 함께 확인할 자료를 단계마다 안내합니다."
      />
      <section className="film-wrap film-section">
        <figure className="process-hero-image">
          <Image
            src="/images/process-stock/filming.jpg"
            alt="전문 카메라와 촬영팀이 함께하는 영상 제작 현장"
            fill
            sizes="(max-width: 767px) 100vw, 1312px"
            priority
          />
        </figure>
        <nav className="service-jumps" aria-label="제작 단계">
          {processStages.map((s, i) => (
            <a key={s.id} href={`#${s.id}`}>
              0{i + 1} {s.title}
            </a>
          ))}
        </nav>
        <ol className="film-detail-steps">
          {processStages.map((s, i) => (
            <li
              key={s.id}
              id={s.id}
              tabIndex={0}
              data-color-reveal="aqua"
              data-reveal-mobile={i === 0 ? '' : undefined}
            >
              <span className="row-number">0{i + 1}</span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.task}</p>
                <ProcessDetails text={s.details} />
                {processImages[i] ? (
                  <figure className="process-stage-image">
                    <Image
                      src={processImages[i].src}
                      alt={processImages[i].alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 620px"
                    />
                  </figure>
                ) : null}
              </div>
              <dl className="step-responsibilities">
                <dt>담당자가 확인할 일</dt>
                <dd>{s.client}</dd>
                <dt>함께 확인할 자료</dt>
                <dd>{s.output}</dd>
              </dl>
            </li>
          ))}
        </ol>
      </section>
      <FinalCTA source="process" />
      <section className="film-wrap film-section process-scope-section">
        <section className="scope-note">
          <h2>지금 있는 자료부터 보내주세요.</h2>
          <p>
            완성된 기획안이 없어도 괜찮습니다. 아래 내용 중 준비된 것부터
            알려주세요.
          </p>
          <ul className="preparation-list">
            <li>사업의 목적과 시청 대상</li>
            <li>희망 납품일과 주요 사업 일정</li>
            <li>사업계획서·기존 홍보 자료</li>
            <li>참고하고 싶은 영상이나 공개 채널</li>
          </ul>
          <p style={{ marginTop: 24 }}>
            세부 일정, 수정 횟수, 원본 제공 여부, 저작물 이용 범위와 추가 촬영은
            프로젝트 범위에 맞춰 사전에 협의합니다.
          </p>
          <Link
            href="/contact/?source=process"
            className="film-text-link"
            style={{ marginTop: 24 }}
          >
            일정과 제작 범위 상담하기{' '}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </section>
    </div>
  );
}
