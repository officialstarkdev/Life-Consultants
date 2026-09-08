import PageHero from '../components/PageHero';
import MotionReveal from '../components/MotionReveal';
import { ceo } from '../data/team';
import { useSEO } from '../hooks/useSEO';
import GlareHover from '../components/GlareHover/GlareHover';

export default function CeoMessage() {
  useSEO("CEO's Message | Life Consultants","Read the CEO's message from Shahid Ghani of Life Consultants & Law Associates.");

  return (
    <>
      <PageHero eyebrow="Leadership" title="CEO's Message" image={ceo.image} />
      <section className="section-pad">
        <div className="container-site grid lg:grid-cols-[.75fr_1.25fr] gap-12 items-start">
          <MotionReveal>
            <article className="ceo-profile-card">
              <GlareHover className="ceo-profile-card__media"><img src={ceo.image} alt={ceo.name} loading="eager" decoding="async" /></GlareHover>
              <div className="p-7">
                <div className="font-display font-bold text-2xl">{ceo.name}</div>
                <div className="mt-2 text-blue-600">{ceo.title}</div>
              </div>
            </article>
          </MotionReveal>
          <MotionReveal delay={.06}>
            <p className="text-lg leading-9 text-slate-700">{ceo.message}</p>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
