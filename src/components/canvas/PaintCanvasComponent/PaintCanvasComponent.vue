<template>
    <div class="flex flex-col m-2">
        <div class="flex justify-between items-center py-4">
            <h1 class="font-bold text-xl">Paint Canvas</h1>
            <div class="flex justify-between gap-1">
                <button class="btn-gray w-10">
                    <FontAwesomeIcon
                        :icon="faArrowUp"
                        @click="showUploadDialog"
                    />
                </button>
                <button class="btn-gray w-10">
                    <FontAwesomeIcon
                        :icon="faDownload"
                        @click="showDownloadDialog"
                    />
                </button>
            </div>
        </div>
        <UploadCanvasDialog
            :rectanglesData="rectanglesData"
            ref="uploadDialog"
        />
        <DownloadCanvasDialog :canvas_uuid="canvas_uuid" ref="downloadDialog" />
        <DividerComponent />
        <div class="flex justify-center py-4">
            <CanvasRectanglesComponent
                :id="canvas_uuid"
                :width="dimensions.width"
                :height="dimensions.height"
                :rectanglesData="rectanglesData"
                ref="canvas"
            />
        </div>
        <DividerComponent text="Settings" />
        <PaintCanvasRectanglesSettings
            :divisions="divisions"
            v-model:squareProbability.number="squareProbability"
            v-model:smallSquareProbability.number="smallSquareProbability"
            @updateDivisions="updateDivisions"
            @generateRectangles="generateRectangles"
        />
    </div>
</template>

<script setup>
// -- Imports
import { uuid } from 'vue-uuid';
import { ref, onBeforeMount } from 'vue';
// -- Fonts
import { faDownload, faArrowUp } from '@fortawesome/free-solid-svg-icons';
// -- Components
import PaintCanvasRectanglesSettings from './PaintCanvasRectanglesSettings.vue';
import DividerComponent from '@/components/DividerComponent.vue';
import CanvasRectanglesComponent from '@/components/canvas/CanvasRectanglesComponent.vue';
import DownloadCanvasDialog from './DownloadCanvasDialog.vue';
import UploadCanvasDialog from './UploadCanvasDialog.vue';

const canvas_uuid = uuid.v4();

const uploadDialog = ref(null);
const downloadDialog = ref(null);

const dimensions = ref({ width: 1080, height: 1080 }); // keep same aspect ratio as in css
const divisions = ref(5);
const squareProbability = ref(1.0);
const smallSquareProbability = ref(0.5);
const rectanglesData = ref({
    rectangles: [], // list of rectInfo { x, y, is_in }
    gap: 0.05,
    in_gap: 0.1,
    divisions: 5,
});

onBeforeMount(() => {
    generateRectangles();
});

const generateRectangles = () => {
    rectanglesData.value.rectangles = [];
    rectanglesData.value.gap = 0.05;
    rectanglesData.value.in_gap = 0.1;
    rectanglesData.value.divisions = divisions.value;

    for (let i = 0; i < divisions.value; i++) {
        for (let j = 0; j < divisions.value; j++) {
            if (Math.random() > 1 - squareProbability.value) {
                rectanglesData.value.rectangles.push({
                    x: i,
                    y: j,
                });

                if (Math.random() > 1 - smallSquareProbability.value) {
                    rectanglesData.value.rectangles.push({
                        x: i,
                        y: j,
                        is_in: true,
                    });
                }
            }
        }
    }
};

const updateDivisions = (value) => {
    divisions.value = value;
    generateRectangles();
};

const showUploadDialog = () => {
    uploadDialog.value?.uploadDialog?.dialogRef?.showModal();
};

const showDownloadDialog = () => {
    downloadDialog.value?.downloadDialog?.dialogRef?.showModal();
};
</script>
