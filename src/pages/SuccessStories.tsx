import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import MotionReveal from '../components/MotionReveal';
import { testimonials } from '../data/testimonials';
import { successStoryImages } from '../data/media';
import { useSEO } from '../hooks/useSEO';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';

export default function SuccessStories() {
  useSEO('Success Stories | Life Consultants', 'Read client testimonials and success stories from Life Consultants.');

  return (
    <>
      <PageHero eyebrow="Our Success" title="Success Stories & Testimonials" body="Client testimonials and success-story media from the local public folder." />
      <section className="section-pad">
        <div className="container-site">
          <SectionTitle eyebrow="Testimonials" title="What clients say" />
          <div className="grid md:grid-cols-2 gap-5 mt-9">
            {testimonials.map((testimonial, i) => (
              <MotionReveal key={testimonial.name} delay={(i % 2) * 0.05}>
                <SpotlightCard className="premium-card-shell" spotlightColor="rgba(57, 128, 255, .14)">
                  <div className="testimonial-card">
                    <p className="text-slate-600 leading-7">“{testimonial.text}”</p>
                    <div className="mt-auto pt-5 font-bold">{testimonial.name}</div>
                    {testimonial.date && <div className="text-xs text-slate-500 mt-1">{testimonial.date}</div>}
                  </div>
                </SpotlightCard>
              </MotionReveal>
            ))}
          </div>

          <div className="mt-16">
            <SectionTitle eyebrow="Visa & Admission Results" title="Recent success-story media" body="These images are served from /public/images/success_stories and load lazily as you scroll." />
            <div className="success-media-grid mt-9">
              {successStoryImages.map((image, i) => (
                <figure className="success-media-card" key={image}>
                  <img src={image} alt={`Life Consultants success story ${i + 1}`} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
