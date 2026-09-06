<script setup lang="ts">
/**
 * Decode effect — the label resolves out of random glyphs, character by
 * character. Runs once when scrolled into view and again on hover, which
 * makes nav items and section labels feel wired to something.
 */
const props = withDefaults(defineProps<{
  text: string
  /** ms per character before it locks to its final glyph */
  speed?: number
  /** Trigger the scramble when the element is hovered. */
  onHover?: boolean
  /** Trigger once when it scrolls into view. */
  onView?: boolean
  as?: string
}>(), {
  speed: 32,
  onHover: true,
  onView: false,
  as: 'span',
})

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________'

const root = ref<HTMLElement | null>(null)
const output = ref(props.text)
let frame = 0
let rafId = 0
let reduced = false

watch(() => props.text, (next) => {
  if (!rafId)
    output.value = next
})

function scramble() {
  if (reduced)
    return

  const target = props.text
  cancelAnimationFrame(rafId)

  // Each character gets its own random start/stop frame so the reveal
  // ripples rather than resolving in one block.
  const queue = [...target].map((char, i) => ({
    char,
    start: Math.floor(i * 0.6 + Math.random() * 8),
    end: Math.floor(i * 0.6 + Math.random() * 8) + 6 + Math.floor(Math.random() * 10),
    glyph: '',
  }))

  frame = 0

  const tick = () => {
    let done = 0
    let out = ''

    for (const item of queue) {
      if (frame >= item.end) {
        done++
        out += item.char
      }
      else if (frame >= item.start) {
        if (!item.glyph || Math.random() < 0.3)
          item.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        out += item.glyph
      }
      else {
        out += item.char === ' ' ? ' ' : ''
      }
    }

    output.value = out

    if (done === queue.length) {
      rafId = 0
      output.value = target
      return
    }

    frame++
    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !props.onView)
    return

  const el = root.value
  if (!el)
    return

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (!entry.isIntersecting)
        return
      scramble()
      obs.disconnect()
    },
    { threshold: 0.6 },
  )
  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})

onUnmounted(() => cancelAnimationFrame(rafId))
</script>

<template>
  <component
    :is="as"
    ref="root"
    class="tabular-nums"
    @mouseenter="onHover && scramble()"
    @focus="onHover && scramble()"
  >{{ output }}</component>
</template>
