import { createHash, timingSafeEqual } from 'crypto';

const hash = (value) => createHash('sha256').update(String(value)).digest();

// The GHL embed cannot use the timesheet login, so the report has its own
// long private key. Without TEAM_REPORT_KEY the report stays closed.
export function validReportKey(value) {
  const expected = process.env.TEAM_REPORT_KEY;
  if (!expected || expected.length < 32 || !value) return false;
  return timingSafeEqual(hash(value), hash(expected));
}
