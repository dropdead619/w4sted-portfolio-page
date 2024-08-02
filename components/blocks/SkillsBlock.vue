<template>
    <section id="skills" class="bg-gray-100 overflow-hidden dark:bg-neutral-400">
        <div class="container mx-auto py-10">
            <h3 class="text-center mb-8 text-3xl">{{ $t('myStack') }}:</h3>
            <ul class="flex flex-wrap justify-center gap-4 mx-auto w-fit">
                <li v-for="skill in skillset" :key="skill.label">
                    <UiBaseBadge class="flex gap-2 items-center cursor-default">
                        <component class="w-fit" :is="skill.icon"></component>
                        <span class="font-semibold">{{ skill.label }}</span>
                    </UiBaseBadge>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
const skillset = [
    {
        icon: resolveComponent('LazyIconsSkillsHtmlIcon'),
        label: 'HTML5'
    },
    {
        icon: resolveComponent('LazyIconsSkillsCssIcon'),
        label: 'CSS3'
    },
    {
        icon: resolveComponent('LazyIconsSkillsJsIcon'),
        label: 'Javascript'
    },
    {
        icon: resolveComponent('LazyIconsSkillsTypescriptIcon'),
        label: 'Typescript'
    },
    {
        icon: resolveComponent('LazyIconsSkillsVueIcon'),
        label: 'Vue (2, 3)'
    },
    {
        icon: resolveComponent('LazyIconsSkillsNuxtIcon'),
        label: 'Nuxt (2, 3)'
    },
    {
        icon: resolveComponent('LazyIconsSkillsPiniaIcon'),
        label: 'Pinia'
    },
    {
        icon: resolveComponent('LazyIconsSkillsViteIcon'),
        label: 'Vite'
    },
    {
        icon: resolveComponent('LazyIconsSkillsGitIcon'),
        label: 'Git'
    },

]
</script>