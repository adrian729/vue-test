<template>
    <div
        :class="`w-full p-0 m-0 flex flex-auto justify-center bg-${props.background}`"
    >
        <div
            class="w-full 2xl:max-w-screen-xl xl:max-w-screen-lg max-w-screen-md p-4 m-0"
        >
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
interface Props {
    background?: string;
}
const props = withDefaults(defineProps<Props>(), {
    background: 'surface',
});
</script>
