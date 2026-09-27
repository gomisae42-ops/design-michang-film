import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import SignatureOpening from '@/components/signature-opening';
import HomeServices from '@/components/home-services';
import { processStages } from '@/lib/film-design';

const approach = [
  {
    lead: '사업을 이해하는 ',
    keyword: '기획',
    tone: 'planning',
    body: '사업계획서와 과업의 목적에서 핵심 메시지를 찾습니다.',
  },
  {
    lead: '사람을 발견하는 ',
    keyword: '스토리텔링',
    tone: 'storytelling',
    body: '제도보다 그 안에서 일하는 사람을 봅니다.',
  },
  {
    lead: '하나의 톤으로 완성하는 ',
    keyword: '통합 제작',
    tone: 'integrated',
    body: '영상·디자인·인쇄·콘텐츠를 하나의 이야기로 연결합니다.',
  },
];
const story = [
  {
    label: '만들어야 할 이유',
    title: '산업을 설명하는 데서,\n현장을 보여주는 이야기로.',
    body: '군포 소공인의 기술과 지원사업을 다루는 다큐멘터리. 산업의 모습을 작업 현장과 그 안에서 일하는 사람의 이야기로 전합니다.',
    image: 'story-city',
    alt: '군포 산업지역의 실제 전경',
  },
  {
    label: '발견한 이야기',
    title: '공구 하나, 손의 움직임.\n기술이 쌓인 시간을 봅니다.',
    body: '금속을 다루는 손과 오래 사용한 공구에서 출발합니다. 현장의 장면과 인터뷰 속 목소리가 서로의 맥락을 더합니다.',
    image: 'story-tools',
    alt: '군포 소공인 작업장에 놓인 실제 공구',
  },
  {
    label: '화면으로 만드는 과정',
    title: '말과 장면을 이어,\n일하는 현장의 리듬으로.',
    body: '작업하는 손, 움직이는 기계, 현장의 공간을 담은 화면. 인터뷰와 작업 장면을 연결해 기술이 일상 속에서 어떻게 이어지는지 보여줍니다.',
    image: 'story-machine',
    alt: '회전하는 금속과 실제 가공 기계',
  },
  {
    label: '완성한 이야기',
    title: '군포 소공인의 이야기를\n한 편의 다큐멘터리로.',
    body: '사람의 목소리와 작업 현장, 지원사업의 이야기를 영상으로 엮었습니다. 실제 프로젝트의 맥락은 상세 페이지에서 이어집니다.',
  },
];
export default function ReferenceHome() {
  return (
    <div className="home-final">
      <SignatureOpening />
      <section
        className="home-bridge home-container"
        aria-labelledby="bridge-title"
      >
        <h2 id="bridge-title">
          <span>영상은 촬영에서</span>
          <br className="home-desktop-break" />
          <span className="home-bridge-title-second">시작되지 않습니다.</span>
        </h2>
        <div className="home-bridge-follow">
          <p>
            사업을 <strong className="home-bridge-emphasis home-bridge-understand">이해</strong>하고,
            <br />
            사람을 <strong className="home-bridge-emphasis home-bridge-meet">만나</strong>고,
            <br />그 안에 담긴 <strong className="home-bridge-emphasis home-bridge-discover">가치를 발견</strong>하는 것에서 시작합니다.
          </p>
          <a href="#selected-project" className="home-text-link">
            그렇게 만든 이야기 <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section
        className="home-selected"
        id="selected-project"
        aria-labelledby="gunpo-title"
      >
        <div className="home-container home-section-label">
          <span>대표 프로젝트</span>
          <span>01 — 군포</span>
        </div>
        <Link
          href="/projects/gunpo/"
          className="home-selected-image"
          aria-label="군포 프로젝트 자세히 보기"
        >
          <Image
            src="/media/home-gunpo/project-hands.webp"
            alt="도면 위 금속 부품을 측정하는 군포 소공인의 손"
            width={1600}
            height={708}
            sizes="100vw"
          />
          <span className="home-image-link">
            <ArrowRight size={27} aria-hidden="true" />
          </span>
        </Link>
        <div className="home-container home-selected-info">
          <h2 id="gunpo-title">
            <span className="home-selected-kicker">보이지 않는 곳에서</span>
            <span className="home-selected-title-line">
              군포의 산업을{' '}
              <strong className="home-selected-people">만드는 사람들</strong>
            </span>
          </h2>
          <div>
            <p>군포산업진흥원 소공인지원센터 · 2026</p>
            <Link href="/projects/gunpo/" className="home-text-link">
              프로젝트 자세히 보기 <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="home-container home-preview">
          <div>
            <p className="home-eyebrow">실제 촬영 영상</p>
            <h3>
              <span>군포 소공인 다큐멘터리</span>
              <br />
              <span className="home-preview-title-second">장면 미리보기</span>
            </h3>
            <p>작업 현장의 손과 공구, 기계의 움직임을 짧게 담았습니다.</p>
          </div>
          <video controls playsInline preload="none" poster="/media/home-gunpo/hero-film-poster-desktop.webp" aria-label="군포 소공인 다큐멘터리 촬영 장면 미리보기">
            <source src="/media/home-gunpo/hero-film-desktop.mp4" type="video/mp4" />
            브라우저가 영상 재생을 지원하지 않습니다.
          </video>
        </div>
      </section>
      <section
        className="home-story home-container"
        aria-labelledby="story-title"
      >
        <div className="home-story-heading">
          <p className="home-eyebrow">이야기가 되는 과정</p>
          <h2 id="story-title">
            <span>왜 만들고,</span>
            <br />
            <span className="home-heading-second">어떻게 담았는가</span>
          </h2>
          <p>군포 소공인 다큐멘터리</p>
        </div>
        <div className="home-story-chapters">
          {story.map((s, i) => (
            <article key={s.label} className="home-chapter">
              {s.image && (
                <Image
                  src={`/media/home-gunpo/${s.image}.webp`}
                  alt={s.alt!}
                  width={1600}
                  height={708}
                  sizes="(max-width:767px) 90vw, 60vw"
                />
              )}
              <div className="home-chapter-body">
                <p className="home-eyebrow">
                  <span>0{i + 1}</span>
                  {s.label}
                </p>
                <h3>
                  {s.title.split('\n').map((line, j) => (
                    <span
                      key={line}
                      className={j === 1 ? 'home-heading-second' : undefined}
                    >
                      {j > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h3>
                <p>{s.body}</p>
                {i === 3 && (
                  <Link href="/projects/gunpo/" className="home-text-link">
                    군포 프로젝트 자세히 보기{' '}
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="home-make home-section" id="services">
        <div className="home-container">
          <p className="home-eyebrow">영상제작 분야</p>
          <h2>
            <span>목적에 맞는</span>
            <br />
            <span className="home-heading-second">영상을 제안합니다.</span>
          </h2>
          <HomeServices />
          <Link href="/video/" className="home-text-link">
            영상제작 분야 모두 보기 <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        className="home-why home-container home-section"
        id="why-michang"
      >
        <p className="home-eyebrow">디자인미창의 방식</p>
        <h2>
          <span>우리는 카메라를 들기 전에</span>
          <br />
          <span className="home-heading-second">사업부터 이해합니다.</span>
        </h2>
        <div className="home-why-columns">
          {approach.map(({ lead, keyword, tone, body }, i) => (
            <article
              key={keyword}
              tabIndex={0}
              data-reveal-mobile={i === 0 ? '' : undefined}
            >
              <span className="home-index">0{i + 1}</span>
              <h3>
                {lead}<span className={`home-why-keyword home-why-${tone}`}>{keyword}</span>
              </h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <Link href="/about/" className="home-text-link">
          디자인미창 소개 <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
      <section className="home-process home-section" id="process">
        <div className="home-container">
          <div className="home-section-head">
            <div>
              <p className="home-eyebrow">함께 만드는 과정</p>
              <h2>
                <span>첫 이야기부터,</span>
                <br />
                <span className="home-heading-second">마지막 전달까지.</span>
              </h2>
            </div>
            <Link href="/process/" className="home-text-link">
              단계별 산출물 보기 <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ol className="home-timeline">
            {processStages.map((s, i) => (
              <li
                key={s.id}
                tabIndex={0}
                data-color-reveal="aqua"
                data-reveal-mobile={i === 0 ? '' : undefined}
              >
                <span className="home-index">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.client}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        className="home-trust home-container home-section"
        aria-labelledby="trust-title"
      >
        <p className="home-eyebrow">쌓아온 기반</p>
        <div className="home-trust-grid">
          <h2
            id="trust-title"
            tabIndex={0}
            data-color-reveal="gold"
            data-reveal-mobile
          >
            1997<span>년부터</span>
          </h2>
          <div>
            <h3>
              <span>30여 년 성장해 온</span>
              <br />
              <span className="home-heading-second">디자인인쇄 출판의 경험</span>
            </h3>
            <p>
              여러 매체에 이야기를 담아온 기반 위에서
              <br />
              이제 영상으로 사람과 사업을 연결합니다.
            </p>
            <Link href="/about/" className="home-text-link">
              디자인미창 알아보기 <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="home-final-cta home-section" id="inquiry">
        <div className="home-container">
          <p className="home-eyebrow">함께 시작할 이야기</p>
          <h2>
            <span>당신의 사업에도</span>
            <br />
            <span className="home-heading-second">기록해야 할 이야기가 있습니다.</span>
          </h2>
          <p>
            아직 기획이 정리되지 않았어도 괜찮습니다.
            <br />
            <strong>사업의 목적부터 함께 이야기하겠습니다.</strong>
          </p>
          <Link href="/contact/" className="home-contact-button">
            프로젝트 상담하기 <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
