import { CALLER_PRESETS } from './callers';
import { PERSON_RESULTS, normalizeResult } from './calls';

const GHL_API = 'https://services.leadconnectorhq.com';
const CACHE_MS = 60000;
const TIMEOUT_MS = 20000;
const MAX_PAGES = 20;
const cache = new Map();

async function ghlGet(path, token) {
  const res = await fetch(`${GHL_API}${path}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { Authorization: `Bearer ${token}`, Version: '2021-07-28', Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`GHL ${res.status}`);
  return res.json();
}

// GHL call records carry no disposition, so a GHL caller's results come from
// their pipeline: each card's stage and the time it last moved. A contact who
// later moves to another result counts once, under the newer result.
export async function fetchPipelineResults(start, end) {
  const cacheKey = `${start.toISOString()}|${end.toISOString()}`;
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.value;
  const token = process.env.TEAM_GHL_TOKEN || process.env.GHL_API_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  if (!token || !location) return { ok: false, results: [] };
  try {
    const pipelines = (await ghlGet(`/opportunities/pipelines?locationId=${encodeURIComponent(location)}`, token)).pipelines || [];
    const results = [];
    for (const caller of CALLER_PRESETS.filter((c) => c.pipelineId)) {
      const pipeline = pipelines.find((p) => p.id === caller.pipelineId);
      if (!pipeline) throw new Error('pipeline missing');
      // Only stages that mean a person was reached; the rest are large and not needed.
      const stages = (pipeline.stages || []).map((s) => ({ id: s.id, result: normalizeResult(s.name) })).filter((s) => PERSON_RESULTS.has(s.result));
      await Promise.all(stages.map(async (stage) => {
        for (let page = 1; page <= MAX_PAGES; page += 1) {
          const params = new URLSearchParams({
            location_id: location, pipeline_id: caller.pipelineId, pipeline_stage_id: stage.id, status: 'all', limit: '100', page: String(page),
          });
          const items = (await ghlGet(`/opportunities/search?${params}`, token)).opportunities || [];
          for (const item of items) {
            const at = new Date(item.lastStageChangeAt || item.updatedAt);
            if (at >= start && at < end) results.push({ userId: caller.ghlUserId, result: stage.result, at: at.toISOString() });
          }
          if (items.length < 100) break;
        }
      }));
    }
    const value = { ok: true, results };
    cache.set(cacheKey, { at: Date.now(), value });
    return value;
  } catch {
    return { ok: false, results: [] };
  }
}
