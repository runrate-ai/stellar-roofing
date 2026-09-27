import Link from 'next/link';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CTABanner from '../../../components/CTABanner';
import blogPosts, { BLOG_BASE, postPath } from '../../../lib/blog-posts';
import { generateMetadata } from '../../../lib/seo';
import config from '../../../lib/config';

const loc = config.locations.nashville;

const title = 'Roofing Guides for Nashville Homeowners | Stellar Roofing Blog';

export const metadata = {
  ...generateMetadata({
    title,
    description: 'Roofing guides for Nashville and Middle Tennessee homeowners: roof replacement cost, hail damage and insurance claims, shingle lifespan, and how to hire a roofer.',
    path: BLOG_BASE,
  }),
  title: { absolute: title },
};

export default function BlogIndex() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/nashville" }, { name: "Blog", path: BLOG_BASE }]} />

      <section className="bg-primary py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Roofing Guides for Nashville Homeowners</h1>
          <p className="text-white/80 text-lg">Straight answers on roof costs, storm damage, insurance claims, and materials from a local Middle Tennessee roofing team.</p>
        </div>
      </section>

      <section className="py-14 px-4 bg-bg-alt">
        <div className="max-w-4xl mx-auto grid gap-6">
          {blogPosts.map(post => (
            <Link key={post.slug} href={postPath(post.slug)} className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-bg-alt px-2.5 py-1 rounded-full">{post.category}</span>
                <span className="text-xs text-text-muted">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-primary mb-2 group-hover:underline">{post.title}</h2>
              <p className="text-text-muted leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <CTABanner heading="Have a Question About Your Roof?" subtext="Get a free, no-pressure inspection and an honest answer from our Nashville team." phone={loc.phone} phoneRaw={loc.phoneRaw} />
    </>
  );
}
