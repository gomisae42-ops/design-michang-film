'use client';
import { useState } from 'react';
import { services, previewMode } from '@/lib/content';
import { ExampleCard } from '@/components/site';
export default function WorksFilter(){const [selected,setSelected]=useState('all');const shown=services.filter(s=>selected==='all'||s.id===selected);return <><div className="filters" role="group" aria-label="제작 분야 필터">{[{id:'all',name:'전체'},...services].map(s=><button key={s.id} className="filter" aria-pressed={s.id===selected} onClick={()=>setSelected(s.id)}>{s.name}</button>)}</div>{previewMode?<><p className="form-help" role="status">{selected==='all'?'전체':services.find(s=>s.id===selected)?.name} 디자인 예시 {shown.length}개</p><div className="work-grid">{shown.map(s=><ExampleCard key={s.id} s={s}/>)}</div></>:<p className="notice">공개 가능한 제작 사례를 준비하고 있습니다. 서비스 페이지에서 제작 범위를 확인해 주세요.</p>}</>}
