<script setup lang="ts">
/**
 * Scroll-linked reading effect: the paragraph starts dimmed and each word
 * lights up as the block travels through the viewport, so the summary is
 * literally read by scrolling. Progress is sampled once per frame from a
 * passive scroll listener and written straight to inline styles.
 */
const props = withDefaults(defineProps<{
  text: string
  /** Number of words that are mid-transition at any moment. */
  feather?: number
}>(), {
  feather: 6,
})

const root = ref<HTMLElement | null>(null)
const progress = ref(0)
const reduced = usePrefersReducedMotion()

const words = computed(() => props.text.split(' '))

/** Opacity for word `i` given the current scroll progress. */
function opacityFor(index: number) {
  if (reduced.value)
    return 1

  const total = words.value.length
  // Map progress onto a head position that sweeps past the end, so the last
  // word is fully lit before the block leaves the viewport.
  const head = progress.value * (total + props.feather)
  const t = (head - index) / props.feather
  return 0.16 + 0.84 * Math.min(1, Math.max(0, t))
}

let ticking = false

function measure() {
  ticking = false
  const el = root.value
  if (!el)
    return

  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight

  // Start when the block's top reaches 82% down the screen, finish when its
  // bottom passes 38% — the band where it is comfortably being read.
  const start = vh * 0.82
  const end = vh * 0.38
  const span = (start - end) + rect.height
  const travelled = start - rect.top

  progress.value = Math.min(1, Math.max(0, travelled / span))
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
</script>

<template>
  <p ref="root" class="scroll-reveal">
    <span
      v-for="(word, i) in words"
      :key="`${i}-${word}`"
      class="scroll-reveal__word"
      :style="{ opacity: opacityFor(i) }"
    >{{ word }}</span>
  </p>
</template>

<style scoped>
.scroll-reveal__word {
  display: inline-block;
  margin-right: 0.26em;
  transition: opacity 0.18s linear;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal__word {
    opacity: 1 !important;
    transition: none;
  }
}
</style>
