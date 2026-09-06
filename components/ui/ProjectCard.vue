<script setup lang="ts">
import type { IProject } from '~/types'

/**
 * Featured project row. The visual sits in a tilt card with a cursor-tracked
 * spotlight; projects without a screenshot get a built visual made from the
 * project's own accent so the row never looks like a missing asset.
 */
const props = defineProps<{
  project: IProject
  index: number
  /** Which side the visual sits on — rows alternate down the page. */
  flip: boolean
}>()

const visual = ref<HTMLElement | null>(null)
const shift = ref(0)
const reduced = usePrefersReducedMotion()

let ticking = false

function measure() {
  ticking = false
  const el = visual.value
  if (!el || reduced.value)
    return
  const rect = el.getBoundingClientRect()
  // -1 → 1 across the viewport, driving a small parallax on the image.
  const centred = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
  shift.value = Math.max(-1, Math.min(1, centred)) * 26
}

function onScroll() {
  if (ticking)
    return
  ticking = true
  requestAnimationFrame(measure)
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

const primaryLink = computed(() => props.project.links?.[0])
</script>

<template>
  <article class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
    <!-- Copy -->
    <div
      class="lg:col-span-5"
      :class="flip ? 'lg:order-2 lg:col-start-8' : 'lg:order-1'"
    >
      <div v-reveal="{ y: 24 }">
        <div class="flex items-center gap-3">
          <span class="font-mono text-[11px] text-accent">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <span class="h-px w-8 bg-line/20" />
          <span class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {{ project.year }} · {{ project.role }}
          </span>
        </div>

        <h3 class="display mt-5 text-[clamp(2.2rem,5vw,3.4rem)]">
          <FxSplitText :text="project.title" :stagger="40" />
        </h3>

        <a
          v-if="primaryLink"
          :href="primaryLink.href"
          target="_blank"
          rel="noopener"
          :data-cursor="primaryLink.label"
          class="link-underline mt-2 inline-block font-mono text-sm text-accent"
        >
          {{ project.domain }} ↗
        </a>
        <p v-else class="mt-2 font-mono text-sm text-muted">{{ project.domain }}</p>

        <p class="mt-6 text-lg leading-relaxed text-muted">{{ project.summary }}</p>

        <ul class="mt-6 space-y-2.5">
          <li
            v-for="(point, pi) in project.points"
            :key="point"
            v-reveal="{ stagger: 60, index: pi, y: 14, blur: 3 }"
            class="flex gap-3 text-[15px] leading-relaxed text-muted"
          >
            <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {{ point }}
          </li>
        </ul>

        <ul class="mt-7 flex flex-wrap gap-2">
          <li
            v-for="tech in project.stack"
            :key="tech"
            class="rounded-full border border-line/10 px-3 py-1 font-mono text-[11px] text-muted"
          >
            {{ tech }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Visual -->
    <div
      ref="visual"
      class="lg:col-span-7"
      :class="flip ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : 'lg:order-2'"
    >
      <div v-reveal="{ y: 40, blur: 10, delay: 100 }">
        <FxTiltCard :accent="project.accent" :max="6">
          <component
            :is="primaryLink ? 'a' : 'div'"
            v-bind="primaryLink ? { href: primaryLink.href, target: '_blank', rel: 'noopener' } : {}"
            :data-cursor="primaryLink ? primaryLink.label : undefined"
            class="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-line/10"
            :style="{ background: `linear-gradient(150deg, rgb(${project.accent} / 0.12), rgb(var(--bg-elev)) 55%)` }"
          >
            <div class="absolute inset-0 grid place-items-center overflow-hidden">
              <div
                class="absolute inset-0 opacity-60"
                :style="{
                  backgroundImage: `radial-gradient(rgb(${project.accent} / 0.35) 1px, transparent 1px)`,
                  backgroundSize: '22px 22px',
                }"
                aria-hidden="true"
              />
              <div
                class="absolute -right-16 -top-16 h-72 w-72 rounded-full blur-[90px]"
                :style="{ background: `rgb(${project.accent} / 0.35)` }"
                aria-hidden="true"
              />
              <div
                class="relative px-8 text-center transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                :style="{ transform: `translate3d(0, ${shift * 0.5}px, 0)` }"
              >
                <p class="display text-[clamp(2rem,6vw,4.5rem)] text-ink/90">
                  {{ project.title }}
                </p>
                <p class="mt-3 font-mono text-xs uppercase tracking-[0.28em] text-muted">
                  {{ project.domain }}
                </p>
              </div>
            </div>

            <!-- Hairline frame that brightens on hover -->
            <span
              class="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-accent/30"
              aria-hidden="true"
            />
          </component>
        </FxTiltCard>
      </div>
    </div>
  </article>
</template>
