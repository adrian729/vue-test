<template>
    <div>
        <h2 class="text-2xl font-bold">Canvas List</h2>
        <DividerComponent text="Canvas" />
        <CanvasList />
    </div>
</template>
<script setup lang="ts">
import CanvasList from '@/components/canvas/CanvasList.vue';
import DividerComponent from '@/components/DividerComponent.vue';
</script>
