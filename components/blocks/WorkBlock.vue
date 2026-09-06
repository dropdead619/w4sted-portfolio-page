<script setup lang="ts">
import { featuredProjects, otherProjects } from '~/data/cv'

</script>

<template>
  <section id="work" class="relative py-24 lg:py-36">
    <div class="shell">
      <UiSectionHead index="03" label="Selected Work" title="Products I've shipped">
        <template #aside>
          <span class="hidden font-mono text-[11px] text-muted sm:inline">
            {{ featuredProjects.length + otherProjects.length }} projects
          </span>
        </template>
      </UiSectionHead>

      <div class="space-y-24 lg:space-y-36">
        <UiProjectCard
          v-for="(project, i) in featuredProjects"
          :key="project.id"
          :project="project"
          :index="i"
          :flip="i % 2 === 1"
        />
      </div>

      <!-- Secondary index -->
      <div class="mt-28">
        <div v-reveal="{ y: 14 }" class="flex items-center gap-4">
          <span class="eyebrow">Also built</span>
          <span class="h-px flex-1 bg-line/10" />
        </div>

        <ul class="mt-4">
          <li
            v-for="(project, i) in otherProjects"
            :key="project.id"
            v-reveal="{ stagger: 80, index: i, y: 18 }"
            class="group relative border-b border-line/10"
          >
            <div
              class="relative flex flex-col gap-3 py-7 transition-all duration-500 ease-smooth sm:flex-row sm:items-center sm:gap-6 md:group-hover:pl-5"
            >
              <!-- Accent bar that grows in from the left on hover -->
              <span
                class="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 origin-center scale-y-0 bg-accent transition-transform duration-500 ease-smooth group-hover:scale-y-100 md:block"
                aria-hidden="true"
              />

              <span class="font-mono text-[11px] text-muted">{{ project.year }}</span>

              <h3 class="text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                {{ project.title }}
              </h3>

              <p class="text-sm text-muted sm:ml-auto sm:max-w-sm sm:text-right">
                {{ project.summary }}
              </p>

              <div class="flex items-center gap-3">
                <a
                  v-for="link in project.links"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noopener"
                  :aria-label="`${project.title} — ${link.label}`"
                  :data-cursor="link.label"
                  class="opacity-45 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0"
                >
                  <IconsGooglePlayIcon v-if="link.type === 'android'" class="h-5 w-5" />
                  <IconsAppStoreIcon v-else-if="link.type === 'ios'" class="h-5 w-5" />
                  <IconsDesktopIcon v-else class="h-5 w-5" />
                </a>
              </div>
            </div>

          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
