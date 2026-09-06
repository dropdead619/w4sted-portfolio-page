# demezhan-kazhkenov.dev

Personal portfolio — Nuxt 3, TypeScript, Tailwind CSS. Deployed on Netlify at
[demezhan-kazhkenov.dev](https://demezhan-kazhkenov.dev).

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm preview    # preview the production build
```

Node 22 and pnpm 10 — the same versions pinned in `netlify.toml`.

## Structure

| Path | What lives there |
| --- | --- |
| `data/cv.ts` | **All site content.** Profile, experience, projects, skills, education. Edit here, not in components. |
| `components/blocks/` | Page sections, composed in `layouts/MainContent.vue` |
| `components/fx/` | Animation primitives (see below) |
| `components/ui/` | Shared presentational pieces |
| `composables/useMotion.ts` | Reduced-motion / pointer detection, rAF and scroll-progress helpers |
| `plugins/reveal.ts` | The `v-reveal` directive |
| `assets/css/main.css` | Design tokens and motion primitives |

### Design tokens

Colours are CSS custom properties on `:root` (light) and `:root.dark`, exposed to
Tailwind as `bg`, `bg-elev`, `ink`, `muted`, `line`, `accent`, `accent-2`. Change a
token once and both themes follow.

### Motion

`v-reveal` releases an element from a hidden state when it scrolls into view:

```vue
<div v-reveal>…</div>
<div v-reveal="{ delay: 120, y: 40, blur: 10, stagger: 80, index: i }">…</div>
```

It renders `data-reveal=""` during SSR so nothing flashes in before hydration, shares
one IntersectionObserver per threshold, and has a failsafe sweep so content can never
stay permanently hidden.

The `components/fx/` primitives cover masked text reveals (`SplitText`), the
scroll-linked reading effect (`ScrollReveal`), pointer-tracked tilt (`TiltCard`),
magnetic hover (`MagneticEl`), decode text (`ScrambleText`), the hero canvas
(`DotField`), and the intro curtain (`Preloader`).

Every effect is gated on `prefers-reduced-motion`.

## Images

Images are **pre-optimised WebP committed to `public/opt/`** — there is no runtime
image service. To add or regenerate one, resize the source with `sharp` (a dev
dependency) and write the result into `public/opt/`, then reference it from
`data/cv.ts`. Originals stay in `public/` so they can be re-cropped later.

## Deploying

Pushing to `main` triggers a Netlify production build. Build command and toolchain
versions live in `netlify.toml`.
