import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Destination } from '../data/destinations';

type Props = {
  destination: Destination;
  variant?: 'home' | 'grid';
  duplicate?: boolean;
};

const supportPoints = [
  'University & course selection support',
  'Application and document guidance',
  'Visa counselling & interview preparation',
];

export default function DestinationCard({ destination, variant = 'home', duplicate = false }: Props) {
  return (
    <Link
      to={`/study-destinations/${destination.slug}`}
      className={`destination-card destination-card--${variant} ${destination.hoverImage ? 'destination-card--has-hover' : ''}`}
      aria-label={duplicate ? undefined : `Explore study options in ${destination.name}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : 0}
    >
      <img
        className="destination-card__image destination-card__image--primary"
        src={destination.image}
        alt=""
        loading="lazy"
        decoding="async"
      />
      {destination.hoverImage && (
        <img
          className="destination-card__image destination-card__image--hover"
          src={destination.hoverImage}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="destination-card__shade" />

      <div className="destination-card__default">
        <span className="destination-card__flag" aria-hidden="true">{destination.flag}</span>
        <h3>{destination.name}</h3>
      </div>

      <div className="destination-card__hover">
        <div>
          <div className="destination-card__hover-kicker">Study in</div>
          <h3>{destination.name}</h3>
          <p>{destination.description}</p>
          <ul>
            {supportPoints.map((point) => (
              <li key={point}>
                <CheckCircle2 size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <span className="destination-card__explore">
          Explore destination <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
