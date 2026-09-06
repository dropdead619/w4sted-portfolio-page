import type { IExperience, IProject, ISkillGroup, IStat } from '~/types'

export const profile = {
  name: 'Demezhan Kazhkenov',
  monogram: 'DK',
  role: 'Frontend Team Lead',
  roleLines: ['Frontend', 'Team', 'Lead'],
  discipline: 'Vue · Nuxt · TypeScript',
  summary:
    'Frontend lead with 5 years building and scaling Vue/Nuxt applications — CRMs, marketplaces and geospatial products. I own frontend architecture and delivery end to end, set the standards the team codes against, and grow developers through review and mentoring.',
  currentCompany: 'Webulon Labs',
  currentLocation: 'Astana, Kazakhstan · Remote',
  photo: '/opt/hero-photo.webp',
  email: 'sacrifice619@gmail.com',
  phone: '+7 707 239 26 88',
  phoneHref: '+77072392688',
  linkedin: 'https://www.linkedin.com/in/demezhan-kazhkenov',
  github: 'https://github.com/dropdead619',
  telegram: 'https://t.me/dropdead616',
}

export const stats: IStat[] = [
  { value: 5, suffix: '', label: 'Years building frontend' },
  { value: 20, suffix: '%', label: 'Faster page loads at Webulon' },
  { value: 50, suffix: '%', label: 'Less routine implementation time' },
  { value: 3, suffix: '', label: 'Teams led and mentored' },
]

export const skillGroups: ISkillGroup[] = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML/CSS'] },
  { label: 'Frameworks', items: ['Vue 3', 'Nuxt 4', 'Nuxt UI', 'Quasar', 'Tailwind CSS', 'UnoCSS'] },
  { label: 'APIs & Backend', items: ['GraphQL', 'REST', 'Laravel'] },
  {
    label: 'Developer Tools',
    items: ['Git', 'Vite', 'Webpack', 'Capacitor', 'Docker', 'Vitest', 'Claude Code', 'Copilot'],
  },
  { label: 'Libraries', items: ['Pinia', 'Vuex', 'Storybook', 'OpenLayers', 'ApexCharts'] },
]

/** Ticker strip under the hero — short tokens read better in motion. */
export const marqueeItems = [
  'Vue 3', 'Nuxt 4', 'Nuxt UI', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'Pinia',
  'Vite', 'Storybook', 'OpenLayers', 'Laravel', 'Capacitor', 'Vitest',
  'Feature-Sliced Design', 'Design Systems', 'Code Review', 'Mentoring',
]

export const experience: IExperience[] = [
  {
    id: 'webulon',
    company: 'Webulon Labs',
    location: 'Remote — Astana, Kazakhstan',
    dates: 'Jan 2026 — Present',
    companyImg: '/opt/webulon.webp',
    monogram: 'WL',
    current: true,
    stack: ['Nuxt 4', 'TypeScript', 'GraphQL', 'Laravel', 'Nuxt UI', 'Tailwind CSS'],
    roles: [
      {
        id: 'webulon-lead',
        title: 'Frontend Team Lead',
        dates: 'Jan 2026 — Present',
        period: '2026',
        points: [
          'Lead frontend development of a Nuxt 4 / TypeScript product consuming a GraphQL API over a Laravel backend, owning architecture decisions, release quality and delivery of the frontend roadmap.',
          'Ship customer-facing features end to end — from design and API contract to typed GraphQL integration, Nuxt UI / Tailwind interface and production rollout.',
          'Improved application performance by optimizing rendering, caching and bundle size, cutting page load time by 20% and improving Core Web Vitals.',
          'Run code review for the team, holding pull requests to shared architecture, typing and testing standards, and keeping the codebase consistent as it grows.',
          'Mentor junior developers through pairing, structured review feedback and internal documentation, shortening their ramp-up and raising the quality of what they ship independently.',
          "Introduced AI-assisted development into the team's workflow — scaffolding, refactors, test generation and first-pass review — with agreed rules and review gates so AI-generated code is held to the same standard as hand-written code, reducing routine implementation time by 50%.",
        ],
      },
    ],
  },
  {
    id: 'mechta',
    company: 'Mechta Market LLP',
    location: 'Astana, Kazakhstan',
    dates: 'Apr 2024 — Dec 2025',
    companyImg: '/opt/mechta.webp',
    monogram: 'MM',
    stack: ['Vue 3', 'TypeScript', 'Nuxt UI', 'Tailwind CSS', 'Quasar', 'Vite', 'Pinia'],
    roles: [
      {
        id: 'mechta-lead',
        title: 'Frontend Lead',
        dates: 'Apr 2024 — Dec 2025',
        period: '2024',
        points: [
          "Created and maintained a reusable project template (Vue 3, Nuxt UI, Tailwind CSS), significantly reducing setup time for new projects and standardizing the team's workflow.",
          'Optimized the performance of key features, resulting in a 30% faster build process and improved runtime performance for end users.',
          'Set coding standards by introducing Modular Architecture and Feature-Sliced Design backed by precise ESLint configurations, improving scalability and maintainability and speeding up adaptation to changing requirements.',
          'Built a scalable design system for a CRM and a marketplace, ensuring UI/UX consistency across projects.',
        ],
      },
    ],
  },
  {
    id: 'egistic',
    company: 'Egistic.kz',
    location: 'Astana, Kazakhstan',
    dates: 'May 2023 — Apr 2024',
    companyImg: '/opt/egistic-logo.webp',
    monogram: 'EG',
    stack: ['Nuxt 3', 'Vue 2', 'TypeScript', 'OpenLayers', 'Pinia', 'Vite'],
    roles: [
      {
        id: 'egistic-lead',
        title: 'Frontend Lead',
        dates: 'Oct 2023 — Apr 2024',
        period: '2023',
        points: [
          'Mentored a frontend team of 2 developers, streamlining workflows, introducing best practices and improving project outcomes through more effective collaboration.',
          'Reviewed pull requests regularly, improving code quality and keeping the codebase aligned with established standards.',
          'Developed web mapping solutions with OpenLayers, delivering responsive geospatial visualizations and supporting spatial data analysis.',
        ],
      },
      {
        id: 'egistic-middle',
        title: 'Middle Frontend Developer',
        dates: 'May 2023 — Oct 2023',
        period: '2023',
        points: [
          'Migrated the project from Vue 2 to Nuxt 3, using server-side rendering and composables for better performance and developer experience.',
          'Moved the application to a modular architecture with standalone modules, improving maintainability and reducing bug resolution time by 50%.',
          'Optimized the build and reduced bundle size by 20% using Nuxt 3 tree-shaking and modern JavaScript features.',
          'Executed SEO improvements that increased organic search visibility by 40%, driving a rise in average session duration and pages per visit.',
        ],
      },
    ],
  },
  {
    id: 'agrosearch',
    company: 'Agrosearch.kz',
    location: 'Remote — Contract',
    dates: 'Dec 2022 — Oct 2023',
    monogram: 'AS',
    stack: ['Nuxt 2', 'Capacitor', 'SCSS', 'Storybook', 'Vuex'],
    roles: [
      {
        id: 'agrosearch-middle',
        title: 'Middle Frontend Developer',
        dates: 'Dec 2022 — Oct 2023',
        period: '2022',
        points: [
          'Delivered Android and iOS builds with Capacitor, Nuxt 2 and SCSS, ensuring responsive design and seamless cross-platform behavior.',
          'Maintained a custom UI kit in Storybook, ensuring design consistency, accessibility and performance across projects.',
        ],
      },
    ],
  },
  {
    id: 'rocket',
    company: 'Rocket Firm',
    location: 'Astana, Kazakhstan',
    dates: 'Sep 2022 — May 2023',
    companyImg: '/opt/rocket.webp',
    monogram: 'RF',
    stack: ['Vue 3', 'Nuxt 2', 'Vite', 'WindiCSS', 'Pinia'],
    roles: [
      {
        id: 'rocket-middle',
        title: 'Middle Frontend Developer',
        dates: 'Sep 2022 — May 2023',
        period: '2022',
        points: [
          'Built responsive layouts from design specifications using Vue.js (Composition API) and Nuxt 2, delivering smooth, high-performance interfaces.',
          'Used Vite, WindiCSS and Pinia to speed up development and production builds, improving developer productivity and application efficiency.',
        ],
      },
    ],
  },
  {
    id: 'qlt',
    company: 'QLT LLP',
    location: 'Astana, Kazakhstan',
    dates: 'Nov 2021 — Sep 2022',
    companyImg: '/opt/qlt.webp',
    monogram: 'QL',
    stack: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
    roles: [
      {
        id: 'qlt-junior',
        title: 'Junior Frontend Developer',
        dates: 'Nov 2021 — Sep 2022',
        period: '2021',
        points: [
          'Developed and maintained frontend features for CRM projects using Vue.js, TypeScript, HTML/CSS and Tailwind, improving loading times by 25%.',
          'Worked with the design team to align UI and UX strategies, reducing design-to-launch time by 15% through effective communication.',
        ],
      },
    ],
  },
]

/** The three "Selected Projects" called out on the CV. */
export const featuredProjects: IProject[] = [
  {
    id: 'headhunter',
    title: 'my-headhunter',
    domain: 'my-headhunter.com',
    year: '2026',
    role: 'Frontend Team Lead',
    summary:
      'Recruitment platform for a Swiss company — the product I currently lead the frontend for.',
    points: [
      'Nuxt 4 and TypeScript against a GraphQL API over a Laravel backend',
      'Typed GraphQL integration from schema through to the Nuxt UI / Tailwind interface',
      'Cut page load time by 20% via rendering, caching and bundle work',
      'Set the architecture, typing and review standards the team codes against',
    ],
    stack: ['Nuxt 4', 'TypeScript', 'GraphQL', 'Nuxt UI', 'Tailwind CSS', 'Laravel'],
    accent: '124 255 155',
    links: [{ type: 'desktop', href: 'https://www.my-headhunter.com/', label: 'Visit site' }],
  },
  {
    id: 'mechta',
    title: 'Mechta',
    domain: 'mechta.kz',
    year: '2024',
    role: 'Frontend Lead',
    summary:
      "E-commerce marketplace for one of Kazakhstan's largest electronics retailers.",
    points: [
      'Built the design system behind the storefront and its internal CRM',
      'Set the frontend architecture — Modular + Feature-Sliced Design with strict ESLint',
      'Reusable Vue 3 / Nuxt UI / Tailwind project template that cut new-project setup time',
      '30% faster build process and improved runtime performance for end users',
    ],
    stack: ['Vue 3', 'TypeScript', 'Nuxt UI', 'Tailwind CSS', 'Quasar', 'Pinia', 'Vite'],
    accent: '111 178 255',
    links: [{ type: 'desktop', href: 'https://www.mechta.kz/', label: 'Visit site' }],
  },
  {
    id: 'egistic',
    title: 'Egistic',
    domain: 'egistic.kz',
    year: '2023',
    role: 'Frontend Lead',
    summary: 'Agritech super app for farm management.',
    points: [
      'Led the Vue 2 → Nuxt 3 migration with SSR and composables',
      'Built the OpenLayers geospatial mapping interface for field analysis',
      'Real-time vehicle monitoring over WebSockets',
      '20% smaller bundle, 40% more organic search visibility',
    ],
    stack: ['Nuxt 3', 'TypeScript', 'OpenLayers', 'Pinia', 'Vite'],
    accent: '160 230 120',
    links: [{ type: 'desktop', href: 'https://egistic.kz/', label: 'Visit site' }],
  },
]

/** Shipped earlier — kept for the store links, presented as a secondary index. */
export const otherProjects: IProject[] = [
  {
    id: 'agrosearch',
    title: 'Agrosearch',
    domain: 'agrosearch.kz',
    year: '2023',
    role: 'Middle Frontend Developer',
    summary: 'Kazakhstani marketplace for grain crops, with native mobile builds.',
    points: [],
    stack: ['Nuxt 2', 'Capacitor', 'SCSS', 'Vuex', 'Storybook'],
    accent: '124 255 155',
    links: [
      { type: 'desktop', href: 'https://agrosearch.kz/', label: 'Web' },
      {
        type: 'android',
        href: 'https://play.google.com/store/apps/details?id=kz.agrosearch.app&hl=gsw&gl=US',
        label: 'Google Play',
      },
      { type: 'ios', href: 'https://apps.apple.com/kz/app/agrosearch/id6444019950', label: 'App Store' },
    ],
  },
  {
    id: 'tanbalau',
    title: 'ERP Tanbalau',
    domain: 'tanbalau.kz',
    year: '2022',
    role: 'Middle Frontend Developer',
    summary: 'Internal CRM system that simplifies product labeling.',
    points: [],
    stack: ['Vue 2/3', 'UnoCSS', 'Vite', 'Pinia', 'Ant Design'],
    accent: '111 178 255',
    links: [{ type: 'desktop', href: 'https://tanbalau.kz/', label: 'Web' }],
  },
  {
    id: 'saveit',
    title: 'SaveIt Business',
    domain: 'CRM · iOS · Android',
    year: '2022',
    role: 'Middle Frontend Developer',
    summary: 'CRM system for adding and managing products, written from scratch.',
    points: [],
    stack: ['Nuxt 2', 'Capacitor', 'SCSS', 'Vuex', 'TypeScript'],
    accent: '200 170 255',
    links: [
      {
        type: 'android',
        href: 'https://play.google.com/store/apps/details?id=com.saveitcrm.original&hl=es_VE',
        label: 'Google Play',
      },
      {
        type: 'ios',
        href: 'https://apps.apple.com/kz/app/saveit-%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7-%D0%B5%D0%B4%D1%8B-%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD/id1636452811',
        label: 'App Store',
      },
    ],
  },
]

export const certifications = [
  {
    title: 'Software Developer',
    school: 'IT STEP Computer Academy',
    dates: 'May 2020 — Oct 2021',
  },
]

export const languages = [
  { name: 'English', level: 'C1 — Advanced', bar: 0.85 },
  { name: 'Russian', level: 'C2 — Native', bar: 1 },
  { name: 'Kazakh', level: 'Native', bar: 1 },
]

export const navLinks = [
  { href: '#about', label: 'About', index: '01' },
  { href: '#stack', label: 'Stack', index: '02' },
  { href: '#work', label: 'Work', index: '03' },
  { href: '#experience', label: 'Experience', index: '04' },
  { href: '#contact', label: 'Contact', index: '05' },
]
