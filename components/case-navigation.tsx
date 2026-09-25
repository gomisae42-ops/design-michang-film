'use client';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
export function CaseNavigation({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id || '');
  const [expanded, setExpanded] = useState<string[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -60% 0px' },
    );
    items.forEach((item) => {
      const node = document.getElementById(item.id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [items]);
  if (items.length < 2) return null;
  const links = items.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      aria-current={active === item.id ? 'location' : undefined}
      onClick={() => {
        setActive(item.id);
        setExpanded([]);
      }}
    >
      {item.label}
    </a>
  ));
  return (
    <>
      <nav className="film-case-toc" aria-label="사례 목차">
        {links}
      </nav>
      <Accordion
        value={expanded}
        onValueChange={(value) => setExpanded(value as string[])}
        className="case-mobile-toc"
      >
        <AccordionItem value="toc">
          <AccordionTrigger>사례 목차</AccordionTrigger>
          <AccordionContent>
            <nav aria-label="모바일 사례 목차">{links}</nav>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
