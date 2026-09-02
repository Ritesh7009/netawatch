# Lok Sabha & Civic Intelligence Observatory (NetaWatch)

A high-performance, interactive civic intelligence platform delivering transparent audits, financial disclosures, parliamentary performance tracking, and GIS constituency analytics for India's 543 Lok Sabha Members of Parliament (MPs).

Built with modern React, TypeScript, Tailwind CSS, Motion, GSAP, and designed with structured accessibility attributes ready for **WebMCP (Web Model Context Protocol)** agentic tooling.

---

## 🤖 WebMCP (Web Model Context Protocol) & AI Agent Integration

### What is WebMCP?

**WebMCP (Web Model Context Protocol)** extends the Model Context Protocol (MCP) paradigm into the browser and web applications. While traditional MCP connects Large Language Models (such as OpenAI's GPT-4o, o1, and operator/agent models) to server-side tools and databases via JSON-RPC, **WebMCP provides a standardized protocol for AI agents to inspect, query, and manipulate client-side web application state and UI controls natively**.

### Key Architectural Concepts of WebMCP

1. **Client-Side Tool Exposing**
   - Rather than relying solely on raw DOM screenshotting or imprecise vision coordinates, WebMCP allows web applications to register **browser-native tools and semantic endpoints** (e.g., `audit_mp_dossier`, `filter_constituency`, `rotate_deck_to_index`).
   - AI models connected via WebMCP can invoke actions with structured JSON inputs directly inside the running web page.

2. **Semantic UI Grounding & ARIA Anchoring**
   - AI agent web operators leverage standard `role`, `aria-*`, and persistent `id` attributes.
   - This project implements explicit `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, and designated container IDs across the radial decks and pill navigation components, allowing WebMCP-enabled models to inspect current state (e.g., active view, rotation index) with zero ambiguity.

3. **Autonomous Agent Navigation & Scraper Compatibility**
   - When an OpenAI agent is tasked with a query (e.g., *"Find the total declared assets of the MP for Varanasi and switch to their Criminal Case Ledger"*), a WebMCP-compliant interface can:
     - Directly trigger the programmatic navigation callback (`jumpToIndex` or `onTabChange`).
     - Retrieve JSON data payloads directly from the component's internal state without executing slow full-page DOM traverses.

### Conceptual WebMCP Tool Schema Example

```json
{
  "name": "neta_watch_navigate_deck",
  "description": "Navigates the 3D rotating civic intelligence deck to a specific module or tab.",
  "parameters": {
    "type": "object",
    "properties": {
      "tabId": {
        "type": "string",
        "enum": ["the-vault", "asset-velocity", "parliament-pulse", "cases-ledger", "dynasty-radar", "community"],
        "description": "The unique identifier of the intelligence module to focus."
      },
      "mpId": {
        "type": "string",
        "description": "Optional unique identifier of the target MP to inspect."
      }
    },
    "required": ["tabId"]
  }
}
```

---

## 🚀 Key Features

**Interactive 3D Radial Arc Decks (Tornado & Spotlight Decks)**
- Cylindrical 3D perspective carousels powered by continuous trigonometry calculations.
- Interactive drag-to-spin physics with inertia, boundary wrapping, and shortest-path rotational snapping.
- Browser-native Web Audio API tick clicks providing tactile haptic sound feedback.

**Precision Horizontal Scrollable Pill-Tab Navigation**
- Dynamic bilateral edge-fade masking using CSS `mask-image: linear-gradient(...)` that automatically detects overflow.
- Shared GSAP morphing active pill indicator with smooth layout transitions.
- Automatic active-tab centering within the viewport on click or cycle.
- Full WAI-ARIA compliance (`tablist`, `tab`, `aria-selected`) with comprehensive keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
- Pointer/touch drag-to-scroll with drag-threshold discrimination.

**Civic Data & MP Intelligence Vault**
- **Asset Velocity & Net Worth** — Disclosed movable/immovable assets, liabilities, and year-over-year growth velocity.
- **Judicial Audit & Criminal Declarations** — Step-by-step audit timelines of sworn affidavits, IPC records, and charge-sheeted matters.
- **Parliamentary Pulse** — Attendance rates, parliamentary debates participated in, and questions tabled.
- **Dynasty & Lineage Radar** — Generational political velocity and family lineage mapping.
- **Constituency GIS Explorer** — Filterable constituency directory spanning states, parties, and reservation categories.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Animation & Physics | Motion (`motion/react`) & GSAP 3 |
| Icons | Lucide React |
| Agent / Protocol | Ready for WebMCP & OpenAI Browser Agents |
| Audio Feedback | Native Web Audio API (Synthesized clicks & sweeps) |
| Visualization | HTML5 Canvas 2D & SVG Geometry |

---

## 📁 Project Structure

```
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
```

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

Clone or download the repository:
```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 🔨 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Launches the Vite development server on port 3000. |
| `npm run build` | Type-checks and builds the static production bundle into `dist/`. |
| `npm run lint` | Runs `tsc --noEmit` to validate TypeScript safety across the codebase. |
| `npm run preview` | Previews the compiled production build locally. |

---

## ♿ Accessibility & Interaction Standards

- **Touch & Mouse Ergonomics** — Minimum 44px touch targets across interactive triggers and buttons.
- **Contrast & Legibility** — Strict adherence to WCAG AA contrast against the warm-neutral `#fbf9f5` background.
- **Fluid Layout** — Fully responsive from mobile devices (360px+) up to wide desktop monitors (1440px+).
- **Performance** — Heavy computations (radial geometry, layout indicators, and particulate canvas renders) are memoized using `useMemo`, `useCallback`, and native browser `requestAnimationFrame`.

---

## 📄 License

This project is open-source and available under the MIT License.
