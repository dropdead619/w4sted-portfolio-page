<template>
    <section id="about"
        class="container text-center mx-auto flex flex-col items-center lg:items-start lg:flex-row justify-between gap-5 py-10 lg:text-start">
        <div class="flex flex-col gap-10">
            <h1
                class="text-6xl font-semibold bg-clip-text text-transparent lg:pt-40 bg-gradient-to-r from-green-600 to-blue-300">
                {{ $t('aboutBlock.descriptionPostion') }}</h1>

            <div class="flex flex-col gap-4 text-lg max-w-2xl">
                <p> {{ $t('aboutBlock.descriptionName') }}</p>

                <div class="flex gap-2 items-center justify-center lg:justify-normal">
                    <span>{{ $t('aboutBlock.currentWork') }}:</span>
                    <UiBaseBadge class="flex gap-1 items-center">
                        <NuxtImg src="/mechta-icon.png" width="24" height="24" alt="Mechta icon" /> <span
                            class="dark:text-neutral-200">Mechta.kz</span>
                    </UiBaseBadge>
                </div>

                <p>{{ $t('aboutBlock.description') }}</p>

                <p>
                    {{ $t('aboutBlock.descriptionHobbies') }}
                </p>

                <p>{{ $t('aboutBlock.descriptionLocation') }}</p>
            </div>
        </div>

        <div class="overflow-hidden rounded-3xl">
            <NuxtImg class="transition-transform  scale-110 duration-300 hover:scale-125" alt="Hero photo" width="600"
                height="800" loading="lazy" format="webp" :placeholder="[600, 800, 50, 5]" src="/hero-photo.jpg">
            </NuxtImg>
        </div>
    </section>
</template>