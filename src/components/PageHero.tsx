import { motion, useReducedMotion } from 'framer-motion';
import MotionReveal from './MotionReveal';

const heroImages: Record<string, string> = {
  services: '/images/hero/services-hero.png',
  destinations: '/images/hero/destinations-hero.png',
  institutions: '/images/hero/institutions-hero.png',
  success: '/images/hero/success-hero.png',
  gallery: '/images/hero/gallery-hero.png',
  certifications: '/images/hero/certifications-hero.png',
  blog: '/images/gallery/010_WhatsApp-Image-2025-02-04-at-5.07.04-PM-768x432.jpeg',
  contact: '/images/hero/contact-hero.png',
  about: '/images/hero/about-hero.png',
  leadership: '/images/owner_team/shahid-ghani-ceo-message.jpeg',
  destination: '/images/hero/destinations-hero.png',
};

function pickImage(eyebrow: string, title: string) {
  const value = `${eyebrow} ${title}`.toLowerCase();
  if (value.includes('service')) return heroImages.services;
  if (value.includes('destination') || value.includes('study in')) return heroImages.destinations;
  if (value.includes('institution')) return heroImages.institutions;
  if (value.includes('success')) return heroImages.success;
  if (value.includes('gallery')) return heroImages.gallery;
  if (value.includes('certif')) return heroImages.certifications;
  if (value.includes('blog') || value.includes('video') || value.includes('news')) return heroImages.blog;
  if (value.includes('contact') || value.includes('touch')) return heroImages.contact;
  if (value.includes('leadership') || value.includes('ceo')) return heroImages.leadership;
  if (value.includes('about')) return heroImages.about;
  return heroImages.destination;
}

export default function PageHero({
  eyebrow,
  title,
  body,
  image,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  image?: string;
}) {
  const reduce = useReducedMotion();
  const heroImage = image || pickImage(eyebrow, title);

  return (
    <section className="page-hero text-white relative overflow-hidden">
      <motion.img
        className="page-hero__image"
        src={heroImage}
        alt=""
        aria-hidden="true"
        decoding="async"
        initial={reduce ? false : { opacity: 0, scale: 1.035 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <div className="page-hero__overlay" />
      <div className="container-site page-hero__inner">
        <MotionReveal>
          <div className="text-blue-300 uppercase tracking-[.18em] text-xs font-bold">{eyebrow}</div>
          <h1 className="title-xl mt-4 max-w-4xl">{title}</h1>
          {body && <p className="mt-6 max-w-2xl text-white/75 leading-7">{body}</p>}
        </MotionReveal>
      </div>
    </section>
  );
}
