import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO('404 Page Not Found | Life Consultants', 'Page not found');
  return (
    <>
      <PageHero eyebrow="404 Error" title="Page Not Found" body="The page you are looking for does not exist or has been moved." />
      <div className="min-h-[40vh] grid place-items-center text-center p-8">
        <div>
          <Link className="btn-primary" to="/">Return Home</Link>
        </div>
      </div>
    </>
  );
}
