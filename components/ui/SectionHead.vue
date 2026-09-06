<script setup lang="ts">
/** Consistent section masthead: index, label, rule and optional aside. */
defineProps<{
  index: string
  label: string
  title?: string
}>()
</script>

<template>
  <div v-reveal="{ y: 16 }" class="mb-12 lg:mb-16">
    <div class="flex items-center gap-4">
      <span class="font-mono text-[11px] tracking-[0.2em] text-accent">{{ index }}</span>
      <FxScrambleText
        :text="label"
        on-view
        class="eyebrow text-ink"
      />
      <span class="h-px flex-1 bg-line/10" />
      <slot name="aside" />
    </div>

    <h2 v-if="title" class="display mt-6 text-display-sm">
      <FxSplitText :text="title" :stagger="38" />
    </h2>
  </div>
</template>
