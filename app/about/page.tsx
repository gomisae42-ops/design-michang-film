import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FilmIntro, FilmHeading, FinalCTA } from '@/components/film';
import { filmMetadata } from '@/lib/film-content';
import { strengths } from '@/lib/film-design';
import BrandArchive from '@/components/brand-archive';
export const metadata = filmMetadata(
  '디자인미창',
  '디자인·인쇄·콘텐츠·영상 제작회사 디자인미창. 사업을 이해하는 기획과 사람 중심의 이야기, 통합 제작 역량을 소개합니다.',
);
export default function Page() {
  return (
    <div className="about-page">
      <FilmIntro
        label="디자인미창"
        title={
          <>
            <span className="title-line title-line-strong">사업의 이야기를,</span>
            <br />
            <span className="title-line title-line-soft about-partner-line">여러 매체로 완성하는 제작 파트너</span>
          </>
        }
        desc="디자인·인쇄·콘텐츠, 그리고 영상. 전하고 싶은 이야기가 필요한 곳에 제대로 닿도록 만듭니다."
      />
      <div className="film-wrap">
        <section className="about-statement">
          <p className="film-kicker">디자인에서 영상까지</p>
          <h2>
            <span>종이의 한 면에서</span>
            <br />
            <span className="about-statement-second">영상의 한 장면까지</span>
          </h2>
          <p>
            메시지를 정리하는 기획, 시선을 이끄는 디자인, 제작의 마지막을 살피는
            태도. 매체가 달라져도 우리가 중요하게 생각하는 것은 같습니다.
          </p>
        </section>
      </div>
      <section className="film-wrap film-section" id="capabilities">
        <FilmHeading label="제작 역량" title="한 가지 이야기, 일관된 표현." />
        <div style={{ marginTop: 48 }}>
          {strengths.map((s) => (
            <div className="capability-row" key={s.title}>
              <h3>{s.title}</h3>
              <div>
                <p>{s.body}</p>
                <p style={{ marginTop: 16 }}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/process/"
          className="film-text-link"
          style={{ marginTop: 28 }}
        >
          함께 일하는 과정 보기 <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
      <BrandArchive />
      <section className="film-wrap film-section" id="evidence">
        <FilmHeading
          label="프로젝트"
          title={
            <>
              사람과 기술을 담는
              <br />
              우리의 이야기를 만나보세요.
            </>
          }
        />
        <div className="evidence-block">
          <div>
            <h3>군포 소공인 다큐멘터리 프로젝트</h3>
            <p className="film-desc">군포산업진흥원 소공인지원센터</p>
          </div>
          <Link href="/projects/gunpo/" className="film-text-link">
            프로젝트 소개 보기 <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FinalCTA source="about" title="함께 준비할 프로젝트를 들려주세요." />
    </div>
  );
}
