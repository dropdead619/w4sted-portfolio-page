<template>
    <section id="experience" class="py-10">
        <BaseTimeline class="container mx-auto w-fit" :timelineItems />
    </section>
</template>

<script setup lang="ts">
import type { ITimelineItem } from '~/types';
import BaseTimeline from '../ui/BaseTimeline.vue';

const { t } = useI18n();

const timelineItems = [
    {
        id: 0,
        dates: 'Apr 2024 - Present',
        title: 'Frontend Technical Leader',
        company: 'Mechta Market LLP · Full-time',
        companyImg: 'https://media.licdn.com/dms/image/C560BAQH8pWD5_jrIrg/company-logo_200_200/0/1650273388701/mechta_logo?e=1730332800&v=beta&t=YSAUfJC68MmgB4FG8XJvHnYCwqRHwoFYA-95_vzHmg0',
        mainPointsList: [
            'Created custom template for all projects (Modular + FSD with Typescript and Strong ESLint support)',
            'Move from Javascript to Typescript',
            'Code reviewing',
            'Project optimizations',
            'Work with team of 5 developers',
            'Organized tech meetings',
            'Wrote and maintained technical documentation',
        ],
        stack: ['Vue 3', 'Typescript', 'Javascript', 'Vite', 'Pinia', 'Quasar', 'TailwindCss'],
    },
    {
        id: 1,
        dates: 'Oct 2023 - Apr 2024 · 7 mos',
        title: 'Frontend Team Leader',
        company: 'Egistic.kz - Agritech SuperAPP · Full-time',
        companyImg: 'https://media.licdn.com/dms/image/D4E0BAQEMEld9n_XHsw/company-logo_200_200/0/1689135569054?e=1730332800&v=beta&t=TTM3F0SmQlvuJFkhRJlJPEQVmEepTpzf5SMKP4eDo-c',
        mainPointsList: [
            'Mentoring frontend team (2 members)',
            'Code reviewing',
            'Developed reusable and optimized components',
        ],
        stack: ['Nuxt 3', 'Typescript', 'Vite', 'Pinia', 'TailwindCss', 'Vue3openlayers'],
    },
    {
        id: 2,
        dates: 'May 2023 - Oct 2024 · 6 mos',
        title: 'Middle Frontend Developer',
        company: 'Egistic.kz - Agritech SuperAPP · Full-time',
        companyImg: 'https://media.licdn.com/dms/image/D4E0BAQEMEld9n_XHsw/company-logo_200_200/0/1689135569054?e=1730332800&v=beta&t=TTM3F0SmQlvuJFkhRJlJPEQVmEepTpzf5SMKP4eDo-c',
        mainPointsList: [
            'Move project from Vue 2 to Nuxt 3 ',
            'Introduced new architecture (Modular + FSD)',
            'Project optimizations',
            'SEO optimizations',
        ],
        stack: ['Nuxt 3', 'Typescript', 'Vite', 'Pinia', 'TailwindCss', 'Vue3openlayers'],
    },
    {
        id: 3,
        dates: 'Sep 2022 - May 2023 · 9 mos',
        title: 'Middle Frontend Developer',
        company: 'Rocket Firm | IT production company · Full-time',
        companyImg: 'https://media.licdn.com/dms/image/D4E0BAQE4CSWpnbKUwA/company-logo_200_200/0/1713160767731/therockettech_logo?e=1730332800&v=beta&t=RNX916fP4vJ-th0H28Vs7G6Ve0G3to5JMUULSjOYKjk',
        mainPointsList: [
            t('projectsBlock.capacitorBuild'),
            t('projectsBlock.uiLibCustom'),
            'Developed multiple projects',
            'Developed reusable and optimized components',
        ],
        stack: ['Nuxt 2/3', 'Vue 2/3', 'Capacitor', 'Typescript', 'Vite/Webpack', 'Pinia/Vuex', 'SCSS', 'TailwindCss'],
    },
    {
        id: 4,
        dates: 'Nov 2021 - Sep 2022 · 11 mos',
        title: 'Junior Frontend Developer',
        company: 'QLT LLP · Full-time',
        companyImg: 'https://media.licdn.com/dms/image/C4D0BAQESIqIotd2rDQ/company-logo_200_200/0/1630513077759/qlt_llp_logo?e=1730332800&v=beta&t=UGcXJkvUNga2lIANbercAB16IWthMrpd2LT0-PtFCsk',
        mainPointsList: [
            'Developed and maintained frontend features and functionality for CRM projects using VueJs, TypeScript, JavaScript, HTML, CSS, SCSS, and Tailwind.',
            'Collaborated with the development team to design and implement new features and enhancements, as well as troubleshoot and debug issues.',
            'Worked closely with the design team to ensure a seamless integration of user interface and user experience design into the final product.',
            'Participated in code reviews and provided constructive feedback to ensure code quality and maintainability.',
            'Stayed up-to-date with new technologies and industry trends and proposed ways to improve the product and development process.',
            'Implemented a responsive design for a complex CRM project, resulting in an improved user experience across multiple devices.',
            'Introduced and implemented Tailwind CSS for a large-scale CRM project, resulting in a streamlined development process and improved code consistency.',
        ],
        stack: ['Vue 2/3', 'Typescript', 'Vite/Webpack', 'Pinia/Vuex', 'SCSS', 'TailwindCss'],
    },
    {
        id: 5,
        dates: 'Dec 2020 - Oct 2021 · 11 mos',
        title: 'Freelance Software Engineer',
        company: 'Freelance Remote',
        companyImg: 'https://cdn2.iconfinder.com/data/icons/occupations-2/500/occupation-33-512.png',
        mainPointsList: [
            'Developed Landing sites, small applications',
            'Worked closely with UX/UI designers',
            'Worked closely with the design team to ensure a seamless integration of user interface and user experience design into the final product.',
            'Created builds for Android and IOS',
            'Connected APIs',
        ],
        stack: ['Vue 2', 'Nuxt 2', 'Javascript', 'Typescript', 'Webpack', 'Vuex', 'SCSS'],
    },
] as ITimelineItem[]

</script>