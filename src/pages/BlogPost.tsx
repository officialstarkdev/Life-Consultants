import { ArrowLeft, Calendar, PlayCircle, ShieldCheck, Tag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { posts } from '../data/blog';
import { useSEO } from '../hooks/useSEO';

export default function BlogPost() {
  const { slug } = useParams();
  const p = posts.find((x) => x.slug === slug);

  useSEO(
    p ? `${p.title} | Life Consultants` : 'Blog | Life Consultants',
    p?.excerpt || 'Life Consultants blog and video update.'
  );

  if (!p) {
    return <PageHero eyebrow="Blog" title="Post Not Found" body="The requested article could not be located." />;
  }

  const paragraphs = p.content ? p.content.split('\n\n') : [];

  return (
    <>
      <PageHero eyebrow={p.category} title={p.title} body={p.date} image={p.thumbnail} />
      
      <article className="section-pad bg-[#f5f9ff] text-slate-800">
        <div className="container-site max-w-4xl">
          {/* Back Navigation */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm mb-8 hover:underline"
          >
            <ArrowLeft size={16} /> Back to News & Blog
          </Link>

          <div className="bg-white border border-[#dfe6ef] rounded-2xl p-6 sm:p-10 shadow-[0_12px_36px_rgba(11,34,72,0.06)]">
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-6 mb-8">
              <span className="inline-flex items-center gap-1.5 font-bold text-blue-600 uppercase tracking-wider">
                <Tag size={14} /> {p.category}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} /> {p.date}
              </span>
            </div>

            {/* Featured Image if present */}
            {p.thumbnail && (
              <div className="mb-8 rounded-xl overflow-hidden aspect-video w-full bg-slate-100 border border-slate-200">
                <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Article Content / Paragraphs */}
            {p.content ? (
              <div className="space-y-6 text-slate-700 leading-8 text-base">
                {paragraphs.map((para, idx) => {
                  const trimmed = para.trim();
                  // Check if paragraph is a heading (numbered heading or short title)
                  const isHeading =
                    /^[0-9]+\.\s/.test(trimmed) ||
                    (!trimmed.endsWith('.') && trimmed.length < 80 && !trimmed.includes('\n'));

                  if (isHeading) {
                    return (
                      <h3
                        key={idx}
                        className="font-display font-bold text-xl sm:text-2xl text-[#0b1733] pt-4 border-t border-slate-100"
                      >
                        {trimmed}
                      </h3>
                    );
                  }

                  return (
                    <p key={idx} className="text-slate-600 text-base leading-relaxed">
                      {trimmed}
                    </p>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-lg text-slate-700 leading-relaxed font-medium">{p.excerpt}</p>
                {p.video && (
                  <div className="pt-4">
                    <a
                      href={p.video}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md"
                    >
                      <PlayCircle size={20} /> Watch Source Video on YouTube
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Author / CTA Box */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-slate-50/80 p-6 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0b1733] text-base">Life Consultants & Law Associates</h4>
                  <p className="text-xs text-slate-500"> Lahore-based study abroad & visa consultancy since 1999</p>
                </div>
              </div>
              <Link
                to="/contact#consultation"
                className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition shrink-0"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
