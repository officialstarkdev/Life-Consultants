import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../data/blog';

interface MediaCardProps {
  post: BlogPost;
  index: number;
}

export default function MediaCard({ post, index }: MediaCardProps) {
  const reduce = useReducedMotion();
  const isVideo = Boolean(post.video);
  const targetUrl = isVideo ? post.video : `/blog/${post.slug}`;
  const isExternal = isVideo;

  const cardContent = (
    <div className="h-full flex flex-col">
      {/* Thumbnail Container (Edge-to-Edge 16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 shrink-0">
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
          />
        )}
        
        {/* Subtle Dark Gradient Overlay at Bottom for Video Cards */}
        {isVideo && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1733]/60 via-transparent to-transparent pointer-events-none" />
        )}

        {/* Centered Play Button Icon for Videos */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm border border-white flex items-center justify-center text-blue-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
              <Play size={24} className="ml-1 fill-current" />
            </div>
          </div>
        )}
      </div>

      {/* Card Content Area (16px Padding) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Meta Line */}
        <div className="text-blue-600 text-[0.8rem] uppercase font-bold tracking-[0.03em]">
          {post.category} · {post.date}
        </div>

        {/* Title */}
        <h3 className="text-[#0b1733] font-bold text-[1.08rem] leading-snug line-clamp-2 mt-2.5 group-hover:text-blue-600 transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 text-[0.9rem] leading-relaxed line-clamp-3 mt-2.5">
          {post.excerpt}
        </p>

        {/* Link / CTA */}
        <div className="mt-auto pt-4 flex items-center gap-2 text-blue-600 font-bold text-[0.875rem]">
          <span>{isVideo ? 'Watch Video' : 'Read Article'}</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-200 ease-out group-hover:translate-x-1 text-blue-600"
          />
        </div>
      </div>
    </div>
  );

  const containerClasses =
    'group block h-full rounded-[14px] overflow-hidden bg-white border border-[#dfe6ef] shadow-[0_4px_18px_rgba(11,34,72,0.06)] transition-all duration-250 ease-out hover:-translate-y-[6px] hover:shadow-[0_24px_52px_rgba(11,34,72,0.13)] hover:border-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600';

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      {isExternal ? (
        <a
          href={targetUrl}
          target="_blank"
          rel="noreferrer"
          className={containerClasses}
        >
          {cardContent}
        </a>
      ) : (
        <Link to={targetUrl} className={containerClasses}>
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}
