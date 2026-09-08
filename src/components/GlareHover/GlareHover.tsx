import { CSSProperties, ReactNode } from 'react';
import './GlareHover.css';

type Props = {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  duration?: number;
};

export default function GlareHover({
  children,
  className = '',
  glareColor = 'rgba(255,255,255,.72)',
  duration = 900,
}: Props) {
  return (
    <div
      className={`glare-hover ${className}`.trim()}
      style={{
        '--glare-color': glareColor,
        '--glare-duration': `${duration}ms`,
      } as CSSProperties}
    >
      {children}
      <span className="glare-hover__sweep" aria-hidden="true" />
    </div>
  );
}
