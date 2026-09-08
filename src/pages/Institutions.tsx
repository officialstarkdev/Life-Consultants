import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import MotionReveal from '../components/MotionReveal';
import InstitutionCard from '../components/InstitutionCard';
import { institutions } from '../data/institutions';
import { useSEO } from '../hooks/useSEO';

const slugToCountry: Record<string, string> = {
  'united-states': 'United States',
  'united-kingdom': 'United Kingdom',
  canada: 'Canada',
  australia: 'Australia',
};

export default function Institutions() {
  useSEO('Institutions | Life Consultants', 'Browse institutions publicly listed by Life Consultants.');
  const { country } = useParams();
  const countries = ['All', ...Array.from(new Set(institutions.map((x) => x.country)))];
  const routeFilter = country ? slugToCountry[country] : undefined;
  const [filter, setFilter] = useState(routeFilter || 'All');

  useEffect(() => {
    setFilter(routeFilter || 'All');
  }, [routeFilter]);

  const rows = useMemo(
    () => filter === 'All' ? institutions : institutions.filter((x) => x.country === filter),
    [filter],
  );

  return (
    <>
      <PageHero
        eyebrow="Institutions"
        title="Institutions represented by LIFE Consultants"
        body="Browse universities by destination. Matching campus images from the local public folder are used where available."
      />
      <section className="section-pad">
        <div className="container-site">
          <div className="institution-filters" aria-label="Filter institutions by country">
            {countries.map((item) => (
              <button
                type="button"
                onClick={() => setFilter(item)}
                key={item}
                className={filter === item ? 'is-active' : ''}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
            {rows.map((item, i) => (
              <MotionReveal key={item.name} delay={(i % 3) * 0.04}>
                <InstitutionCard institution={item} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
