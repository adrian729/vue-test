<template>
    <div class="flex flex-col px-10 gap-2">
        <div>
            <label
                for="square-probability-range"
                class="block mb-2 text-sm font-medium"
            >
                Squares Probability: {{ squareProbability }}
            </label>
            <div class="flex items-center gap-2">
                <span>0</span>
                <input
                    id="square-probability-range"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    :class="rangeInputClass"
                    v-model="squareProbability"
                    @change="generateRectangles"
                />
                <span>1</span>
            </div>
        </div>
        <div>
            <label
                for="small-square-probability-range"
                class="block mb-2 text-sm font-medium"
            >
                Small Squares Probability: {{ smallSquareProbability }}
            </label>
            <div class="flex items-center gap-2">
                <span>0</span>
                <input
                    id="small-square-probability-range"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    :class="rangeInputClass"
                    v-model="smallSquareProbability"
                    @change="generateRectangles"
                />
                <span>1</span>
            </div>
        </div>
        <div>
            <div class="mb-2 text-sm font-medium">
                <span>Divisions: {{ props.divisions }}</span>
            </div>
            <div class="flex justify-center items-center gap-2">
                <FontAwesomeIcon
                    :icon="faMinus"
                    class="btn"
                    @click="updateDivisions(props.divisions - 1)"
                />
                <button class="btn" @click="generateRectangles">
                    New Canvas
                </button>
                <FontAwesomeIcon
                    :icon="faPlus"
                    class="btn"
                    @click="updateDivisions(props.divisions + 1)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { normalizeClass } from 'vue';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { clamp } from '@/utils/mathUtils';

interface Props {
    divisions: number;
}
const props = defineProps<Props>();

const squareProbability = defineModel('squareProbability', {
    type: Number,
    required: true,
});
const smallSquareProbability = defineModel('smallSquareProbability', {
    type: Number,
    required: true,
});

const emit = defineEmits({
    updateDivisions: (value: number) => clamp(value, 1, 30),
    generateRectangles: null,
});

const updateDivisions = (value: number) => {
    emit('updateDivisions', clamp(value, 1, 30));
};

const generateRectangles = () => {
    emit('generateRectangles');
};

const rangeInputClass = normalizeClass([
    'w-full h-2 bg-secondary appearance-none cursor-pointer',
    'disabled:opacity-50 disabled:pointer-events-none focus:outline-none',
    '[&::-webkit-slider-thumb]:w-3.5',
    '[&::-webkit-slider-thumb]:h-3.5',
    '[&::-webkit-slider-thumb]:appearance-none',
    '[&::-webkit-slider-thumb]:bg-primary',
    '[&::-webkit-slider-thumb]:shadow-[0_0_0_0.175rem]',
    '[&::-webkit-slider-thumb]:dark:shadow-[0_0_0_0.175rem]',
    '[&::-webkit-slider-thumb]:transition-all',
    '[&::-webkit-slider-thumb]:duration-150',
    '[&::-webkit-slider-thumb]:ease-in-out',
    '[&::-webkit-slider-thumb]:dark:bg-slate-700',
]);
</script>
