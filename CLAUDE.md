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

- The Jaspers connections: two, one per Jaspers module, both on the Jaspers MCP (`https://analyst-api.jsprai.com/mcp/open`, streamable HTTP, plain JSON, stateless) with `auth: bearer` and one shared secret, `token`, sent as `Authorization: Bearer …`. The server serves every tool on that one endpoint today, so each connection's `tools` list cuts it to its module; when Jaspers splits the servers, only the URLs change.
  - `jaspers/screener` (8): `screen_companies`, `screener_field_stats`, `search_filing_text`, `list_filing_sections`, `fetch_filing_sections`, `list_insider_activity`, `screen_qualitative`, `screen_qualitative_status`.
  - `jaspers/research` (9): `search_filings`, `keyword_search_filings`, `fetch_filings`, `fetch_chunk`, `query_filings`, `aggregate_filings`, `get_distinct_values`, `count_filings`, `get_company_status`.
  - Both: `get_guide` and `show_citations`. The narrowed `show_citations` schema (filing ids only) is the server's to serve; a connection can pick tools but not reshape them.
- The key lives only in the OS keychain: paste it once in Settings > Plugins under jaspers. Until then both connections are `needs-secret` and every source on them says so. A name in `tools` the server does not list is warned about in the app's log. `core/mcp` reaches every offered tool, and the plugin has no sources or views of its own yet.
- 2.0.0 removed `jaspers/sec`: the screener and research plugins name the new ids from their own next releases.
