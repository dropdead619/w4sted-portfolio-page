<script setup lang="ts">
/**
 * Interactive dot matrix behind the hero. A slow sine wave breathes through
 * the grid, and dots inside the cursor's radius swell and take the accent
 * colour with a smooth falloff. Canvas rather than DOM so a thousand points
 * cost one paint.
 */
const props = withDefaults(defineProps<{
  /** Distance between dots in CSS pixels. */
  gap?: number
  /** Cursor influence radius in CSS pixels. */
  radius?: number
}>(), {
  gap: 30,
  radius: 190,
})

const canvas = ref<HTMLCanvasElement | null>(null)
const wrap = ref<HTMLElement | null>(null)
const reduced = usePrefersReducedMotion()

let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let dpr = 1

// Pointer position is lerped toward the raw value so the field trails
// the cursor slightly instead of snapping to it.
const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }

/** Reads the live theme tokens so the field recolours with the theme. */
function readTokens() {
  const styles = getComputedStyle(document.documentElement)
  return {
    ink: styles.getPropertyValue('--ink').trim() || '237 237 239',
    accent: styles.getPropertyValue('--accent').trim() || '124 255 155',
  }
}

let tokens = { ink: '237 237 239', accent: '124 255 155' }

function resize() {
  const el = wrap.value
  const cv = canvas.value
  if (!el || !cv)
    return

  const rect = el.getBoundingClientRect()
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = rect.width
  height = rect.height
  cv.width = Math.floor(width * dpr)
  cv.height = Math.floor(height * dpr)
  cv.style.width = `${width}px`
  cv.style.height = `${height}px`
  ctx = cv.getContext('2d')
  ctx?.scale(dpr, dpr)
  tokens = readTokens()
}

function onPointerMove(event: PointerEvent) {
  const el = wrap.value
  if (!el)
    return
  const rect = el.getBoundingClientRect()
  pointer.tx = event.clientX - rect.left
  pointer.ty = event.clientY - rect.top
}

function onPointerLeave() {
  pointer.tx = -9999
  pointer.ty = -9999
}

function draw(time: number) {
  if (!ctx)
    return

  ctx.clearRect(0, 0, width, height)

  pointer.x += (pointer.tx - pointer.x) * 0.1
  pointer.y += (pointer.ty - pointer.y) * 0.1

  const t = time * 0.0006
  const r2 = props.radius * props.radius

  for (let y = props.gap; y < height; y += props.gap) {
    for (let x = props.gap; x < width; x += props.gap) {
      // Diagonal travelling wave gives the grid a slow ambient pulse.
      const wave = Math.sin(x * 0.012 + y * 0.016 + t) * 0.5 + 0.5

      const dx = x - pointer.x
      const dy = y - pointer.y
      const dist2 = dx * dx + dy * dy

      let influence = 0
      if (dist2 < r2) {
        const falloff = 1 - Math.sqrt(dist2) / props.radius
        influence = falloff * falloff
      }

      const size = 0.7 + wave * 0.5 + influence * 2.6
      const alpha = 0.1 + wave * 0.08 + influence * 0.65
      const colour = influence > 0.04 ? tokens.accent : tokens.ink

      ctx.beginPath()
      ctx.fillStyle = `rgba(${colour.replace(/\s+/g, ',')},${alpha.toFixed(3)})`
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

useRafWhenVisible(wrap, draw)

onMounted(() => {
  resize()
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerleave', onPointerLeave)

  // Recolour when the theme class flips.
  const observer = new MutationObserver(() => {
    tokens = readTokens()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  onUnmounted(() => observer.disconnect())
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerleave', onPointerLeave)
})
</script>

<template>
  <div ref="wrap" class="pointer-events-none absolute inset-0 overflow-hidden">
    <canvas v-show="!reduced" ref="canvas" class="h-full w-full" aria-hidden="true" />
  </div>
</template>
