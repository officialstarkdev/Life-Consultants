import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import MotionReveal from '../components/MotionReveal';
import { services } from '../data/services';
import { useSEO } from '../hooks/useSEO';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';

export default function Services() {
  useSEO('Services | Life Consultants', 'Explore Life Consultants services for counselling, IELTS, admissions, interviews, visas and travel assistance.');

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Empowering your dreams with expert guidance and seamless services"
        body="Life Consultants & Law Associates offers personalized guidance for students pursuing international education."
      />
      <section className="section-pad">
        <div className="container-site grid md:grid-cols-2 gap-6 items-stretch">
          {services.map((service, i) => (
            <MotionReveal delay={(i % 2) * 0.08} key={service.title} className="h-full">
              <SpotlightCard className="premium-card-shell" spotlightColor="rgba(56, 126, 255, .15)">
              <motion.div
                className="service-page-card group"
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <motion.div
                  className="service-page-card__icon"
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                >
                  <CheckCircle2 size={24} />
                </motion.div>
                <h2 className="font-display font-bold text-xl text-[#0b1733] mt-5">{service.title}</h2>
                <p className="mt-4 text-slate-600 leading-7">{service.text}</p>
                <Link to="/contact#consultation" className="mt-auto pt-6 inline-flex gap-2 text-blue-600 font-bold items-center">
                  Contact Now <ArrowRight size={17} className="group-hover:translate-x-1.5 transition" />
                </Link>
              </motion.div>
              </SpotlightCard>
            </MotionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
