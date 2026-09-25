import type { Metadata } from 'next';

// Replace paths with approved project assets. Empty video paths show an honest preparation state.
export const media = {
  hero: {
    approved: false,
    src: '/images/reference/craftsman-hero.png',
    alt: '햇살이 드는 작업장에서 미소 짓는 소공인 콘셉트 이미지',
    video: '',
  },
  gunpo: {
    src: '',
    alt: '군포 소공인 다큐멘터리 대표 장면',
    video: '',
    captions: '',
  },
};
// Keys match FilmPhoto kind values. Fill a src to replace a concept crop everywhere.
export const photoAssets: Record<string, { src: string; alt: string }> = {};
export const videoServices = [
  {
    id: 'documentary',
    name: '다큐멘터리',
    short: '사람의 시간과 현장의 가치를 기록합니다.',
    audience: '지역의 사람과 산업을 깊이 있게 소개하려는 지자체·지원기관',
    detail:
      '일하는 사람의 목소리와 현장의 장면으로 사업의 의미를 전합니다. 사전 취재와 인터뷰를 중심으로 이야기를 구성합니다.',
    output: '인물·지역·산업 다큐멘터리',
    photo: 'video',
  },
  {
    id: 'public',
    name: '공공기관 홍보영상',
    short: '기관의 역할을 시민의 언어로 전합니다.',
    audience: '기관의 역할과 공공서비스를 알리고 싶은 공공기관',
    detail:
      '정책 용어를 쉽게 풀고, 서비스를 이용하는 사람의 시선에서 기관의 역할과 변화를 보여줍니다.',
    output: '기관 소개·공공서비스 안내 영상',
    photo: 'website',
  },
  {
    id: 'corporate',
    name: '기업 홍보영상',
    short: '기술 너머에 있는 기업의 이야기를 담습니다.',
    audience: '기술과 제품의 가치를 고객·파트너에게 소개하려는 기업',
    detail:
      '제품의 기능뿐 아니라 기술을 만드는 과정과 사람을 함께 담아 기업의 차별점을 전달합니다.',
    output: '기업·기술·제품 소개 영상',
    photo: 'hero',
  },
  {
    id: 'results',
    name: '사업·성과 영상',
    short: '숫자 뒤에 있는 변화를 보여줍니다.',
    audience: '사업 보고회·성과공유회·평가 자료를 준비하는 담당자',
    detail:
      '사업 자료와 현장 사례를 연결해 무엇이 달라졌는지 보여줍니다. 수치의 출처와 표현을 함께 검수합니다.',
    output: '사업성과·성과공유회 영상',
    photo: 'editorial',
  },
  {
    id: 'policy',
    name: '정책·지원사업 영상',
    short: '필요한 지원이 필요한 사람에게 닿도록.',
    audience: '지원사업을 안내하거나 참여를 이끌어내려는 지원기관',
    detail:
      '지원 대상, 신청 방법, 기대 효과를 명확하게 정리합니다. 실제 참여 사례를 활용할 경우 공개 범위를 먼저 확인합니다.',
    output: '지원사업 안내·참여 사례 영상',
    photo: 'catalog',
  },
  {
    id: 'interview',
    name: '인터뷰·스토리 영상',
    short: '진심이 전해지는 목소리를 담습니다.',
    audience: '참여자·대표자·현장 전문가의 경험을 전달하려는 기관과 기업',
    detail:
      '사전 대화로 질문을 설계하고 편안한 촬영 환경을 만듭니다. 말의 맥락을 지키며 핵심 메시지를 편집합니다.',
    output: '인물 인터뷰·참여자 스토리',
    photo: 'about',
  },
  {
    id: 'event',
    name: '행사·기록 영상',
    short: '한 번뿐인 현장을 오래 남깁니다.',
    audience: '행사·포럼·지역 프로그램의 현장 기록이 필요한 담당자',
    detail:
      '행사 흐름과 주요 순간을 사전에 파악하고 촬영 동선을 준비합니다. 기록본과 하이라이트의 목적을 구분합니다.',
    output: '행사 기록·하이라이트 영상',
    photo: 'video',
  },
  {
    id: 'shortform',
    name: '숏폼·SNS 영상',
    short: '짧은 장면으로 더 넓게 만납니다.',
    audience: '제작한 콘텐츠를 SNS와 모바일에서 활용하려는 담당자',
    detail:
      '채널과 시청 상황에 맞춰 짧은 이야기로 재구성합니다. 세로 화면, 자막 가독성, 첫 장면의 메시지를 함께 설계합니다.',
    output: '세로형 숏폼·SNS 편집본',
    photo: 'work-video',
  },
];
export const homeServices = [
  'documentary',
  'public',
  'results',
  'interview',
  'shortform',
];
export const filmSteps = [
  {
    title: '사업 이해',
    desc: '고객의 목적과 과제를 파악합니다.',
    photo: 'about',
  },
  {
    title: '기획·구성',
    desc: '이야기와 스토리를 설계합니다.',
    photo: 'catalog',
  },
  { title: '촬영', desc: '현장의 진짜 이야기를 담습니다.', photo: 'video' },
  { title: '편집·수정', desc: '영상의 완성도를 높입니다.', photo: 'hero' },
  {
    title: '납품·활용',
    desc: '다양한 매체에 활용하도록 지원합니다.',
    photo: 'website',
  },
];
export const projects = [
  {
    slug: 'gunpo',
    title: '군포의 작은 손이 만드는 큰 이야기',
    client: '군포산업진흥원 소공인지원센터',
    year: null as number | null,
    type: '소공인 다큐멘터리',
    description:
      '사람의 이야기 속에 지역의 미래가 있습니다. 소공인의 기술과 일상을 기록하는 다큐멘터리 프로젝트입니다.',
    media: media.gunpo,
  },
];
export const productionSteps = [
  [
    '사업 이해',
    '사업의 배경, 시청 대상, 활용 채널과 목표를 함께 정리합니다.',
    '프로젝트 브리프',
  ],
  [
    '자료 분석',
    '사업계획서와 기존 홍보 자료에서 핵심 정보와 근거를 찾습니다.',
    '핵심 메시지·자료 목록',
  ],
  ['기획', '누구의 어떤 이야기를 어떤 시선으로 전달할지 결정합니다.', '기획안'],
  [
    '구성·콘티',
    '장면의 순서와 인터뷰, 내레이션의 흐름을 설계합니다.',
    '구성안·스토리보드',
  ],
  [
    '촬영계획',
    '촬영 장소와 동선, 출연 일정, 장비와 동의 범위를 확인합니다.',
    '촬영계획표',
  ],
  [
    '현장촬영',
    '계획한 장면과 현장에서 발견한 자연스러운 순간을 기록합니다.',
    '현장 촬영 자료',
  ],
  [
    '인터뷰',
    '목적에 맞는 질문으로 경험과 생각을 듣고 맥락을 담습니다.',
    '인터뷰 자료',
  ],
  [
    '편집',
    '핵심 메시지가 흐려지지 않도록 이야기의 호흡을 정리합니다.',
    '1차 편집본',
  ],
  [
    '자막·그래픽',
    '이름과 수치, 사업 정보를 확인하고 이해를 돕는 표현을 더합니다.',
    '자막·그래픽 시안',
  ],
  [
    '피드백',
    '담당자와 내용의 정확성, 톤, 공개 가능 범위를 확인합니다.',
    '통합 피드백 목록',
  ],
  [
    '수정',
    '협의한 의견을 반영하고 화면·소리·표기를 다시 검수합니다.',
    '최종 검수본',
  ],
  [
    '최종 납품',
    '합의한 규격과 파일 형식으로 전달하고 활용 방법을 안내합니다.',
    '최종 영상·납품 목록',
  ],
];
export function filmMetadata(title: string, description: string): Metadata {
  return {
    title: { absolute: `${title} | 디자인미창` },
    description,
    openGraph: {
      title: `${title} | 디자인미창`,
      description,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: { card: 'summary', title: `${title} | 디자인미창`, description },
  };
}
