<script setup lang="ts">
/**
 * Seamless infinite ticker. The track holds two identical copies of the
 * content and translates by exactly -50%, so the loop point is invisible.
 */
withDefaults(defineProps<{
  items: string[]
  /** Seconds for one full pass. */
  duration?: number
  reverse?: boolean
  separator?: string
}>(), {
  duration: 42,
  reverse: false,
  separator: '—',
})
</script>

<template>
  <div class="marquee mask-fade-x" :class="{ 'marquee--reverse': reverse }">
    <div
      class="marquee__track animate-marquee-x"
      :style="{ '--marquee-duration': `${duration}s` }"
    >
      <div v-for="copy in 2" :key="copy" class="marquee__group" :aria-hidden="copy === 2">
        <span v-for="item in items" :key="`${copy}-${item}`" class="marquee__item">
          {{ item }}
          <span class="marquee__sep" aria-hidden="true">{{ separator }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  width: 100%;
}

.marquee__track {
  display: flex;
  width: max-content;
}

.marquee--reverse .marquee__track {
  animation-direction: reverse;
}

.marquee:hover .marquee__track {
  animation-play-state: paused;
}

.marquee__group {
  display: flex;
  flex-shrink: 0;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding-right: 1.5rem;
  white-space: nowrap;
}

.marquee__sep {
  color: rgb(var(--accent));
  opacity: 0.7;
}
</style>
