<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n';

const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
})

function langFlagIcon(locale: LocaleObject) {
    switch (locale.code) {
        case 'ru':
            return resolveComponent('LazyIconsRuLang');
        case 'en':
            return resolveComponent('LazyIconsEngLang');
        case 'kk':
            return resolveComponent('LazyIconsKzLang');
    }
}

async function changeLocale(localeV: LocaleObject) {
    await setLocale(localeV.code)
}
</script>

<template>
    <component :is="langFlagIcon(locale)" class="cursor-pointer w-5 h-5" v-for="locale in availableLocales"
        :key="locale.code" @click="changeLocale(locale)">
    </component>
</template>
