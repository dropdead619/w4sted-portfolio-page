<script setup lang="ts">
/** Hairline reading-progress bar pinned under the header. */
const progress = ref(0)
let ticking = false

function measure() {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  progress.value = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0
  ticking = false
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
  <div class="absolute inset-x-0 bottom-0 h-px bg-line/10" aria-hidden="true">
    <div
      class="h-full origin-left bg-gradient-to-r from-accent to-accent-2"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>
