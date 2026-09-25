# 최신 디자인 기준

첨부 밝은 목업을 기준으로 재구현했습니다. 상세 내용은 [REFERENCE-IMPLEMENTATION.md](REFERENCE-IMPLEMENTATION.md)를 참고하세요.

# 영상제작 홈페이지 — 운영 및 자료 교체

## 실행

영상홈페이지 폴더에서 처음 한 번 `pnpm install --frozen-lockfile`을 실행한 후 `pnpm dev`로 미리보기, `pnpm build`로 운영 빌드를 실행합니다. 기본 실행 방식은 Next.js입니다. 기존 운영 프로젝트의 Git 및 배포 연결은 복사하지 않았습니다. 이번 작업은 로컬 구현이며 기존 운영 사이트에는 배포하지 않았습니다.

## 페이지

- `/` — 영상제작 영업 랜딩, 대표 프로젝트, 5개 분야, 5단계 과정, 회사 강점, 상담 CTA
- `/video` — 8개 영상 서비스와 필요 상황, 사례·문의 연결
- `/projects` — 프로젝트 데이터 기반 목록
- `/projects/gunpo` — 목차가 있는 14개 항목의 케이스 스터디
- `/process` — 12단계 과정과 단계별 확인 자료
- `/about` — 34년 경험과 통합 제작 역량
- `/contact` — 입력 검증, 영상 종류 자동 선택, 전송 미연결 안내, 내용 복사

기존 `/services`, `/works`, `/guide` 및 하위 페이지는 기존 링크가 끊어지지 않도록 보존했습니다. 새 메뉴는 영상제작 페이지로 연결됩니다.

## 디자인 기준

이번 첨부에는 요청 텍스트만 있었습니다. 기존 `public/images/mockup-v4.png`의 밝은 배경, 큰 사진, 편집디자인 구성, 절제된 인터랙션을 기준으로 제작했고 요청에 맞춰 네이비 텍스트와 블루 CTA로 변경했습니다. 별도의 영상제작 목업이 있다면 그 자료에 맞춰 추가 조정할 수 있습니다.

## 코드 구조

- `app/film.css`: 영상 사이트 디자인 토큰, 공통 레이아웃, 반응형 및 reduced-motion
- `components/film.tsx`: HERO, 섹션 제목, 이미지, 프로젝트 카드, HOME, 최종 CTA
- `components/film-shell.tsx`: sticky 헤더, 모바일 메뉴, 푸터
- `components/film-interactions.tsx`: 스크롤 reveal, 접근 가능한 영상 대화상자
- `components/contact-form.tsx`: 문의 입력 검증 및 미연결 submit
- `lib/film-content.ts`: 서비스·프로젝트·제작단계·이미지/영상 경로
- `lib/case-studies.ts`: 프로젝트별 사례 본문
- `lib/site-config.ts`: 검색 공개 설정 및 확장 가능한 Organization JSON-LD

## 이미지·영상 교체

권장 경로:

```
public/images/film/hero.webp
public/images/projects/gunpo/cover.webp
public/images/projects/gunpo/planning.webp
public/images/projects/gunpo/shooting.webp
public/images/projects/gunpo/editing.webp
public/videos/gunpo.mp4
public/videos/gunpo-ko.vtt
```

1. 위 폴더에 실제 파일을 추가합니다. 표시용 경로는 `public`을 빼고 `/images/...` 또는 `/videos/...`로 씁니다.
2. `lib/film-content.ts`의 `media.hero.src`, `media.gunpo.src`, `media.gunpo.video`, `media.gunpo.captions`를 수정합니다. 빈 영상 경로는 준비 중 안내를 표시합니다.
3. 일반 분야·단계 이미지는 `photoAssets`에 `video`, `about`, `catalog`, `editorial`, `hero`, `website`, `work-video` 등의 키와 `{ src, alt }`를 등록하면 일괄 교체됩니다. 현재는 기존 목업 사진 영역을 콘셉트 이미지로 사용합니다.
4. 새 프로젝트는 `projects` 배열에 고유 slug와 자체 media를 추가하고 `caseStudies`에 동일 slug로 본문을 추가합니다. 목록과 상세 URL은 자동으로 만들어집니다.
5. 실제 자료 반영 시 해당 콘셉트/준비 중 캡션도 검토해 갱신합니다. 긴 영상은 제공할 호스팅 환경에 맞는 HTTPS 파일 경로를 사용할 수 있습니다.

## 실제 자료가 필요한 항목

- 군포 프로젝트 제작연도, 편수, 러닝타임, 촬영 사진과 완성 영상
- 실제 수행 내용, 콘티, 인터뷰, 검수 기록, 공개 승인된 결과·피드백
- 군포 사례는 제공된 개요 이외의 내용이 검토용 구성 초안임을 페이지에 표시했습니다. 임의 성과 수치나 출연자 인용은 넣지 않았습니다.
- 전화·이메일은 기존 프로젝트에 등록된 연락처를 유지했습니다. 운영 전 최신 여부를 확인합니다.

## 문의 동작

기관/회사명, 담당자명, 연락처, 이메일, 문의 내용은 필수입니다. 예산과 일정은 선택입니다. 제출 버튼은 검증 후 실제 접수되지 않았다는 안내를 표시합니다. 네트워크 전송이나 서버 저장은 없습니다. 복사 버튼으로 내용을 복사할 수 있으며 사용자가 직접 이메일로 전송합니다.

메일 API를 연결할 때 서버 검증, 전송 오류 및 재시도 상태, 개인정보 안내를 실제 운영 방식에 맞게 추가해야 합니다.

## SEO 공개 전환

로컬 및 검토 버전은 검색 제외입니다. 운영 도메인과 실제 공개 자료를 확정한 뒤 환경변수를 설정하고 다시 빌드합니다.

```
NEXT_PUBLIC_SITE_URL=https://실제-운영-도메인
SITE_INDEXABLE=true
```

도메인은 예시 문자열을 그대로 사용하지 않습니다. 위 설정으로 메타데이터 기준 URL, robots, sitemap, Organization JSON-LD가 연결됩니다. 사이트맵은 신규 프로젝트도 자동으로 포함합니다. 각 페이지 title/description/OG 정보는 페이지 데이터와 분리해 편집할 수 있습니다.

## 검수

`work/verify-film.cjs`는 환경에 설치된 Playwright와 Edge로 7개 페이지의 응답, H1, 메타데이터, 4개 화면 폭, 메뉴·사례·영상 동작, 폼 검증·복사, reduced-motion과 404를 확인합니다. 다른 PC에서는 Playwright 경로를 환경에 맞게 변경해야 합니다. 결과 이미지는 `outputs/film-*.png`에 저장합니다.

