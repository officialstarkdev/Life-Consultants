import { CSSProperties, PointerEvent, ReactNode, useRef } from 'react';
import './SpotlightCard.css';

type Props = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  radius?: string;
};

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(72, 138, 255, 0.20)',
  radius = '420px',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const updateSpotlight = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
    node.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`.trim()}
      onPointerMove={updateSpotlight}
      style={{ '--spotlight-radius': radius } as CSSProperties}
    >
      {children}
    </div>
  );
}
