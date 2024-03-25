<template>
    <router-link :to="props.to">
        <div :class="navItemClass">
            <span class="font-bold">{{ props.text }}</span>
        </div>
    </router-link>
</template>

<script setup>
import { computed, normalizeClass } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: '',
        required: true,
    },
    to: {
        type: String,
        default: '/',
        required: true,
    },
});
const navItemClass = computed(() => {
    return normalizeClass([
        'px-2 py-1 mb-1',
        'font-bold',
        'shadow shadow-accent',
        'bg-tertiary text-on-tertiary',
        'border-t-2 border-accent',
    ]);
});
</script>
