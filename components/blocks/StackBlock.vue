<script setup lang="ts">
import { marqueeItems, skillGroups } from '~/data/cv'

/**
 * Skills, grouped exactly as the CV groups them, above an infinite ticker.
 * Hovering a group dims the others so one category reads at a time.
 */
const hovered = ref<string | null>(null)
</script>

<template>
  <section id="stack" class="relative border-y border-line/10 py-24 lg:py-32">
    <!-- Ticker strip anchored to the section top -->
    <div class="border-b border-line/10 pb-8">
      <FxMarquee
        :items="marqueeItems"
        :duration="55"
        class="font-mono text-[clamp(1.4rem,3.2vw,2.4rem)] uppercase tracking-tight text-muted/70"
      />
    </div>

    <div class="shell pt-20">
      <UiSectionHead index="02" label="Stack" title="What I build with">
        <template #aside>
          <span class="hidden font-mono text-[11px] text-muted sm:inline">
            {{ skillGroups.reduce((n, g) => n + g.items.length, 0) }} tools
          </span>
        </template>
      </UiSectionHead>

      <div class="grid gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(group, gi) in skillGroups"
          :key="group.label"
          v-reveal="{ stagger: 70, index: gi, y: 26 }"
          class="group relative bg-bg p-7 transition-all duration-500"
          :class="hovered && hovered !== group.label ? 'opacity-40' : 'opacity-100'"
          @mouseenter="hovered = group.label"
          @mouseleave="hovered = null"
        >
          <div
            class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style="background: linear-gradient(160deg, rgb(var(--accent) / 0.08), transparent 60%)"
            aria-hidden="true"
          />

          <div class="relative flex items-baseline gap-3">
            <span class="font-mono text-[11px] text-accent">{{ String(gi + 1).padStart(2, '0') }}</span>
            <h3 class="text-lg font-semibold tracking-tight">{{ group.label }}</h3>
          </div>

          <ul class="relative mt-5 flex flex-wrap gap-2">
            <li
              v-for="item in group.items"
              :key="item"
              class="rounded-full border border-line/10 px-3 py-1.5 text-[13px] text-muted transition-all duration-300 hover:border-accent/50 hover:text-ink"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Closing tile keeps the grid rhythm and states the working method -->
        <div
          v-reveal="{ stagger: 70, index: skillGroups.length, y: 26 }"
          class="relative bg-bg p-7"
        >
          <div class="flex items-baseline gap-3">
            <span class="font-mono text-[11px] text-accent">06</span>
            <h3 class="text-lg font-semibold tracking-tight">Method</h3>
          </div>
          <p class="mt-5 text-sm leading-relaxed text-muted">
            Modular architecture and Feature-Sliced Design, held in place by strict ESLint and
            typing rules — plus AI-assisted development with review gates, so generated code
            meets the same bar as hand-written code.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
