/**
 * Hero background video config.
 *
 * Current pick: Concept A — "The X Awakens"
 *   Model:    Higgsfield Cinema Studio 3.0
 *   Source:   text-to-video (Higgsfield job daa2420c-b0a6-436a-b70c-6b3aa96669b8)
 *   Duration: 6.0s · 1280×720 · 24fps
 *
 * Local assets (in `public/hero/`):
 *   - hero-bg.mp4      ~ 932 KB · H.264 + faststart (web-optimized)
 *   - hero-bg.webm     ~ 1.3 MB · VP9 alternative
 *   - hero-poster.jpg  ~ 40  KB · still frame at 3.5s (the "X" climax)
 *
 * To swap the clip later: just replace the three files and bump the
 * cache-busting query string `?v=…`.
 */
export const heroVideo = {
  enabled: true,
  src:     "/hero/hero-bg.mp4?v=1",
  srcWebm: "/hero/hero-bg.webm?v=1",
  poster:  "/hero/hero-poster.jpg?v=1",
  overlay: 0.55, // 0..1 — 0.55 keeps the headline readable over the brightest frames
};
