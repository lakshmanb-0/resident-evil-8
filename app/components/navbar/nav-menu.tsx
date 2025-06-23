"use client";
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import { useNavMenu } from "./use-nav-menu";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export const NavMenu = () => {
  const {
    isOpen,
    overlayRef,
    closeIconRef,
    parentRef,
    itemRefs,
    bgStripRef,
    toggleMenu,
    handleItemHover,
    handleItemClick,
  } = useNavMenu();

  const backgroundImages = {
    home: "/home.png",
    trailer: "/trailer.jpg",
    characters: "/characters.jpg",
    guides: "/guides.png",
    credit: "/credit.jpg",
  };

  const pages = ["home", "trailer", "characters", "guides", "credit"];

  const assignItemRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      if (el) {
        itemRefs.current[index] = el;
      }
    },
    [itemRefs]
  );

  return (
    <section>
      <Button
        className={cn(
          "!bg-accent !text-accent-foreground",
          isOpen && "rotate-90 transition-transform"
        )}
        onClick={toggleMenu}
      >
        {isOpen ? <X className="size-6" /> : <MenuIcon className="size-6" />}
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-[9999] items-center justify-center",
          isOpen ? "flex" : "hidden"
        )}
        ref={overlayRef}
      >
        <div className="absolute top-0 left-0 overflow-hidden z-0 w-full h-full bg-black/60">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out w-full "
            ref={bgStripRef}
          >
            {[
              backgroundImages.credit,
              ...Object.values(backgroundImages),
              backgroundImages.home,
            ].map((im, i) => (
              <div
                key={i}
                className="relative h-full w-full"
                style={{ flex: "0 0 100%" }}
              >
                <Image
                  src={im}
                  alt="bg"
                  className="h-full w-full object-cover"
                  width={1920}
                  height={1080}
                />
                <div className="absolute inset-0 bg-black/60 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        <Button
          className="!bg-transparent absolute top-4 right-2 text-white z-10"
          onClick={toggleMenu}
          variant={"ghost"}
          ref={closeIconRef}
        >
          <X className="size-8" />
        </Button>
        <div
          className="text-white text-2xl grid grid-cols-10 gap-4 h-[80%] w-screen"
          ref={parentRef}
        >
          {pages.map((item, index) => (
            <button
              key={item}
              ref={assignItemRef(index)}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => handleItemHover(index)}
              className="hover:text-primary col-span-2 text-center text-2xl lg:text-3xl xl:text-4xl flex items-start justify-center gap-2 cursor-pointer w-fit h-fit mx-auto"
            >
              <span className="text-xs font-secondary text-muted-foreground">
                {`0${index + 1}`.split("").map((char, i) => (
                  <span key={i} className={`textChar-${index} inline-block`}>
                    {char}
                  </span>
                ))}
              </span>
              <span className="capitalize">
                {item.split("").map((char, i) => (
                  <span key={i} className={`textChar-${index} inline-block`}>
                    {char}
                  </span>
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
