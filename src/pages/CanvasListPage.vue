<template>
    <MainLayoutComponent>
        <PageHeaderComponent title="Canvas List" />
        <DividerComponent text="Canvas" />
        <CanvasList />
    </MainLayoutComponent>
</template>
<script setup lang="ts">
import MainLayoutComponent from '@/pages/MainLayoutComponent.vue';
import CanvasList from '@/components/canvas/CanvasList.vue';
import DividerComponent from '@/components/DividerComponent.vue';
import PageHeaderComponent from '@/components/PageHeaderComponent.vue';
</script>
