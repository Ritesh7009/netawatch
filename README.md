# Lok Sabha & Civic Intelligence Observatory (NetaWatch)

A high-performance, interactive civic intelligence platform delivering transparent audits, financial disclosures, parliamentary performance tracking, and GIS constituency analytics for India's 543 Lok Sabha Members of Parliament (MPs).

Built with modern React, TypeScript, Tailwind CSS, Motion, and GSAP.

---

## 🚀 Key Features

- **Interactive 3D Radial Arc Decks (Tornado & Spotlight Decks)**:
  - Cylindrical 3D perspective carousels powered by continuous trigonometry calculations.
  - Interactive drag-to-spin physics with inertia, boundary wrapping, and shortest-path rotational snapping.
  - Browser-native Web Audio API tick clicks providing tactile haptic sound feedback.

- **Precision Horizontal Scrollable Pill-Tab Navigation**:
  - Dynamic bilateral edge-fade masking using CSS `mask-image: linear-gradient(...)` that automatically detects overflow.
  - Shared GSAP morphing active pill indicator with smooth layout transitions.
  - Automatic active-tab centering within the viewport on click or cycle.
  - Full WAI-ARIA compliance (`tablist`, `tab`, `aria-selected`) with comprehensive keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
  - Pointer/touch drag-to-scroll with drag-threshold discrimination.

- **Civic Data & MP Intelligence Vault**:
  - **Asset Velocity & Net Worth**: Disclosed movable/immovable assets, liabilities, and year-over-year growth velocity.
  - **Judicial Audit & Criminal Declarations**: Step-by-step audit timelines of sworn affidavits, IPC records, and charge-sheeted matters.
  - **Parliamentary Pulse**: Attendance rates, parliamentary debates participated in, and questions tabled.
  - **Dynasty & Lineage Radar**: Generational political velocity and family lineage mapping.
  - **Constituency GIS Explorer**: Filterable constituency directory spanning states, parties, and reservation categories.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animation & Physics** | [Motion (`motion/react`)](https://motion.dev/) & [GSAP 3](https://gsap.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Audio Feedback** | Native Web Audio API (Synthesized clicks & sweeps) |
| **Visualization** | HTML5 Canvas 2D & SVG Geometry |

---

## 📁 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── PillTabNav.tsx              # Reusable scrollable pill-tab navigation bar
│   │   ├── TornadoModuleShowcase.tsx   # Circular radial module showcase wheel
│   │   ├── NetaWatchArcDeck.tsx        # Spotlight intelligence arc deck
│   │   ├── HeroOverview.tsx            # Header metric odometer and live status
│   │   ├── TabbedFeatureVault.tsx      # Comprehensive parliamentary audit ledger
│   │   ├── MPNewsDialDeck.tsx          # Real-time circular news dial
│   │   ├── LocalRepresentationHub.tsx  # Pincode & constituency representative finder
│   │   ├── PoliticianImage.tsx         # Resilient fallback-enabled avatar component
│   │   └── ...
│   ├── data/
│   │   ├── mockPoliticians.ts          # Comprehensive MP dossiers and historical metrics
│   │   └── ...
│   ├── types.ts                        # Shared TypeScript data models and interfaces
│   ├── App.tsx                         # Primary view coordinator and layout shell
│   ├── main.tsx                        # React application entrypoint
│   └── index.css                       # Global Tailwind CSS directives
├── index.html                          # HTML shell and web fonts
├── package.json                        # Scripts and dependencies
└── tsconfig.json                       # TypeScript compiler configuration
