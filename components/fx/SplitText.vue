<script setup lang="ts">
/**
 * Masked type reveal. Each word (or character) sits inside a clipped box and
 * slides up from behind its own edge, staggered left to right. This is the
 * signature entrance used for every headline on the page.
 *
 * Characters are grouped by word and the group is `nowrap`, so a character
 * split never breaks a word across two lines.
 */
const props = withDefaults(defineProps<{
  text: string
  split?: 'word' | 'char'
  /** ms between consecutive pieces */
  stagger?: number
  /** ms before the first piece moves */
  delay?: number
  as?: string
  /** Fire on mount rather than waiting for the element to scroll into view. */
  immediate?: boolean
}>(), {
  split: 'word',
  stagger: 45,
  delay: 0,
  as: 'span',
  immediate: false,
})

const root = ref<HTMLElement | null>(null)
const shown = ref(false)

/**
 * Words, each carrying its own animated pieces and the running piece index
 * used to stagger the whole line.
 */
const words = computed(() => {
  let cursor = 0

  return props.text.split(' ').filter(Boolean).map((word) => {
    const pieces = props.split === 'char' ? [...word] : [word]
    const entry = {
      word,
      pieces: pieces.map((piece, i) => ({ piece, order: cursor + i })),
    }
    cursor += pieces.length
    return entry
  })
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shown.value = true
    return
  }

  if (props.immediate) {
    // A frame's grace so the initial transform is painted before it animates.
    // The timer is a fallback: requestAnimationFrame is starved in background
    // tabs, and without it a headline could stay hidden until the tab is
    // focused.
    requestAnimationFrame(() => requestAnimationFrame(() => (shown.value = true)))
    setTimeout(() => (shown.value = true), 120)
    return
  }

  const el = root.value
  if (!el) {
    shown.value = true
    return
  }

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (!entry.isIntersecting)
        return
      shown.value = true
      obs.disconnect()
    },
    { threshold: 0.25 },
  )
  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <component :is="as" ref="root" class="split-text" :class="{ 'is-shown': shown }">
    <span class="sr-only">{{ text }}</span>
    <template v-for="(entry, wi) in words" :key="`${wi}-${entry.word}`">
      <span class="split-text__word" aria-hidden="true">
        <span
          v-for="item in entry.pieces"
          :key="item.order"
          class="split-text__mask"
        >
          <span
            class="split-text__piece"
            :style="{ transitionDelay: `${delay + item.order * stagger}ms` }"
          >{{ item.piece }}</span>
        </span>
      </span>
      <span v-if="wi < words.length - 1" aria-hidden="true">{{ ' ' }}</span>
    </template>
  </component>
</template>

<style scoped>
.split-text {
  display: inline;
}

/* Keeps a character split from breaking a word across lines. */
.split-text__word {
  display: inline-block;
  white-space: nowrap;
}

.split-text__mask {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  /* Room for descenders so the clip never shaves a 'g' or 'y'. */
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;
}

.split-text__piece {
  display: inline-block;
  transform: translate3d(0, 110%, 0);
  transition: transform 1.05s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
  white-space: pre;
}

.is-shown .split-text__piece {
  transform: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  .split-text__piece {
    transform: none !important;
    transition: none !important;
  }
}
</style>
