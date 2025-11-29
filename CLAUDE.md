# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ISS Live Tracker is a real-time International Space Station tracker with live Earth views from space. It's a vanilla JavaScript web app with no build system or dependencies to install - just open `index.html` in a browser.

## Running the App

```bash
# Option 1: Direct file (may have CORS issues)
open index.html

# Option 2: Local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

No build step, tests, or linting configured.

## Architecture

### File Structure
- `index.html` - Main HTML with inline styles for critical CSS
- `script.js` - All JavaScript logic (single file, ~500 lines)
- `style.css` - Additional styles (also duplicated in index.html `<style>` block)
- `manifest.json` - PWA manifest

### External Dependencies (loaded via CDN)
- **Leaflet.js** - Interactive 2D map (`https://unpkg.com/leaflet@1.9.4`)

### Key APIs
- **WhereTheISS.at API** (`https://api.wheretheiss.at/v1/satellites/25544`) - Real-time ISS position, updated every 2 seconds
- **Nominatim** (`https://nominatim.openstreetmap.org/search`) - Location geocoding for pass predictions
- **YouTube Embed** - NASA live stream integration

### Data Flow
1. `startTracking()` initializes a 2-second interval calling `updateISSPosition()`
2. Position data updates: marker location, orbit lines, UI statistics
3. Map uses CartoDB tiles (dark/light themes via `data-theme` attribute)

### Theme System
- Controlled via `html[data-theme="light"]` attribute
- `setTheme()` updates: CSS variables, map tiles (`updateBaseLayer()`), orbit line colors (`updateOrbitColors()`)
- Theme persists in `localStorage`

### Pass Predictions
Current implementation uses simplified approximations (random values), not real orbital mechanics. README notes SGP4/SDP4 propagation as future enhancement.

## Code Patterns

- Global variables at top of `script.js` (no modules)
- Functions exposed to global scope for `onclick` handlers in HTML
- Orbit visualization: past trajectory stored in `currentOrbitPoints[]` array, future calculated via `calculateFutureOrbit()`
