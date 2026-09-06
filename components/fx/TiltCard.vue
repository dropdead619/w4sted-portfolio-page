<script setup lang="ts">
/**
 * Perspective tilt with a spotlight that tracks the cursor. The glare is a
 * radial gradient positioned from the same pointer coordinates, so the card
 * reads as a physical surface catching light.
 */
const props = withDefaults(defineProps<{
  /** Maximum rotation in degrees on each axis. */
  max?: number
  /** RGB triple for the spotlight tint. */
  accent?: string
  glare?: boolean
}>(), {
  max: 7,
  accent: '124 255 155',
  glare: true,
})

const root = ref<HTMLElement | null>(null)
const fine = useFinePointer()
const reduced = usePrefersReducedMotion()
const active = ref(false)

const style = reactive({
  rx: 0,
  ry: 0,
  mx: 50,
  my: 50,
})

let rafId = 0
let pending: PointerEvent | null = null

function apply() {
  rafId = 0
  const event = pending
  const el = root.value
  if (!event || !el)
    return

  const rect = el.getBoundingClientRect()
  const px = (event.clientX - rect.left) / rect.width
  const py = (event.clientY - rect.top) / rect.height

  style.mx = px * 100
  style.my = py * 100
  style.ry = (px - 0.5) * 2 * props.max
  style.rx = -(py - 0.5) * 2 * props.max
}

function onMove(event: PointerEvent) {
  if (!fine.value || reduced.value)
    return
  pending = event
  if (!rafId)
    rafId = requestAnimationFrame(apply)
}

function onEnter() {
  if (fine.value && !reduced.value)
    active.value = true
}

function onLeave() {
  active.value = false
  style.rx = 0
  style.ry = 0
}

onUnmounted(() => cancelAnimationFrame(rafId))
</script>

<template>
  <div
    ref="root"
    class="tilt"
    :style="{
      '--rx': `${style.rx}deg`,
      '--ry': `${style.ry}deg`,
      '--mx': `${style.mx}%`,
      '--my': `${style.my}%`,
      '--tilt-accent': accent,
    }"
    :class="{ 'is-active': active }"
    @pointerenter="onEnter"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <div class="tilt__inner">
      <slot />
      <div v-if="glare" class="tilt__glare" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.tilt {
  perspective: 1100px;
}

.tilt__inner {
  position: relative;
  height: 100%;
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.tilt.is-active .tilt__inner {
  /* Snappier while tracking, eased on release. */
  transition: transform 0.12s linear;
}

.tilt__glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.45s ease;
  background: radial-gradient(
    420px circle at var(--mx) var(--my),
    rgb(var(--tilt-accent) / 0.16),
    transparent 62%
  );
}

.tilt.is-active .tilt__glare {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .tilt__inner { transform: none !important; }
  .tilt__glare { display: none; }
}
</style>
