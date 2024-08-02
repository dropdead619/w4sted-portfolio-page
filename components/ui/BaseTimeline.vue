<template>
    <ul class="py-1 px-2 text-gray-500 flex flex-col">
        <li v-for="(item, i) in timelineItems" :key="item.id" class="relative flex flex-row gap-4"
            ref="timelineItemsRefs">
            <div class="hidden flex-col items-center md:flex" :class="{
                'order-1': i % 2 === 0,
                'order-2': i % 2 !== 0,
            }">
                <div
                    class="w-10 max-h-10 h-full flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-300  rounded-full">
                    <div class="w-4 h-4 rounded-full bg-white"></div>
                </div>
                <div class="bg-neutral-200 h-full w-[1px]"></div>
                <div v-if="i === timelineItems.length - 1" class="bg-neutral-300 w-full h-[1px]"></div>
            </div>

            <div class="w-[500px] hidden md:flex" :class="{
                'order-1': i % 2 === 0,
            }"></div>

            <div class="relative flex gap-4 w-full p-5 mt-10 rounded-xl border border-neutral-300 bg-white md:w-[500px] transition-all duration-1000 ease-in-out"
                :class="[
                    i % 2 !== 0 ? 'order-3' : '',
                    getAnimationClass(i),
                ]" :style="{
                    boxShadow: '12px 15px 8px 0px rgba(34, 60, 80, 0.2)',
                }">
                <NuxtImg width="56" height="56" class="w-14 h-14 border border-neutral-200" :placeholder="[56, 56]"
                    format="webp" :src="item.companyImg" :alt="item.company">
                </NuxtImg>

                <div>
                    <div>
                        <h3 class="font-bold text-xl">{{ item.title }}</h3>
                        <p class="text-neutral-400">{{ item.company }}</p>
                        <time class="text-neutral-400">{{ item.dates }}</time>
                    </div>
                    <ul class="mt-2">
                        <li v-for="pointItem in item.mainPointsList">
                            - {{ pointItem }}
                        </li>
                    </ul>

                    <div class="mt-4 font-medium italic">
                        <span v-for="skill, i in item.stack" :key="skill">
                            {{ skill }}
                            <template v-if="i !== item.stack.length - 1"> | </template>
                        </span>
                    </div>
                </div>

            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { ITimelineItem } from '~/types';

const props = defineProps<{
    timelineItems: ITimelineItem[]
}>()

const timelineItemsRefs = ref<HTMLLIElement[]>([]);
const visibleItems = ref<boolean[]>(Array(props.timelineItems.length).fill(false));

const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = timelineItemsRefs.value.indexOf(entry.target as HTMLLIElement);
            visibleItems.value[index] = true;
            observer.unobserve(entry.target);
        }
    });
};

onMounted(() => {
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.7,
    });

    timelineItemsRefs.value.forEach(item => {
        observer.observe(item);
    });
});

const getAnimationClass = (index: number) => {
    return visibleItems.value[index] ? 'animate-in' : 'animate-out';
};
</script>

<style scoped>
.animate-in {
    opacity: 1;
}

.animate-out {
    opacity: 0;
}
</style>