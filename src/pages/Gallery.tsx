import { motion, useReducedMotion } from 'framer-motion';
import PageHero from '../components/PageHero';
import MotionReveal from '../components/MotionReveal';
import { galleryImages } from '../data/media';
import { useSEO } from '../hooks/useSEO';

export default function Gallery() {
  useSEO('Gallery | Life Consultants', 'Life Consultants gallery.');
  const reduce = useReducedMotion();

  return (
    <>
      <PageHero eyebrow="Gallery" title="Explore our company" body="Company, education-event and institutional-engagement photographs stored locally in the project." />
      <section className="section-pad">
        <div className="container-site gallery-grid">
          {galleryImages.map((image, i) => (
            <MotionReveal key={image} delay={(i % 4) * 0.035}>
              <motion.figure
                className="gallery-card"
                whileHover={reduce ? undefined : { y: -5 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <img src={image} alt={`Life Consultants gallery photo ${i + 1}`} loading="lazy" decoding="async" />
                <div className="gallery-card__overlay" />
              </motion.figure>
            </MotionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
