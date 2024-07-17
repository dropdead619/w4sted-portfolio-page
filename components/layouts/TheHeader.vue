<template>
    <header class="w-full bg-neutral-700 text-white h-16 flex items-center top-0 z-10 fixed dark:bg-neutral-800">
        <div class="container mx-auto flex items-center">
            <div class="flex gap-4">
                <ThemeSwitcher></ThemeSwitcher>
                <LocaleSwitcher></LocaleSwitcher>
            </div>
            <nav class="flex gap-3 items-center ml-auto w-fit">
                <a v-for="link in navLinks" :href="link.href" :key="link.href"
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

function onClick(item: INavItem) {
    if (item.href)
        scrollToElement(item.href);
}

const { t } = useI18n({
    useScope: 'local'
});

const navLinks: INavItem[] = [
    {
        href: '#about',
        label: t('aboutMe')
    },
    {
        href: '#contacts',
        label: t('contacts')
    },
]
</script>

<i18n lang="json">{
    "en": {
        "aboutMe": "About me",
        "contacts": "Contacts"
    },
    "ru": {
        "aboutMe": "Обо мне",
        "contacts": "Контакты"
    }
}</i18n>