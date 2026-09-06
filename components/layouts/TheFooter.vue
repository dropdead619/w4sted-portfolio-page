<script setup lang="ts">
import { profile } from '~/data/cv'

const socials = [
  { key: 'Telegram', href: profile.telegram, icon: resolveComponent('IconsTelegramIcon') },
  { key: 'GitHub', href: profile.github, icon: resolveComponent('IconsGithubIcon') },
  { key: 'LinkedIn', href: profile.linkedin, icon: resolveComponent('IconsLinkedinIcon') },
  { key: 'Email', href: `mailto:${profile.email}`, icon: resolveComponent('IconsGmailIcon') },
]

const year = new Date().getFullYear()
const copied = ref(false)

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  }
  catch {
    // Clipboard can be blocked; the mailto link below still works.
  }
}
</script>

<template>
  <footer id="contact" class="relative isolate overflow-hidden border-t border-line/10 pt-24 lg:pt-36">
    <!-- Accent bloom rising from the base of the page -->
    <div
      class="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-[130px]"
      style="background: radial-gradient(circle, rgb(var(--accent) / 0.28), transparent 68%)"
      aria-hidden="true"
    />

    <div class="shell">
      <div v-reveal="{ y: 14 }" class="flex items-center gap-4">
        <span class="font-mono text-[11px] text-accent">05</span>
        <FxScrambleText text="Contact" on-view class="eyebrow text-ink" />
        <span class="h-px flex-1 bg-line/10" />
      </div>

      <h2 class="display mt-10 text-display-md">
        <span class="block"><FxSplitText text="Let's build" :stagger="50" /></span>
        <span class="block text-accent"><FxSplitText text="something good" :stagger="50" :delay="120" /></span>
      </h2>

      <div v-reveal="{ delay: 200, y: 20 }" class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
        <FxMagneticEl :strength="0.25" :radius="120">
          <a
            :href="`mailto:${profile.email}`"
            data-cursor="Write"
            class="link-underline display text-[clamp(1.5rem,4.5vw,3rem)] tracking-tight"
          >
            {{ profile.email }}
          </a>
        </FxMagneticEl>

        <button
          type="button"
          data-cursor="true"
          class="rounded-full border border-line/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:border-accent/50 hover:text-ink"
          @click="copyEmail"
        >
          {{ copied ? 'Copied ✓' : 'Copy address' }}
        </button>
      </div>

      <div v-reveal="{ delay: 260, y: 18 }" class="mt-10 flex flex-wrap items-center gap-4">
        <FxMagneticEl v-for="social in socials" :key="social.key" :strength="0.4" :radius="60">
          <a
            :href="social.href"
            :aria-label="social.key"
            :data-cursor="social.key"
            target="_blank"
            rel="noopener"
            class="group grid h-12 w-12 place-items-center rounded-full border border-line/12 transition-all duration-400 ease-smooth hover:border-accent/50 hover:bg-accent/8"
          >
            <component
              :is="social.icon"
              class="h-5 w-5 opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </a>
        </FxMagneticEl>

        <a
          :href="`tel:${profile.phoneHref}`"
          class="link-underline ml-2 font-mono text-sm text-muted"
        >
          {{ profile.phone }}
        </a>
      </div>

      <!-- Oversized wordmark that anchors the base of the page -->
      <div class="mask-fade-x mt-24 select-none overflow-hidden" aria-hidden="true">
        <p class="display whitespace-nowrap text-center text-[clamp(1.6rem,7.6vw,6.25rem)] leading-none text-ink/[0.07]">
          {{ profile.name.toUpperCase() }}
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 border-t border-line/10 py-7">
        <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          © {{ year }} {{ profile.name }}
        </p>
        <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Built with Nuxt · Deployed on Netlify
        </p>
        <button
          type="button"
          data-cursor="Top"
          class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:text-accent"
          @click="scrollToElement('#top')"
        >
          Back to top ↑
        </button>
      </div>
    </div>
  </footer>
</template>
