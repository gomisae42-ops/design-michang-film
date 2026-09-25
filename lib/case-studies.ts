export type CaseSection = {
  id: string;
  group: 'overview' | 'story' | 'production' | 'film' | 'results';
  kind: 'text' | 'film' | 'deliverables' | 'credits';
  status: 'draft' | 'approved';
  title: string;
  body: string;
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
      { label: '제작연도', value: null },
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
