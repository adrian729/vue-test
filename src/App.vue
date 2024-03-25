<template>
    <div :class="appClass">
        <AppHeader />
        <main :class="mainClass">
            <div class="max-w-screen-xl p-2">
                <RouterView />
            </div>
        </main>
        <div class="bg-secondary text-on-secondary p-4">
            <span>Footer</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, normalizeClass } from 'vue';
import AppHeader from '@/components/AppHeader.vue';

// -- Style Classes
const appClass = computed<string>(() =>
    normalizeClass([
        'font-mono bg-surface text-on-surface', // Set general font and colors
        'p-0 m-0',
        // Need min-h-screen so that page is at least full height when not enough content.
        // Can't set a height value (f.e. h-full) because Header needs to follow when scrolling
        'w-full min-h-screen',
        'flex flex-col justify-center', // To set the main layout for header/main/footer
    ]),
);
const mainClass = computed<string>(() =>
    normalizeClass([
        'w-full p-4 min-w-80',
        'flex flex-auto justify-center', // To make the main content fill the remaining space
    ]),
);
</script>
