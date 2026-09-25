'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
const items = [
  {
    id: 'documentary',
    name: '다큐멘터리',
    desc: '사람과 기술, 지역의 이야기를 기록할 때',
    image: '/media/home-gunpo/story-rear.webp',
    alt: '기계 앞에서 작업하는 군포 소공인의 뒷모습',
  },
  {
    id: 'public',
    name: '공공기관 홍보영상',
    desc: '기관의 역할과 사업의 가치를 전할 때',
  },
  {
    id: 'results',
    name: '사업성과 영상',
    desc: '사업의 과정과 변화를 함께 나눌 때',
  },
  {
    id: 'interview',
    name: '인터뷰·스토리',
    desc: '사람의 목소리로 이야기를 전할 때',
  },
  {
    id: 'corporate',
    name: '기업 홍보영상',
    desc: '기업의 기술과 철학을 소개할 때',
  },
  { id: 'event', name: '행사·기록', desc: '함께한 순간을 오래 남길 때' },
  { id: 'shortform', name: '숏폼·SNS', desc: '짧은 시간 안에 핵심을 전할 때' },
];
export default function HomeServices() {
  const [active, setActive] = useState('documentary');
  const item = items.find((x) => x.id === active);
  return (
    <div className="home-services-grid">
      <div
        className="home-services-list"
        onMouseLeave={() => setActive('documentary')}
      >
        {items.map((s, i) => (
          <Link
            key={s.id}
            data-color-reveal={
              ['violet', 'red', 'orange', 'pink', 'aqua', 'lime', 'yellow'][i]
            }
            data-reveal-mobile={i === 0 ? '' : undefined}
            href={`/video/#${s.id}`}
            onMouseEnter={() => setActive(s.id)}
            onFocus={() => setActive(s.id)}
            className={active === s.id ? 'is-active' : ''}
          >
            <span className="home-index">0{i + 1}</span>
            <div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
            <ArrowUpRight aria-hidden="true" size={23} />
          </Link>
        ))}
      </div>
      <div className="home-service-visual" aria-hidden="true">
        {item?.image && (
          <figure key={item.id}>
            <Image
              src={item.image}
              alt=""
              width={1600}
              height={708}
              sizes="36vw"
            />
            <figcaption>군포 소공인 다큐멘터리 · 실제 영상 스틸</figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}
