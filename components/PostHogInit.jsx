'use client';
import { useEffect } from 'react';
import posthog from 'posthog-js';
import config from '../lib/config';

// PostHog: page views, clicks, and session recordings for the funnel and the
// main site. Everything typed into a field is masked in recordings, so names,
// phone numbers, and addresses never leave the page through PostHog.
export default function PostHogInit() {
  useEffect(() => {
    const { key, host } = config.analytics.posthog;
    if (!key || posthog.__loaded) return;
    posthog.init(key, {
      api_host: host,
      defaults: '2025-05-24',
      // Visitors are anonymous here: no profiles, and nothing ties a
      // recording to the lead's contact details.
      person_profiles: 'identified_only',
      session_recording: { maskAllInputs: true },
    });
  }, []);
  return null;
}
