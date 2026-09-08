import { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, PointerEvent, ReactNode, useRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './SpecularButton.css';

type Shared = {
  children: ReactNode;
  className?: string;
  compact?: boolean;
};

type ButtonProps = Shared & ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never };
type RouterLinkProps = Shared & Omit<LinkProps, 'className' | 'children'> & { to: LinkProps['to']; href?: never };
type ExternalLinkProps = Shared & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: never };
type Props = ButtonProps | RouterLinkProps | ExternalLinkProps;

function useShine<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const onPointerMove = (event: PointerEvent<T>) => {
    if (event.pointerType === 'touch') return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--specular-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty('--specular-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };
  return { ref, onPointerMove };
}

export function SpecularLink(props: RouterLinkProps) {
  const { children, className = '', compact = false, ...rest } = props;
  const shine = useShine<HTMLAnchorElement>();
  return (
    <Link
      {...rest}
      ref={shine.ref}
      onPointerMove={shine.onPointerMove}
      className={`specular-button ${compact ? 'specular-button--compact' : ''} ${className}`.trim()}
    >
      <span className="specular-button__shine" aria-hidden="true" />
      <span className="specular-button__content">{children}</span>
    </Link>
  );
}

export function SpecularAnchor(props: ExternalLinkProps) {
  const { children, className = '', compact = false, ...rest } = props;
  const shine = useShine<HTMLAnchorElement>();
  return (
    <a
      {...rest}
      ref={shine.ref}
      onPointerMove={shine.onPointerMove}
      className={`specular-button ${compact ? 'specular-button--compact' : ''} ${className}`.trim()}
    >
      <span className="specular-button__shine" aria-hidden="true" />
      <span className="specular-button__content">{children}</span>
    </a>
  );
}

export default function SpecularButton(props: ButtonProps) {
  const { children, className = '', compact = false, type = 'button', ...rest } = props;
  const shine = useShine<HTMLButtonElement>();
  return (
    <button
      {...rest}
      type={type}
      ref={shine.ref}
      onPointerMove={(event) => {
        shine.onPointerMove(event);
        rest.onPointerMove?.(event);
      }}
      className={`specular-button ${compact ? 'specular-button--compact' : ''} ${className}`.trim()}
    >
      <span className="specular-button__shine" aria-hidden="true" />
      <span className="specular-button__content">{children}</span>
    </button>
  );
}
