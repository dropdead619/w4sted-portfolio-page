<script setup lang="ts">
import { navLinks, profile } from '~/data/cv'

/**
 * Full-screen menu for small viewports. The panel wipes down, then the links
 * arrive one at a time from behind their own clipping edge.
 */
const open = defineModel<boolean>({ default: false })

function go(href: string) {
  open.value = false
  // Let the panel start closing before the scroll begins.
  setTimeout(() => scrollToElement(href), 220)
}

// Keep the page from scrolling behind the open panel.
watch(open, (isOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
})

onUnmounted(() => {
  document.documentElement.style.overflow = ''
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    open.value = false
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <!--
    Teleported to <body> on purpose: the header carries a transform for its
    hide-on-scroll behaviour, which would make it the containing block for a
    position:fixed child and trap this panel inside the 64px bar.
  -->
  <Teleport to="body">
    <Transition name="panel">
      <div v-if="open" class="fixed inset-0 z-[90] bg-bg md:hidden">
        <div class="flex h-full flex-col px-5 pb-10 pt-24">
          <nav class="flex flex-col">
              <a
                v-for="(link, i) in navLinks"
                :key="link.href"
                :href="link.href"
                class="menu-item border-b border-line/10 py-5"
                :style="{ '--i': i }"
                @click.prevent="go(link.href)"
              >
                <span class="flex items-baseline gap-4">
                  <span class="font-mono text-[11px] text-accent">{{ link.index }}</span>
                  <span class="display text-4xl">{{ link.label }}</span>
                </span>
              </a>
          </nav>

          <div class="menu-item mt-auto space-y-2" :style="{ '--i': navLinks.length }">
              <a :href="`mailto:${profile.email}`" class="link-underline block text-ink">
                {{ profile.email }}
              </a>
              <a :href="`tel:${profile.phoneHref}`" class="block font-mono text-sm text-muted">
                {{ profile.phone }}
              </a>
              <p class="eyebrow pt-2">{{ profile.currentLocation }}</p>
            </div>
          </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.panel-enter-active,
.panel-leave-active {
  transition: clip-path 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}

.panel-enter-from,
.panel-leave-to {
  clip-path: inset(0 0 100% 0);
}

.panel-enter-to,
.panel-leave-from {
  clip-path: inset(0 0 0 0);
}

/*
 * An animation with `both` fill holds the end state on its own. A transition
 * driven by the enter classes would snap back the moment Vue removed them.
 * v-if remounts the panel on every open, so this replays each time.
 */
@keyframes menu-item-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.menu-item {
  animation: menu-item-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(220ms + var(--i) * 70ms);
}

@media (prefers-reduced-motion: reduce) {
  .panel-enter-active,
  .panel-leave-active {
    transition: none !important;
  }

  .menu-item {
    animation: none;
  }
}
</style>
