<template>
    <header class="w-full bg-neutral-700 text-white h-16 flex items-center top-0 z-10 fixed dark:bg-neutral-800">
        <div class="container mx-auto flex items-center">
            <div class="flex items-center gap-4">
                <ThemeSwitcher></ThemeSwitcher>
                <LocaleSwitcher></LocaleSwitcher>
            </div>
            <nav class="flex gap-3 items-center ml-auto w-fit">
                <a v-for="link in navLinks" :href="link.href" :key="link.label"
                    class="transition-colors duration-300 text-gray-200 hover:text-white"
                    @click.prevent="onClick(link)">
                    {{ link.label }}
                </a>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
interface INavItem {
    href: string
    label: string
}

const { t } = useI18n();

function onClick(item: INavItem) {
    if (item.href)
        scrollToElement(item.href);
}

const navLinks = ref<INavItem[]>([
    {
        href: '#about',
        label: t('aboutMe')
    },
    {
        href: '#projects',
        label: t('myProjects')
    },
    {
        href: '#contacts',
        label: t('contacts')
    },
])
</script>
