<script setup lang="ts">
/**
 * Pulls its content toward the cursor while the pointer is nearby, then
 * springs back on leave. Applied to the primary calls to action.
 */
const props = withDefaults(defineProps<{
  /** How far the element travels, as a fraction of cursor offset. */
  strength?: number
  /** Radius (px) beyond the element's box where the pull begins. */
  radius?: number
}>(), {
  strength: 0.35,
  radius: 80,
})

const root = ref<HTMLElement | null>(null)
const inner = ref<HTMLElement | null>(null)
const fine = useFinePointer()
const reduced = usePrefersReducedMotion()

let rafId = 0
const target = { x: 0, y: 0 }
const current = { x: 0, y: 0 }

function render() {
  current.x += (target.x - current.x) * 0.18
  current.y += (target.y - current.y) * 0.18

  if (inner.value)
    inner.value.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`

  const settled = Math.abs(target.x - current.x) < 0.1 && Math.abs(target.y - current.y) < 0.1
  if (settled && target.x === 0 && target.y === 0) {
    rafId = 0
    if (inner.value)
      inner.value.style.transform = ''
    return
  }

  rafId = requestAnimationFrame(render)
}

function kick() {
  if (!rafId)
    rafId = requestAnimationFrame(render)
}

function onMove(event: PointerEvent) {
  if (!fine.value || reduced.value || !root.value)
    return

  const rect = root.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = event.clientX - cx
  const dy = event.clientY - cy

  const reach = Math.max(rect.width, rect.height) / 2 + props.radius
  const distance = Math.hypot(dx, dy)
  if (distance > reach) {
    target.x = 0
    target.y = 0
  }
  else {
    // Falls off toward the edge of the reach so the pull feels like a field.
    const falloff = 1 - distance / reach
    target.x = dx * props.strength * falloff
    target.y = dy * props.strength * falloff
  }
  kick()
}

function onLeave() {
  target.x = 0
  target.y = 0
  kick()
}

onMounted(() => window.addEventListener('pointermove', onMove, { passive: true }))
onUnmounted(() => {
  window.removeEventListener('pointermove', onMove)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <span ref="root" class="inline-block" @pointerleave="onLeave">
    <span ref="inner" class="inline-block will-change-transform">
      <slot />
    </span>
  </span>
</template>
