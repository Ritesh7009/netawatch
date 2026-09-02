# Lok Sabha & Civic Intelligence Observatory (NetaWatch)

A high-performance, interactive civic intelligence platform delivering transparent audits, financial disclosures, parliamentary performance tracking, and GIS constituency analytics for India's 543 Lok Sabha Members of Parliament (MPs).

Built with modern React, TypeScript, Tailwind CSS, Motion, GSAP, and designed with structured accessibility attributes ready for **WebMCP (Web Model Context Protocol)** agentic tooling.

---

## 🤖 WebMCP (Web Model Context Protocol) & AI Agent Integration

### What is WebMCP?
**WebMCP (Web Model Context Protocol)** extends the Model Context Protocol (MCP) paradigm into the browser and web applications. While traditional MCP connects Large Language Models (such as OpenAI's GPT-4o, o1, and operator/agent models) to server-side tools and databases via JSON-RPC, **WebMCP provides a standardized protocol for AI agents to inspect, query, and manipulate client-side web application state and UI controls natively**.

### Key Architectural Concepts of WebMCP:
1. **Client-Side Tool Exposing**:
   - Rather than relying solely on raw DOM screenshotting or imprecise vision coordinates, WebMCP allows web applications to register **browser-native tools and semantic endpoints** (e.g., `audit_mp_dossier`, `filter_constituency`, `rotate_deck_to_index`).
   - AI models connected via WebMCP can invoke actions with structured JSON inputs directly inside the running web page.

2. **Semantic UI Grounding & ARIA Anchoring**:
   - AI agent web operators leverage standard `role`, `aria-*`, and persistent `id` attributes.
   - This project implements explicit `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, and designated container IDs across the radial decks and pill navigation components, allowing WebMCP-enabled models to inspect current state (e.g., active view, rotation index) with zero ambiguity.

3. **Autonomous Agent Navigation & Scraper Compatibility**:
   - When an OpenAI agent is tasked with a query (e.g., *"Find the total declared assets of the MP for Varanasi and switch to their Criminal Case Ledger"*), a WebMCP-compliant interface can:
     - Directly trigger the programmatic navigation callback (`jumpToIndex` or `onTabChange`).
     - Retrieve JSON data payloads directly from the component's internal state without executing slow full-page DOM traverses.

### Conceptual WebMCP Tool Schema Example:
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
