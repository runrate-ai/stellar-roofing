import { currentUser, failure, json } from '../../../../lib/team/auth';
import { TEAM_URL } from '../../../../lib/team/host';

export const dynamic = 'force-dynamic';

// Shows the private embed link to a logged-in admin so it never has to be
// pasted into chat or saved in a file.
export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return json({ error: 'Please log in.' }, 401);
    if (user.role !== 'admin' || user.must_change) return json({ error: 'Not allowed.' }, 403);
    const key = process.env.TEAM_REPORT_KEY;
    if (!key) return json({ error: 'The report key is not set.' }, 503);
    return new Response(`${TEAM_URL}/report/${key}\n`, { headers: {
      'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow',
    } });
  } catch (err) {
    return failure(err);
  }
}
