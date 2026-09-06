<script setup lang="ts">
/**
 * Brief intro curtain: a counter runs to 100 while four panels wait, then the
 * panels wipe upward in sequence to hand over to the hero. Shown once per tab
 * session so repeat navigation is never delayed.
 */
const emit = defineEmits<{ done: [] }>()

const SESSION_KEY = 'dk-intro-played'
const DURATION = 1100

const active = ref(true)
const leaving = ref(false)
const count = ref(0)

function finish() {
  leaving.value = true
  // Matches the longest panel transition below (0.9s + 0.12s stagger).
  setTimeout(() => {
    active.value = false
    emit('done')
  }, 1100)
}

onMounted(() => {
  const skip
    = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || sessionStorage.getItem(SESSION_KEY) === '1'

  if (skip) {
    active.value = false
    emit('done')
    return
  }

  sessionStorage.setItem(SESSION_KEY, '1')
  document.documentElement.style.overflow = 'hidden'

  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION)
    // Ease-out so the number sprints then decelerates into 100.
    count.value = Math.round((1 - (1 - t) ** 3) * 100)
    if (t < 1)
      requestAnimationFrame(tick)
    else
      finish()
  }
  requestAnimationFrame(tick)
})

watch(active, (on) => {
  if (!on)
    document.documentElement.style.overflow = ''
})

onUnmounted(() => {
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <div v-if="active" class="fixed inset-0 z-preloader" :class="{ 'is-leaving': leaving }">
    <div class="absolute inset-0 flex">
      <div
        v-for="panel in 4"
        :key="panel"
        class="preloader__panel"
        :style="{ transitionDelay: `${(panel - 1) * 120}ms` }"
      />
    </div>

    <div class="preloader__content">
      <div class="preloader__mask">
        <span class="preloader__name font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          Demezhan Kazhkenov
        </span>
      </div>
      <div class="preloader__count display">
        {{ count }}<span class="text-accent">%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preloader__panel {
  flex: 1;
  background: rgb(var(--bg));
  transform: translateY(0);
  transition: transform 0.9s cubic-bezier(0.76, 0, 0.24, 1);
}

.is-leaving .preloader__panel {
  transform: translateY(-101%);
}

.preloader__content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}

.is-leaving .preloader__content {
  opacity: 0;
  transform: translateY(-30px);
}

.preloader__count {
  font-size: clamp(3rem, 12vw, 8rem);
  color: rgb(var(--ink));
}

.preloader__mask {
  overflow: hidden;
  padding-bottom: 0.2em;
}

.preloader__name {
  display: block;
  animation: preloader-name 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes preloader-name {
  from { transform: translateY(120%); }
  to   { transform: translateY(0); }
}
</style>
