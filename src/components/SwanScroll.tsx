"use client";

import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export default function SwanScroll() {
  // 0 at page top, 1 at page bottom
  const { scrollYProgress } = useScroll();
  // smooth the motion a bit
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  // map progress to horizontal position across the pond (as a percentage)
  const left = useTransform(smooth, (v: number) => `${v * 100}%`);

  return (
    <div
      className="
        pointer-events-none fixed inset-x-0 bottom-0 z-50
        px-6 pb-4
      "
      aria-hidden="true"
    >
      <div
        className="
          relative mx-auto max-w-5xl
          h-14 rounded-2xl border bg-gradient-to-t from-sky-200/70 to-sky-100/70
          dark:from-sky-900/60 dark:to-sky-800/60
          shadow-sm
          overflow-hidden
        "
      >
        {/* decorative gentle 'ripples' */}
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_120%,_white_10%,_transparent_40%),radial-gradient(circle_at_80%_-20%,_white_12%,_transparent_40%)] dark:opacity-20" />

        {/* the swan */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ left }}
          className="
            pointer-events-auto absolute -top-5
            -translate-x-1/2
            focus:outline-none
          "
          aria-label="Back to top"
          title="Back to top"
        >
          <motion.div
            // gentle bobbing
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="drop-shadow"
          >
            {/* inline SVG swan so you don't need an asset file */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 64 64"
            >
              {/* body */}
              <path
                d="M10 42c6 8 18 10 26 10s18-3 18-9c0-4-3-7-8-8-5-1-9 2-12 1-3-1-4-5-1-8 3-3 8-3 10-9 1-3 0-7-3-8-4-2-8 2-8 6"
                fill="white"
                stroke="black"
                strokeOpacity="0.15"
                strokeWidth="1.2"
              />
              {/* neck & head */}
              <path
                d="M30 19c-2 5 3 8 7 9 1-3 1-6-2-8-1-1-3-2-5-1z"
                fill="white"
              />
              {/* beak */}
              <path d="M38 21c2 0 3 1 4 2-1 1-2 1-4 1z" fill="#f97316" />
              {/* eye */}
              <circle cx="36.7" cy="20.6" r="0.9" fill="black" />
              {/* tiny wake ripple */}
              <path
                d="M6 49c6 3 14 4 22 4s16-1 23-4"
                stroke="white"
                strokeOpacity="0.7"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
