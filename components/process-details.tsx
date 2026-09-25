'use client';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
export function ProcessDetails({ text }: { text: string }) {
  return (
    <Accordion className="step-detail">
      <AccordionItem value="details">
        <AccordionTrigger>단계별 작업 자세히 보기</AccordionTrigger>
        <AccordionContent>{text}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
