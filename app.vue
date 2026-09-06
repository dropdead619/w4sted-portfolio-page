<script setup lang="ts">
import MainContent from '~/components/layouts/MainContent.vue'
import TheFooter from '~/components/layouts/TheFooter.vue'
import TheHeader from '~/components/layouts/TheHeader.vue'
import { profile } from '~/data/cv'

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'canonical', href: 'https://demezhan-kazhkenov.dev/' },
  ],
})

// Person markup so search results carry the role and current employer.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': profile.name,
        'jobTitle': profile.role,
        'email': `mailto:${profile.email}`,
        'url': 'https://demezhan-kazhkenov.dev/',
        'worksFor': { '@type': 'Organization', 'name': profile.currentCompany },
        'sameAs': [profile.github, profile.linkedin],
        'knowsAbout': ['Vue.js', 'Nuxt', 'TypeScript', 'GraphQL', 'Frontend Architecture'],
      }),
    },
  ],
})
</script>

<template>
  <div class="relative min-h-screen bg-bg text-ink">
    <FxPreloader />
    <FxGrainOverlay />
    <FxCustomCursor />

    <TheHeader />
    <MainContent />
    <TheFooter />
  </div>
</template>
