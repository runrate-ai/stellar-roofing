'use client';
import { useEffect } from 'react';
import { metaTrack } from './funnel/tracking';

// Extra Meta Pixel events for retargeting audiences, each sent at most once
// per browser session:
//   EngagedVisit: 60 seconds of visible time on the site, or scrolled 75% of a page
//   RoofleOpen:   clicked the Roofle "Instant Roof Quote" button
//   ChatOpen:     clicked the GHL chat bubble
// metaTrack does nothing when the pixel isn't loaded (local development) and
// skips Boise pages.
function oncePerSession(key, send) {
  try {
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, '1');
  } catch {
    if (window[`__${key}`]) return;
    window[`__${key}`] = true;
  }
  send();
}

export default function MetaEngagement() {
  useEffect(() => {
    const engaged = () => oncePerSession('metaEngagedVisit', () => metaTrack('EngagedVisit', {}, undefined, 'trackCustom'));

    // Time on site: count 5-second ticks only while the tab is visible.
    let seconds = 0;
    const timer = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      seconds += 5;
      if (seconds >= 60) {
        clearInterval(timer);
        engaged();
      }
    }, 5000);

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.75) engaged();
    };

    // Clicks inside the chat widget's shadow DOM reach the document with the
    // <chat-widget> host as their target.
    const onClick = event => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('#quick-quote-button, #quick-quote-callout-text-block')) {
        oncePerSession('metaRoofleOpen', () => metaTrack('RoofleOpen', {}, undefined, 'trackCustom'));
      }
      if (target.closest('chat-widget')) {
        oncePerSession('metaChatOpen', () => metaTrack('ChatOpen', {}, undefined, 'trackCustom'));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick, true);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  return null;
}
