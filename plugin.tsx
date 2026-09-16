import { defineConnection, definePlugin } from '@jaspers-ai/sdk'

// The Jaspers SEC MCP: filings, the screener, insider activity. Stateless streamable HTTP, plain
// JSON. This plugin holds the connection and the key it needs, and nothing else yet: the screener's
// sources and the research analysts run on jaspers/sec, and core/mcp reaches the rest of its tools.
// The key is never written here: the app asks for it once (Settings, Plugins, or the field the
// assistant opens) and seals it with the OS keychain.

export default definePlugin({
  id: 'jaspers',
  secrets: { token: { label: 'Jaspers API key' } },
  connections: {
    sec: defineConnection({
      url: 'https://analyst-api.jsprai.com/mcp/open',
      auth: 'bearer',
      headers: { Authorization: 'Bearer ${secret:token}' },
    }),
  },
})
