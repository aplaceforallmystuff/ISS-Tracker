# Roadmap: ISS Live Tracker v2.0

## Overview

Transform the ISS Live Tracker from a vanilla JS prototype into a polished, production-ready Svelte application. Migration first, then systematic bug fixes, real orbital mechanics, and new features to create a showcase of vibe coding with Claude.

## Phases

- [ ] **Phase 1: Migration** - Migrate to Vite + Svelte with feature parity
- [ ] **Phase 2: Bug Fixes** - Fix known issues and add error handling
- [ ] **Phase 3: Core Infrastructure** - Real pass predictions with satellite.js + TLE
- [ ] **Phase 4: Resilience** - Rate limiting, offline handling, persistence
- [ ] **Phase 5: New Features** - Crew info, radio frequencies, multi-satellite
- [ ] **Phase 6: Enhanced Experience** - Weather overlay, notifications, distance display

## Phase Details

### Phase 1: Migration
**Goal**: Vite + Svelte project with full feature parity to current app
**Depends on**: Nothing (first phase)
**Plans**: TBD (likely 2-3 plans)

Plans:
- [ ] 01-01: Vite + Svelte setup, project structure
- [ ] 01-02: Migrate map, ISS tracking, UI components
- [ ] 01-03: Migrate side panel, modals, theme system

### Phase 2: Bug Fixes
**Goal**: Fix all known issues, clean codebase
**Depends on**: Phase 1
**Plans**: TBD (likely 1-2 plans)

Plans:
- [ ] 02-01: Keyboard shortcuts, stream URLs, error handling

### Phase 3: Core Infrastructure
**Goal**: Real orbital mechanics with satellite.js and CelesTrak TLE data
**Depends on**: Phase 2
**Plans**: TBD (likely 2-3 plans)

Plans:
- [ ] 03-01: Integrate satellite.js, fetch TLE data
- [ ] 03-02: Implement SGP4 pass predictions
- [ ] 03-03: Improve trajectory visualization

### Phase 4: Resilience
**Goal**: Robust handling of network issues, state persistence
**Depends on**: Phase 3
**Plans**: TBD (likely 1-2 plans)

Plans:
- [ ] 04-01: Rate limiting, visibility API, offline indicators
- [ ] 04-02: localStorage persistence, loading states

### Phase 5: New Features
**Goal**: Add crew info, radio frequencies, multi-satellite tracking
**Depends on**: Phase 4
**Plans**: TBD (likely 2-3 plans)

Plans:
- [ ] 05-01: ISS crew information display
- [ ] 05-02: Amateur radio frequencies
- [ ] 05-03: Multi-satellite tracking support

### Phase 6: Enhanced Experience
**Goal**: Weather overlay, notifications, distance calculations
**Depends on**: Phase 5
**Plans**: TBD (likely 2 plans)

Plans:
- [ ] 06-01: Weather overlay for viewing conditions
- [ ] 06-02: Pass notifications, distance to ISS display

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Migration | 0/3 | Not started | - |
| 2. Bug Fixes | 0/1 | Not started | - |
| 3. Core Infrastructure | 0/3 | Not started | - |
| 4. Resilience | 0/2 | Not started | - |
| 5. New Features | 0/3 | Not started | - |
| 6. Enhanced Experience | 0/2 | Not started | - |
