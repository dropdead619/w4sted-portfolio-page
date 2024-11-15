<template>
    <section id="projects" class="container mx-auto py-10">
        <h3 class="text-5xl font-bold text-center mb-10">{{ t('myProjects') }}</h3>

        <template v-for="project, i in projectsList" :key="project.id">
            <BlocksComponentsProjectItem :position="i % 2 === 0 ? 'right' : 'left'" :project="project" />

            <hr v-if="i !== projectsList.length - 1" class="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        </template>
    </section>
</template>

<script setup lang="ts">
import type { IProject } from '~/types';

const { t } = useI18n();

const projectsList: IProject[] = [
    {
        id: 4,
        title: 'Egistic',
        imgSrc: '/works/egistic.jpg',
        description: t('projectsBlock.egistic.description'),
        mainPointsList: [
            t('projectsBlock.egistic.workWithMaps'),
            t('projectsBlock.egistic.websocketsUsage'),
            t('projectsBlock.egistic.vueToNuxt'),
            t('projectsBlock.uiLibCustom'),
            t('projectsBlock.modularFsd'),
            t('projectsBlock.egistic.mentoringCount'),
            t('projectsBlock.codeReview'),
            t('projectsBlock.patternsUsed') + ': DTO, Repository, Decorator',
            t('projectsBlock.improvedPerfomance') + ' - tree-shaking, vite-optimizations, SSR'
        ],
        skills: 'Nuxt 3, Vite 5, Pinia, Typescript, Vue3-openlayers',
        links: [
            {
                type: 'desktop',
                href: 'https://egistic.kz/',
            },
        ]
    },
    {
        id: 2,
        title: 'Agrosearch',
        imgSrc: '/works/agro.jpg',
        description: t('projectsBlock.agro.description'),
        mainPointsList: [
            t('projectsBlock.uiLibCustom'),
            t('projectsBlock.capacitorBuild'),
            t('projectsBlock.websocketsNca'),
            t('projectsBlock.perfomanceBoost'),
            t('projectsBlock.improvedSeo'),
        ],
        skills: 'Nuxt 2, Axios, SCSS, Webpack, Vuex, Typescript, Capactior',
        links: [
            {
                type: 'desktop',
                href: 'https://agrosearch.kz/',
            },
            {
                type: 'android',
                href: 'https://play.google.com/store/apps/details?id=kz.agrosearch.app&hl=gsw&gl=US',
            },
            {
                type: 'ios',
                href: 'https://apps.apple.com/kz/app/agrosearch/id6444019950',
            },
        ]
    },
    {
        id: 0,
        title: 'ERP Tanbalau',
        imgSrc: '/works/tanbalau.jpg',
        description: t('projectsBlock.tanbalau.description'),
        mainPointsList: [
            t('projectsBlock.uiLibAntd'),
            t('projectsBlock.moveVueVersions'),
            t('projectsBlock.utilityPoint'),
            t('projectsBlock.websocketsNca'),
            t('projectsBlock.perfomanceBoost'),
        ],
        skills: 'Vue 2, Vue 3 (Composition API), Axios, UnoCss, Vite, Pinia, Typescript, Ant Design',
        links: [{
            type: 'desktop',
            href: 'https://tanbalau.kz/',
        }]
    },
    {
        id: 3,
        title: 'SaveIt - Business',
        imgSrc: '/works/saveit.png',
        description: t('projectsBlock.saveit.description'),
        mainPointsList: [
            t('projectsBlock.fromScratch'),
            t('projectsBlock.uiLibCustom'),
            t('projectsBlock.capacitorBuild'),
            t('projectsBlock.websocketsNca'),
        ],
        skills: 'Nuxt 2, Axios, SCSS, Webpack, Vuex, Typescript, Capactior',
        links: [
            {
                type: 'android',
                href: 'https://play.google.com/store/apps/details?id=com.saveitcrm.original&hl=es_VE',
            },
            {
                type: 'ios',
                href: 'https://apps.apple.com/kz/app/saveit-%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7-%D0%B5%D0%B4%D1%8B-%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD/id1636452811',
            },
        ]
    },
] 
</script>