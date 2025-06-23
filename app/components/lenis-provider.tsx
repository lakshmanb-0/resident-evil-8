"use client";
import { useEffect, useRef, createContext, useContext, useState } from "react";
import Lenis from "lenis";

interface LenisContextType {
  lenis: Lenis | null;
  setScrollEnabled: (enabled: boolean) => void;
}

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export function useLenis() {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error("useLenis must be used within LenisProvider");
  return ctx;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // smoothness
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      if (scrollEnabled) {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [scrollEnabled]);

  const setScroll = (enabled: boolean) => {
    setScrollEnabled(enabled);
    if (lenisRef.current) {
      if (!enabled) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  };

  return (
    <LenisContext.Provider
      value={{ lenis: lenisRef.current, setScrollEnabled: setScroll }}
    >
      {children}
    </LenisContext.Provider>
  );
}
