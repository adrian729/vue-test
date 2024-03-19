<template>
    <div class="w-full h-full p-0 m-0 flex flex-col font-mono">
        <AppHeader />
        <main class="flex-auto bg-primary text-secondary p-4">
            <RouterView />
        </main>
        <div class="bg-secondary text-primary">
            <span>Footer</span>
        </div>
    </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
</script>
