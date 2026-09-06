<script setup lang="ts">
import { experience } from '~/data/cv'

/**
 * Career rail. A gradient line fills as the section scrolls, and each node
 * lights when its entry reaches the reading band — so the timeline reads as
 * a progress track rather than a static list.
 */
const section = ref<HTMLElement | null>(null)
const progress = useScrollProgress(section)

const itemEls = ref<HTMLElement[]>([])
const lit = ref<boolean[]>(Array.from({ length: experience.length }, () => false))

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const index = itemEls.value.indexOf(entry.target as HTMLElement)
        if (index !== -1 && entry.isIntersecting)
          lit.value[index] = true
      }
    },
    { rootMargin: '0px 0px -35% 0px', threshold: 0.05 },
  )

  itemEls.value.forEach(el => el && observer.observe(el))
  onUnmounted(() => observer.disconnect())
})

/** Fill tracks scroll but is remapped so the line reaches the last node. */
const fill = computed(() => Math.min(1, Math.max(0, (progress.value - 0.08) / 0.72)))
</script>

<template>
  <section id="experience" ref="section" class="relative border-t border-line/10 py-24 lg:py-36">
    <div class="shell">
      <UiSectionHead index="04" label="Experience" title="Where I've led">
        <template #aside>
          <span class="hidden font-mono text-[11px] text-muted sm:inline">2021 — present</span>
        </template>
      </UiSectionHead>

      <div class="relative">
        <!-- Rail -->
        <div class="absolute left-[13px] top-2 hidden h-full w-px bg-line/10 md:block" aria-hidden="true">
          <div
            class="h-full w-full origin-top bg-gradient-to-b from-accent via-accent-2 to-transparent transition-transform duration-150 ease-linear"
            :style="{ transform: `scaleY(${fill})` }"
          />
        </div>

        <ol class="space-y-6 md:space-y-8">
          <li
            v-for="(job, i) in experience"
            :key="job.id"
            ref="itemEls"
            class="relative md:pl-16"
          >
            <!-- Node -->
            <span
              class="absolute left-0 top-8 hidden h-[27px] w-[27px] place-items-center rounded-full border transition-all duration-700 ease-smooth md:grid"
              :class="lit[i]
                ? 'border-accent/60 bg-bg glow-accent'
                : 'border-line/15 bg-bg'"
              aria-hidden="true"
            >
              <span
                class="h-2 w-2 rounded-full transition-colors duration-700"
                :class="lit[i] ? 'bg-accent' : 'bg-line/25'"
              />
              <span
                v-if="job.current"
                class="absolute inset-0 rounded-full border border-accent/50"
                style="animation: pulse-ring 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              />
            </span>

            <div
              v-reveal="{ y: 26, blur: 8 }"
              class="panel group overflow-hidden p-6 lg:p-8"
              :class="job.current ? 'border-accent/25' : ''"
            >
              <!-- Accent wash on the current role, and on hover for the rest -->
              <div
                class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                :class="job.current ? 'opacity-100' : ''"
                style="background: linear-gradient(120deg, rgb(var(--accent) / 0.07), transparent 55%)"
                aria-hidden="true"
              />

              <header class="relative flex flex-wrap items-start gap-4">
                <!-- Logo, or a monogram tile where no asset exists -->
                <span
                  class="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-line/10 bg-bg"
                >
                  <img
                    v-if="job.companyImg"
                    :src="job.companyImg"
                    :alt="job.company"
                    width="128"
                    height="128"
                    loading="lazy"
                    decoding="async"
                    class="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  >
                  <span v-else class="font-mono text-xs font-semibold tracking-widest text-accent">
                    {{ job.monogram }}
                  </span>
                </span>

                <div class="min-w-0">
                  <h3 class="text-xl font-semibold tracking-tight">{{ job.company }}</h3>
                  <p class="text-sm text-muted">{{ job.location }}</p>
                </div>

                <div class="ml-auto text-right">
                  <time class="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {{ job.dates }}
                  </time>
                  <p v-if="job.current" class="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Current
                  </p>
                </div>
              </header>

              <!-- Roles (a company can hold more than one) -->
              <div class="relative mt-7 space-y-7">
                <div v-for="role in job.roles" :key="role.id">
                  <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 class="font-semibold">{{ role.title }}</h4>
                    <span
                      v-if="job.roles.length > 1"
                      class="font-mono text-[11px] text-muted"
                    >{{ role.dates }}</span>
                  </div>

                  <ul class="mt-3 space-y-2">
                    <li
                      v-for="point in role.points"
                      :key="point"
                      class="flex gap-3 text-[15px] leading-relaxed text-muted"
                    >
                      <span class="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {{ point }}
                    </li>
                  </ul>
                </div>
              </div>

              <ul class="relative mt-7 flex flex-wrap gap-2 border-t border-line/10 pt-5">
                <li
                  v-for="tech in job.stack"
                  :key="tech"
                  class="rounded-full border border-line/10 px-3 py-1 font-mono text-[11px] text-muted transition-colors duration-300 group-hover:border-accent/25"
                >
                  {{ tech }}
                </li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
