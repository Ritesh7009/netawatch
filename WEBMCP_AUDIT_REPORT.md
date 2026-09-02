# NetaWatch Technical Audit & WebMCP Architecture Report
**Generated for the OpenAI WebMCP Challenge Integration**
*Application: NetaWatch (18th Lok Sabha Political Intelligence & Leader Dossiers)*

---

## 1. Tech Stack

| Layer | Technologies & Libraries |
| :--- | :--- |
| **Framework** | **React 19.0.1** (Functional components, custom hooks, client-side rendering) |
| **Language** | **TypeScript 5.8.2** (Strict typing, interfaces, and enums in `src/types.ts`) |
| **Build Tool & Bundler** | **Vite 6.2.3** with `@vitejs/plugin-react` + **esbuild 0.25.0** (for backend bundling to `dist/server.cjs`) |
| **Dependencies** | `@google/genai` (v2.4.0), `d3` (v7.9.0), `recharts` (v3.10.1), `motion` (v12.23.24), `gsap` (v3.15.0), `canvas-confetti` (v1.9.4), `topojson-client` (v3.1.0), `lucide-react` (v0.546.0), `express` (v4.21.2), `dotenv` (v17.2.3) |
| **UI & Styling** | **Tailwind CSS v4** (`@tailwindcss/vite` 4.1.14), custom typography (*Plus Jakarta Sans*, *Playfair Display*, *JetBrains Mono*), Lucide React iconography |
| **State Management** | **React Component State (`useState`, `useRef`, `useMemo`, `useEffect`)** at the root level (`src/App.tsx`), synchronized with URL search params (`?mp=<id>`) and hash navigation. Lightweight and highly responsive without external boilerplate. |
| **Backend / Server** | **Express.js (`server.ts`)** running on Node.js. Serves as Vite development middleware, serves static production assets, provides REST endpoints (`/api/constituencies`, `/api/states`, `/api/politician-photo`, `/api/generate-mp-dossier`), and interfaces with Gemini API server-side. |

---

## 2. Project Structure

### File & Directory Map

```
├── server.ts                       # Express backend server, API routes, and Vite SSR/dev middleware
├── index.html                      # Main entrypoint, SEO meta tags, JSON-LD Schema.org graphs, noscript fallback
├── metadata.json                   # App capabilities, permissions, and app identity
├── package.json                    # Project dependencies and build scripts
├── src/
│   ├── main.tsx                    # React client mount point
│   ├── App.tsx                     # Top-level state coordinator, routing, modals, and layout
│   ├── types.ts                    # Canonical TypeScript interfaces (Politician, LegalCase, Assets, etc.)
│   ├── index.css                   # Tailwind CSS v4 entrypoint
│   │
│   ├── data/
│   │   ├── politicians.ts          # Core verified leader datasets (Amit Shah, Rahul Gandhi, Shivraj Singh Chouhan, etc.) + 543 MP synthesizer
│   │   ├── all543Constituencies.ts # Complete index of all 543 Lok Sabha constituencies & elected MPs
│   │   ├── manifestoPromises.ts    # 2024 Party manifesto pledges, status, delivery timelines, budgets
│   │   ├── nepotismTrackerData.ts  # Asset inventory, declared relatives, contractors, government contracts
│   │   ├── stateParliamentaryStats.ts # State-level metrics (seat shares, avg attendance, clean records)
│   │   └── politicianPhotos.ts     # Verified official portrait resolution registry
│   │
│   ├── utils/
│   │   ├── analytics.ts            # Lightweight telemetry/action tracking
│   │   ├── synthesizePolitician.ts # Heuristic & verified profile generator for 543 MPs
│   │   ├── nepotismTrackerLogic.ts # Conflict-of-interest and asset CAGR analysis engine
│   │   ├── geolocation.ts          # Regional location detection for constituency mapping
│   │   └── shareUtils.ts           # Deep links, clipboard formatting, and social summaries
│   │
│   └── components/                 # Reusable UI surfaces, modals, and visualization tools
│       ├── CompareModal.tsx        # Side-by-side MP accountability matrix (wealth, attendance, cases, MPLADS)
│       ├── PoliticianDossierModal.tsx # Full multi-tab leader investigation dossier
│       ├── LegalRegistryView.tsx   # All-India criminal cases & sworn affidavit chargesheet auditor
│       ├── InteractiveMapPage.tsx  # Geographic GIS constituency & state-by-state explorer
│       ├── ManifestoTracker.tsx    # Political promise verification & fulfillment monitor
│       ├── NepotismAssetTrackerView.tsx # Dynasty lineage & family wealth velocity radar
│       ├── AnalyticsView.tsx       # Macro-level Lok Sabha data visualizations (wealth distribution, attendance)
│       ├── TableView.tsx           # Sortable, filterable 543 MP matrix table
│       ├── TabbedFeatureVault.tsx  # Homepage filter & discovery deck
│       ├── AllIndiaMPRegistryModal.tsx # Search modal for all 543 MPs with live AI generation
│       └── Navbar.tsx / Footer.tsx # Top navigation bar and global footer
```

---

## 3. NetaWatch Functionality Audit

| Feature | Codebase Implementation Status |
| :--- | :--- |
| **Homepage** | Comprehensive showcase including hero overview, live curiosity ticker, module showcase, news dial deck, trust pillars, tabbed feature vault, and radial arc deck. |
| **Politician Listing & Search** | Full search across 543 Lok Sabha MPs by name, constituency, state, or party. Live search dropdown in `Navbar.tsx`, `TabbedFeatureVault.tsx`, and `AllIndiaMPRegistryModal.tsx`. |
| **Individual Politician Pages / Dossiers** | `PoliticianDossierModal.tsx` provides a 7-tab deep-dive: *Overview*, *Financials & Wealth History*, *Parliamentary Record*, *MPLADS Delivery*, *Criminal Affidavits (Form 26)*, *Major Initiatives*, and *News & Media Scrutiny*. |
| **Political Activity** | Captured via `politicalTimeline` (historical milestones & career roles) and `majorInitiatives` (policy reforms, legislative acts, constituency drives). |
| **Public Statements & Stances** | Represented in `keyStances` (5 verified policy stances per leader) and `news` items (summaries with sentiment and source attribution). |
| **Parliamentary Information** | Full metrics in `parliamentaryRecord`: Attendance percentage, national average comparison, debates count, questions asked, private member bills, and parliamentary committee memberships. |
| **Comparisons** | Multi-leader comparison dock (`compareList` state) and `CompareModal.tsx` comparing up to 4 politicians side-by-side across wealth, attendance, debates, criminal charges, and MPLADS spending. |
| **Charts & Visualizations** | Recharts and D3 powered: Attendance radar, wealth growth bar charts, asset owner breakdowns, criminal case distribution pies, and constituency map visualizers. |
| **Existing AI Functionality** | Express endpoint `POST /api/generate-mp-dossier` leverages `@google/genai` (Gemini 3.7 Flash) to generate complete, structured ECI Form 26 dossiers for any of the 543 Lok Sabha MPs with a local synthesis fallback. |
| **Data Sources & Verification** | Synthesizes verified public records from ECI Form 26 affidavits, Association for Democratic Reforms (ADR / MyNeta), PRS Legislative Research, and Lok Sabha Hansard logs. |
| **Mock vs Verified Data** | Top leaders (Amit Shah, Rahul Gandhi, Shivraj Singh Chouhan, Narendra Modi, Mahua Moitra, Supriya Sule, etc.) have deep manually audited datasets in `POLITICIANS_DATA`; remaining 543 MPs use synthesized ECI candidate profiles in `ALL_543_POLITICIANS` / `all543Constituencies.ts`. |

---

## 4. Data Architecture

### Core Data Models (`src/types.ts`)

```typescript
// 1. Core Politician Profile
export interface Politician {
  id: string;                         // 'amit-shah', 'rahul-gandhi', 'shivraj-singh-chouhan'
  name: string;
  hindiName?: string;
  photo: string;
  party: string;
  partyAbbr: string;                  // 'BJP', 'INC', 'SP', etc.
  partyColor: string;
  alliance: 'NDA' | 'INDIA' | 'Others' | 'Independent';
  currentRole: string;
  state: string;
  constituency: string;
  house: 'Lok Sabha' | 'Rajya Sabha';
  age: number;
  education: string;
  profession: string;
  bio: string;
  keyStances: string[];               // Stances & policy statements
  parliamentaryRecord: {
    attendancePercent: number;
    nationalAvgAttendance: number;
    debatesCount: number;
    questionsAsked: number;
    privateMemberBills: number;
    committeeMemberships: string[];
  };
  mplads: {
    allocatedCr: number;
    spentCr: number;
    utilizationPercent: number;
    completedProjects: number;
    ongoingProjects: number;
    topProjects: ProjectExpenditure[];
  };
  assets: {
    movableCr: number;
    immovableCr: number;
    totalCr: number;
    liabilitiesCr: number;
    declarationYear: number;
    history: AssetHistory[];
  };
  criminalRecords: {
    totalCases: number;
    seriousCases: number;
    chargesFramed: number;
    convicted: boolean;
    details: LegalCase[];
  };
  majorInitiatives: LandmarkInitiative[]; // Key historical acts / activity
  politicalTimeline: TimelineEvent[];    // Career milestones
  news: PoliticianNews[];                // Recent public coverage & media sentiment
  tags: string[];
  verifiedAffidavit: boolean;
}

// 2. Legal Evidence / Case Model
export interface LegalCase {
  id?: string;
  caseNumber: string;
  court: string;
  courtLevel?: 'Supreme Court' | 'High Court' | 'Special MP/MLA Court' | 'District & Sessions Court' | 'CJM / JMFC';
  ipcSections: string[];
  description: string;
  status: 'Under Investigation' | 'Cognizance Taken' | 'Charges Framed' | 'Stayed by High Court' | 'Stayed by Supreme Court' | 'Disposed / Acquitted' | 'Discharged / Quashed';
  caseType?: LegalCaseCategory;
  temporalStatus?: 'Current' | 'Previous';
  yearFiled?: number;
  yearResolved?: number;
  isSerious: boolean;
  bnsEquivalent?: string;
  summaryTag?: string;
  tags?: string[];
}

// 3. Manifesto Promise Model
export interface ManifestoPromise {
  id: string;
  title: string;
  party: string;
  alliance: Alliance;
  manifestoName: string;
  year: number;
  sector: string;
  description: string;
  status: PromiseStatus;
  progressPercent: number;
  deliveryTimeline: string;
  actionsTaken: string[];
  legislativeAction?: string;
  budgetAllocatedCr?: number;
  citationSource: string;
  relatedMinistersOrMPs?: string[];
}
```

### Reusable Business Logic Services
- `findFlaggedContracts(allPoliticians, filterId)`: Evaluates conflict of interest between minister tenures and contractor tenders (`src/utils/nepotismTrackerLogic.ts`).
- `calculateAssetGrowthReport(politicianId)`: Calculates multi-year asset CAGR and flag thresholds.
- `synthesizeMPPolitician(constituencyRecord)`: Generates full dossier models on demand (`src/utils/synthesizePolitician.ts`).
- `getPoliticianDeepLink(id)` & `generateSocialShareSummary(p)`: Formats shareable plain-text and deep-link evidence (`src/utils/shareUtils.ts`).

---

## 5. Existing UI Architecture Reusability Analysis

| Desired Agent Surface | Reusable Existing Component | How It Can Be Reused |
| :--- | :--- | :--- |
| **Agent Investigation / Activity** | `HeroOverview.tsx`, `AuditUpdatesStrip.tsx`, `InvestigativeTickerBar.tsx` | Can display active agent status, tools executed, and investigation summaries inline. |
| **Investigation Results** | `PoliticianDossierModal.tsx` | Agent can trigger opening, navigating to specific tabs (`parliament`, `financials`, `legal`, `initiatives`, `news`), and filtering views. |
| **Comparison Views** | `CompareModal.tsx` & floating compare dock | Agent can programmatically add/remove politicians to `compareList` and trigger opening the side-by-side matrix view. |
| **Evidence & Affidavits** | `LegalRegistryView.tsx` & `NepotismAssetTrackerView.tsx` | Displays case numbers, court levels, IPC sections, source URLs, and affidavit links. |
| **Filters & Search** | `TabbedFeatureVault.tsx` & `TableView.tsx` | Exposes alliance filters (NDA / INDIA), state filters, crime severity filters, and asset ranges. |

---

## 6. WebMCP Integration Points

### Current WebMCP Specification (OpenAI / W3C Web Machine Learning CG)
According to the latest WebMCP standard (supported in browser environments, OpenAI ChatGPT WebMCP Challenge, and Chrome experimental flags via `chrome://flags/#enable-webmcp-testing`):
- **Tool Registration API**: `document.modelContext.registerTool(toolDefinition)` or `document.modelContext.provideContext(toolsArray)`.
- **Tool Structure**:
  - `name`: Unique identifier (e.g., `search_politicians`).
  - `description`: Detailed instructions for the agent on when and how to call the tool.
  - `inputSchema`: Standard JSON Schema (`type: 'object'`, `properties`, `required`).
  - `execute`: Async callback `(params) => Promise<any>`.
  - `readOnlyHint`: Boolean (`true` for read-only queries, `false` for state mutations).
- **Graceful Fallback / Polyfill**: The application must run without errors on standard browsers where `document.modelContext` is undefined, while attaching to `window.__webmcp__` or the native `document.modelContext` when present.

---

## 7. Recommended WebMCP Tools (8 Core Tools)

All 8 tools map directly to existing, concrete business logic and state handlers in the codebase without inventing nonexistent capabilities:

### 1. `search_politicians` (Read-Only)
- **Capability**: Search 543 Lok Sabha MPs by name, state, constituency, party, or alliance.
- **Input Schema**:
  ```json
  {
    "query": { "type": "string", "description": "Name, state, constituency, or party" },
    "alliance": { "type": "string", "enum": ["ALL", "NDA", "INDIA", "Others", "Independent"] },
    "state": { "type": "string" },
    "limit": { "type": "number", "default": 10 }
  }
  ```
- **Source**: Filters `ALL_543_POLITICIANS` and `POLITICIANS_DATA`.

### 2. `get_politician_profile` (Read-Only)
- **Capability**: Retrieves the complete verified profile of an MP (bio, education, age, party, alliance, role, affidavit status).
- **Input Schema**:
  ```json
  {
    "politician_id": { "type": "string", "description": "e.g. 'amit-shah', 'rahul-gandhi', 'shivraj-singh-chouhan'" }
  }
  ```
- **Source**: Finds exact match or uses `/api/generate-mp-dossier` synthesis fallback.

### 3. `get_parliamentary_activity` (Read-Only)
- **Capability**: Returns parliamentary attendance rate, national average benchmark, total debates participated in, questions asked, private member bills, and parliamentary committee memberships.
- **Input Schema**:
  ```json
  {
    "politician_id": { "type": "string" }
  }
  ```
- **Source**: `politician.parliamentaryRecord`.

### 4. `get_political_statements_and_stances` (Read-Only)
- **Capability**: Retrieves verified policy stances (`keyStances`), recent media statements, and public sentiment records (`news`).
- **Input Schema**:
  ```json
  {
    "politician_id": { "type": "string" },
    "topic_keyword": { "type": "string", "description": "Optional keyword filter" }
  }
  ```
- **Source**: `politician.keyStances` and `politician.news`.

### 5. `get_political_activity_and_initiatives` (Read-Only)
- **Capability**: Returns major landmark initiatives, legislative bills passed, and timeline career milestones.
- **Input Schema**:
  ```json
  {
    "politician_id": { "type": "string" }
  }
  ```
- **Source**: `politician.majorInitiatives`, `politician.politicalTimeline`, and `politician.mplads.topProjects`.

### 6. `compare_politicians_matrix` (Read-Only / Computational)
- **Capability**: Performs a head-to-head analytical comparison between 2 to 4 politicians across net worth, attendance %, debates, questions asked, criminal cases, and MPLADS delivery.
- **Input Schema**:
  ```json
  {
    "politician_ids": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 2,
      "maxItems": 4,
      "description": "Array of politician IDs to compare, e.g. ['amit-shah', 'rahul-gandhi', 'shivraj-singh-chouhan']"
    },
    "focus_areas": {
      "type": "array",
      "items": { "type": "string", "enum": ["parliamentary", "financial", "legal", "initiatives", "all"] }
    }
  }
  ```
- **Source**: Reuses comparison computation logic from `CompareModal.tsx`.

### 7. `set_comparison_view` (State Mutation / Actuation)
- **Capability**: Programmatically controls the NetaWatch user interface: sets the active `compareList`, opens the side-by-side `CompareModal`, or navigates to specific views (`grid`, `table`, `analytics`, `legal-registry`, `manifesto`).
- **Input Schema**:
  ```json
  {
    "politician_ids": { "type": "array", "items": { "type": "string" } },
    "open_compare_modal": { "type": "boolean", "default": true },
    "switch_view": { "type": "string", "enum": ["grid", "table", "analytics", "map", "manifesto", "nepotism-tracker", "legal-registry"] }
  }
  ```
- **Source**: Invokes React state setters in `src/App.tsx`.

### 8. `get_evidence_and_affidavits` (Read-Only)
- **Capability**: Retrieves exact evidentiary records: sworn ECI Form 26 affidavits, court case numbers, IPC sections, stay orders, asset growth history breakdown, and government contract tenders.
- **Input Schema**:
  ```json
  {
    "politician_id": { "type": "string" },
    "evidence_type": { "type": "string", "enum": ["criminal_cases", "asset_affidavits", "contracts_and_conflicts", "all"] }
  }
  ```
- **Source**: `politician.criminalRecords.details`, `politician.assets.history`, and `findFlaggedContracts()`.

---

## 8. Human-Agent Workflow Simulation

```
┌───────────┐                ┌────────────────────────┐                ┌───────────────────────────┐
│   HUMAN   │                │   AI AGENT (WebMCP)    │                │      NETAWATCH APP        │
└─────┬─────┘                └───────────┬────────────┘                └─────────────┬─────────────┘
      │                                  │                                           │
      │ 1. "Compare Amit Shah, Rahul     │                                           │
      │     Gandhi and Shivraj Singh"    │                                           │
      ├─────────────────────────────────>│                                           │
      │                                  │ 2. Tool: compare_politicians_matrix       │
      │                                  │    ['amit-shah', 'rahul-gandhi',          │
      │                                  │     'shivraj-singh-chouhan']              │
      │                                  │ 3. Tool: set_comparison_view              │
      │                                  ├──────────────────────────────────────────>│
      │                                  │                                           │ 4. Opens CompareModal
      │                                  │                                           │    with 3 leaders
      │                                  │ 5. Synthesizes multi-domain analysis      │    synchronized
      │ 6. Receives comparison summary   │<──────────────────────────────────────────┤
      │<─────────────────────────────────┤                                           │
      │                                  │                                           │
      │ 7. "Only consider parliamentary  │                                           │
      │     activity & public statements"│                                           │
      ├─────────────────────────────────>│                                           │
      │                                  │ 8. Tool: get_parliamentary_activity (x3)  │
      │                                  │ 9. Tool: get_political_statements (x3)    │
      │                                  │ 10. Tool: set_comparison_view             │
      │                                  │     (focuses parliamentary tab/modal)     │
      │                                  ├──────────────────────────────────────────>│
      │                                  │                                           │ 11. UI updates to
      │                                  │ 12. Generates focused legislative matrix  │     parliament metrics
      │ 13. Receives focused analysis    │<──────────────────────────────────────────┤
      │<─────────────────────────────────┤                                           │
      │                                  │                                           │
      │ 14. "Challenge this analysis and │                                           │
      │      show me the evidence"       │                                           │
      ├─────────────────────────────────>│                                           │
      │                                  │ 15. Tool: get_evidence_and_affidavits     │
      │                                  │     (case numbers, court levels, Form 26) │
      │                                  ├──────────────────────────────────────────>│
      │                                  │                                           │ 16. Highlights exact
      │                                  │ 17. Returns verified citations (ECI,      │     affidavit sources
      │ 18. Reads verified source links  │     Supreme Court stays, Hansard records) │
      │<─────────────────────────────────┤                                           │
```

---

## 9. Files That Would Need Modification

1. `src/App.tsx`: Connect WebMCP tool registration hook and wire UI state setters.
2. `src/components/CompareModal.tsx`: Add focus-area filter tabs so agent requests can highlight specific metrics.
3. `src/components/Navbar.tsx`: Add WebMCP agent status indicator badge.
4. `index.html`: Add WebMCP discovery tags and metadata.

---

## 10. Files That Should Be Newly Created

1. `src/webmcp/types.ts`: WebMCP specification interfaces.
2. `src/webmcp/tools.ts`: Pure implementation of the 8 WebMCP tools.
3. `src/webmcp/useWebMCP.ts`: React hook that binds NetaWatch state to `document.modelContext`.
4. `src/webmcp/WebMCPAgentWorkspace.tsx`: Optional collapsible Agent Live Activity panel.

---

## 11. Potential Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Browser Compatibility** (`document.modelContext` unavailable in standard Chrome/Safari) | High | Low | Implement feature detection and fallback bridge (`window.__webmcp__`). App runs 100% identically for human users. |
| **State Desynchronization** (Agent modifies state while user is interacting) | Medium | Medium | All actuation tools must update React state via standard functional state updaters (`setCompareList(prev => ...)`). |
| **Large Payload Truncation** (Full profile JSON too large for LLM context) | Low | Medium | Provide modular tools (`get_parliamentary_activity`, `get_political_statements`) rather than forcing the agent to fetch 2,000-line JSON blobs every turn. |
| **Security & Read-Only Safety** | Low | Low | NetaWatch has no private user data. Mutating tools are restricted to UI navigation and comparison views; no external destructive APIs exist. |

---

## 12. Implementation Plan

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 IMPLEMENTATION PLAN                                    │
├──────────────────────┬─────────────────────────────────────────────────────────────────┤
│ Current Architecture │ React 19 + TypeScript + Vite + Express (Client-side state +     │
│                      │ REST API & Gemini Dossier Generator).                           │
├──────────────────────┼─────────────────────────────────────────────────────────────────┤
│ WebMCP Architecture  │ Dual-Mode: Standard browser UI + in-page WebMCP tool provider  │
│                      │ registered via document.modelContext for OpenAI/agent control.  │
├──────────────────────┼─────────────────────────────────────────────────────────────────┤
│ Files to Change      │ • src/App.tsx                                                   │
│                      │ • src/components/CompareModal.tsx                               │
│                      │ • src/components/Navbar.tsx                                     │
│                      │ • index.html                                                    │
├──────────────────────┼─────────────────────────────────────────────────────────────────┤
│ New Files            │ • src/webmcp/types.ts                                           │
│                      │ • src/webmcp/tools.ts                                           │
│                      │ • src/webmcp/useWebMCP.ts                                       │
│                      │ • src/webmcp/WebMCPAgentWorkspace.tsx                           │
├──────────────────────┼─────────────────────────────────────────────────────────────────┤
│ WebMCP Tools (8)     │ 1. search_politicians (Search 543 MPs)                          │
│                      │ 2. get_politician_profile (Full dossier)                        │
│                      │ 3. get_parliamentary_activity (Attendance, debates, questions)  │
│                      │ 4. get_political_statements_and_stances (Stances & news)        │
│                      │ 5. get_political_activity_and_initiatives (Initiatives & bills) │
│                      │ 6. compare_politicians_matrix (Head-to-head metrics)            │
│                      │ 7. set_comparison_view (Actuation / UI state control)          │
│                      │ 8. get_evidence_and_affidavits (ECI Form 26 & court cases)      │
├──────────────────────┼─────────────────────────────────────────────────────────────────┤
│ UI Changes           │ • Subtle 'WebMCP Agent Ready' indicator in Navbar               │
│                      │ • Focus area tabs in CompareModal                               │
│                      │ • Optional collapsible Agent Activity log drawer                │
├──────────────────────┼─────────────────────────────────────────────────────────────────┤
│ Testing Plan         │ • Tool execution test runner in developer console               │
│                      │ • Verify workflow: Amit Shah vs Rahul Gandhi vs Shivraj Singh   │
│                      │ • Lint with tsc --noEmit                                        │
│                      │ • Full production build with compile_applet                     │
└──────────────────────┴─────────────────────────────────────────────────────────────────┘
```
