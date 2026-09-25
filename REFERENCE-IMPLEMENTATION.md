# 목업 기준 구현 기록

## 최우선 레퍼런스

- 밝은 목업: `public/images/reference/bright.png` (2026-09-24 21:38:54)
- 보조 목업: `public/images/reference/dark.png` (2026-09-24 21:08:45)
- 밝은 목업의 1024×1536 구성과 비율을 기준으로 인물 HERO, 32:68 프로젝트 소개, 좌측 제목+5개 분야, 좌측 설명+5개 제작단계, 풍경 배너, 촬영자 CTA를 구현했습니다.
- 어두운 색상 테마는 적용하지 않았습니다. 손글씨 카피는 로컬 나눔손글씨 서체, 일반 본문과 제목은 고딕체입니다.

## 구현 파일

- `components/reference-home.tsx`: 목업 기반 HOME
- `components/reference-photo.tsx`: 목업에서 사진 영역만 SVG viewport로 표시. 텍스트와 버튼은 실제 HTML로 렌더링
- `app/reference.css`: 목업 디자인 및 모바일 구성. 기존 하위 페이지의 공통 스타일도 일관되게 조정
- `components/film-shell.tsx`: 목업형 로고·내비게이션·푸터
- `components/film.tsx`: 공통 CTA 및 상세 페이지 이미지

## 이미지

인물 HERO와 도시 배경은 제공된 목업을 바탕으로 글자·UI를 제거해 재구성한 AI 콘셉트 이미지입니다. 실촬영 자료 또는 정확한 군포 현장 기록으로 표시하지 않습니다.

- `public/images/reference/craftsman-hero.png`
- `public/images/reference/city-panorama.png`
- 썸네일·제작 단계·CTA 이미지는 밝은 목업의 사진 영역을 사용합니다.
- `public/fonts/nanum-pen-script.ttf` 및 OFL 라이선스 포함

실제 제작영상 파일은 제공되지 않았으므로 영상 버튼은 공개 준비 안내를 표시합니다. 목업의 임의 연락처·주소·재생시간·소셜 링크는 실제 정보로 사용하지 않았습니다. 기존 프로젝트 연락처를 유지합니다.

## 실행 및 확인

- `pnpm dev` / `pnpm build`는 이 Windows 한글 경로에서 발생한 Turbopack 오류를 피하도록 Webpack 모드를 사용합니다.
- 이 PC에서는 기존 프로젝트의 설치된 의존성을 `node_modules` 디렉터리 연결로 읽습니다. 다른 PC로 이동 시 `pnpm install --frozen-lockfile`로 의존성을 설치합니다. 원본 프로젝트 소스는 변경하지 않았습니다.
- 미리보기: http://127.0.0.1:3001 (로컬 운영 빌드)
- Webpack 운영 빌드 및 TypeScript 검사 통과
- 1440 / 1024 / 768 / 390 / 320px HOME 가로 넘침 없음
- 7개 페이지 응답, H1, 모바일 메뉴, 영상 대화상자, 서비스 자동 선택, 폼 필수값 검증 통과
- 화면: `outputs/reference-desktop.png`, `outputs/reference-mobile.png`
- 기존 기능 설명은 VIDEO-SITE.md 참고. 이 파일이 디자인 기준에 관해서 우선합니다.
