<template>
    <router-link :to="props.to">
        <div :class="navItemClass">
            <span class="font-bold">{{ props.text }}</span>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import { computed, normalizeClass } from 'vue';

interface Props {
    text: string;
    to: string;
}
const props = withDefaults(defineProps<Props>(), {
    text: '',
    to: '/',
});

const navItemClass = computed<string>(() =>
    normalizeClass([
        'px-2 py-1 mb-1',
        'font-bold',
        'shadow shadow-accent',
        'bg-tertiary text-on-tertiary',
        'border-t-2 border-accent',
    ]),
);
</script>
