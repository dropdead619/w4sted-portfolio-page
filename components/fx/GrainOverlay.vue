<script setup lang="ts">
/**
 * Fixed film grain over the whole page. An inline SVG turbulence tile costs
 * nothing to fetch and keeps large flat areas of the dark canvas from
 * banding.
 */
</script>

<template>
  <div class="grain" aria-hidden="true" />
</template>

<style scoped>
.grain {
  position: fixed;
  inset: -50%;
  z-index: 60;
  pointer-events: none;
  opacity: var(--grain, 0.05);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
}
</style>
