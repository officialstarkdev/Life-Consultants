import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Building,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileCheck2,
  FileText,
  FileX,
  Globe2,
  GraduationCap,
  HelpCircle,
  Landmark,
  MapPin,
  MessageSquareText,
  Plane,
  PlayCircle,
  Quote,
  Scale,
  ShieldCheck,
  UserCheck,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MotionReveal from '../components/MotionReveal';
import SectionTitle from '../components/SectionTitle';
import { destinations } from '../data/destinations';
import { institutions } from '../data/institutions';
import { testimonials } from '../data/testimonials';
import { posts } from '../data/blog';
import { useSEO } from '../hooks/useSEO';
import DestinationCard from '../components/DestinationCard';
import InstitutionCard from '../components/InstitutionCard';
import MediaCard from '../components/MediaCard';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';
import GlareHover from '../components/GlareHover/GlareHover';
import { SpecularLink } from '../components/SpecularButton/SpecularButton';

const heroSlides = [
  {
    eyebrow: 'A Legacy of 26 Years',
    lead: 'Study Abroad & Visa Consultants',
    accent: 'in Lahore, Pakistan',
    body: 'Life Consultants & Law Associates has helped Pakistani students pursue education abroad since 1999, providing counselling, IELTS preparation, university admissions, visa filing, interview preparation and legal support for visa refusals, all under one roof.',
    image: '/images/institutions/021_CALIFORNIA-US.png',
  },
  {
    eyebrow: 'Study Abroad With Confidence',
    lead: 'Find the Right',
    accent: 'University Abroad',
    body: 'From choosing a destination to preparing your application, our team helps you move forward with clarity and confidence.',
    image: '/images/institutions/020_greenwich-1024x576.jpg',
  },
  {
    eyebrow: 'Admissions • Visa • Travel Support',
    lead: 'Turn Your Study Plan Into',
    accent: 'A Global Journey',
    body: 'Get personalized support for admissions, documents, interview preparation, visa counselling and your next steps abroad.',
    image: '/images/institutions/022_UofT_cmh2315fl.jpg',
  },
];

const quickCards = [
  { Icon: GraduationCap, title: 'Study Abroad', text: 'Guidance from destination and university selection to application.' },
  { Icon: FileCheck2, title: 'Admissions Guidance', text: 'Focused support for documents and admission procedures.' },
  { Icon: ShieldCheck, title: 'Visa Counselling', text: 'Pre-visa preparation and personalized visa process guidance.' },
];

const whyChooseUsPillars = [
  {
    title: '26 Years of Experience',
    text: 'Established in 1999, Life Consultants has helped Pakistani students navigate international education, admissions and visa applications for more than two decades.',
    Icon: Award,
  },
  {
    title: 'British Council-Trained and Certified Counsellors',
    text: 'Our British Council-trained counsellors provide guidance on study destinations, university selection, admissions and the visa process.',
    Icon: GraduationCap,
  },
  {
    title: 'In-House Legal Appeals Support',
    text: 'Through Law Associates, Life Consultants can review visa refusals and provide legal representation and support for eligible appeal, Pre-Action Protocol and judicial review matters.',
    Icon: Scale,
  },
  {
    title: 'One Provider From Admission to Travel',
    text: 'Counselling, IELTS preparation, document processing, university admissions, visa filing, interview preparation and travel assistance are coordinated through one team, with an additional UK office.',
    Icon: ShieldCheck,
  },
];

const countryCards = [
  {
    flag: '🇬🇧',
    country: 'United Kingdom',
    code: 'UK',
    text: 'Study in the UK with support for university admissions, student applications and visa processing from Pakistan.',
    slug: 'united-kingdom',
  },
  {
    flag: '🇺🇸',
    country: 'United States',
    code: 'USA',
    text: 'Get guidance on US university selection, admissions and study visa applications from initial counselling to submission.',
    slug: 'united-states',
  },
  {
    flag: '🇨🇦',
    country: 'Canada',
    code: 'Canada',
    text: 'Life Consultants supports Pakistani students with Canadian university admissions and study visa processing.',
    slug: 'canada',
  },
  {
    flag: '🇦🇺',
    country: 'Australia',
    code: 'Australia',
    text: 'Get assistance with Australian university selection, admissions, documentation and student visa processing.',
    slug: 'australia',
  },
  {
    flag: '🇩🇪',
    country: 'Germany',
    code: 'Germany',
    text: 'Explore German study options with guidance on university admissions, required documents and student visa applications.',
    slug: 'germany',
  },
  {
    flag: '🇮🇪',
    country: 'Ireland',
    code: 'Ireland',
    text: 'Get support choosing Irish institutions and preparing your admission and study visa application from Pakistan.',
    slug: 'ireland',
  },
];

const homeServices = [
  {
    title: '1. Career Counselling',
    text: 'Get personalised career and study-abroad guidance to identify suitable courses, countries and education pathways.',
    link: '/services',
    Icon: MessageSquareText,
  },
  {
    title: '2. University Selection',
    text: 'Choose suitable universities and programmes based on your academic background, career goals and preferred study destination.',
    link: '/services',
    Icon: Landmark,
  },
  {
    title: '3. IELTS Preparation',
    text: 'Prepare for IELTS with structured guidance designed to help you meet the English-language requirements of your chosen institution.',
    link: '/services',
    Icon: BookOpenCheck,
  },
  {
    title: '4. University Admissions',
    text: 'Get support preparing and submitting university applications, from selecting programmes to completing admission requirements.',
    link: '/services',
    Icon: GraduationCap,
  },
  {
    title: '5. Document Processing',
    text: 'Prepare the academic, financial and supporting documents required for your university admission and visa application.',
    link: '/services',
    Icon: FileCheck2,
  },
  {
    title: '6. Visa Filing',
    text: 'Get assistance preparing and submitting your study visa application with the required documents and supporting information.',
    link: '/services',
    Icon: ShieldCheck,
  },
  {
    title: '7. Interview Preparation',
    text: 'Prepare for university or visa interviews with practical guidance on questions, answers and application-related requirements.',
    link: '/services',
    Icon: UserCheck,
  },
  {
    title: '8. Visa Refusal Appeals',
    text: 'Get your visa refusal reviewed and access legal support through Life Consultants & Law Associates where an appeal is appropriate.',
    link: '/services',
    Icon: Scale,
  },
];

const workingProcessSteps = [
  {
    step: '01',
    title: '1. Consultation & Assessment',
    text: 'We begin by understanding your academic background, career goals, preferred destination and study plans. Our counsellors assess your profile and help identify suitable study options and the requirements you need to meet.',
  },
  {
    step: '02',
    title: '2. Application Preparation',
    text: 'Once your study pathway is selected, we help you prepare for the next stage, including university applications, IELTS requirements and the academic, financial and supporting documents needed for your application.',
  },
  {
    step: '03',
    title: '3. Application & Visa Submission',
    text: 'Our team coordinates the required documentation and submits your university and visa applications. We help ensure the application is prepared according to the requirements of your chosen destination.',
  },
  {
    step: '04',
    title: '4. Visa Decision & Next Steps',
    text: 'After submission, we support you through the visa process and help you prepare for any required interview or additional documentation. Once a decision is received, we guide you on the next steps toward your studies abroad.',
  },
];

const faqs = [
  {
    q: '1. How much does it cost to hire a study abroad consultant in Pakistan?',
    a: 'The cost of hiring a study abroad consultant varies depending on the services required, destination and application. Some students may need counselling and university admission support, while others require additional IELTS preparation, document processing or visa assistance. Life Consultants can assess your requirements during a consultation and explain the applicable services and costs.',
  },
  {
    q: '2. Which country is easiest to get a study visa from Pakistan right now?',
    a: 'There is no single country that is easiest for every Pakistani student to obtain a study visa from. Visa decisions depend on factors such as your academic background, chosen programme, financial circumstances, documents and the requirements of the destination country. Life Consultants can assess your profile and help identify suitable study destinations.',
  },
  {
    q: '3. Do you provide IELTS coaching, or only visa filing?',
    a: 'Life Consultants provides IELTS preparation as well as university admission and visa support. The single-provider model allows students to receive guidance across multiple stages of the study-abroad process, including career counselling, university selection, IELTS preparation, document processing, visa filing and interview preparation.',
  },
  {
    q: '4. Can you help if my visa was already refused once?',
    a: 'Yes, Life Consultants can review a previous visa refusal and advise you on the options available. Through its in-house Law Associates team, the consultancy can assess the refusal and, where appropriate, provide legal support involving an appeal, Pre-Action Protocol or judicial review.',
  },
  {
    q: '5. Do I need to visit the Lahore office in person, or can this be done remotely?',
    a: 'You can contact Life Consultants to discuss your study-abroad plans, while in-person consultations are available at the Lahore office. The office is located at G-5, Mumtaz Centre, 15-A, Queen\'s Road, Lahore, and is open Monday–Saturday from 10am–6pm.',
  },
  {
    q: '6. How long does the process take from first consultation to visa approval?',
    a: 'The timeframe varies according to your study destination, university, application requirements and visa processing stage. The process can involve profile assessment, university selection, admission application, document preparation, visa submission and interview preparation. Life Consultants can explain the expected stages and requirements for your chosen destination during your consultation.',
  },
];

export default function Home() {
  useSEO(
    'Life Consultants | Study Abroad & Visa Consultants in Lahore',
    'Life Consultants & Law Associates — Lahore-based study abroad consultancy since 1999. Admissions, IELTS, visa filing and legal appeals support for UK, USA, Canada, Australia and 14 destinations.'
  );
  const [heroIndex, setHeroIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    heroSlides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });

    const timer = window.setInterval(() => {
      if (!document.hidden) setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, []);

  const hero = heroSlides[heroIndex];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero text-white relative overflow-hidden">
        <div className="home-hero__media" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.image}
              className={`home-hero__image ${heroIndex === index ? 'is-active' : ''}`}
              src={slide.image}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          ))}
        </div>
        <div className="home-hero__overlay" />

        <div className="container-site home-hero__inner">
          <motion.div
            key={heroIndex}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl home-hero__copy"
          >
            <div className="text-blue-300 uppercase tracking-[.2em] text-xs font-extrabold">{hero.eyebrow}</div>
            <h1 className="title-xl mt-5">
              {hero.lead} <span className="text-blue-400">{hero.accent}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/85">{hero.body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <SpecularLink to="/contact#consultation">
                Book Free Consultation <ArrowRight size={18} />
              </SpecularLink>
              <Link to="/study-destinations" className="btn-secondary">
                Explore Destinations
              </Link>
            </div>

            {/* Restored Hero Badge */}
            <div className="mt-8 flex items-center gap-4 text-sm text-white/75">
              <div className="h-10 w-10 rounded-full border border-white/30 grid place-items-center shrink-0">
                <Award size={19} />
              </div>
              <div>
                <div className="text-white font-bold">Established 1999</div>
                <div>Foreign education guidance from Lahore to global destinations.</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="home-hero__proof hidden lg:block"
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            <div className="home-hero__proof-card home-hero__proof-card--one">
              <GraduationCap size={22} />
              <div>
                <strong>14+ destinations</strong>
                <span>Explore international study options</span>
              </div>
            </div>
            <div className="home-hero__proof-card home-hero__proof-card--two">
              <FileCheck2 size={22} />
              <div>
                <strong>Admissions support</strong>
                <span>Documents, applications and preparation</span>
              </div>
            </div>
            <div className="home-hero__proof-card home-hero__proof-card--three">
              <ShieldCheck size={22} />
              <div>
                <strong>Visa guidance</strong>
                <span>Personalized counselling & legal appeals</span>
              </div>
            </div>
          </motion.div>

          <div className="home-hero__dots" aria-label="Hero slides">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.accent}
                onClick={() => setHeroIndex(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={heroIndex === index ? 'true' : undefined}
                className={heroIndex === index ? 'is-active' : ''}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Line Bar under Hero Section */}
      <section className="bg-[#0b2147] text-white py-6 border-y border-white/10 shadow-md">
        <div className="container-site grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-white/15">
          <div className="flex items-center gap-4 lg:px-6 first:pl-0">
            <div className="h-12 w-12 rounded-xl bg-white/10 grid place-items-center shrink-0 text-blue-300">
              <Award size={22} />
            </div>
            <div>
              <div className="font-bold text-white text-base">Established 1999</div>
              <div className="text-xs text-white/70 mt-0.5">26 Years of Excellence</div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-6">
            <div className="h-12 w-12 rounded-xl bg-white/10 grid place-items-center shrink-0 text-blue-300">
              <FileCheck2 size={22} />
            </div>
            <div>
              <div className="font-bold text-white text-base">10,415+ Visas Processed</div>
              <div className="text-xs text-white/70 mt-0.5">High Approval Success</div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-6">
            <div className="h-12 w-12 rounded-xl bg-white/10 grid place-items-center shrink-0 text-blue-300">
              <UsersRound size={22} />
            </div>
            <div>
              <div className="font-bold text-white text-base">12,500+ Clients Served</div>
              <div className="text-xs text-white/70 mt-0.5">Trusted Across Pakistan</div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-6 last:pr-0">
            <div className="h-12 w-12 rounded-xl bg-white/10 grid place-items-center shrink-0 text-blue-300">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="font-bold text-white text-base">British Council-Trained</div>
              <div className="text-xs text-white/70 mt-0.5">Certified Counsellors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Bar */}
      <section className="quick-services-space">
        <div className="container-site grid md:grid-cols-3 gap-5">
          {quickCards.map(({ Icon, title, text }, i) => (
            <MotionReveal delay={i * 0.08} key={title} className="h-full">
              <SpotlightCard className="premium-card-shell" spotlightColor="rgba(57, 128, 255, .18)">
                <Link to="/services" className="quick-service-card group">
                  <Icon className="text-blue-600" size={30} />
                  <h3 className="font-display font-bold text-xl mt-6 text-[#0b1733]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                  <ArrowRight className="mt-auto pt-5 box-content text-blue-600 group-hover:translate-x-2 transition" size={18} />
                </Link>
              </SpotlightCard>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* Who Is Life Consultants & Law Associates? */}
      <section className="section-pad">
        <div className="container-site grid lg:grid-cols-[.95fr_1.05fr] gap-14 items-center">
          <MotionReveal>
            <GlareHover className="about-glare rounded-xl shadow-[0_24px_60px_rgba(7,21,47,.14)]">
              <div className="about-photo h-[520px] relative">
                <div className="absolute -right-0 -bottom-0 bg-blue-600 text-white p-6 shadow-xl">
                  <div className="text-3xl font-display font-extrabold">1999</div>
                  <div className="text-xs uppercase tracking-widest mt-1">Established</div>
                </div>
              </div>
            </GlareHover>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <SectionTitle
              eyebrow="Who Is Life Consultants & Law Associates?"
              title="Lahore-based study abroad and visa consultancy firm since 1999"
              body="Life Consultants & Law Associates is a Lahore-based study abroad and visa consultancy firm, established in 1999, that guides Pakistani students through university admissions, IELTS preparation, visa filing, interview preparation, and visa refusal appeals through its in-house legal wing for the UK, USA, Canada, Australia and other study destinations."
            />
            <SpecularLink to="/about" className="mt-8">
              Learn More About Life Consultants <ArrowRight size={18} />
            </SpecularLink>
          </MotionReveal>
        </div>
      </section>

      {/* Why Pakistani Students Choose Life Consultants */}
      <section className="section-pad bg-[#f5f9ff]">
        <div className="container-site">
          <SectionTitle
            center
            eyebrow="Why Choose Us"
            title="Why Pakistani Students Choose Life Consultants"
            body="Life Consultants combines 26 years of study-abroad experience, British Council-trained counselling, in-house legal appeals and a single-provider model to support Pakistani students from university selection through visa processing."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {whyChooseUsPillars.map(({ title, text, Icon }, i) => (
              <MotionReveal delay={i * 0.06} key={title} className="h-full">
                <SpotlightCard className="premium-card-shell" spotlightColor="rgba(68, 137, 255, .16)">
                  <div className="bg-white border border-slate-200 p-8 rounded-xl h-full flex flex-col justify-between">
                    <div>
                      <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 grid place-items-center">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-display font-bold text-xl mt-6 text-[#0b1733]">{title}</h3>
                      <p className="mt-3 text-slate-600 leading-7 text-sm">{text}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Countries We Help You Study In */}
      <section className="section-pad">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <SectionTitle
              eyebrow="Destinations"
              title="Countries We Help You Study In"
              body="Life Consultants currently represents universities and processes study visa applications for students from Pakistan across 14 international study destinations."
            />
            <Link to="/study-destinations" className="text-blue-600 font-bold flex gap-2 items-center shrink-0">
              View All 14 Destinations <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Marquee for all 14 destinations */}
        <MotionReveal>
          <div className="destination-marquee" aria-label="Study destinations marquee">
            <div className="destination-marquee__track">
              <div className="destination-marquee__group">
                {destinations.map((destination) => (
                  <div className="destination-marquee__item" key={destination.slug}>
                    <DestinationCard destination={destination} />
                  </div>
                ))}
              </div>
              <div className="destination-marquee__group" aria-hidden="true">
                {destinations.map((destination) => (
                  <div className="destination-marquee__item" key={`duplicate-${destination.slug}`}>
                    <DestinationCard destination={destination} duplicate />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>
      </section>

      {/* Our Study Abroad & Visa Services */}
      <section className="section-pad bg-[#f5f9ff]">
        <div className="container-site">
          <SectionTitle
            center
            eyebrow="Our Services"
            title="Our Study Abroad & Visa Services"
            body="Life Consultants provides a single point of contact for the key services Pakistani students need, from career counselling and IELTS preparation to university admissions, visa filing and travel assistance."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 items-stretch">
            {homeServices.map(({ title, text, link, Icon }, i) => (
              <MotionReveal key={title} delay={(i % 4) * 0.05} className="h-full">
                <SpotlightCard className="premium-card-shell" spotlightColor="rgba(68, 137, 255, .16)">
                  <div className="home-service-card">
                    <div className="h-11 w-11 bg-blue-50 text-blue-600 grid place-items-center rounded-lg">
                      <Icon size={23} />
                    </div>
                    <h3 className="font-display font-bold text-lg mt-5 text-[#0b1733]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                    <Link className="mt-auto pt-5 inline-flex gap-2 items-center text-blue-600 text-sm font-bold group" to={link}>
                      Learn More <ArrowRight size={15} className="group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </SpotlightCard>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Track Record Section & Table */}
      <section className="bg-[#07152f] text-white py-20">
        <div className="container-site">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            <div>
              <div className="text-blue-300 uppercase tracking-[.18em] text-xs font-bold">Our Track Record</div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-3">26-year track record in study-abroad admissions and visa support</h2>
              <p className="text-white/75 leading-8 mt-5 text-base">
                Life Consultants has processed 10,415+ visas and served more than 12,500 clients since its establishment in 1999, building a 26-year track record in study-abroad admissions and visa support across 14 destinations.
              </p>
              <p className="text-white/65 leading-7 mt-4 text-sm">
                Our experience covers the full student journey, from initial counselling and university applications to document preparation, visa filing and interview support. The consultancy's stated visa approval rate is 99%*.
              </p>
            </div>

            {/* Track Record Table */}
            <MotionReveal>
              <div className="bg-[#0b2147] border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl">
                <h3 className="font-display font-bold text-xl text-white mb-6 border-b border-white/10 pb-4">
                  Track Record at a Glance
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-white/15 text-blue-300 uppercase tracking-wider text-xs">
                        <th className="py-3 px-4">Measure</th>
                        <th className="py-3 px-4 text-right">Track Record</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-white/90">
                      <tr>
                        <td className="py-3.5 px-4 font-medium">Visas Processed</td>
                        <td className="py-3.5 px-4 text-right font-bold text-blue-400">10,415+</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-medium">Clients Served</td>
                        <td className="py-3.5 px-4 text-right font-bold text-blue-400">12,500+</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-medium">Years Operating</td>
                        <td className="py-3.5 px-4 text-right font-bold text-blue-400">26 years</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-medium">Study Destinations</td>
                        <td className="py-3.5 px-4 text-right font-bold text-blue-400">14</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-medium">Stated Visa Approval Rate</td>
                        <td className="py-3.5 px-4 text-right font-bold text-emerald-400">99%*</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* How It Works (4 Steps) */}
      <section className="section-pad bg-[#f5f9ff]">
        <div className="container-site">
          <SectionTitle
            center
            eyebrow="How It Works"
            title="Getting started with Life Consultants is a four-step process"
            body="We assess your profile, prepare your application, submit the required documents and support you through the visa decision."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {workingProcessSteps.map((stepItem, i) => (
              <MotionReveal delay={i * 0.08} key={stepItem.step} className="h-full">
                <SpotlightCard className="premium-card-shell" spotlightColor="rgba(22, 93, 255, .13)">
                  <div className="process-card relative bg-white border border-slate-200 p-7 min-h-[260px] rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="text-blue-600 font-display font-extrabold text-3xl">{stepItem.step}</div>
                      <h3 className="mt-5 font-display font-bold text-lg text-[#0b1733]">{stepItem.title}</h3>
                      <p className="mt-3 text-xs sm:text-sm leading-6 text-slate-600">{stepItem.text}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </MotionReveal>
            ))}
          </div>

          {/* Refusal note callout under step 4 */}
          <MotionReveal className="mt-8">
            <div className="p-5 sm:p-6 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-4">
              <Scale className="text-blue-600 shrink-0 mt-1" size={24} />
              <div className="text-sm text-slate-700 leading-6">
                <strong>What if your visa is refused at Step 4?</strong> That isn't necessarily the end of the process — our Law Associates team can review the refusal and advise on the legal options available.
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* What Happens If My Visa Is Refused? (Legal Wing) */}
      <section className="section-pad border-y border-slate-200/80 bg-white">
        <div className="container-site grid lg:grid-cols-2 gap-12 items-center">
          <MotionReveal>
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#07152f] to-[#0b2147] text-white shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
                <Scale size={16} /> Law Associates Wing
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">What Happens If My Visa Is Refused?</h2>
              <p className="mt-4 text-white/80 leading-7 text-sm sm:text-base">
                Yes, Life Consultants can help if your study visa has been refused. Through its in-house Law Associates team, the consultancy can review the reasons for refusal and advise on appropriate legal options, including a Pre-Action Protocol or judicial review, where applicable. The legal team can also provide representation and challenge a decision when there are grounds to do so.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <SpecularLink to="/contact">Discuss Refusal Appeal <ArrowRight size={16} /></SpecularLink>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="space-y-4">
              <div className="p-6 border border-slate-200 rounded-xl bg-slate-50/60">
                <h4 className="font-bold text-[#0b1733] flex items-center gap-2">
                  <FileX size={18} className="text-blue-600" /> Refusal Analysis & Review
                </h4>
                <p className="mt-2 text-sm text-slate-600 leading-6">
                  Detailed legal assessment of the refusal letter and case file to identify errors in fact or law.
                </p>
              </div>
              <div className="p-6 border border-slate-200 rounded-xl bg-slate-50/60">
                <h4 className="font-bold text-[#0b1733] flex items-center gap-2">
                  <FileText size={18} className="text-blue-600" /> Pre-Action Protocol (PAP)
                </h4>
                <p className="mt-2 text-sm text-slate-600 leading-6">
                  Formal legal notices served to immigration authorities detailing grounds of appeal before judicial review.
                </p>
              </div>
              <div className="p-6 border border-slate-200 rounded-xl bg-slate-50/60">
                <h4 className="font-bold text-[#0b1733] flex items-center gap-2">
                  <Scale size={18} className="text-blue-600" /> Judicial Review Representation
                </h4>
                <p className="mt-2 text-sm text-slate-600 leading-6">
                  Representation and legal support for eligible judicial review matters through Law Associates.
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Featured Institutions */}
      <section className="section-pad">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <SectionTitle
              eyebrow="Institutions"
              title="Institutions represented by LIFE Consultants"
              body="Browse university cards using the matching campus images available in the local public folder."
            />
            <Link to="/institutions" className="text-blue-600 font-bold flex gap-2 shrink-0">
              View All Institutions <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {institutions.slice(0, 6).map((university, i) => (
              <MotionReveal key={university.name} delay={(i % 3) * 0.05}>
                <InstitutionCard institution={university} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Find Us: Lahore & UK Offices */}
      <section className="section-pad bg-[#f5f9ff]">
        <div className="container-site">
          <SectionTitle
            center
            eyebrow="Our Offices"
            title="Visit Life Consultants & Law Associates"
            body="Visit Life Consultants & Law Associates at G-5, Mumtaz Centre, 15-A, Queen's Road, Lahore, Punjab, Pakistan. Our Lahore office is where students can meet the counselling team, discuss their study plans and receive guidance on admissions, documentation and visa applications."
          />

          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {/* Lahore Office */}
            <MotionReveal>
              <SpotlightCard className="premium-card-shell" spotlightColor="rgba(22, 93, 255, .15)">
                <div className="bg-white border border-slate-200 p-8 rounded-2xl h-full flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5">
                      <Building size={16} /> Head Office (Pakistan)
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#0b1733]">Our Lahore Office</h3>
                    <div className="mt-6 space-y-4 text-sm text-slate-600">
                      <div className="flex items-start gap-3">
                        <MapPin size={20} className="text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#0b1733]">Address</strong>
                          <span>G-5, Mumtaz Centre, 15-A, Queen's Road, Lahore, Punjab, Pakistan</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock size={20} className="text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#0b1733]">Office Hours</strong>
                          <span>Monday–Saturday: 10:00 AM–6:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-5 border-t border-slate-100">
                    <Link to="/contact" className="btn-primary w-full text-center justify-center">
                      Visit Lahore Office
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </MotionReveal>

            {/* UK Office */}
            <MotionReveal delay={0.08}>
              <SpotlightCard className="premium-card-shell" spotlightColor="rgba(22, 93, 255, .15)">
                <div className="bg-white border border-slate-200 p-8 rounded-2xl h-full flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-extrabold uppercase tracking-wider mb-5">
                      <Globe2 size={16} /> International Office (UK)
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#0b1733]">Our UK Office</h3>
                    <div className="mt-6 space-y-4 text-sm text-slate-600">
                      <div className="flex items-start gap-3">
                        <MapPin size={20} className="text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#0b1733]">Address</strong>
                          <span>118-120 London Road, Mitcham CR4 3LB, United Kingdom</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock size={20} className="text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#0b1733]">Office Hours</strong>
                          <span>Monday–Friday: 11:00 AM–5:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-5 border-t border-slate-100">
                    <Link to="/contact" className="btn-secondary w-full text-center justify-center text-slate-800 border-slate-300 hover:bg-slate-100">
                      Contact UK Team
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-pad">
        <div className="container-site max-w-4xl">
          <SectionTitle
            center
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            body="Got questions about studying abroad, visa processing, or legal appeals? Here are answers to common queries."
          />

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <MotionReveal key={faq.q} delay={index * 0.04}>
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                    >
                      <span className="font-display font-bold text-base sm:text-lg text-[#0b1733] flex items-center gap-3">
                        <HelpCircle size={20} className="text-blue-600 shrink-0" />
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-slate-600 text-sm leading-7 border-t border-slate-100 mt-1">
                        <p className="mt-3">{faq.a}</p>
                      </div>
                    )}
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-[#f5f9ff]">
        <div className="container-site">
          <SectionTitle center eyebrow="Testimonials" title="Why people talk about our services" />
          <div className="grid lg:grid-cols-3 gap-5 mt-11 items-stretch">
            {testimonials.slice(0, 3).map((testimonial, i) => (
              <MotionReveal key={testimonial.name} delay={i * 0.07} className="h-full">
                <SpotlightCard className="premium-card-shell" spotlightColor="rgba(57, 128, 255, .14)">
                  <div className="testimonial-card">
                    <Quote className="text-blue-600 shrink-0" />
                    <p className="mt-5 text-slate-600 leading-7">“{testimonial.text}”</p>
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <div className="font-bold text-[#0b1733]">{testimonial.name}</div>
                      {testimonial.date && <div className="text-xs text-slate-500 mt-1">{testimonial.date}</div>}
                    </div>
                  </div>
                </SpotlightCard>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Videos */}
      <section className="section-pad">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <SectionTitle eyebrow="Latest Updates" title="News, videos & blog" />
            <Link to="/blog" className="text-blue-600 font-bold flex gap-2 items-center hover:underline shrink-0">
              View all <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {posts.slice(0, 3).map((post, i) => (
              <MediaCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-photo py-20 text-white">
        <div className="container-site">
          <MotionReveal>
            <div className="max-w-2xl">
              <div className="text-blue-300 uppercase tracking-[.18em] text-xs font-bold">Start your journey</div>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold mt-4">Ready to Start Your Study Abroad Journey?</h2>
              <p className="mt-5 text-white/75 leading-7">
                Book a consultation with Life Consultants for personalized guidance based on your academic and travel goals.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <SpecularLink to="/contact#consultation">Book Free Consultation</SpecularLink>
                <a href="https://wa.me/923004008101" target="_blank" rel="noreferrer" className="btn-secondary">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
}
