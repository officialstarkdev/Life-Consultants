import { ArrowRight, PlayCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import MotionReveal from '../components/MotionReveal';
import { posts } from '../data/blog';
import { useSEO } from '../hooks/useSEO';

export default function Blog() {
  useSEO('Blog & Videos | Life Consultants', 'News, videos and blog updates from Life Consultants.');
  return (
    <>
      <PageHero eyebrow="News, Videos & Blog" title="Watch and read the latest updates" body="Video updates and guidance published by Life Consultants." />
      <section className="section-pad">
        <div className="container-site grid md:grid-cols-2 gap-6 items-stretch">
          {posts.map((post, i) => (
            <MotionReveal key={post.slug} delay={(i % 2) * 0.06} className="h-full">
              <a href={post.video || '#'} target="_blank" rel="noreferrer" className="video-card group">
                <div className="video-card__media video-card__media--large">
                  {post.thumbnail && <img src={post.thumbnail} alt="" loading="lazy" />}
                  <div className="video-card__shade" />
                  <PlayCircle className="video-card__play" size={62} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-blue-600 uppercase tracking-widest font-bold">{post.category} · {post.date}</div>
                  <h2 className="font-display font-bold text-2xl mt-3 text-[#0b1733] group-hover:text-blue-600 transition">{post.title}</h2>
                  <p className="mt-4 text-slate-600 leading-7">{post.excerpt}</p>
                  <span className="mt-auto pt-5 inline-flex items-center gap-2 text-blue-600 font-bold">Watch Video <ArrowRight size={17} /></span>
                </div>
              </a>
            </MotionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
