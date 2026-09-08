import { motion, useReducedMotion } from 'framer-motion';

export default function LoadingScreen({ label = 'Loading page' }: { label?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className="app-loader" role="status" aria-live="polite" aria-label={label}>
      <motion.div
        className="app-loader__panel"
        initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
        animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <motion.div
          className="app-loader__mark"
          animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          LC
        </motion.div>
        <div className="app-loader__copy">
          <strong>Life Consultants</strong>
          <span>{label}</span>
        </div>
        <div className="app-loader__track" aria-hidden="true">
          <motion.span
            initial={reduce ? false : { x: '-100%' }}
            animate={reduce ? undefined : { x: '260%' }}
            transition={{ duration: 1, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </motion.div>
    </div>
  );
}
