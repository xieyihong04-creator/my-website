---
title: "feat: PRD 全量实现 - Awwwards 级个人作品集"
type: feat
status: active
date: 2026-08-22
origin: PRD 个人作品集网站 (阶段1)
---

# feat: PRD 全量实现 - Awwwards 级个人作品集

## Overview

严格按 PRD 补齐 P0/P1 缺口，将当前 16 页可构建骨架升级为 Awwwards 级极简留白、克制动效、完整内容配置化、双语无遗漏、SEO/性能达标的纯静态作品集。复用 Astro 7 + Tailwind 4 + GSAP/Lenis 现有栈，新增首页三段组合、技能可视化、SEO/过渡/动效闭环。

## Problem Frame

当前 `a248765` 已修复构建阻断与 404（`pnpm build` 16 页），但 PRD 审计显示：首页仅 Hero+简介（缺精选项目/技能概览/最新文章）、`skills.json` 零消费、About 占位无照片/历程、`Lenis` 未初始化、`ViewTransitions` 无、`sitemap/robots/JSON-LD` 无、首屏性能未量、暗色/阅读进度等 P2 缺失。需一次闭环 P0 并交付 P1。

## Requirements Trace

- R1 (F-01): 首页 Hero 全屏着陆 + 克制几何/排版动效
- R2 (F-02): 关于我 - 介绍、照片、学习历程
- R3 (F-03): 作品集卡片列表（封面、标题、简介、标签、详情）
- R4 (F-04): 技能展示 - 进度/标签云/图标矩阵
- R5 (F-05): 技术博客列表+详情 Markdown 渲染
- R6 (F-06): 中英双语 - 语言切换无遗漏
- R7 (F-07): 响应式 375/768/1440 无溢出
- R8 (F-08): 内容配置化 - `content/` 零代码修改
- R9 (F-09): 导航+页脚 固定含社交
- R10 (F-10): 页面过渡动画
- R11 (F-11): 滚动动效克制渐入 60fps
- R12 (F-12): SEO meta/OG/结构化
- R13 (F-13): Lighthouse Performance ≥90, 首屏 <3s
- R14 (F-14): 联系/社交入口
- R15 (F-15): 暗色模式（极简变体）
- R16 (F-16): 返回顶部/阅读进度
- AC-01~AC-08 映射同上，尤指 AC-02 内容可修改、AC-03 双语完整、AC-07 `npm run dev/build` 可运行

## Scope Boundaries

- 不新增 CMS/后台，仅 Markdown+JSON
- 不引入 jQuery/Bootstrap 4-/IE 兼容（AC-08）
- 不做独立部署流水线（Vercel/GitHub Pages 静态托管已满足）
- 保持 `astro.config.mjs` 的 `site: https://xieyihong04-creator.github.io/my-website`

### Deferred to Separate Tasks

- P2 完整博客搜索/标签聚合页：另起迭代
- 评论系统/表单后端：非 PRD 范围

## Context & Research

### Relevant Code and Patterns

- `src/layouts/BaseLayout.astro:1` 已有 SEO 基座、需补 `ViewTransitions/JSON-LD/hreflang`
- `src/components/sections/Hero.astro:18` 已有 GSAP timeline，需扩展几何装饰
- `src/lib/animations.ts:1` 已 SSR 保护，需新增 `Lenis` 初始化与 `initScrollAnimations` 全站挂载
- `src/content.config.ts:5` `projects/posts` 已 `glob`+`zod`，`skills.json` 未接入
- `src/pages/projects/index.astro:1`/`zh/...` 已列表，需抽复用卡片组件供首页精选区复用
- `src/styles/global.css:1` Tailwind 4 + CSS 变量，需补 `prose` 与暗色变量

### Institutional Learnings

- `pnpm-lock.yaml` 曾因 `@studio-freight/lenis`/`lucide-astro` 重复导致 frozen-lockfile 失败（已修 `0afc7b6`），新增依赖后需 `pnpm install --no-frozen-lockfile` 并验证
- `Hero.astro:16` 曾残留 ` -->` 致构建失败、`Footer.astro:19` 同类问题已修，新增 `.astro` 需严格闭合 frontmatter `---`

### External References

- Astro 7 `ViewTransitions` + `astro:content` + `astro/sitemap`
- GSAP ScrollTrigger + Lenis 1.3 官方 smooth scroll 组合
- Tailwind 4 `@tailwindcss/vite` + `@tailwindcss/typography` for prose

## Key Technical Decisions

- **首页组合复用卡片**：精选项目/最新文章直接 `getCollection` 取 `featured:true` Top2 与 `posts` 按 `date` Top3，复用 `ProjectCard.astro`/`PostCard.astro`，避免重复逻辑（R3/R5）
- **技能可视化选图标矩阵+标签**：`skills.json` 按 `level: expert/proficient/familiar` 分梯度透明度/尺寸，兼顾极简与可视化（R4）
- **动效栈保持 GSAP+Lenis**：`Lenis` 统一平滑滚动，`ScrollTrigger` 仅对 `.animate-on-scroll`，`prefers-reduced-motion` 熔断，保 60fps（R11/AC-06）
- **SEO 选 `@astrojs/sitemap` + 手写 `robots.txt` + `BaseLayout` JSON-LD**：静态站点最小闭环（R12）
- **暗色用 CSS 变量+`prefers-color-scheme`+手动 toggle**：已 `global.css:27` 媒体查询，补 `localStorage` 持久化按钮满足 F-15

## Open Questions

### Resolved During Planning

- 首页语言：`/` 为 `en`、`zh/` 为 `zh`（已 `a248765` 定），精选区等沿用同策略
- 作品封面 404：`public/images/projects/*.png` 先用渐变占位，PRD 允许后续替换真实图

### Deferred to Implementation

- Awwwards 细节动效参数（几何形状/排版位移量）待实现时与设计稿微调

## Output Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.astro (enhance)
│   │   ├── FeaturedProjects.astro (new)
│   │   ├── Skills.astro (new)
│   │   ├── LatestPosts.astro (new)
│   │   ├── AboutTimeline.astro (new)
│   │   └── ContactCTA.astro (new)
│   └── ui/
│       ├── ProjectCard.astro (new)
│       ├── PostCard.astro (new)
│       ├── ThemeToggle.astro (new)
│       └── ReadingProgress.astro (new)
├── lib/
│   ├── animations.ts (enhance Lenis)
│   └── seo.ts (new JSON-LD helper)
└── pages/
    ├── index.astro (enhance composition)
    ├── zh/index.astro (enhance)
    ├── contact/index.astro (new) + zh/contact/index.astro
public/
├── robots.txt (new)
└── images/projects/* (placeholder if missing)
```

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

```
[content/*.md|*.json] -> getCollection -> [FeaturedProjects/Skills/LatestPosts] -> index.astro composition
BaseLayout -> ViewTransitions + Lenis (client) + JSON-LD + hreflang
ScrollTrigger: .animate-on-scroll -> fade/slide on enter, scrub only for .parallax
```

## Implementation Units

- [ ] **Unit 1: 首页三段组合 + 卡片复用**

**Goal:** 首页达到 PRD §5 `Hero+简介+精选项目+技能概览+最新文章`

**Requirements:** R1,R3,R4,R5,R8

**Dependencies:** None

**Files:**
- Create: `src/components/ui/ProjectCard.astro`, `src/components/ui/PostCard.astro`, `src/components/sections/FeaturedProjects.astro`, `src/components/sections/Skills.astro`, `src/components/sections/LatestPosts.astro`
- Modify: `src/pages/index.astro`, `src/pages/zh/index.astro`, `content/i18n/zh.json`, `content/i18n/en.json` (新增 home 段落文案)

**Approach:** `FeaturedProjects` 取 `getCollection('projects')` 过滤 `featured` 按 `order` 取2；`Skills` 读 `content/skills/skills.json` 按 `level` 渲染矩阵；`LatestPosts` 按 `date` 取3；首页按顺序组合，复用卡片。

**Patterns to follow:** `src/pages/projects/index.astro:1` 列表与卡片样式

**Test scenarios:**
- Happy: 访问 `/` 与 `/zh/` 均见 Hero、精选2卡、技能矩阵、最新3文
- Edge: `projects` 为空时显示空状态文案；`featured` 均 false 时回退取 order 前2
- Integration: 修改 `content/projects/todo-app.md` 标题后首页卡片标题同步更新（需重启 dev 或重构建）

**Verification:** `pnpm build` 仍 16+ 页，首页 Lighthouse 首屏 <3s，卡片点击跳详情

- [ ] **Unit 2: 关于页升级**

**Goal:** F-02 完整：照片+简介+历程

**Requirements:** R2,R8

**Dependencies:** Unit 1 (复用样式)

**Files:**
- Create: `src/components/sections/AboutTimeline.astro`
- Modify: `src/pages/about/index.astro`, `src/pages/zh/about/index.astro`, `content/profile.json` (可选 `timeline` 数组), `public/images/avatar.jpg` (占位)

**Approach:** 头像读 `profile.avatar`，历程用 `AboutTimeline` 渲染 `profile.timeline` 或硬编码 3 段学习节点，保持极简时间轴。

**Test scenarios:**
- Happy: `/about` 与 `/zh/about` 均见头像、简介、时间轴3项
- Edge: 头像缺失时显示首字母占位（`Hero.astro:28` 同款渐变圆）
- Integration: `profile.bio` 修改后关于页同步

**Verification:** 双语关于页无溢出，图片 `alt` 完整

- [ ] **Unit 3: SEO/站点元数据闭环**

**Goal:** F-12 + AC-05 基座

**Requirements:** R12,R13

**Dependencies:** None

**Files:**
- Create: `public/robots.txt`, `src/lib/seo.ts`
- Modify: `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `package.json`

**Approach:** `astro.config.mjs` 加 `@astrojs/sitemap`，`BaseLayout` 注入 `hreflang`、`JSON-LD` (Person/WebSite/Article 按页类型)、`og:image` 回退；`robots.txt` 指向 sitemap。

**Patterns to follow:** `BaseLayout.astro:32` 现有 og/twitter 块

**Test scenarios:**
- Happy: `pnpm build` 后 `dist/sitemap.xml` 含 16+ URL，`dist/robots.txt` 可访问
- Edge: `image` 缺省时 `og:image` 回退 `/favicon.svg` 不抛 `new URL` 异常
- Integration: 访问 `/projects/todo-app` 的 JSON-LD `BlogPosting` 含 `headline` 与 `datePublished`

**Verification:** `pnpm build` 无报错，`dist/sitemap.xml` 行数 ≥16

- [ ] **Unit 4: 页面过渡与滚动动效**

**Goal:** F-10/F-11 + AC-06 60fps

**Requirements:** R10,R11

**Dependencies:** Unit 1

**Files:**
- Modify: `src/layouts/BaseLayout.astro`, `src/lib/animations.ts`, `src/pages/index.astro`, `src/pages/zh/index.astro`, `src/styles/global.css`

**Approach:** `BaseLayout` 引入 `ViewTransitions`，`animations.ts` 新增 `initLenis()`（`new Lenis({autoRaf:true})`+`ScrollTrigger` 同步），首页与列表页挂 `initScrollAnimations()`，`prefers-reduced-motion` 时跳过，`parallax` 仅 Hero 装饰层。

**Test scenarios:**
- Happy: 路由 `/`→`/projects` 有淡入过渡；滚动至精选区卡片依次 fade-in
- Edge: `prefers-reduced-motion: reduce` 时无动画
- Integration: 连续快速切换语言不丢 `Lenis` 实例

**Verification:** Chrome DevTools 无 `ScrollTrigger` 警告，滚动无掉帧感

- [ ] **Unit 5: 性能与资产优化**

**Goal:** R13 AC-05

**Requirements:** R13

**Dependencies:** Unit 1, Unit 3

**Files:**
- Modify: `src/layouts/BaseLayout.astro`, `src/components/ui/ProjectCard.astro`, `src/styles/global.css`, `astro.config.mjs` (image 优化)

**Approach:** 字体 `preload`+`display=swap` 已有，补 `astro:assets` 对 `cover` 优化、占位渐变兜底、`vite` 分包，`Lighthouse` 目标 Performance ≥90。

**Test scenarios:**
- Happy: `pnpm build` 后 `dist/_astro` 资源含 hashed 文件
- Edge: 缺失 `cover` 时不 404，显示渐变占位
- Integration: `pnpm preview` 后 Lighthouse 首屏 <3s

**Verification:** `pnpm build` 产物大小合理，无 404 资源

- [ ] **Unit 6: 联系/暗色/阅读体验**

**Goal:** F-14/F-15/F-16 + F-09 完整

**Requirements:** R14,R15,R16,R9

**Dependencies:** Unit 3

**Files:**
- Create: `src/pages/contact/index.astro`, `src/pages/zh/contact/index.astro`, `src/components/ui/ThemeToggle.astro`, `src/components/ui/ReadingProgress.astro`, `src/components/sections/ContactCTA.astro`
- Modify: `src/components/sections/Footer.astro`, `src/components/sections/Navbar.astro`, `src/styles/global.css`, `content/i18n/*.json`

**Approach:** `/contact` 复用 `profile.social`，`ThemeToggle` 读写 `localStorage` 切换 `data-theme`，`ReadingProgress` 仅 `blog/[slug]` 顶部进度条，`Footer` 已有社交链接补 `ContactCTA`。

**Test scenarios:**
- Happy: 点击 Navbar `ThemeToggle` 切换暗色并持久化；博客详情滚动时进度条 0→100%
- Edge: 无 `localStorage` 时回退 `prefers-color-scheme`
- Integration: `/zh/contact` 文案为中文

**Verification:** 双语 contact 可访问，暗色切换无闪烁

## System-Wide Impact

- **Interaction graph:** `BaseLayout` 波及全站；`Lenis` 与 `ScrollTrigger` 需在 `client:*` 生命周期正确销毁
- **Error propagation:** `new URL(image, Astro.url.origin)` 在 `site` 未配置时需回退
- **State lifecycle:** `localStorage` 主题状态跨路由需 `ViewTransitions` 持久化
- **API surface parity:** `zh` 与 `en` 页面需成对创建（已 16 页模式）
- **Unchanged invariants:** `content.config.ts` 的 `projects/posts` schema 不改，仅消费方新增

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Awwwards 级视觉主观 | 以 Tailwind 极简+克制动效为基，首版交付后走 `frontend-design` 迭代 |
| `pnpm-lock` 漂移 | 每次改 `package.json` 后 `pnpm install --no-frozen-lockfile` 并验证 `frozen` |
| 图片缺失 404 | 占位渐变兜底，`public/images` 预置空文件 |

## Documentation / Operational Notes

- 新增 `@astrojs/sitemap` 后 `pnpm install` 必跑
- 部署：静态托管，`pnpm build` 产物为 `dist/`

## Sources & References

- Origin: PRD 个人作品集网站 §1-6
- Related code: `src/pages/projects/index.astro:1`, `src/lib/animations.ts:7`, `src/layouts/BaseLayout.astro:32`
- External: Astro 7 ViewTransitions, GSAP ScrollTrigger, Lenis 1.3

