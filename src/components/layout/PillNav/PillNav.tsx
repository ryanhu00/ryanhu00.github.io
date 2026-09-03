import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './PillNav.css';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
  onItemClick?: (href: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
  onLogoClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  rightSlot?: React.ReactNode;
};

/** Survives Strict Mode remounts — intro plays once per page load. */
let hasPlayedPillNavIntro = false;

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = 'transparent',
  hoveredPillTextColor = '#FF6C0C',
  pillTextColor = '#111',
  initialLoadAnimation = true,
  onItemClick,
  onLogoClick,
  rightSlot,
}) => {
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const rightSlotRef = useRef<HTMLDivElement | null>(null);

  const layoutPills = () => {
    circleRefs.current.forEach((circle) => {
      if (!circle?.parentElement) return;

      const pill = circle.parentElement as HTMLElement;
      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;
      if (w === 0 || h === 0) return;

      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });

      const label = pill.querySelector<HTMLElement>('.pill-label');
      const white = pill.querySelector<HTMLElement>('.pill-label-hover');

      if (label) gsap.set(label, { y: 0 });
      if (white) gsap.set(white, { y: h + 12, opacity: 0 });

      const index = circleRefs.current.indexOf(circle);
      if (index === -1) return;

      tlRefs.current[index]?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(
        circle,
        { scale: 1.35, xPercent: -50, duration: 2, ease, overwrite: 'auto' },
        0
      );

      if (label) {
        tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
      }

      if (white) {
        gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
      }

      tlRefs.current[index] = tl;
    });
  };

  useEffect(() => {
    layoutPills();

    const onResize = () => layoutPills();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layoutPills).catch(() => undefined);
    }

    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items.length]);

  useEffect(() => {
    if (!initialLoadAnimation || hasPlayedPillNavIntro) return;
    hasPlayedPillNavIntro = true;

    const nav = navRef.current;
    const logoEl = logoRef.current;
    const navItems = navItemsRef.current;
    const rightEl = rightSlotRef.current;

    if (nav) {
      gsap.fromTo(
        nav,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease }
      );
    }

    if (logoEl) {
      gsap.fromTo(logoEl, { scale: 0 }, { scale: 1, duration: 0.6, ease });
    }

    if (navItems) {
      gsap.fromTo(
        navItems,
        { width: 0, overflow: 'hidden', opacity: 0 },
        {
          width: 'auto',
          opacity: 1,
          duration: 0.6,
          ease,
          onComplete: () => {
            gsap.set(navItems, { overflow: 'visible', clearProps: 'width' });
            layoutPills();
          },
        }
      );
    }

    if (rightEl) {
      gsap.fromTo(
        rightEl,
        { scale: 0 },
        { scale: 1, duration: 0.6, ease, delay: 0.05 }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnter = (i: number) => {
    const circle = circleRefs.current[i];
    if (circle?.parentElement) {
      const pill = circle.parentElement;
      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;
      if (w > 0 && h > 0) {
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;
        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;
        gsap.set(circle, {
          xPercent: -50,
          transformOrigin: `50% ${originY}px`,
        });
      }
    }

    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLinkClick = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onItemClick) {
      event.preventDefault();
      onItemClick(href, event);
    }
  };

  const handleLogoLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onLogoClick) {
      event.preventDefault();
      onLogoClick(event);
    }
  };

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': pillTextColor,
  } as React.CSSProperties;

  return (
    <div className="pill-nav-container">
      <nav
        className={`pill-nav ${className}`}
        aria-label="Primary"
        style={cssVars}
        ref={navRef}
      >
        <a
          className="pill-logo"
          href={items?.[0]?.href || '#about'}
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          onClick={handleLogoLinkClick}
          ref={logoRef}
        >
          <img src={logo} alt={logoAlt} ref={logoImgRef} />
        </a>

        <div className="pill-nav-items" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href} role="none">
                <a
                  role="menuitem"
                  href={item.href}
                  className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                  onClick={(e) => handleLinkClick(item.href, e)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {rightSlot ? (
          <div className="pill-right-slot" ref={rightSlotRef}>
            {rightSlot}
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default PillNav;
