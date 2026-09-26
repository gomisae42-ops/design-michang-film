'use client';
import { useRef, useState } from 'react';
import { ArrowRight, Copy, Mail, X } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { videoServices } from '@/lib/film-content';
import { company } from '@/lib/content';
const options = [{ id: 'undecided', name: '상담 후 결정' }, ...videoServices];
type Errors = Record<string, string>;
export default function ContactForm({
  initialService,
  initialProject,
}: {
  initialService: string;
  initialProject?: string;
}) {
  const [service, setService] = useState(initialService);
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLTextAreaElement>(null);
  function createDraft(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.current) return;
    const data = new FormData(form.current);
    const value = (key: string) => String(data.get(key) || '').trim();
    const next: Errors = {};
    for (const [key, label] of [
      ['organization', '기관/회사명'],
      ['name', '담당자명'],
      ['email', '이메일'],
      ['message', '문의 내용'],
    ])
      if (!value(key)) next[key] = `${label}을 입력해 주세요.`;
    if (value('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email')))
      next.email = '회신받을 이메일 주소를 확인해 주세요.';
    if (value('referenceUrl')) {
      try {
        const url = new URL(value('referenceUrl'));
        if (!['http:', 'https:'].includes(url.protocol)) throw Error();
      } catch {
        next.referenceUrl =
          'http:// 또는 https://로 시작하는 링크를 입력해 주세요.';
      }
    }
    setErrors(next);
    setStatus('');
    if (Object.keys(next).length) {
      setDraft('');
      requestAnimationFrame(() => {
        summary.current?.focus();
        form.current
          ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
            `[name="${Object.keys(next)[0]}"]`,
          )
          ?.focus();
      });
      return;
    }
    const content = [
      '영상 제작 상담 문의',
      project === 'gunpo' ? '관심 사례: 군포 소공인 다큐멘터리' : '',
      `제작 영상: ${options.find((o) => o.id === service)?.name || '상담 후 결정'}`,
      ...[
        ['기관/회사명', 'organization'],
        ['기관 유형', 'organizationType'],
        ['담당자명', 'name'],
        ['이메일', 'email'],
        ['연락처', 'phone'],
        ['사업/프로젝트명', 'projectName'],
        ['사업 단계', 'projectStage'],
        ['예상 일정', 'deadline'],
        ['예상 예산', 'budget'],
        ['참고 링크', 'referenceUrl'],
        ['문의 내용', 'message'],
      ].map(([label, key]) => `${label}: ${value(key) || '미정'}`),
    ]
      .filter(Boolean)
      .join('\n');
    setDraft(content);
    setStatus(
      '문의 내용을 정리했습니다. 아직 발송되지 않았습니다. 아래 내용을 복사하거나 이메일 앱에서 직접 보내주세요.',
    );
    requestAnimationFrame(() => preview.current?.focus());
  }
  function invalidate() {
    setDraft('');
    setStatus('');
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus(
        '복사했습니다. 이메일에 붙여 넣고 직접 발송해 주세요. 아직 상담이 접수된 것은 아닙니다.',
      );
    } catch {
      preview.current?.focus();
      preview.current?.select();
      setStatus(
        '자동 복사를 사용할 수 없습니다. 선택된 내용을 직접 복사해 주세요.',
      );
    }
  }
  const fields = [
    {
      id: 'organization',
      label: '기관/회사명',
      auto: 'organization',
      required: true,
      max: 100,
    },
    { id: 'name', label: '담당자명', auto: 'name', required: true, max: 60 },
    {
      id: 'email',
      label: '이메일',
      auto: 'email',
      type: 'email',
      required: true,
      max: 254,
    },
    {
      id: 'phone',
      label: '연락처',
      auto: 'tel',
      type: 'tel',
      required: false,
      max: 30,
    },
  ];
  return (
    <div className="film-form">
      <div className="contact-direct-mobile">
        <a className="film-text-link" href={company.tel}>
          전화로 문의하기
        </a>
        <a className="film-text-link" href={`mailto:${company.email}`}>
          이메일로 문의하기
        </a>
      </div>
      <h2>문의 내용 정리하기</h2>
      <p className="film-notice" id="form-notice">
        아래 도구는 이메일에 보낼 내용을 정리합니다. 이 페이지에서 온라인
        접수하거나 저장하지 않으며, 실제 발송은 이메일 앱에서 직접 진행합니다.
      </p>
      <p className="form-help">
        * 필수 입력 · 예산과 일정이 미정이어도 괜찮습니다.
      </p>
      {project === 'gunpo' && (
        <div className="interest-project">
          <span>관심 사례: 군포 소공인 다큐멘터리</span>
          <button
            type="button"
            aria-label="관심 사례 해제"
            onClick={() => {
              setProject(undefined);
              invalidate();
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}
      {Object.keys(errors).length > 0 && (
        <div ref={summary} tabIndex={-1} className="form-errors" role="alert">
          <strong>입력 내용을 확인해 주세요.</strong>
          <ul>
            {Object.entries(errors).map(([key, message]) => (
              <li key={key}>
                <a href={`#${key}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form
        ref={form}
        onSubmit={createDraft}
        onChange={invalidate}
        noValidate
        aria-describedby="form-notice"
      >
        <div className="form-grid">
          {fields.map((f) => (
            <div className="field" key={f.id}>
              <label htmlFor={f.id}>
                {f.label} {f.required ? '*' : <span>선택</span>}
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type || 'text'}
                autoComplete={f.auto}
                required={f.required}
                maxLength={f.max}
                aria-invalid={!!errors[f.id]}
                aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
              />
              {errors[f.id] && (
                <p id={`${f.id}-error`} className="field-error">
                  {errors[f.id]}
                </p>
              )}
            </div>
          ))}
          <div className="field full">
            <label id="service-label" htmlFor="service">
              제작하려는 영상 종류
            </label>
            <Select
              value={service}
              onValueChange={(value) => {
                setService(value || 'undecided');
                invalidate();
              }}
            >
              <SelectTrigger id="service" aria-labelledby="service-label">
                <SelectValue>
                  {options.find((o) => o.id === service)?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {options.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="field">
            <label htmlFor="organizationType">기관 유형 <span>선택</span></label>
            <select id="organizationType" name="organizationType" defaultValue="">
              <option value="">선택해 주세요</option>
              <option>공공기관·지자체</option>
              <option>기업·기관</option>
              <option>협회·단체</option>
              <option>기타</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="projectStage">사업 단계 <span>선택</span></label>
            <select id="projectStage" name="projectStage" defaultValue="">
              <option value="">선택해 주세요</option>
              <option>사업 구상 중</option>
              <option>과업지시서 준비 중</option>
              <option>제작사 검토 중</option>
              <option>일정 확정·긴급 문의</option>
            </select>
          </div>
          <div className="field full">
            <label htmlFor="projectName">
              사업/프로젝트명 <span>선택 · 가칭도 괜찮습니다</span>
            </label>
            <input id="projectName" name="projectName" maxLength={150} />
          </div>
          <div className="field">
            <label htmlFor="deadline">
              예상 일정 <span>선택</span>
            </label>
            <input
              id="deadline"
              name="deadline"
              maxLength={100}
              placeholder="미정 또는 희망 납품일"
            />
          </div>
          <div className="field">
            <label htmlFor="budget">
              예상 예산 <span>선택</span>
            </label>
            <input
              id="budget"
              name="budget"
              maxLength={100}
              placeholder="미정 · 협의 필요"
            />
          </div>
          <div className="field full">
            <label htmlFor="message">목적·문의 내용 *</label>
            <textarea
              id="message"
              name="message"
              maxLength={3000}
              required
              placeholder="누구에게 어떤 이야기를 전하고 싶으신가요?"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p className="field-error" id="message-error">
                {errors.message}
              </p>
            )}
          </div>
          <div className="field full">
            <label htmlFor="referenceUrl">
              참고 링크 <span>선택</span>
            </label>
            <input
              id="referenceUrl"
              name="referenceUrl"
              type="url"
              maxLength={1000}
              placeholder="https://"
              aria-invalid={!!errors.referenceUrl}
              aria-describedby={
                errors.referenceUrl ? 'referenceUrl-error' : undefined
              }
            />
            {errors.referenceUrl && (
              <p className="field-error" id="referenceUrl-error">
                {errors.referenceUrl}
              </p>
            )}
            <p className="form-help" style={{ margin: '12px 0 0' }}>
              과업지시서(HWP·HWPX·PDF)나 참고 파일은 이메일을 보낼 때 직접 첨부해 주세요.
            </p>
          </div>
        </div>
        <div className="form-actions">
          <button className="film-button" type="submit">
            이메일 문의 내용 만들기 <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </form>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
      {draft && (
        <div className="draft-preview field">
          <label htmlFor="inquiry-draft">정리된 문의 내용</label>
          <textarea ref={preview} id="inquiry-draft" value={draft} readOnly />
          <div className="form-actions">
            <button className="film-button" type="button" onClick={copy}>
              <Copy size={18} aria-hidden="true" />
              문의 내용 복사
            </button>
            <a
              className="film-button is-secondary"
              href={`mailto:${company.email}?subject=${encodeURIComponent('[영상 제작 상담] 디자인미창 문의')}&body=${encodeURIComponent(draft)}`}
              onClick={() =>
                setStatus(
                  '이메일 앱에서 수신 주소와 내용을 확인한 뒤 직접 발송해 주세요. 앱이 열리지 않으면 문의 내용을 복사해 이용하시는 메일에 붙여 넣으세요.',
                )
              }
            >
              <Mail size={18} aria-hidden="true" />
              이메일 앱 열기
            </a>
          </div>
          <p className="form-help" style={{ marginTop: 16 }}>
            이메일 앱이 없다면 내용을 복사해 {company.email}으로 보내주세요.
          </p>
        </div>
      )}
      <section className="privacy-note" id="privacy">
        <h3>문의 작성·개인정보 안내</h3>
        <p>
          입력 내용은 현재 브라우저 화면에서 문의 문장으로 정리할 때만 사용하며,
          이 사이트의 서버에 전송하거나 저장하지 않습니다. 페이지를 새로 열면
          입력 내용이 사라집니다.
        </p>
        <p>
          ‘문의 내용 복사’는 기기의 클립보드에 내용을 복사합니다. ‘이메일 앱
          열기’는 사용 중인 이메일 앱으로 내용을 전달하며, 실제 전송 여부와 첨부
          파일은 사용자가 직접 확인합니다. 주민등록번호 등 상담에 필요하지 않은
          민감한 정보는 적지 마세요.
        </p>
      </section>
    </div>
  );
}
