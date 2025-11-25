# ISS Live Tracker v2.0

**One-liner**: Polish a working ISS tracker into a production-ready showcase of vibe coding with Claude.

## Current State (Updated: 2025-11-25)

**Status:** Working prototype, needs polish
**Codebase:**
- ~500 lines vanilla JavaScript (script.js)
- HTML/CSS with Leaflet.js for mapping
- No build system, no tests

**Known Issues:**
- Pass predictions are fake (random data, not real orbital math)
- No error handling when API fails
- CSS duplicated in both index.html and style.css
- Keyboard shortcuts fire when typing in inputs
- Stream selector has duplicate URLs
- No offline/stale data indication

## v2.0 Goals

**Vision:** Transform from working prototype to polished, production-ready showcase demonstrating what vibe coding with Claude can achieve.

**Scope:**
- Real pass predictions using satellite.js + TLE data from CelesTrak
- Proper error handling and offline resilience
- API rate limiting (pause when tab hidden)
- Fix all known issues (CSS, keyboard shortcuts, streams)
- Add crew information display
- Add amateur radio frequencies
- Add weather overlay for viewing conditions
- Add notifications for upcoming passes
- Support for tracking other satellites

**Success Criteria:**
- [ ] Pass predictions show real, accurate data for user's location
- [ ] App handles API failures gracefully with user feedback
- [ ] All known bugs fixed
- [ ] Future enhancements from README implemented
- [ ] Code is clean, consolidated, production-quality

## Constraints

- Vite + Svelte (modern, lightweight, compiles to minimal JS)
- Libraries: satellite.js for orbital mechanics, Leaflet for mapping
- Deploys to static files (Netlify, Vercel, GitHub Pages)

## Out of Scope

- Backend/server component
- User accounts or data persistence beyond localStorage
- Mobile native apps
