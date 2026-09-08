import PageHero from '../components/PageHero';
import MotionReveal from '../components/MotionReveal';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';
import { useSEO } from '../hooks/useSEO';

export default function Destinations(){
  useSEO('Study Destinations | Life Consultants','Explore countries represented by Life Consultants for study abroad guidance.');
  return <>
    <PageHero eyebrow="Study Destinations" title="Countries represented by LIFE" body="Explore all countries publicly listed on the Life Consultants website."/>
    <section className="section-pad">
      <div className="container-site grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((d,i)=><MotionReveal delay={(i%3)*.05} key={d.slug}><DestinationCard destination={d} variant="grid"/></MotionReveal>)}
      </div>
    </section>
  </>
}
