# zzzUI

A dark-only component library with a game-UI look — black bars, charcoal ground,
a fluorescent lime accent, slabs cut on the slant, thick black outlines — built on
[shadcn](https://ui.shadcn.com) and [Base UI](https://base-ui.com), and installed
the shadcn way, from a registry.

Seventy-eight components (forms, overlays, feedback, data display, navigation,
commands, chat, and game pieces such as gauges, an inventory and objectives), eleven
blocks (whole game screens: a title screen, settings, a pause menu, a briefing, a
character select, a loadout, a leaderboard, a HUD, a community feed, level rewards
and a daily schedule),
thirty icons and the theme, with a live demo, the
props and the install command for each at **https://zzzui.catforest.dev**. Add the
`@zzzui` namespace to a shadcn project and install any of them:

```sh
pnpm dlx shadcn@latest add @zzzui/button
```

The plan, the phases and every decision: [docs/plan.md](docs/plan.md).

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:4374
pnpm build
pnpm exec biome check
```

## A fan work

zzzUI is fan-made and unofficial. Its name is a tribute to Zenless Zone Zero; it is not
affiliated with, endorsed by or connected to HoYoverse (miHoYo) or the game. It uses none of the
game's logos, fonts, icons, art or text: every shape, glyph and sample in it was made for it. It
is a non-commercial open-source project.

## License

[MIT](LICENSE)
