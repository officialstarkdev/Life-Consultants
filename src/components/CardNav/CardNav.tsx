import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './CardNav.css';

type NavItem = readonly [string, string];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  primary: readonly NavItem[];
  secondary: readonly NavItem[];
};

export default function CardNav({ open, onOpenChange, primary, secondary }: Props) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) onOpenChange(false);
    // close after route changes only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="card-nav xl:hidden">
      <button
        type="button"
        className="card-nav__toggle focus-ring"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="mobile-card-navigation"
        onClick={() => onOpenChange(!open)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={reduce ? false : { opacity: 0, rotate: -18, scale: .8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, rotate: 18, scale: .8 }}
            transition={{ duration: .18 }}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation"
              className="card-nav__backdrop"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onOpenChange(false)}
            />
            <motion.div
              id="mobile-card-navigation"
              className="card-nav__panel"
              initial={reduce ? false : { opacity: 0, y: -14, scale: .985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -8, scale: .99 }}
              transition={{ duration: .26, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="card-nav__eyebrow">Navigate</div>
              <div className="card-nav__grid">
                {primary.map(([label, to], index) => {
                  const active = to === '/' ? pathname === '/' : pathname.startsWith(to.split('#')[0]);
                  return (
                    <motion.div
                      key={to}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : .035 * index, duration: .22 }}
                    >
                      <Link to={to} className={`card-nav__item ${active ? 'is-active' : ''}`} onClick={() => onOpenChange(false)}>
                        <span>{label}</span><ChevronRight size={16} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="card-nav__secondary">
                {secondary.map(([label, to]) => (
                  <Link key={to} to={to} onClick={() => onOpenChange(false)}>{label}</Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
