<template>
    <div>
        <h1 class="text-2xl font-bold underline">Theme Overview</h1>
        <div
            :class="
                normalizeClass([
                    'mt-4 px-8 py-4 rounded shadow',
                    `bg-${surface}`,
                    `text-on-${getInverseClass(surface)}surface `,
                ])
            "
            v-for="surface in surfaces"
            :key="surface"
        >
            <DividerComponent
                class="pb-4 pt-0"
                :text="getSurfaceTitle(surface)"
                :color="`on-${getInverseClass(surface)}surface`"
            />
            <div
                class="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                <div
                    v-for="color in colorVariations"
                    :key="color"
                    :class="`px-4 py-2 w-52 rounded-md shadow-md bg-${color} hover:bg-${color}-hover text-on-${color}`"
                >
                    <h1 class="font-bold text-lg underline">
                        {{ capitalizeFirstLetter(color) }}
                    </h1>
                    <div class="p-2">
                        <p>Text on {{ color }} element.</p>
                        <p v-if="color !== 'accent'" class="text-accent">
                            Some text with accent.
                        </p>
                    </div>
                    <div class="flex justify-end">
                        <button
                            :class="`btn bg-container-${color} hover:bg-container-${color}-hover text-on-container-${color}`"
                        >
                            on {{ color }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { normalizeClass } from 'vue';
import DividerComponent from '@/components/DividerComponent.vue';
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

const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const getInverseClass = (surface: string): string =>
    surface === 'inverse-surface' ? 'inverse-' : '';

const getSurfaceTitle = (surface: string): string =>
    surface
        .split('-')
        .map((str) => capitalizeFirstLetter(str))
        .join(' ');
</script>
