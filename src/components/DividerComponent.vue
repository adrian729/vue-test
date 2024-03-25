<template>
    <div class="flex py-2 items-center">
        <slot name="start"></slot>
        <div
            v-if="props.start"
            :class="`flex-grow border border-${props.color} `"
        ></div>
        <span
            v-if="props.text.length > 0"
            :class="`flex-shrink mx-4 font-bold text-${props.color} `"
        >
            {{ props.text }}
        </span>
        <slot></slot>
        <div
            v-if="props.end"
            :class="`flex-grow border border-${props.color} `"
        ></div>
        <slot name="end"></slot>
    </div>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        default: '',
    },
    start: {
        type: Boolean,
        default: true,
    },
    end: {
        type: Boolean,
        default: true,
    },
    color: {
        type: String,
        default: 'accent',
    },
});
</script>
