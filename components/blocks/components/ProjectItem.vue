<template>
    <div class="py-10 flex flex-col order-2 xl:order-none gap-20 justify-between items-center lg:flex-row">
        <div class="max-w-2xl" :class="{
            'xl:order-2': position === 'right'
        }">
            <h3 class="font-semibold text-3xl mb-1">{{ project.title }}</h3>

            <div class="flex flex-col gap-4 mb-10">
                <p class="text-gray-400 dark:text-gray-300">
                    {{ project.description }}
                </p>
                <ol class="list-disc pl-4">
                    <li v-for="point in project.mainPointsList" :key="point">{{ point }}</li>
                </ol>
                <p>
                    <span class="font-semibold">Стек технологий:</span>
                    {{ project.skills }}
                </p>
            </div>

            <div v-if="project.links" class="flex gap-4 items-center">
                <a v-for="link in project.links" :key="link.href" :href="link.href"
                    class="transition-transform hover:scale-125" target="_blank">
                    <i>
                        <LazyIconsGooglePlayIcon v-if="link.type === 'android'"></LazyIconsGooglePlayIcon>
                        <LazyIconsAppStoreIcon v-else-if="link.type === 'ios'"></LazyIconsAppStoreIcon>
                        <LazyIconsDesktopIcon v-else></LazyIconsDesktopIcon>
                    </i>
                </a>
            </div>
        </div>

        <div class="relative overflow-hidden rounded-xl border  border-neutral-200">
            <NuxtImg class="max-w-xl scale-[1.005] transition-all duration-500  w-full hover:scale-105 lg:max-w-3xl "
                format="webp" :title="project.title" :alt="project.title" :src="project.imgSrc" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IProject } from '~/types';

defineProps<{
    project: IProject
    position: 'right' | 'left'
}>();
</script>