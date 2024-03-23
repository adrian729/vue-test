<template>
    <div :class="appClass">
        <AppHeader />
        <main :class="mainClass">
            <RouterView />
        </main>
        <div class="bg-secondary text-primary">
            <span>Footer</span>
        </div>
    </div>
</template>

<script setup>
import { computed, normalizeClass } from 'vue';
import AppHeader from '@/components/AppHeader.vue';

// -- Style Classes
const appClass = computed(() => {
    return normalizeClass([
        'font-mono p-0 m-0',
        // Need min-h-screen so that page is at least full height when not enough content.
        // Can't set a height value (f.e. h-full) because Header needs to follow when scrolling
        'w-full min-h-screen',
        'flex flex-col', // To set the main layout for header/main/footer
    ]);
});
const mainClass = computed(() => {
    return normalizeClass([
        'flex-auto', // To make the main content fill the remaining space
        'bg-primary text-secondary p-4', // To set the main content background color
    ]);
});
</script>
