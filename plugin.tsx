import { defineConnection, definePlugin } from '@jaspers-ai/sdk'

// The Jaspers MCP, as two connections, one per Jaspers module: the screener (the whole universe at
// once) and research (one company at a time). Both share the helpers, get_guide and show_citations.
// Stateless streamable HTTP, plain JSON. The server serves every tool on one endpoint today, so both
// connections post to it and `tools` cuts each to its own module; when Jaspers splits the servers,
// only the URLs change. One key feeds both.
// The key is never written here: the app asks for it once (Settings, Plugins, or the field the
// assistant opens) and seals it with the OS keychain.

const URL = 'https://analyst-api.jsprai.com/mcp/open'
const HEADERS = { Authorization: 'Bearer ${secret:token}' }
const HELPERS = ['get_guide', 'show_citations']

export default definePlugin({
  id: 'jaspers',
  secrets: { token: { label: 'Jaspers API key' } },
  connections: {
    screener: defineConnection({
      url: URL,
      auth: 'bearer',
      headers: HEADERS,
      tools: [
        'screen_companies',
        'screener_field_stats',
        'search_filing_text',
        'list_filing_sections',
        'fetch_filing_sections',
        'list_insider_activity',
        'screen_qualitative',
        'screen_qualitative_status',
        ...HELPERS,
      ],
    }),
    research: defineConnection({
      url: URL,
      auth: 'bearer',
      headers: HEADERS,
      tools: [
        'search_filings',
        'keyword_search_filings',
        'fetch_filings',
        'fetch_chunk',
        'query_filings',
        'aggregate_filings',
        'get_distinct_values',
        'count_filings',
        'get_company_status',
        ...HELPERS,
      ],
    }),
  },
})
