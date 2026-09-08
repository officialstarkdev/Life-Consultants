import { Landmark, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Institution } from '../data/institutions';

export default function InstitutionCard({ institution }: { institution: Institution }) {
  const reduce = useReducedMotion();
  const initials = institution.name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return (
    <motion.article
      className="institution-card"
      tabIndex={0}
      whileHover={reduce ? undefined : { y: -7 }}
      whileFocus={reduce ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
    >
      {institution.image ? (
        <img className="institution-card__image" src={institution.image} alt="" loading="lazy" decoding="async" />
      ) : (
        <div className="institution-card__fallback" aria-hidden="true">
          <Landmark size={34} />
          <span>{initials}</span>
        </div>
      )}
      <div className="institution-card__shade" />
      <div className="institution-card__content">
        <div className="institution-card__country"><MapPin size={14} /> {institution.country}</div>
        <h3>{institution.name}</h3>
      </div>
    </motion.article>
  );
}
