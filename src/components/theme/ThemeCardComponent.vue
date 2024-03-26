<template>
    <div
        :class="`px-4 py-2 w-52 rounded-md shadow-md bg-${props.color} hover:bg-${props.color}-hover text-on-${props.color}`"
    >
        <h1 class="font-bold text-lg underline">
            {{ capitalizeFirstLetter(props.color) }}
        </h1>
        <div class="p-2">
            <p>Text on {{ props.color }} element.</p>
            <p v-if="props.color !== 'accent'" class="text-accent">
                Some text with accent.
            </p>
        </div>
        <div class="flex justify-end">
            <button
                :class="`btn bg-container-${props.color} hover:bg-container-${props.color}-hover text-on-container-${props.color}`"
            >
                on {{ props.color }}
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
interface Props {
    color: string;
}
const props = defineProps<Props>();

const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>
