import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppLenis } from './LenisProvider';
import { DarkModeToggle, useTheme } from './theme';
import { NAV_LINKS } from '../../data/content';
import rhuLogoBlack from '../../assets/rhu_logo_b.png';
import rhuLogoWhite from '../../assets/rhu_logo_w.png';
import PillNav from './PillNav/PillNav';

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

/** Live nav clearance from floating pill + gap (rbp-style). */
const getNavClearance = (): number => {
  const nav = document.querySelector('.pill-nav-container') as HTMLElement | null;
  if (nav) {
    return Math.ceil(nav.getBoundingClientRect().bottom + 24);
  }

  const root = getComputedStyle(document.documentElement);
  const heroPt = Number.parseFloat(root.getPropertyValue('--hero-pt'));
  if (!Number.isNaN(heroPt) && heroPt > 0) {
    // --hero-pt is in rem; convert roughly via font-size
    const fontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const raw = root.getPropertyValue('--hero-pt').trim();
    if (raw.endsWith('rem')) {
      return Math.ceil(Number.parseFloat(raw) * fontSize);
    }
    return Math.ceil(heroPt);
  }

  return 176;
};

const getActiveSectionId = (probe: number): string => {
  let current = SECTION_IDS[0];

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= probe) {
      current = id;
    }
  }

  const doc = document.documentElement;
  const scrollBottom = window.scrollY + window.innerHeight;
  const pageBottom = Math.max(doc.scrollHeight, document.body.scrollHeight);
  if (scrollBottom >= pageBottom - 4) {
    current = SECTION_IDS[SECTION_IDS.length - 1];
  }

  return current;
};

const Nav: React.FC = () => {
  const [active, setActive] = useState('#about');
  const { isDarkMode } = useTheme();
  const { lenis, scrollTo } = useAppLenis();
  const lockedHref = useRef<string | null>(null);
  const unlockTimer = useRef<number | null>(null);
  const clearanceRef = useRef(96);

  const items = useMemo(
    () =>
      NAV_LINKS.map((link) => ({
        label: link.label,
        href: `#${link.id}`,
        ariaLabel: link.label,
      })),
    []
  );

  const refreshClearance = useCallback(() => {
    clearanceRef.current = getNavClearance();
  }, []);

  const syncActiveFromScroll = useCallback(() => {
    if (lockedHref.current) {
      setActive((prev) => (prev === lockedHref.current ? prev : lockedHref.current!));
      return;
    }

    const next = `#${getActiveSectionId(clearanceRef.current)}`;
    setActive((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    refreshClearance();
    syncActiveFromScroll();

    const onScroll = () => syncActiveFromScroll();
    const onResize = () => {
      refreshClearance();
      syncActiveFromScroll();
    };

    window.addEventListener('resize', onResize);

    if (lenis) {
      lenis.on('scroll', onScroll);
      return () => {
        lenis.off('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [lenis, refreshClearance, syncActiveFromScroll]);

  useEffect(() => {
    refreshClearance();
    syncActiveFromScroll();
  }, [isDarkMode, refreshClearance, syncActiveFromScroll]);

  useEffect(() => {
    return () => {
      if (unlockTimer.current) {
        window.clearTimeout(unlockTimer.current);
      }
    };
  }, []);

  const handleNavigate = (href: string) => {
    if (unlockTimer.current) {
      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = null;
    }

    refreshClearance();
    lockedHref.current = href;
    setActive(href);

    const releaseLock = () => {
      unlockTimer.current = window.setTimeout(() => {
        lockedHref.current = null;
        unlockTimer.current = null;
        syncActiveFromScroll();
      }, 120);
    };

    const fallback = window.setTimeout(releaseLock, 1200);

    const onComplete = () => {
      window.clearTimeout(fallback);
      releaseLock();
    };

    if (href === '#about') {
      scrollTo(0, { onComplete });
      return;
    }

    const el = document.querySelector(href) as HTMLElement | null;
    if (el) {
      scrollTo(el, { offset: -clearanceRef.current, onComplete });
      return;
    }

    window.clearTimeout(fallback);
    releaseLock();
  };

  return (
    <PillNav
      className={isDarkMode ? 'is-dark' : ''}
      logo={isDarkMode ? rhuLogoWhite : rhuLogoBlack}
      logoAlt="Rhu Logo"
      items={items}
      activeHref={active}
      initialLoadAnimation
      onLogoClick={() => handleNavigate('#about')}
      onItemClick={(href) => handleNavigate(href)}
      baseColor={isDarkMode ? '#333333' : '#ffffff'}
      pillColor="transparent"
      pillTextColor={isDarkMode ? '#ffffff' : '#111111'}
      hoveredPillTextColor="#FF6C0C"
      rightSlot={<DarkModeToggle />}
    />
  );
};

export default Nav;
