'use client';
import { usePathname } from 'next/navigation';
import FunnelForm from './funnel/FunnelForm';

// The main site's lead form: the same 3-step form as the PPC funnel, which
// writes the lead straight to GHL (tags website-lead + market) and then sends
// the visitor to /thank-you, where generate_lead fires.
export default function SiteLeadForm({ title, id = 'estimate', showMessage = false }) {
  const pathname = usePathname() || '/';
  const market = pathname.startsWith('/boise') ? 'boise' : 'nashville';

  return (
    <FunnelForm
      id={id}
      heading={title || 'Get Your Free Roof Inspection'}
      leadSource="website"
      market={market}
      funnelSlug={`website${pathname.replace(/\//g, '-')}`.replace(/-$/, '')}
      thankYouHref={m => `/thank-you${m === 'boise' ? '?market=boise' : ''}`}
      showMessage={showMessage}
    />
  );
}
