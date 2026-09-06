<script setup lang="ts">
/** Counts from zero to `value` once the number scrolls into view. */
const props = withDefaults(defineProps<{
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}>(), {
  duration: 1600,
  suffix: '',
  prefix: '',
})

const root = ref<HTMLElement | null>(null)
const shown = ref(0)

// Decelerating curve — fast off the mark, settles gently on the final number.
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t))

function run() {
  const start = performance.now()

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / props.duration)
    shown.value = Math.round(easeOutExpo(t) * props.value)
    if (t < 1)
      requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shown.value = props.value
    return
  }

  const el = root.value
  if (!el)
    return

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (!entry.isIntersecting)
        return
      run()
      obs.disconnect()
    },
    { threshold: 0.5 },
  )
  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <span ref="root" class="tabular-nums">{{ prefix }}{{ shown }}{{ suffix }}</span>
</template>
