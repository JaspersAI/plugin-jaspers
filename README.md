# plugin-jaspers

Jaspers SEC data for [Jaspers Terminal](https://github.com/JaspersAI), an open source, extensible desktop terminal for financial research.

Declares `jaspers/sec`, the Jaspers SEC MCP server (`https://analyst-api.jsprai.com/mcp/open`), with no views or sources of its own. The screener and research plugins run on it, and the assistant reaches every tool it lists (company screens, filing search and sections, insider activity, qualitative screens) through `core/mcp`.

## Install

In Jaspers Terminal, open Settings > Plugins, paste

```
https://github.com/JaspersAI/plugin-jaspers
```

and press Install. The app downloads the latest release, shows where it came from, and asks before any of it runs. A plugin runs code on your computer with your permissions, so install plugins only from people you trust.

## Keys

- **Jaspers API key**, from your Jaspers account.

The app asks for a key the first time something needs it, or take it in Settings > Plugins. It is sealed in your OS keychain and never reaches the plugin or the assistant.

## Needs

Nothing else.

## Develop

```sh
git clone https://github.com/JaspersAI/plugin-jaspers.git ~/Jaspers/plugins/jaspers
cd ~/Jaspers/plugins/jaspers
npm install
npm run typecheck
npm test
```

A folder you put in `~/Jaspers/plugins` is a plugin of your own, which the app rebuilds whenever you save. If this plugin is installed, remove it in Settings > Plugins first: the clone goes where the installed copy lives. Types come from [`@jaspers-ai/sdk`](https://www.npmjs.com/package/@jaspers-ai/sdk), which the app provides at run time.

## Release

Bump `version` in `package.json`, commit, and push a tag:

```sh
npm version patch
git push --follow-tags
```

The Release workflow checks the plugin and attaches `jaspers-<version>.zip` to a GitHub release. Update in Settings > Plugins picks it up.

## License

[MIT](LICENSE)
