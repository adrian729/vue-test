<template>
    <MainLayoutComponent>
        <PageHeaderComponent title="Home Page" />
        <DividerComponent />
        <div class="bg-primary text-primary-text p-4">
            <p>Home page content</p>
            <p>Home page content</p>
            <p>Home page content</p>
            <p>Home page content</p>
        </div>
        <div class="bg-secondary text-secondary-text p-4">
            <p>Home page content</p>
            <p>Home page content</p>
            <p>Home page content</p>
            <p>Home page content</p>
        </div>
        <div class="bg-tertiary text-tertiary-text p-4">
            <p>Home page content</p>
            <p>Home page content</p>
            <p>Home page content</p>
            <p>Home page content</p>
        </div>
        <div class="bg-accent text-accent-text p-4">
            <p>Home page content</p>
            <p>Home page content</p>
            <p>Home page content</p>
            <p>Home page content</p>
        </div>
    </MainLayoutComponent>
</template>

<script setup lang="ts">
import MainLayoutComponent from '@/pages/MainLayoutComponent.vue';
import DividerComponent from '@/components/DividerComponent.vue';
import PageHeaderComponent from '@/components/PageHeaderComponent.vue';
</script>
