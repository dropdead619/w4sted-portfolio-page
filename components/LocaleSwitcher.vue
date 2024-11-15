<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n';

const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
})

async function changeLocale(localeV: LocaleObject) {
    await setLocale(localeV.code)
}
</script>

<template>
    <div class="flex gap-2">
        <span v-for="loc in locales" :key="loc.code" class="text-gray-400 cursor-pointer" :class="{
            'text-white': loc.code === locale
        }" @click="changeLocale(loc)">
            {{ loc.code.toUpperCase() }}
        </span>
    </div>
</template>
