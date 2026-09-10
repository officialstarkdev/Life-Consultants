import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import CardNav from '../components/CardNav/CardNav';
import { SpecularLink } from '../components/SpecularButton/SpecularButton';

const mainNav = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Study Destinations', '/study-destinations'],
  ['Success Stories', '/success-stories'],
  ['Contact', '/contact'],
] as const;

const moreLinks = [
  ['Institutions', '/institutions'],
  ['Blog', '/blog'],
  ['Certifications', '/certifications'],
  ['Gallery', '/gallery'],
] as const;

type DropdownName = 'more';

const routePreloaders: Record<string, () => Promise<unknown>> = {
  '/': () => import('../pages/Home'),
  '/about': () => import('../pages/About'),
  '/about/ceo-message': () => import('../pages/CeoMessage'),
  '/services': () => import('../pages/Services'),
  '/study-destinations': () => import('../pages/Destinations'),
  '/success-stories': () => import('../pages/SuccessStories'),
  '/contact': () => import('../pages/Contact'),
  '/institutions': () => import('../pages/Institutions'),
  '/blog': () => import('../pages/Blog'),
  '/certifications': () => import('../pages/Certifications'),
  '/gallery': () => import('../pages/Gallery'),
};

const warmRoute = (to: string) => {
  const path = to.split('#')[0];
  void routePreloaders[path]?.();
};

export default function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<DropdownName | null>(null);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const closeTimer = useRef<number | null>(null);

  const transparent = !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(null);
    setScrolled(window.scrollY > 24);
  }, [pathname]);

  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `site-nav-link ${isActive ? 'is-active' : ''}`;

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openDropdown = (name: DropdownName) => {
    clearCloseTimer();
    setDropdown(name);
  };

  const scheduleDropdownClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setDropdown(null), 180);
  };

  const closeAll = () => {
    clearCloseTimer();
    setDropdown(null);
    setMobileOpen(false);
  };

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 ${transparent ? 'site-header--transparent' : 'site-header--solid'}`}>
      <div className="site-header__surface">
        <div className="h-20 flex items-center justify-between gap-5 px-4 sm:px-5 lg:px-7 xl:px-8">
          <Link to="/" className="site-logo flex items-center" aria-label="Life Consultants home" onClick={closeAll}>
            <img
              src="/images/brand/logo.png"
              alt="Life Consultants & Law Associates"
              className="h-12 sm:h-14 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>

          <nav className="hidden xl:flex self-stretch items-center gap-5 2xl:gap-7 text-[13px] font-bold ml-auto">
            <NavLink to="/" end className={navClass} onMouseEnter={() => warmRoute('/')} onFocus={() => warmRoute('/')} onClick={() => setDropdown(null)}>Home</NavLink>

            <NavLink to="/about" className={navClass} onMouseEnter={() => warmRoute('/about')} onFocus={() => warmRoute('/about')} onClick={() => setDropdown(null)}>About</NavLink>

            <NavLink to="/services" className={navClass} onMouseEnter={() => warmRoute('/services')} onFocus={() => warmRoute('/services')} onClick={() => setDropdown(null)}>Services</NavLink>
            <NavLink to="/study-destinations" className={navClass} onMouseEnter={() => warmRoute('/study-destinations')} onFocus={() => warmRoute('/study-destinations')} onClick={() => setDropdown(null)}>Study Destinations</NavLink>
            <NavLink to="/success-stories" className={navClass} onMouseEnter={() => warmRoute('/success-stories')} onFocus={() => warmRoute('/success-stories')} onClick={() => setDropdown(null)}>Success Stories</NavLink>
            <NavLink to="/contact" className={navClass} onMouseEnter={() => warmRoute('/contact')} onFocus={() => warmRoute('/contact')} onClick={() => setDropdown(null)}>Contact</NavLink>

            <div
              className="nav-menu-anchor"
              onMouseEnter={() => openDropdown('more')}
              onMouseLeave={scheduleDropdownClose}
              onFocus={() => openDropdown('more')}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleDropdownClose();
              }}
            >
              <button
                type="button"
                className="site-nav-link inline-flex items-center gap-1"
                aria-expanded={dropdown === 'more'}
                aria-haspopup="menu"
                onClick={() => dropdown === 'more' ? setDropdown(null) : openDropdown('more')}
              >
                More <ChevronDown size={14} />
              </button>
              {dropdown === 'more' && (
                <div
                  className="nav-dropdown nav-dropdown--right w-60"
                  role="menu"
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={scheduleDropdownClose}
                >
                  {moreLinks.map(([label, to]) => <Link key={to} to={to} onMouseEnter={() => warmRoute(to)} onFocus={() => warmRoute(to)} onClick={closeAll}>{label}</Link>)}
                </div>
              )}
            </div>
          </nav>

          <CardNav
            open={mobileOpen}
            onOpenChange={setMobileOpen}
            primary={mainNav}
            secondary={[...moreLinks, ['Free Consultation', '/contact#consultation'] as const]}
          />
        </div>
      </div>
    </header>
  );
}
