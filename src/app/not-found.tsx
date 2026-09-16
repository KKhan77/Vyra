import { ButtonLink, SectionLabel } from '@/components/ui';
import { Spark } from '@/components/icons';
export default function NotFound() {
  return <section className="not-found content-width"><SectionLabel>404 / OUT OF FRAME</SectionLabel><Spark size={90} /><h1>This frame<br />isn’t here.</h1><p>But there’s a whole world of possibilities to explore.</p><ButtonLink href="/">Back to the bigger picture</ButtonLink></section>;
}
