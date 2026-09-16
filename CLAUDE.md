# CLAUDE.md

The `jaspers` plugin for Jaspers Terminal, written against `@jaspers-ai/sdk`. The app loads it from a folder in `~/Jaspers/plugins/jaspers` (a clone of this repo, or an installed release) and rebuilds it on save. How plugins work, the SDK, and the app's side are in the terminal repo's CLAUDE.md.

## Commands

Node 24.

- `npm install`
- `npm run typecheck` — `tsc --noEmit`
- `npm test` — Node's test runner over the `*.test.ts` files, which strips the types itself
- `npm run package` — `build/jaspers-<version>.zip`, what a release attaches; the Release workflow runs it on a `v*` tag

Style: square, no rounded corners; `#e5e5e5` borders, `#737373` muted.

## The plugin

- The Jaspers connection: this repo declares `jaspers/sec`, the Jaspers SEC MCP (`https://analyst-api.jsprai.com/mcp/open`, streamable HTTP, plain JSON, stateless) with `auth: bearer` and one secret, `token`, sent as `Authorization: Bearer …`. The key lives only in the OS keychain: paste it once in Settings > Plugins under jaspers. Until then the connection is `needs-secret` and the screener's source run says so. The server lists the screener tools (`screen_companies`, `screener_field_stats`, `search_filing_text`, `list_filing_sections`, `fetch_filing_sections`, `list_insider_activity`, `screen_qualitative` and its status), the per-company filing tools, and `get_guide`; `core/mcp` reaches all of them, and the plugin has no sources or views of its own yet.
