export type CaseSection = {
  id: string;
  group: 'overview' | 'story' | 'production' | 'film' | 'results';
  kind: 'text' | 'film' | 'deliverables' | 'credits';
  status: 'draft' | 'approved';
  title: string;
  body: string;
  image?: { src: string; alt: string; caption: string };
  evidenceUrl?: string;
};
export type CaseStudy = {
  intro: string;
  facts: { label: string; value: string | null }[];
  sections: CaseSection[];
};
// Publish only supplied overview facts. Detailed work, deliverables and impact require approved records.
export const caseStudies: Record<string, CaseStudy> = {
  gunpo: {
    intro:
      '군포산업진흥원 소공인지원센터와 함께한 소공인 다큐멘터리 프로젝트입니다. 사람의 이야기 속에서 지역의 기술과 산업이 지닌 가치를 바라봅니다.',
    facts: [
      { label: '클라이언트', value: '군포산업진흥원 소공인지원센터' },
      { label: '프로젝트 유형', value: '소공인 다큐멘터리' },
      { label: '프로젝트', value: '군포 소공인 다큐멘터리' },
      { label: '제작연도', value: '2026' },
      { label: '러닝타임', value: null },
      { label: '수행 범위', value: null },
      { label: '납품물', value: null },
      { label: '역할', value: null },
    ],
    sections: [
      {
        id: 'overview',
        group: 'overview',
        kind: 'text',
        status: 'approved',
        title: '사람과 기술, 지역의 이야기',
        body: '군포 소공인의 기술과 일상을 기록하는 다큐멘터리 프로젝트입니다. 기술을 만드는 사람과 그 사람이 일하는 현장을 통해 지역 산업의 가치를 바라봅니다.',
        image: {
          src: '/media/home-gunpo/story-city.webp',
          alt: '군포 산업지역의 실제 전경',
          caption: '군포 소공인 다큐멘터리 · 군포 · 2026',
        },
      },
      {
        id: 'insight',
        group: 'story',
        kind: 'text',
        status: 'approved',
        title: '산업을 설명하는 데서, 현장을 보여주는 이야기로',
        body: '지원사업을 제도와 수치만으로 설명하지 않고, 그 안에서 일하는 사람의 목소리와 손의 움직임에서 이야기를 시작했습니다. 오래 사용한 공구와 금속의 질감은 기술이 쌓인 시간을 보여줍니다.',
        image: {
          src: '/media/home-gunpo/story-tools.webp',
          alt: '군포 소공인 작업장에 놓인 실제 공구',
          caption: '실제 촬영 스틸 · 작업 공구와 현장 기록',
        },
      },
      {
        id: 'production',
        group: 'production',
        kind: 'text',
        status: 'approved',
        title: '말과 장면을 이어, 일하는 현장의 리듬으로',
        body: '작업하는 손, 움직이는 기계, 현장의 공간을 담은 화면에 인터뷰의 목소리를 연결했습니다. 사람과 기술, 지역이 따로 보이지 않도록 한 편의 흐름으로 엮었습니다.',
        image: {
          src: '/media/home-gunpo/story-machine.webp',
          alt: '회전하는 금속과 실제 가공 기계',
          caption: '실제 촬영 스틸 · 금속 가공 현장',
        },
      },
      {
        id: 'result',
        group: 'results',
        kind: 'deliverables',
        status: 'approved',
        title: '군포 소공인의 이야기를 한 편의 다큐멘터리로',
        body: '사람의 목소리와 작업 현장, 지원사업의 맥락을 영상으로 엮었습니다. 공개 가능한 제작 범위와 납품 정보는 확인되는 대로 정확하게 보완합니다.',
        image: {
          src: '/media/home-gunpo/project-hands.webp',
          alt: '도면 위 금속 부품을 측정하는 군포 소공인의 손',
          caption: '군포산업진흥원 소공인지원센터 · 2026',
        },
      },
    ],
  },
};
export const caseGroupLabels = {
  overview: '개요',
  story: '이야기의 방향',
  production: '제작과정',
  film: '완성 영상',
  results: '납품·활용',
};
