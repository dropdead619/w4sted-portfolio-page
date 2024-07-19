<script setup lang="ts">
import MainContent from './components/layouts/MainContent.vue';
import TheFooter from './components/layouts/TheFooter.vue';
import TheHeader from './components/layouts/TheHeader.vue';

const { locale } = useI18n()
</script>

<template>
  <div :key="locale" class="h-screen dark:bg-neutral-800 dark:text-white">
    <TheHeader />
    <MainContent />
    <TheFooter />
  </div>
</template>
