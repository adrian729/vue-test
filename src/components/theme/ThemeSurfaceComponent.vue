<template>
    <div :class="containerClass">
        <DividerComponent
            class="pb-4 pt-0"
            :text="getSurfaceTitle(props.surface)"
            :color="`on-${getInverseClass(props.surface)}surface`"
        />
        <div class="flex justify-center">
            <div :class="innerContainerClass">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { normalizeClass } from 'vue';
import DividerComponent from '@/components/DividerComponent.vue';

interface Props {
    surface: string;
}
const props = defineProps<Props>();

const getInverseClass = (surface: string): string =>
    surface === 'inverse-surface' ? 'inverse-' : '';

const getSurfaceTitle = (surface: string): string =>
    surface
        .split('-')
        .map((str) => capitalizeFirstLetter(str))
        .join(' ');

const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const containerClass = normalizeClass([
    'mt-4 p-8 rounded shadow',
    `bg-${props.surface}`,
    `text-on-${getInverseClass(props.surface)}surface `,
]);

const innerContainerClass = normalizeClass([
    'grid grid-cols-1 items-start gap-4',
    'sm:grid-cols-2',
    'md:grid-cols-3',
    'xl:grid-cols-4',
]);
</script>
