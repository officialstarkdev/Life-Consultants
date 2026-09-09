import PageHero from '../components/PageHero';
import MediaCard from '../components/MediaCard';
import { posts } from '../data/blog';
import { useSEO } from '../hooks/useSEO';

export default function Blog() {
  useSEO('Blog & Videos | Life Consultants', 'News, videos and blog articles from Life Consultants.');
  return (
    <>
      <PageHero
        eyebrow="News, Videos & Blog"
        title="Watch and read the latest updates"
        body="Educational articles, video updates and study visa guidance published by Life Consultants."
        image="/images/hero/blog-hero.png"
      />
      <section className="section-pad bg-[#f5f9ff]">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {posts.map((post, i) => (
              <MediaCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
