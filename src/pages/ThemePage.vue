<template>
    <MainLayoutComponent>
        <PageHeaderComponent title="Theme Overview" />
        <ThemeSurfaceComponent
            v-for="surface in surfaces"
            :key="surface"
            :surface="surface"
        >
            <ThemeCardComponent
                v-for="color in colorVariations"
                :key="color"
                :color="color"
            />
        </ThemeSurfaceComponent>
    </MainLayoutComponent>
</template>

<script setup lang="ts">
import MainLayoutComponent from '@/pages/MainLayoutComponent.vue';
import PageHeaderComponent from '@/components/PageHeaderComponent.vue';
import ThemeSurfaceComponent from '@/components/theme/ThemeSurfaceComponent.vue';
import ThemeCardComponent from '@/components/theme/ThemeCardComponent.vue';
const surfaces = [
    'dim-surface',
    'surface',
    'bright-surface',
    'inverse-surface',
];
const colorVariations = [
    'primary',
    'secondary',
    'tertiary',
    'warning',
    'accent',
];
</script>
