// Trusty embeds of Stellar's completed jobs.
//
// The gallery scrolls sideways on phones (two rows), so a fixed height shows
// all of it without trapping vertical scroll. The map can grab touch scrolling
// on phones, so pages decide where to show it.
export function ProjectGalleryEmbed({ src, title = 'Photos of recent Stellar Roofing projects' }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
      <iframe src={src} title={title} className="w-full h-[640px] md:h-[680px] border-0 block" allow="fullscreen" loading="lazy" />
    </div>
  );
}

export function ProjectMapEmbed({ src, className = 'h-[480px] md:h-[560px]', title = 'Map of recent Stellar Roofing projects in Middle Tennessee' }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
      <iframe src={src} title={title} className={`w-full border-0 block ${className}`} allow="fullscreen" loading="lazy" />
    </div>
  );
}
