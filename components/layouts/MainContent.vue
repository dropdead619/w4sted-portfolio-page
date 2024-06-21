<template>
    <main class="mt-16">
        <div id="about"
            class="container text-center mx-auto flex flex-col items-center lg:items-start lg:flex-row justify-between gap-5 py-10 lg:text-start">
            <div class="flex flex-col gap-10">
                <h1
                    class="text-6xl font-semibold bg-clip-text text-transparent lg:pt-40 bg-gradient-to-r from-green-600 to-blue-300">
                    Vue.js Frontend Developer</h1>

                <div class="flex flex-col gap-4 text-lg max-w-2xl">
                    <p>Hey, i am Demezhan Kazhkenov, a Vue.js frontend developer</p>

                    <p class="flex gap-2 items-center justify-center lg:justify-normal">Currently working at:
                        <UiBaseBadge class="flex gap-1 items-center">
                            <NuxtImg src="/mechta-icon.png" width="24" height="24" /> Mechta.kz
                        </UiBaseBadge>
                    </p>

                    <p>I love to work with newest Frontend tools and try to follow the best coding practices</p>

                    <p>
                        Outside of programming, I enjoy writing music, swimming, traveling and playing video games.
                        I also have an <a class="text-gray-600" href="https://www.instagram.com/dropdead616">Instagram
                            page.</a>
                    </p>

                    <p> Right now i live in 📍Astana.
                    </p>
                </div>
            </div>

            <div class="overflow-hidden rounded-3xl">
                <NuxtImg class="transition-transform  scale-110 duration-300 hover:scale-125" alt="Hero photo"
                    width="600" height="800" loading="lazy" format="webp" :placeholder="[600, 800, 50, 5]"
                    src="/hero-photo.jpg">

                </NuxtImg>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">

</script>