import { useEffect, useRef } from "react";

/**
 * Immersive animated background for the hero.
 *
 * Layers (back → front):
 *   1. Pure black base.
 *   2. Three drifting gradient orbs (Pink / Purple / Cyan) with heavy blur.
 *   3. SVG dot grid pattern faintly visible.
 *   4. Canvas particles connected by faint lines (constellation).
 *   5. Mouse-tracking radial glow.
 *   6. Vignette + film grain overlay.
 *
 * The canvas auto-resizes and respects `prefers-reduced-motion`.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, has: false };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Particle field — fewer particles on coarse pointers (mobile) and on
    // reduced-motion to keep the render loop cheap on lower-power devices.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const density = reduceMotion ? 60000 : coarse ? 38000 : 22000;
    const count = Math.floor((width * height) / density);
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.6 + 0.4,
      hue: Math.random() < 0.5 ? 270 : 200, // purple-ish vs cyan-ish
    }));

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.has = true;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mouse.x - 300}px, ${mouse.y - 300}px, 0)`;
      }
    };
    const onLeave = () => {
      mouse.has = false;
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
      }
    };
    const onEnter = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0.5";
      }
    };
    canvas.parentElement.addEventListener("pointermove", onMove);
    canvas.parentElement.addEventListener("pointerleave", onLeave);
    canvas.parentElement.addEventListener("pointerenter", onEnter);

    let rafId;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        // Subtle attraction toward cursor (cheap)
        if (mouse.has) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 22500) {
            // 150px
            const f = (1 - dist2 / 22500) * 0.04;
            p.vx += dx * f * 0.01;
            p.vy += dy * f * 0.01;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 70%, 0.85)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 70%, 0.6)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Connect nearby particles with faint lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const alpha = 1 - d2 / 14000;
            ctx.strokeStyle = `rgba(180, 120, 255, ${alpha * 0.18})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.parentElement.removeEventListener("pointermove", onMove);
      canvas.parentElement.removeEventListener("pointerleave", onLeave);
      canvas.parentElement.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Drifting gradient orbs */}
      <div
        aria-hidden
        className="absolute -left-32 top-1/3 h-[40rem] w-[40rem] rounded-full opacity-50 blur-[120px] animate-aurora"
        style={{ background: "radial-gradient(circle at center, #8437F5 0%, transparent 60%)" }}
      />
      <div
        aria-hidden
        className="absolute right-[-10%] top-[-10%] h-[36rem] w-[36rem] rounded-full opacity-40 blur-[140px] animate-aurora"
        style={{
          background: "radial-gradient(circle at center, #00A8FF 0%, transparent 65%)",
          animationDelay: "-6s",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-20%] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-30 blur-[150px] animate-aurora"
        style={{
          background: "radial-gradient(circle at center, #FFD0FE 0%, transparent 60%)",
          animationDelay: "-12s",
        }}
      />

      {/* Dot grid */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dotGrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#ffffff" />
          </pattern>
          <radialGradient id="dotMask" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dotFade">
            <rect width="100%" height="100%" fill="url(#dotMask)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" mask="url(#dotFade)" />
      </svg>

      {/* Constellation particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Mouse-tracking glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at center, rgba(132,55,245,0.35) 0%, rgba(0,168,255,0.12) 35%, transparent 65%)",
          filter: "blur(20px)",
          willChange: "transform",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Film grain */}
      <div aria-hidden className="absolute inset-0 noise-overlay" />
    </div>
  );
}
