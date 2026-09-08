import PageHero from '../components/PageHero';
import MotionReveal from '../components/MotionReveal';
import SectionTitle from '../components/SectionTitle';
import { team, ceo } from '../data/team';
import { useSEO } from '../hooks/useSEO';
import GlareHover from '../components/GlareHover/GlareHover';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';

export default function About() {
  useSEO('About | Life Consultants','Learn about Life Consultants & Law Associates, established in 1999 for foreign education guidance.');

  return (
    <>
      <PageHero
        eyebrow="About Company"
        title="Welcome to Life Consultants & Law Associates"
        body="The Leading Institute for Foreign Education (LIFE) was established in 1999 with the vision to familiarize Pakistani students with foreign education opportunities worldwide."
      />

      <section className="section-pad">
        <div className="container-site grid lg:grid-cols-2 gap-14 items-center">
          <MotionReveal><GlareHover className="about-glare rounded-xl shadow-[0_24px_60px_rgba(7,21,47,.14)]"><div className="about-photo h-[520px]" /></GlareHover></MotionReveal>
          <MotionReveal delay={.06}>
            <SectionTitle eyebrow="About LIFE" title="Foreign education guidance since 1999" />
            <p className="mt-6 text-slate-600 leading-8">Life Consultants provides study-abroad counselling, admission support, document preparation and visa guidance for students exploring international education opportunities.</p>
            <div className="mt-7 grid sm:grid-cols-3 gap-4">
              {['Career Counselling','Direct Online Interview','Visa Guidance'].map((item) => (
                <SpotlightCard className="premium-card-shell" spotlightColor="rgba(22, 93, 255, .12)" key={item}><div className="about-feature-card p-4 border border-slate-200 font-semibold">{item}</div></SpotlightCard>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section-pad bg-[#f5f9ff]">
        <div className="container-site grid lg:grid-cols-[.72fr_1.28fr] gap-10 items-center">
          <MotionReveal>
            <div className="ceo-summary-card">
              <GlareHover className="ceo-summary-card__media"><img src={ceo.officeImage} alt={ceo.name} loading="lazy" decoding="async" /></GlareHover>
              <div className="p-6">
                <div className="eyebrow">CEO's Message</div>
                <h2 className="title-lg mt-3">{ceo.name}</h2>
                <div className="mt-3 text-blue-600 font-semibold">{ceo.title}</div>
              </div>
            </div>
          </MotionReveal>
          <MotionReveal delay={.06}>
            <blockquote className="text-slate-600 text-lg leading-8 border-l-4 border-blue-600 pl-6">{ceo.message}</blockquote>
          </MotionReveal>
        </div>
      </section>

      <section id="team" className="section-pad">
        <div className="container-site">
          <SectionTitle center eyebrow="Our Team" title="Meet the Life Consultants team" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {team.map((member, i) => (
              <MotionReveal delay={i * .045} key={member.name}>
                <article className="team-card">
                  {member.image ? (
                    <GlareHover className="team-card__media"><img className="team-card__image" src={member.image} alt={member.name} loading="lazy" decoding="async" /></GlareHover>
                  ) : (
                    <div className="team-card__fallback">{member.name.split(' ').map((part) => part[0]).join('').slice(0,2)}</div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-slate-500 mt-2">{member.title}</p>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
