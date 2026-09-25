import Link from 'next/link';
export default function NotFound(){return <section className="not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>페이지를 찾을 수 없습니다.</h1><p className="muted">주소를 확인하거나 홈에서 필요한 서비스를 찾아주세요.</p><Link className="button" href="/">홈으로 돌아가기</Link></section>}
