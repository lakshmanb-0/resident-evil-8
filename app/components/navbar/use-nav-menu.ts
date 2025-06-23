"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useLenis } from "../lenis-provider";

export interface NavMenuHook {
  isOpen: boolean;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  closeIconRef: React.RefObject<HTMLButtonElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
  itemRefs: React.RefObject<(HTMLButtonElement | null)[]>;
  bgStripRef: React.RefObject<HTMLDivElement | null>;
  toggleMenu: () => void;
  handleItemHover: (index: number) => void;
  handleItemClick: (route: string) => void;
}

export const useNavMenu = (): NavMenuHook => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeIconRef = useRef<HTMLButtonElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bgStripRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { setScrollEnabled } = useLenis();

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  const handleItemClick = (route: string) => {
    router.push(`/${route}`);
    setOpen(false);
  };

  const handleItemHover = (index: number) => {
    const container = bgStripRef.current;
    if (container) {
      // Background strip animation with improved easing and performance
      const percent = index > 0 ? (index + 1) * 100 : 100;
      gsap.timeline({ defaults: { ease: "power2.inOut" } })
        .to(container, {
          xPercent: -percent,
          duration: 0.4,
          scale: 0.5,
        })
        .to(container, {
          scale: 1,
          duration: 0.3,
        });

      // Optimized text character animation with more dynamic effect
      const evenOdd = index % 2 === 0 ? 1 : -1;
      gsap.timeline()
        .to(`.textChar-${index}`, {
          keyframes: [
            { 
              y: 10 * evenOdd, 
              rotation: 5 * evenOdd, 
              scale: 1.1, 
              color: "var(--color-primary)",
              duration: 0.2,
              ease: "power1.out"
            },
            { 
              y: 0, 
              rotation: 0, 
              scale: 1, 
              color: "inherit",
              duration: 0.3,
              ease: "elastic.out(0.5)"
            }
          ],
          stagger: {
            each: 0.03,
            from: "center"
          }
        });
    }
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const closeIcon = closeIconRef.current;
    if (!overlay || !closeIcon) return;

    // Set body overflow and Lenis scroll based on menu state
    document.body.style.overflow = isOpen ? "hidden" : "";
    setScrollEnabled(!isOpen);

    // Optimized overlay animation with more efficient timeline
    const tl = gsap.timeline({ 
      defaults: { 
        duration: 0.5, 
        ease: "power2.inOut" 
      } 
    });

    if (isOpen) {
      tl.fromTo(
        overlay,
        {
          clipPath: "circle(0% at 100% 0)",
          opacity: 0,
        },
        {
          clipPath: "circle(150% at 100% 0)",
          opacity: 1,
        }
      )
      .fromTo(closeIcon, 
        { 
          opacity: 0, 
          scale: 0.5, 
          rotation: -180,
          y: 50
        }, 
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.5)"
        },
        "<"
      )
      .fromTo(
        itemRefs.current,
        {
          y: 0,
          opacity: 0,
          scale: 0.7
        },
        {
          y : () => {
            const parent = parentRef.current;
            const height = parent ? parent.offsetHeight : window.innerHeight;
            return gsap.utils.random(0, height);
          },
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: "back.out(1.7)"
        },
        "<0.2"
      );
    } else {
      tl.fromTo(
        overlay,
        {
          clipPath: "circle(150% at 0 100%)",
          opacity: 1,
        },
        {
          clipPath: "circle(0% at 0% 100%)",
          opacity: 0,
        }
      )
      .to(itemRefs.current, {
        y: () => {
          const parent = parentRef.current;
          const height = parent ? parent.offsetHeight : window.innerHeight;
          return height / 2 + gsap.utils.random(-100, 100);
        },
        opacity: 0,
        scale: 0.7,
        stagger: 0.1,
        ease: "back.in(1.7)"
      }, "<")
      .to(closeIcon, 
        { 
          opacity: 0, 
          scale: 0.5, 
          rotation: 180,
          y: 50,
          duration: 0.4,
          ease: "back.in(1.5)"
        }, 
        "<"
      );
    }

    // Cleanup: always reset body overflow
    return () => {
      document.body.style.overflow = "";
      setScrollEnabled(true);
      tl.clear();
    };
  }, [isOpen]);

  return {
    isOpen,
    overlayRef,
    closeIconRef,
    parentRef,
    itemRefs,
    bgStripRef,
    toggleMenu,
    handleItemHover,
    handleItemClick,
  };
}; 