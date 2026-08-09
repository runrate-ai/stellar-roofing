import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { projectPhotos } from '../../lib/funnel-trust';

// Renders nothing until real completed-job photos are added to
// lib/funnel-trust.js — an empty section beats a section of stock houses
// captioned as your work.
export default function ProjectGallery() {
  if (projectPhotos.length === 0) return null;

  return (
    <section className="bg-white border-t border-slate-100 py-14 lg:py-18 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-primary text-center mb-3">
          Recent Roofs We&apos;ve Completed
        </h2>
        <p className="text-text-muted text-lg text-center mb-11 max-w-2xl mx-auto">
          Real homes, real crews, right here in Middle Tennessee.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectPhotos.map(project => (
            <figure
              key={project.src}
              className="group overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {(project.city || project.service) && (
                <figcaption className="px-4 py-3">
                  {project.service && (
                    <p className="font-bold text-primary text-sm">{project.service}</p>
                  )}
                  {project.city && (
                    <p className="flex items-center gap-1 text-text-muted text-xs mt-0.5">
                      <MapPin size={12} /> {project.city}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
