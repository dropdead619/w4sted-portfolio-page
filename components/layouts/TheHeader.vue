<script setup lang="ts">
import { navLinks, profile } from '~/data/cv'
import MobileMenu from './MobileMenu.vue'

/**
 * Fixed header that retreats when you scroll down and returns the moment you
 * scroll up, with the active section tracked against the nav.
 */
const menuOpen = ref(false)
const hidden = ref(false)
const scrolled = ref(false)
const activeId = ref('')

let lastY = 0
let ticking = false

function measure() {
  ticking = false
  const y = window.scrollY
  scrolled.value = y > 24
  // Ignore jitter, and never hide near the very top of the page.
  if (Math.abs(y - lastY) > 6)
    hidden.value = !menuOpen.value && y > lastY && y > 220
  lastY = y
}

function onScroll() {
  if (ticking)
    return
  ticking = true
  requestAnimationFrame(measure)
}

function onNavClick(href: string) {
  scrollToElement(href)
}

onMounted(() => {
  lastY = window.scrollY
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })

  // Highlight whichever section owns the middle of the viewport.
  const sections = navLinks
    .map(link => document.querySelector(link.href))
    .filter((el): el is Element => Boolean(el))

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting)
          activeId.value = `#${entry.target.id}`
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  sections.forEach(section => observer.observe(section))
  onUnmounted(() => observer.disconnect())
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-header transition-transform duration-500 ease-smooth"
    :class="[
      hidden ? '-translate-y-full' : 'translate-y-0',
      scrolled ? 'bg-bg/70 backdrop-blur-xl' : 'bg-transparent',
    ]"
  >
    <div class="shell flex h-16 items-center gap-6">
      <a
        href="#top"
        data-cursor="Top"
        class="group flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em]"
        @click.prevent="onNavClick('#top')"
      >
        <span class="relative flex h-2 w-2">
          <span class="absolute inset-0 rounded-full bg-accent" />
          <span
            class="absolute inset-0 rounded-full bg-accent"
            style="animation: pulse-ring 2.6s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          />
        </span>
        <FxScrambleText :text="profile.monogram" class="font-semibold tracking-[0.24em]" />
      </a>

      <nav class="ml-auto hidden items-center gap-1 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          data-cursor="true"
          class="group relative rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300"
          :class="activeId === link.href ? 'text-ink' : 'text-muted hover:text-ink'"
          @click.prevent="onNavClick(link.href)"
        >
          <span
            class="absolute inset-0 rounded-full border border-accent/40 bg-accent/5 transition-all duration-500 ease-smooth"
            :class="activeId === link.href ? 'scale-100 opacity-100' : 'scale-90 opacity-0'"
          />
          <span class="relative">
            <span class="mr-1.5 text-accent/70">{{ link.index }}</span>
            <FxScrambleText :text="link.label" />
          </span>
        </a>
      </nav>

      <div class="ml-auto flex items-center gap-3 md:ml-0">
        <a
          :href="`mailto:${profile.email}`"
          data-cursor="Email"
          class="hidden rounded-full border border-line/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:border-accent/50 hover:text-ink sm:inline-block"
        >
          Available for work
        </a>
        <ThemeSwitcher />

        <button
          type="button"
          class="burger grid h-9 w-9 place-items-center rounded-full border border-line/15 md:hidden"
          :class="{ 'is-open': menuOpen }"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="burger__bars">
            <span /><span />
          </span>
        </button>
      </div>
    </div>

    <FxScrollProgress />

    <MobileMenu v-model="menuOpen" />
  </header>
</template>

<style scoped>
.burger__bars {
  position: relative;
  display: block;
  width: 15px;
  height: 9px;
}

.burger__bars span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: rgb(var(--ink));
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), top 0.3s ease;
}

.burger__bars span:first-child { top: 0; }
.burger__bars span:last-child { top: 7.5px; }

/* Both bars slide to the middle, then cross. */
.burger.is-open .burger__bars span:first-child {
  top: 3.75px;
  transform: rotate(45deg);
}

.burger.is-open .burger__bars span:last-child {
  top: 3.75px;
  transform: rotate(-45deg);
}
</style>
