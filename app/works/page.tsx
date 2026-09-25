import { PageIntro, ContactBand } from '@/components/site';
import WorksFilter from '@/components/works-filter';
import { previewMode } from '@/lib/content';
export const metadata={title:'제작 사례',description:'브랜딩·영상·홈페이지·카탈로그·편집물의 분야별 표현과 제작 범위를 살펴보세요.'};
export default function Page(){return <><PageIntro label="제작 사례" title="목적에 맞는 표현을 살펴보세요." desc="매체는 달라도, 전달하고 싶은 가치는 분명하게."/><section className="section wrap">{previewMode&&<p className="notice">비공개 디자인 미리보기입니다. 아래 이미지는 AI로 제작한 디자인 예시이며, 디자인미창의 실제 실적이 아닙니다. 실제 사례는 공개 허락과 수행 범위 확인 후 등록합니다.</p>}<WorksFilter/></section><ContactBand/></>}
