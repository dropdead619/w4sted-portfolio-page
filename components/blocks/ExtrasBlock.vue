<script setup lang="ts">
import { certifications, languages } from '~/data/cv'
</script>

<template>
  <section class="relative border-t border-line/10 py-20 lg:py-28">
    <div class="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
      <div>
        <div v-reveal="{ y: 14 }" class="flex items-center gap-4">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <FxScrambleText text="Education" on-view class="eyebrow text-ink" />
          <span class="h-px flex-1 bg-line/10" />
        </div>

        <div
          v-for="cert in certifications"
          :key="cert.title"
          v-reveal="{ delay: 100, y: 18 }"
          class="mt-8"
        >
          <h3 class="text-2xl font-semibold tracking-tight">{{ cert.title }}</h3>
          <p class="mt-1 text-muted">{{ cert.school }}</p>
          <time class="mt-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {{ cert.dates }}
          </time>
        </div>
      </div>

      <div>
        <div v-reveal="{ y: 14 }" class="flex items-center gap-4">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <FxScrambleText text="Languages" on-view class="eyebrow text-ink" />
          <span class="h-px flex-1 bg-line/10" />
        </div>

        <ul class="mt-8 space-y-6">
          <li
            v-for="(lang, i) in languages"
            :key="lang.name"
            v-reveal="{ stagger: 90, index: i, y: 16 }"
          >
            <div class="flex items-baseline justify-between gap-4">
              <span class="text-lg font-medium">{{ lang.name }}</span>
              <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {{ lang.level }}
              </span>
            </div>
            <!-- Proficiency bar grows from the left as the row reveals -->
            <div class="mt-2.5 h-px w-full bg-line/10">
              <div
                class="lang-bar h-full origin-left bg-gradient-to-r from-accent to-accent-2"
                :style="{ '--bar': lang.bar, '--bar-delay': `${200 + i * 120}ms` }"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lang-bar {
  transform: scaleX(0);
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) var(--bar-delay, 0ms);
}

[data-reveal='in'] .lang-bar {
  transform: scaleX(var(--bar, 1));
}

@media (prefers-reduced-motion: reduce) {
  .lang-bar {
    transform: scaleX(var(--bar, 1));
    transition: none;
  }
}
</style>
