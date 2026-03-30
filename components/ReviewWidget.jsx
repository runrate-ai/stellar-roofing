'use client';
import { useEffect } from 'react';
import config from '../lib/config';

export default function ReviewWidget() {
  const widgetId = config.ghl.reviewWidgetId;

  useEffect(() => {
    if (widgetId && widgetId !== 'REPLACE_WITH_GHL_REVIEW_WIDGET_ID') {
      const script = document.createElement('script');
      script.src = "https://widgets.msgsndr.com/js/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [widgetId]);

  if (!widgetId || widgetId === 'REPLACE_WITH_GHL_REVIEW_WIDGET_ID') {
    return null; // Fallback cards are already in app/page.js
  }

  return (
    <div className="w-full min-h-[400px]">
      <div 
        className="ghl-reviews-widget" 
        data-widget-id={widgetId}
      ></div>
    </div>
  );
}
