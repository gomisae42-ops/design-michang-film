import { Suspense } from 'react';
import { Phone, Mail } from 'lucide-react';
import { FilmIntro } from '@/components/film';
import ContactQueryForm from '@/components/contact-query-form';
import { company } from '@/lib/content';
import { filmMetadata } from '@/lib/film-content';
export const metadata = filmMetadata(
  '제작문의',
  '공공기관·기업 영상제작 상담. 사업 목적과 일정부터 함께 정리합니다. 전화·이메일 문의와 문의 내용 작성 도구를 이용하세요.',
);
export default function Page() {
  return (
    <>
      <FilmIntro
        label="제작문의"
        title={
          <>
            어떤 사업을
            <br />
            준비하고 계신가요?
          </>
        }
        desc="사업 목적과 일정을 알려주세요. 필요한 영상과 제작 범위부터 함께 정리합니다. 예산이나 기획이 미정이어도 괜찮습니다."
      />
      <section className="film-wrap film-section film-contact-layout">
        <aside className="film-contact-info">
          <h2>이야기를 시작해 주세요.</h2>
          <ol className="contact-steps">
            <li><span>01</span><strong>문의 내용을 확인합니다.</strong></li>
            <li><span>02</span><strong>목적과 일정을 함께 정리합니다.</strong></li>
            <li><span>03</span><strong>필요한 제작 범위를 제안합니다.</strong></li>
          </ol>
          <a href={company.tel}>
            <Phone size={20} aria-hidden="true" />
            {company.phone}
          </a>
          <a href={`mailto:${company.email}`}>
            <Mail size={20} aria-hidden="true" />
            {company.email}
          </a>
          <p>과업지시서·사업계획서·참고 영상이 있다면 이메일에 함께 보내주세요.</p>
          <p>
            온라인 접수는 준비 중입니다.
            <br />
            현재 상담은 전화 또는 이메일로 진행합니다.
          </p>
        </aside>
        <Suspense
          fallback={
            <p>
              문의 작성 도구를 불러오고 있습니다. 전화 {company.phone} 또는
              이메일 {company.email}로 문의하실 수 있습니다.
            </p>
          }
        >
          <ContactQueryForm />
        </Suspense>
      </section>
    </>
  );
}
