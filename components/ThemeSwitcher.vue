<script setup lang="ts">
/**
 * Theme toggle. Where the View Transitions API is available the swap is
 * revealed as a circle expanding from the button itself; elsewhere it is a
 * plain class flip.
 */
const isDark = useDark({
  storageKey: 'dk-theme',
  valueDark: 'dark',
  valueLight: 'light',
  // The site is designed dark-first — that is the default for new visitors.
  initialValue: 'dark',
})

function toggleDark(event: MouseEvent) {
  const supportsTransition
    = 'startViewTransition' in document
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!supportsTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  const transition = (document as any).startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      { clipPath: isDark.value ? [...clipPath].reverse() : clipPath },
      {
        duration: 520,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      data-cursor="true"
      :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      class="group relative grid h-9 w-9 place-items-center rounded-full border border-line/15 transition-colors duration-300 hover:border-accent/50"
      @click="toggleDark"
    >
      <span
        class="absolute inset-0 rounded-full bg-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <Transition name="theme-icon" mode="out-in">
        <IconsMoonIcon v-if="isDark" key="moon" class="relative h-4 w-4" />
        <IconsSunIcon v-else key="sun" class="relative h-4 w-4" />
      </Transition>
    </button>

    <template #fallback>
      <span class="h-9 w-9 rounded-full border border-line/15" />
    </template>
  </ClientOnly>
</template>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
</style>
