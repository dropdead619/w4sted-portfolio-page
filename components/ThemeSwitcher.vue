<script setup lang="ts">
import MoonIcon from './icons/MoonIcon.vue';
import SunIcon from './icons/SunIcon.vue';

const isDark = useDark();

function toggleDark(event: MouseEvent) {
    const isAppearanceTransition = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition) {
        isDark.value = !isDark.value;
        return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
    );

    const transition = (document as any).startViewTransition(async () => {
        isDark.value = !isDark.value;
        await nextTick();
    });
    transition.ready
        .then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            document.documentElement.animate(
                {
                    clipPath: isDark.value
                        ? [...clipPath].reverse()
                        : clipPath,
                },
                {
                    duration: 400,
                    easing: 'ease-out',
                    pseudoElement: isDark.value
                        ? '::view-transition-old(root)'
                        : '::view-transition-new(root)',
                },
            );
        });
}
</script>

<template>
    <ClientOnly>
        <button class="w-14 p-1 rounded-xl border-2 border-white" @click="toggleDark">
            <div class="w-full flex transition-all duration-500">
                <MoonIcon class="ml-auto" v-if="isDark" />
                <SunIcon v-else />
            </div>
        </button>
    </ClientOnly>
</template>