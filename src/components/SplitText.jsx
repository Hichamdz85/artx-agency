import { motion, useReducedMotion } from "framer-motion";

/**
 * Word-by-word reveal — each word fades up and de-blurs.
 * Used in the hero for the most cinematic feel.
 * Honors prefers-reduced-motion: text is rendered statically when the OS
 * setting is enabled.
 */
export default function SplitText({ children, as: As = "span", delay = 0, className = "" }) {
  const shouldReduce = useReducedMotion();
  const words = String(children).split(" ");

  if (shouldReduce) {
    return (
      <As className={className} aria-label={children}>
        {children}
      </As>
    );
  }

  return (
    <As className={className} aria-label={children}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-baseline pr-[0.25em] last:pr-0">
          <motion.span
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </As>
  );
}
