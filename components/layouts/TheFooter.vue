<template>
    <footer class="w-full text-white bg-neutral-700 py-40">
        <div id="contacts" class="container mx-auto">
            <div class="flex flex-col items-center gap-10">
                <h3 class="font-semibold text-5xl">
                    Contact me via:
                </h3>

                <div class="flex gap-4">
                    <a v-for="link in links" :key="link.key" :href="link.href"
                        class="duration-300 transition-transform hover:scale-105">
                        <component :is="link.icon" class="w-12 h-12" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const links = [
    {
        key: 'telegram',
        icon: resolveComponent('LazyIconsTelegramIcon'),
        href: 'https://t.me/dropdead616',
    },
    {
        key: 'github',
        icon: resolveComponent('LazyIconsGithubIcon'),
        href: 'https://github.com/dropdead619',
    },
    {
        key: 'linkedin',
        icon: resolveComponent('LazyIconsLinkedinIcon'),
        href: 'https://www.linkedin.com/in/demezhan-kazhkenov/',
    },
    {
        key: 'gmail',
        icon: resolveComponent('LazyIconsGmailIcon'),
        href: 'mailto:sacrifice619@gmail.com',
    },
];

</script>