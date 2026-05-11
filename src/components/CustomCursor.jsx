import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor with magnetic feel, blend-mode highlighting,
 * and "view" state when hovering over interactive elements
 * marked with [data-cursor="view"] or default <a>/<button>.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fineP = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fineP || reduceMotion) return; // skip on touch or when motion is reduced

    const html = document.documentElement;
    html.classList.add("cursor-none");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      }
    };

    const onOver = (e) => {
      const t = e.target.closest("a, button, [data-cursor]");
      if (t) {
        setHover(true);
        setLabel(t.getAttribute("data-cursor-label") || "");
      }
    };
    const onOut = (e) => {
      const t = e.target.closest("a, button, [data-cursor]");
      if (t) {
        setHover(false);
        setLabel("");
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);

    let raf;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 22}px, ${ry - 22}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[60] flex h-11 w-11 items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out ${
          hover ? "h-20 w-20 border border-white/10 bg-white/5 backdrop-blur-sm" : "border border-white/30"
        }`}
        style={{ willChange: "transform" }}
      >
        {hover && label ? (
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
            {label}
          </span>
        ) : null}
      </div>
    </>
  );
}
