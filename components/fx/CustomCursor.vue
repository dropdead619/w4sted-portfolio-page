<script setup lang="ts">
/**
 * Two-part cursor: a dot that tracks the pointer exactly and a ring that
 * trails behind it. The ring expands and picks up a label when it is over
 * anything marked `data-cursor`, which is how links announce themselves.
 */
const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const label = ref('')
const hovering = ref(false)
const visible = ref(false)

const fine = useFinePointer()
const reduced = usePrefersReducedMotion()
const enabled = computed(() => fine.value && !reduced.value)

const pos = { x: 0, y: 0 }
const ringPos = { x: 0, y: 0 }
let rafId = 0

function render() {
  // The ring lags by a fixed fraction each frame, producing the trail.
  ringPos.x += (pos.x - ringPos.x) * 0.16
  ringPos.y += (pos.y - ringPos.y) * 0.16

  if (dot.value)
    dot.value.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
  if (ring.value)
    ring.value.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`

  rafId = requestAnimationFrame(render)
}

function onMove(event: PointerEvent) {
  pos.x = event.clientX
  pos.y = event.clientY
  visible.value = true

  const target = (event.target as HTMLElement | null)?.closest?.('[data-cursor]') as HTMLElement | null
  hovering.value = Boolean(target)
  label.value = target?.dataset.cursor && target.dataset.cursor !== 'true'
    ? target.dataset.cursor
    : ''
}

watch(enabled, (on) => {
  document.documentElement.classList.toggle('has-custom-cursor', on)
}, { immediate: false })

onMounted(() => {
  if (!enabled.value)
    return
  document.documentElement.classList.add('has-custom-cursor')
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', () => (hovering.value = true))
  rafId = requestAnimationFrame(render)
})

onUnmounted(() => {
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('pointermove', onMove)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <ClientOnly>
    <div v-if="enabled" class="pointer-events-none fixed inset-0 z-cursor" aria-hidden="true">
      <div
        ref="ring"
        class="cursor-ring"
        :class="{ 'is-hovering': hovering, 'is-visible': visible, 'has-label': !!label }"
      >
        <span v-if="label" class="cursor-ring__label">{{ label }}</span>
      </div>
      <div ref="dot" class="cursor-dot" :class="{ 'is-visible': visible, 'is-hidden': !!label }" />
    </div>
  </ClientOnly>
</template>

<style scoped>
.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  will-change: transform;
}

.is-visible { opacity: 1; }

.cursor-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgb(var(--accent));
  transition: opacity 0.2s ease, width 0.25s ease, height 0.25s ease;
}

.cursor-dot.is-hidden { opacity: 0; }

.cursor-ring {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgb(var(--ink) / 0.35);
  border-radius: 999px;
  transition:
    width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.4s ease,
    border-color 0.4s ease,
    opacity 0.2s ease;
}

.cursor-ring.is-hovering {
  width: 54px;
  height: 54px;
  border-color: rgb(var(--accent) / 0.6);
  background: rgb(var(--accent) / 0.08);
}

.cursor-ring.has-label {
  width: 82px;
  height: 82px;
  background: rgb(var(--accent));
  border-color: rgb(var(--accent));
  backdrop-filter: none;
}

.cursor-ring__label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(var(--bg));
  text-align: center;
  line-height: 1.1;
  padding: 0 6px;
}
</style>
