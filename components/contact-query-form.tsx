'use client';
import { useSearchParams } from 'next/navigation';
import ContactForm from '@/components/contact-form';
import { videoServices } from '@/lib/film-content';
export default function ContactQueryForm() {
  const query = useSearchParams();
  const value = query.get('service');
  const service = videoServices.some((s) => s.id === value)
    ? value!
    : 'undecided';
  const project = query.get('project') === 'gunpo' ? 'gunpo' : undefined;
  return (
    <ContactForm
      key={`${service}:${project || ''}`}
      initialService={service}
      initialProject={project}
    />
  );
}
