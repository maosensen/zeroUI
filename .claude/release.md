# Release card — zzzUI

<!-- 由 release skill 生成于 2026-10-24(首次发版 v0.1.0);发版流程见 user 级 release skill,本卡只记录项目特异性事实。 -->

## 版本文件(bump 时全部同步)

- `package.json` <!-- 唯一版本文件;registry 条目不带版本号 -->

## 门禁

- `pnpm lint`(biome check) + `pnpm exec tsc --noEmit` + `pnpm build`(先跑 `registry:build`,再 next build,
  所有路由静态预渲染,等价一次冒烟) + `pnpm cf:build`(Workers 产物)。四条都要全绿。
- `pnpm a11y --focus --base http://localhost:4378`(对 `cf:preview`):axe 全站零问题,键盘逐页 Tab 无漏焦点框
  (2026-10-25 起;脚本 `scripts/a11y.mts`,本地 dev 上直接 `pnpm a11y --focus`)。
- `pnpm snapshots`:每个文档示例的截图与 `tests/snapshots/` 基准逐像素对比。改了外观且确是有意的,
  `pnpm snapshots --update` 重写基准并随本次提交;无意的差异先查清再发。差异图在 `$TMPDIR/zzzui-snapshots/`。
- 手机宽度(2026-10-25 起):`pnpm a11y --mobile --focus --base http://localhost:4378`(375×812,另查页面不得横向滚动,
  列出伸出去的元素)与 `pnpm snapshots --mobile`(基准在 `tests/snapshots/375/`)。
- 发版内容碰了 registry(组件、地基 CSS、`scripts/build-registry.mts`)时,再做一次安装实测:
  全新 `shadcn init -d -b base` 项目里把 `@zzzui` 指向 `pnpm cf:preview`(:4378)的 `/r/{name}.json`,
  装上并 `pnpm build`(做法见 docs/deploy.md 与 docs/plan.md 的 2026-10-24 记录)。
- smoke:—(build 已预渲染全部页面)

## CHANGELOG

- `CHANGELOG.md`,Keep a Changelog,英文;Release body = 对应小节原文。
- 应用内 What's New:无。

## 发布渠道

- 渠道:B(无 CI;`gh release create vX.Y.Z --verify-tag`,body 用 CHANGELOG 小节),gh 一律
  `GH_TOKEN=$(gh auth token --user maosensen)`。
- 站点不随 tag 自动部署:发版内容里有尚未上线的站点改动时,tag 之后 `pnpm cf:deploy`(本机 wrangler
  已登录 catforest 所在账号),再按 docs/deploy.md「After every deploy」跑 `pnpm seo:audit --base
  https://zzzui.catforest.dev` 与 `pnpm seo:indexnow`。
- 产物期望数:—(Release 不挂产物;registry 就是站点上的 `/r/*.json`)
- 发布后验证:`gh release view vX.Y.Z --json tagName,isDraft`(isDraft=false);
  `curl -s https://zzzui.catforest.dev/r/registry.json` 能取到。

## 分支策略

- 只有 `main`,直接在 main 上提交与打 tag。

## 本项目特有注意事项

- 部署前后 Turbopack 的 dev 缓存偶尔供出旧 CSS(AGENTS.md / docs/plan.md 有记录);发版只看生产构建,不受影响。
- 许可证 MIT(2026-10-25 定,`LICENSE`;v0.1.1 及以前的 tag 里没有它)。
