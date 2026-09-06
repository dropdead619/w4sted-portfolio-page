<script setup lang="ts">
import { profile } from '~/data/cv'

/**
 * Opening screen. The headline arrives as masked lines, the portrait unmasks
 * from a clipped frame and drifts on a parallax offset, and the whole thing
 * sits on the interactive dot field.
 */
const photoWrap = ref<HTMLElement | null>(null)
const photoOffset = ref(0)
const reduced = usePrefersReducedMotion()

let ticking = false

function measure() {
  ticking = false
  if (reduced.value)
    return
  // Gentle counter-scroll on the portrait — enough to feel layered.
  photoOffset.value = Math.min(90, window.scrollY * 0.12)
}

function onScroll() {
  if (ticking)
    return
  ticking = true
  requestAnimationFrame(measure)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section id="top" class="relative isolate overflow-hidden pt-28 pb-16 lg:min-h-[100svh] lg:pt-32">
    <FxDotField :gap="32" :radius="200" />

    <!-- Ambient accent bloom behind the headline -->
    <div
      class="pointer-events-none absolute -left-40 top-10 -z-10 h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
      style="background: radial-gradient(circle, rgb(var(--accent) / 0.35), transparent 70%)"
      aria-hidden="true"
    />

    <div class="shell relative">
      <div class="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <!-- Headline column -->
        <div class="lg:col-span-8 xl:col-span-8">
          <div class="line-mask mb-8" data-reveal="in">
            <span class="eyebrow flex items-center gap-3">
              <span class="inline-block h-px w-8 bg-accent" />
              {{ profile.currentLocation }}
            </span>
          </div>

          <h1 class="display text-display-lg">
            <span
              v-for="(line, li) in profile.roleLines"
              :key="line"
              class="block"
              :class="li === 0 ? 'text-ink' : 'text-accent'"
            >
              <FxSplitText
                :text="line"
                split="char"
                :stagger="34"
                :delay="120 + li * 180"
                immediate
              />
            </span>
          </h1>

          <div
            v-reveal="{ delay: 700, y: 18 }"
            class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <p class="font-mono text-sm uppercase tracking-[0.2em] text-muted">
              {{ profile.discipline }}
            </p>
            <span class="hidden h-px w-10 bg-line/20 sm:block" />
            <p class="serif-italic text-xl text-muted">
              {{ profile.name }}
            </p>
          </div>

          <div v-reveal="{ delay: 840, y: 20 }" class="mt-10 flex flex-wrap items-center gap-3">
            <FxMagneticEl :strength="0.4">
              <a
                :href="`mailto:${profile.email}`"
                data-cursor="Say hi"
                class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg"
              >
                <span class="relative z-10">Start a conversation</span>
                <span class="relative z-10 transition-transform duration-500 ease-smooth group-hover:translate-x-1">→</span>
                <!-- Light sweep on hover -->
                <span
                  class="absolute inset-y-0 -left-1/2 w-1/2 bg-white/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style="animation: sheen 1.1s ease-in-out infinite"
                  aria-hidden="true"
                />
              </a>
            </FxMagneticEl>

            <FxMagneticEl :strength="0.3">
              <a
                :href="profile.github"
                target="_blank"
                rel="noopener"
                data-cursor="GitHub"
                class="inline-flex items-center gap-2 rounded-full border border-line/15 px-6 py-3 text-sm text-muted transition-colors duration-300 hover:border-accent/50 hover:text-ink"
              >
                <IconsGithubIcon class="h-4 w-4" />
                GitHub
              </a>
            </FxMagneticEl>
          </div>
        </div>

        <!-- Portrait column -->
        <div class="lg:col-span-4 xl:col-span-4">
          <div
            ref="photoWrap"
            v-reveal="{ delay: 400, y: 40, blur: 12 }"
            class="relative mx-auto max-w-[340px] lg:ml-auto lg:mr-0"
            :style="{ transform: `translate3d(0, ${-photoOffset}px, 0)` }"
          >
            <div class="hero-photo relative overflow-hidden rounded-[28px] border border-line/10">
              <img
                :src="profile.photo"
                alt="Demezhan Kazhkenov"
                width="760"
                height="1013"
                fetchpriority="high"
                decoding="async"
                class="h-full w-full object-cover transition-transform duration-[1.4s] ease-smooth hover:scale-[1.06]"
              >
              <!-- Duotone wash so the portrait belongs to the palette -->
              <div
                class="pointer-events-none absolute inset-0 mix-blend-color"
                style="background: linear-gradient(150deg, rgb(var(--accent) / 0.2), rgb(var(--accent-2) / 0.16))"
                aria-hidden="true"
              />
              <div
                class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                style="background: linear-gradient(to top, rgb(var(--bg) / 0.85), transparent)"
                aria-hidden="true"
              />
            </div>

            <!-- Floating status chip -->
            <div
              class="animate-float-slow absolute -bottom-5 -left-4 flex items-center gap-2.5 rounded-full border border-line/10 bg-bg-elev/90 px-4 py-2.5 backdrop-blur-md sm:-left-8"
            >
              <span class="relative flex h-2 w-2">
                <span class="absolute inset-0 rounded-full bg-accent" />
                <span
                  class="absolute inset-0 rounded-full bg-accent"
                  style="animation: pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                />
              </span>
              <span class="font-mono text-[11px] uppercase tracking-[0.16em]">
                {{ profile.currentCompany }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom scroll cue -->
      <div
        v-reveal="{ delay: 1000, y: 14 }"
        class="mt-20 flex items-center justify-between border-t border-line/10 pt-6"
      >
        <span class="eyebrow">5 years · Vue &amp; Nuxt</span>
        <span class="eyebrow flex items-center gap-2">
          Scroll
          <span class="inline-block h-8 w-px overflow-hidden bg-line/15">
            <span class="scroll-cue block h-3 w-px bg-accent" />
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-photo {
  /* Slight asymmetry keeps the frame from reading as a stock rounded box. */
  border-top-right-radius: 96px;
}

@keyframes scroll-cue {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(300%); }
}

.scroll-cue {
  animation: scroll-cue 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-cue { animation: none; }
}
</style>
