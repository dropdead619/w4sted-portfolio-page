<template>
    <section id="projects" class="container mx-auto py-10">
        <h3 class="text-3xl text-center mb-10">My Projects:</h3>

        <template v-for="project, i in projectsList" :key="project.id">
            <BlocksComponentsProjectItem :position="i % 2 === 0 ? 'right' : 'left'" :project="project" />

            <hr v-if="i !== projectsList.length - 1" class="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        </template>
    </section>
</template>

<script setup lang="ts">
import type { IProject } from '~/types';

const projectsList: IProject[] = [
    {
        id: 0,
        title: 'ERP Tanbalau',
        imgSrc: '/works/tanbalau.jpg',
        description: 'Внутренняя CRM-система для упрощения маркировки товаров #1',
        mainPointsList: [
            'Верстка экранов по дизайну с помощью UI-библиотеки (Ant-design-vue)',
            'Перенос проекта с Vue 2 на Vue 3',
            'Вклад в создание Набора утилит для упрощения работы',
            'Работа с WebSockets (NCALayer)',
            'Внес вклад в повышение перфоманса приложения'
        ],
        skills: 'Vue 2, Vue 3 (Composition API), Axios, UnoCss, Vite, Pinia, Typescript, Ant Design',
        links: [{
            type: 'desktop',
            href: 'https://tanbalau.kz/',
        }]
    },
    {
        id: 1,
        title: 'Forte - Кабинет оценщика',
        imgSrc: '/works/forte.jpg',
        description: 'Внутренняя CRM-система банка',
        mainPointsList: [
            'Проект был написан мной с нуля',
            'В качестве архитектуры использовал смесь FSD и Modular',
            'Верстка экранов по макету с помощью кастомной UI-библиотеки',
            'Имплементировал кастомное решение по генерации отчетов из json структуры',
        ],
        skills: 'Vue 3 (Composition API) <script/setup>, Axios, UnoCss, Vite, Pinia, Typescript',
    },
    {
        id: 2,
        title: 'Agrosearch',
        imgSrc: '/works/agro.jpg',
        description: 'Казахстанский маркетплейс зерновых культур',
        mainPointsList: [
            'Верстка экранов по дизайну с помощью кастомной UI-библиотеки',
            'Билд Android и IOS приложения с помощью Capacitor',
            'Работа с WebSockets',
            'Внес вклад в повышение перфоманса приложения',
            'Улучшил SEO показатели сайта до максимума'
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
        id: 3,
        title: 'SaveIt - Business',
        imgSrc: '/works/saveit.png',
        description: 'CRM система для добавления продукции',
        mainPointsList: [
            'Проект был написан мной с нуля',
            'Верстка экранов по дизайну с помощью кастомной UI-библиотеки',
            'Билд Android и IOS приложения с помощью Capacitor',
            'Работа с WebSockets',
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
    {
        id: 4,
        title: 'Egistic',
        imgSrc: '/works/egistic.jpg',
        description: 'Система управления хозяйством',
        mainPointsList: [
            'Работа с картами',
            'Работа с WebSockets (Слежка за техникой в режиме реального времени)',
            'Переписал проект с Vue 2 на Nuxt 3',
            'Верстка экранов по дизайну с помощью кастомной UI-библиотеки',
            'Внедрил модульную архитектуру',
            'Менторил команду из 2х разработчиков',
            'Проводил code-review',
            'Использовал паттерны проектирования: DTO, Repository, Decorator',
            'Улучшил производительность - tree-shaking, vite-optimizations, SSR'
        ],
        skills: 'Nuxt 3, Vite 5, Pinia, Typescript, Vue3-openlayers',
        links: [
            {
                type: 'desktop',
                href: 'https://egistic.kz/',
            },
        ]
    },
] 
</script>