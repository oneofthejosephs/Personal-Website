"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import Image from "next/image";

type Props = {
  lightSrc?: string; // light mode asset
  darkSrc?: string;  // dark mode asset
  size?: number;     // square size in px
  pad?: number;      // viewport padding so it never clips
};

/**
 * Vertical right-edge swan that tracks page scroll.
 * - Uses light/dark images (black in light mode, white in dark mode)
 * - Faces DOWN when scrolling down, UP when scrolling up
 * - Gentle bob + subtle vertical ripple/shadow to the left
 *
 * NOTE: this assumes your swan image faces LEFT by default.
 * If your asset faces right, swap the rotation signs below.
 */
export default function SwanScroll({
  lightSrc = "/black-swan.png",
  darkSrc = "/white-swan.png",
  size = 64,
  pad = 16,
}: Props) {
  const { scrollYProgress, scrollY } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.25 });

  // Constrain vertical travel to viewport with padding
  const top = useTransform(smooth, (v: number) => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const travel = Math.max(0, vh - size - pad * 2);
    return pad + v * travel;
  });

  // Detect scroll direction to flip the heading (up vs down)
  const lastY = useRef(0);
  const [dir, setDir] = useState<"down" | "up">("down");
  useEffect(() => {
    const unsub = scrollY.on("change", (y: number) => {
      if (y > lastY.current + 2) setDir("down");
      else if (y < lastY.current - 2) setDir("up");
      lastY.current = y;
    });
    return () => unsub();
  }, [scrollY]);

  // If your art faces LEFT by default:
  //   down  => rotate +90deg   (left -> down, clockwise)
  //   up    => rotate -90deg   (left -> up, counterclockwise)
  const rotation = dir === "down" ? -90 : 90;

  return (
    <motion.div
      style={{ top }}
      className="fixed right-4 z-50 -translate-y-1/2 pointer-events-none"
      aria-hidden="true"
    >
      {/* vertical ripple/shadow just to the left of the swan */}
      <motion.div
        className="absolute -bottom-1 left-1/2 w-14 h-3 bg-black/20 dark:bg-white/20 rounded-full blur-sm"
        animate={{x: dir === "down" ? "-50%" : "50%", scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3],
        }}
        transition={{duration: 2, repeat: Infinity,ease: "easeInOut",
        }}
      />

      {/* click target (image) */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="relative block pointer-events-auto focus:outline-none"
        title="Back to top"
        aria-label="Back to top"
        animate={{ x: [0, 2, 0, -2, 0] }}        // gentle sideways bob
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotate: rotation }}
      >
        {/* Light mode = black swan */}
        <Image
          src={lightSrc}
          alt=""
          width={size}
          height={size}
          priority
          className="object-contain block dark:hidden select-none
                     drop-shadow-[0_3px_6px_rgba(0,0,0,0.25)]"
        />
        {/* Dark mode = white swan */}
        <Image
          src={darkSrc}
          alt=""
          width={size}
          height={size}
          priority
          className="object-contain hidden dark:block select-none
                     drop-shadow-[0_3px_6px_rgba(255,255,255,0.18)]"
        />
      </motion.button>
    </motion.div>
  );
}

