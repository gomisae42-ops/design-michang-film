import './home-final.css';
import ReferenceHome from '@/components/reference-home';
import { filmMetadata } from '@/lib/film-content';
export const metadata = filmMetadata(
  '영상제작 전문',
  '사람과 기술, 지역의 가치를 기록하는 디자인미창. 공공기관·기업 홍보영상, 다큐멘터리, 사업성과 영상의 기획부터 납품까지 함께합니다.',
);
export default function Page() {
  return <ReferenceHome />;
}
