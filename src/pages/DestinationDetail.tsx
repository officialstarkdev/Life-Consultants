import { useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import MotionReveal from '../components/MotionReveal';
import InstitutionCard from '../components/InstitutionCard';
import { destinations } from '../data/destinations';
import { institutions } from '../data/institutions';
import { useSEO } from '../hooks/useSEO';
import { SpecularLink } from '../components/SpecularButton/SpecularButton';

export default function DestinationDetail() {
  const {country} = useParams();
  const destination = destinations.find((item) => item.slug === country);
  useSEO(
    destination ? `Study in ${destination.name} | Life Consultants` : 'Destination | Life Consultants',
    destination?.description || 'Study destination information from Life Consultants.',
  );

  if (!destination) return <PageHero eyebrow="Destination" title="Destination not found" />;

  const destinationInstitutions = institutions.filter((item) => item.country === destination.name);

  return (
    <>
      <PageHero eyebrow={`Study in ${destination.name}`} title={destination.name} body={destination.description} image={destination.image} />
      <section className="section-pad">
        <div className="container-site grid lg:grid-cols-[1.2fr_.8fr] gap-10">
          <MotionReveal>
            <div>
              <h2 className="title-lg">Overview</h2>
              <p className="mt-5 text-slate-600 leading-8">{destination.description}</p>
              <p className="mt-4 text-slate-600 leading-8">Speak with the counselling team for current university options, admissions requirements and visa guidance for your profile.</p>
            </div>
          </MotionReveal>
          <MotionReveal delay={.06}>
            <aside className="bg-[#f5f9ff] p-7">
              <h3 className="font-display font-bold text-xl">Need personalized guidance?</h3>
              <p className="text-sm leading-6 text-slate-600 mt-3">Discuss your qualification, study level and destination preferences with Life Consultants.</p>
              <SpecularLink className="mt-6" to="/contact#consultation">Book Consultation</SpecularLink>
            </aside>
          </MotionReveal>
        </div>
      </section>

      {destinationInstitutions.length > 0 && (
        <section className="section-pad bg-[#f5f9ff]">
          <div className="container-site">
            <h2 className="title-lg">Institutions listed for {destination.name}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {destinationInstitutions.map((institution, i) => (
                <MotionReveal key={institution.name} delay={(i % 3) * .04}>
                  <InstitutionCard institution={institution} />
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
