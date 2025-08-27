"use client";

import { useScroll, useSpring, useTransform, motion } from "framer-motion";

/**
 * A vertical, right-side "swimming" swan that tracks scroll progress.
 * Black swan SVG (clean silhouette with orange beak).
 * Click to smooth-scroll back to top.
 */
export default function SwanScroll() {
  const { scrollYProgress } = useScroll();
  // Smooth the motion
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.25 });

  // Map scroll progress (0..1) to vertical position in viewport (in px)
  // We keep some padding from top/bottom so the swan never clips.
  const top = useTransform(smooth, (v: number) => {
    const viewH = typeof window !== "undefined" ? window.innerHeight : 800;
    const swanH = 52; // SVG height in px
    const pad = 16;   // inset from top/bottom
    const travel = Math.max(0, viewH - swanH - pad * 2);
    return pad + v * travel;
  });

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      style={{ top }}
      className="
        fixed right-4 z-50
        -translate-y-1/2
        pointer-events-auto
        focus:outline-none
      "
    >
      {/* gentle sideways bob so it feels alive */}
      <motion.div
        animate={{ x: [0, 2, 0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        className="drop-shadow"
      >
        {/* Black swan — taller viewBox so head has room, no clipping */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="58"
          height="52"
          viewBox="0 0 64 64"
          role="img"
          aria-hidden="true"
        >
          {/* body & wing (black silhouette) */}
          <path
            d="M12 42c6 8 18 11 26 11s18-3 18-9c0-4-3-7-8-8-6-1-9 2-12 1-3-1-4-5-1-8 2-3 6-4 9-8 2-3 2-7-1-9-4-2-9 1-10 5"
            fill="black"
          />
          {/* neck */}
          <path
            d="M30 18c-2 6 4 9 8 10 1-3 1-7-2-9-1-1-3-2-6-1z"
            fill="black"
          />
          {/* beak (orange) */}
          <path d="M39 21c2 0 3 1 4 2-1 1-2 1-4 1z" fill="#f97316" />
          {/* eye (small gray so it’s visible on black) */}
          <circle cx="37" cy="20.6" r="1" fill="#e5e7eb" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
