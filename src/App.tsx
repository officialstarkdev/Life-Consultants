import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingScreen from './components/LoadingScreen';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Destinations = lazy(() => import('./pages/Destinations'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const Institutions = lazy(() => import('./pages/Institutions'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const CeoMessage = lazy(() => import('./pages/CeoMessage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}

function RoutedContent() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <Suspense fallback={null}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="route-shell"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -5 }}
          transition={{ duration: reduce ? 0 : .24, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/ceo-message" element={<CeoMessage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/study-destinations" element={<Destinations />} />
            <Route path="/study-destinations/:country" element={<DestinationDetail />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/institutions/:country" element={<Institutions />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Eagerly prefetch page bundles in background
    const preloads = [
      () => import('./pages/Home'),
      () => import('./pages/About'),
      () => import('./pages/CeoMessage'),
      () => import('./pages/Services'),
      () => import('./pages/Destinations'),
      () => import('./pages/DestinationDetail'),
      () => import('./pages/Institutions'),
      () => import('./pages/SuccessStories'),
      () => import('./pages/Gallery'),
      () => import('./pages/Certifications'),
      () => import('./pages/Blog'),
      () => import('./pages/BlogPost'),
      () => import('./pages/Contact'),
    ];
    preloads.forEach((fn) => void fn());

    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isInitialLoad && <LoadingScreen label="Loading site" />}
      <ScrollTop />
      <Header />
      <main className="app-main"><RoutedContent /></main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
