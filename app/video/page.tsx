import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FilmIntro, FinalCTA } from '@/components/film';
import { filmMetadata, videoServices } from '@/lib/film-content';
export const metadata = filmMetadata(
  '영상제작',
  '다큐멘터리, 공공기관·기업 홍보영상, 사업성과·지원사업 영상, 인터뷰, 행사 기록, 숏폼. 목적에 맞는 제작 범위를 안내합니다.',
);
export default function Page() {
  return (
    <>
      <FilmIntro
        label="영상제작"
        title={
          <>
            전하고 싶은 목적에 맞춰,
            <br />
            영상의 형식을 설계합니다.
          </>
        }
        desc="누가 보고, 무엇을 느끼며, 어디에서 활용할지. 목적에서 출발해 필요한 영상을 함께 정리합니다."
      />
      <div className="film-wrap film-section">
        <nav className="service-jumps" aria-label="영상제작 분야">
          {videoServices.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.name}
            </a>
          ))}
        </nav>
        {videoServices.map((s, i) => (
          <section className="film-service-detail" id={s.id} key={s.id}>
            <span className="row-number">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h2>{s.name}</h2>
              <h3>{s.audience}</h3>
              <p className="film-desc" style={{ marginTop: 24 }}>
                {s.detail}
              </p>
            </div>
            <div className="service-delivery">
              <span className="film-caption">이런 결과물을 함께 만듭니다</span>
              <p>{s.output}</p>
              <div className="film-links">
                <Link
                  href={`/contact/?service=${s.id}&source=video`}
                  className="film-text-link"
                >
                  이 영상 제작 상담하기{' '}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                {s.id === 'documentary' && (
                  <Link href="/projects/gunpo/" className="film-text-link">
                    군포 프로젝트 소개{' '}
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </section>
        ))}
        <section className="scope-note">
          <h2>
            길이보다 먼저,
            <br />
            목적과 활용 범위를 정합니다.
          </h2>
          <p>
            촬영일, 출연 인원, 편수, 언어, 납품 규격과 수정 범위에 따라 제작
            내용이 달라집니다. 위 결과물은 제작 분야의 예시이며, 실제 납품
            범위는 프로젝트에 맞춰 협의합니다.
          </p>
          <Link
            className="film-text-link"
            href="/process/"
            style={{ marginTop: 20 }}
          >
            제작과정과 준비 자료 보기{' '}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </div>
      <FinalCTA
        source="video-final"
        title="어떤 영상이 필요한지부터 함께 정리합니다."
      />
    </>
  );
}
