<template>
    <div class="flex py-2 items-center">
        <div
            class="flex-grow border-t border-slate-700 dark:border-slate-400"
        ></div>
        <span
            v-if="props.text.length > 0"
            class="flex-shrink mx-4 text-slate-700 dark:text-slate-400"
        >
            {{ props.text }}
        </span>
        <div
            class="flex-grow border-t border-slate-700 dark:border-slate-400"
        ></div>
    </div>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        default: '',
    },
});
</script>
