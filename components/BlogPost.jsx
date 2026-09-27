import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import CTABanner from './CTABanner';
import FAQ from './FAQ';
import SchemaMarkup from './SchemaMarkup';
import { articleSchema, faqSchema } from '../lib/schema';
import blogPosts, { BLOG_BASE, getPost, postPath } from '../lib/blog-posts';
import config from '../lib/config';

const loc = config.locations.nashville;

function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPost({ slug, crumb, faqs = null, children }) {
  const post = getPost(slug);
  const path = postPath(slug);
  const related = post.related.map(s => blogPosts.find(p => p.slug === s)).filter(Boolean);
  const service = config.services.find(s => s.slug === post.relatedService);

  return (
    <>
      <SchemaMarkup schema={articleSchema({ title: post.title, description: post.description, path, datePublished: post.datePublished })} />
      {faqs && <SchemaMarkup schema={faqSchema(faqs)} />}

      <Breadcrumbs items={[
        { name: "Home", path: "/nashville" },
        { name: "Blog", path: BLOG_BASE },
        { name: crumb || post.title, path },
      ]} />

      <section className="bg-primary py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-cta mb-3 block">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">{post.title}</h1>
          <p className="text-white/70 text-sm">{post.readTime} · <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time></p>
        </div>
      </section>

      <article className="py-12 px-4">
        <div className="article-body max-w-3xl mx-auto">
          {children}
        </div>
      </article>

      <section className="pb-16 px-4">
        <div className="max-w-3xl mx-auto border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold text-primary mb-6">Related Guides</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {related.map(p => (
              <Link key={p.slug} href={postPath(p.slug)} className="group bg-bg-alt rounded-xl p-5 hover:shadow-md transition-shadow">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">{p.category}</span>
                <h3 className="font-bold text-primary mt-2 group-hover:underline">{p.title}</h3>
              </Link>
            ))}
          </div>
          {service && (
            <Link href={`/nashville/services/${service.slug}`} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
              {service.name} in Nashville, TN <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>

      {faqs && <FAQ faqs={faqs} />}
      <CTABanner phone={loc.phone} phoneRaw={loc.phoneRaw} />
    </>
  );
}
