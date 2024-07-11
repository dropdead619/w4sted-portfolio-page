<script setup lang="ts">
import MoonIcon from './icons/MoonIcon.vue';
import SunIcon from './icons/SunIcon.vue';

const isDark = useDark();

const toggleDark = useToggle(isDark);
</script>

<template>
    <ClientOnly>
        <button class="w-14 p-1 rounded-xl border-2 border-white" @click="toggleDark()">
            <div class="w-full flex transition-all duration-500">
                <MoonIcon class="ml-auto" v-if="isDark" />
                <SunIcon v-else />
            </div>
        </button>
    </ClientOnly>
</template>