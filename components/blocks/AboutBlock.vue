<script setup lang="ts">
import { profile, stats } from '~/data/cv'
</script>

<template>
  <section id="about" class="relative py-24 lg:py-36">
    <div class="shell">
      <UiSectionHead index="01" label="About" />

      <div class="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-8">
          <!-- The summary lights up word by word as it scrolls past. -->
          <FxScrollReveal
            :text="profile.summary"
            :feather="7"
            class="display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.18] tracking-[-0.03em]"
          />

          <div v-reveal="{ delay: 120 }" class="mt-10 max-w-xl space-y-4 text-muted">
            <p>
              Right now I lead the frontend at
              <a
                :href="'https://www.my-headhunter.com/'"
                target="_blank"
                rel="noopener"
                data-cursor="Visit"
                class="link-underline text-ink"
              >{{ profile.currentCompany }}</a>
              — a Swiss recruitment platform built on Nuxt 4 and TypeScript against a GraphQL API.
            </p>
            <p>
              Before that: a marketplace and CRM for one of Kazakhstan's largest electronics
              retailers, and an agritech super app where I ran the Vue 2 → Nuxt 3 migration and
              built the geospatial interface.
            </p>
          </div>
        </div>

        <!-- Contact rail -->
        <div class="lg:col-span-4">
          <dl v-reveal="{ delay: 200 }" class="panel divide-y divide-line/10 p-6">
            <div class="pb-4">
              <dt class="eyebrow">Currently</dt>
              <dd class="mt-1.5 text-ink">{{ profile.currentCompany }}</dd>
              <dd class="text-sm text-muted">{{ profile.currentLocation }}</dd>
            </div>
            <div class="py-4">
              <dt class="eyebrow">Email</dt>
              <dd class="mt-1.5">
                <a
                  :href="`mailto:${profile.email}`"
                  data-cursor="Copy"
                  class="link-underline break-all text-ink"
                >{{ profile.email }}</a>
              </dd>
            </div>
            <div class="py-4">
              <dt class="eyebrow">Phone</dt>
              <dd class="mt-1.5">
                <a :href="`tel:${profile.phoneHref}`" class="link-underline text-ink">
                  {{ profile.phone }}
                </a>
              </dd>
            </div>
            <div class="pt-4">
              <dt class="eyebrow">Languages</dt>
              <dd class="mt-1.5 text-sm text-muted">English C1 · Russian C2 · Kazakh native</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 lg:grid-cols-4">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          v-reveal="{ stagger: 90, index: i, y: 24 }"
          class="group relative bg-bg p-6 transition-colors duration-500 hover:bg-bg-elev lg:p-8"
        >
          <div
            class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style="background: radial-gradient(220px circle at 50% 0%, rgb(var(--accent) / 0.1), transparent 70%)"
            aria-hidden="true"
          />
          <p class="display relative text-[clamp(2.4rem,5vw,3.6rem)] text-gradient">
            <FxCountUp :value="stat.value" :suffix="stat.suffix" />
          </p>
          <p class="relative mt-2 text-sm leading-snug text-muted">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
