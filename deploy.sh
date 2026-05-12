#!/usr/bin/env bash
# ----------------------------------------------------------------------------
# ArtX Agency — final deploy script.
#
# Run this once from your actual machine (not from the Cowork sandbox) to:
#   1. Clear any stale git lock left by an interrupted process.
#   2. Drop the local .fonts-archive/ (1.3 MB of old TTFs, replaced by WOFF2).
#   3. Re-stage all changes cleanly (.gitignore is up-to-date).
#   4. Commit with a structured release message.
#   5. Push to GitHub (origin = Hichamdz85/artx-agency, branch = main).
#
# Vercel is already linked to the GitHub repo (see .vercel/project.json),
# so the push will automatically trigger a production deployment.
#
# Usage:   bash deploy.sh   (or:   chmod +x deploy.sh && ./deploy.sh)
# ----------------------------------------------------------------------------

set -e  # exit on first error
cd "$(dirname "$0")"

echo "▸ 1/6  Clearing any stale git lock…"
rm -f .git/index.lock 2>/dev/null || sudo rm -f .git/index.lock
echo "  done."

echo "▸ 2/6  Removing local .fonts-archive/ (no longer needed)…"
rm -rf .fonts-archive
echo "  done."

echo "▸ 3/6  Resetting git index and re-staging cleanly…"
git reset HEAD --quiet
git add -A
echo "  staged $(git status --short | wc -l) files."

echo "▸ 4/6  Verifying build still works…"
npm install --silent --no-audit --no-fund
npm run build
echo "  build OK."

echo "▸ 5/6  Committing release…"
git commit -m "feat(release): manifesto + legal + perf pass

Phase 3 hardening before public launch.

- Add Card Stack Reveal manifesto (3 stages, GSAP-powered, lazy-loaded)
- Add Cookie Consent (GDPR + ePrivacy compliant, granular categories)
- Add Privacy Policy / Cookie Policy / Legal Notice modals (Belgian law)
- Add Scroll-to-top FAB with brand gradient halo
- Migrate Grift TTF → WOFF2 (18 weights → 4, 1.3 MB → 77 KB, -94%)
- Replace min-h-screen with min-h-[100svh] (fixes iOS Safari URL bar bug)
- Bump WCAG AA contrast on Services eyebrow + card numbers
- Resize Navbar mobile toggle to 44×44 (Apple HIG compliance)
- Add CSP, X-Content-Type-Options, Referrer-Policy meta tags
- Add vercel.json with HSTS, COOP, immutable cache for static assets
- Code-split ManifestoFlow (defer GSAP 48 KB until below the fold)
- Remove @rollup/rollup-linux-arm64-gnu pin (was breaking Vercel build)

Performance: 100 KB initial JS gzipped (was 143 KB) · 0 npm vulnerabilities"
echo "  committed."

echo "▸ 6/6  Pushing to GitHub…"
git push origin main
echo ""
echo "✓ DONE."
echo ""
echo "  GitHub:  https://github.com/Hichamdz85/artx-agency"
echo "  Vercel:  https://vercel.com/$(jq -r .orgId .vercel/project.json 2>/dev/null || echo 'team')/artx-agency"
echo ""
echo "  Vercel is auto-deploying the push right now."
echo "  Check the live URL at:  https://artx.agency  (or your *.vercel.app)"
