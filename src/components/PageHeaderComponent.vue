<template>
    <h1 class="text-2xl font-bold underline">{{ props.title }}</h1>
</template>
<script setup lang="ts">
interface Props {
    title: string;
}
const props = defineProps<Props>();
</script>
