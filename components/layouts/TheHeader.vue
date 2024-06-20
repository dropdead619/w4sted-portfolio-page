<template>
    <header class="w-full bg-neutral-700 text-white h-16 flex items-center top-0 z-10 fixed">
        <div class="container mx-auto">
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

const navLinks: INavItem[] = [
    {
        href: '#about',
        label: 'About me',
    },
    {
        href: '#contacts',
        label: 'Contacts',
    },
]
</script>