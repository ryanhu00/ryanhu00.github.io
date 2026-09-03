import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Lenis from 'lenis';

type ScrollToOptions = {
  offset?: number;
  onComplete?: () => void;
};

type LenisContextValue = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => undefined,
});

export const useAppLenis = () => useContext(LenisContext);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      allowNestedScroll: true,
    });
    setLenis(instance);

    let frameId = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      if (!lenis) return;
      lenis.scrollTo(target, {
        offset: options?.offset ?? 0,
        onComplete: options?.onComplete,
      });
    },
    [lenis]
  );

  const value = useMemo(
    () => ({
      lenis,
      scrollTo,
    }),
    [lenis, scrollTo]
  );

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
};
