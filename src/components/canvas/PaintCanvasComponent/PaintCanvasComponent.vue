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
        <UploadCanvasDialog :canvasData="canvasData" ref="uploadDialog" />
        <DownloadCanvasDialog :canvas_uuid="canvas_uuid" ref="downloadDialog" />
        <DividerComponent />
        <div
            class="flex justify-around gap-4 px-4 py-1 bg-slate-50 dark:bg-slate-900"
        >
            <FontAwesomeIcon
                class="w-32 py-2 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700"
                :icon="faSquare"
                @click="canvasType = 'rectangles'"
            />
            <FontAwesomeIcon
                class="w-32 py-2 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700"
                :icon="faCircle"
                @click="canvasType = 'circles'"
            />
        </div>
        <DividerComponent />
        <PaintCanvasRectangles
            v-if="canvasType === 'rectangles'"
            :canvas_uuid="canvas_uuid"
            :width="dimensions.width"
            :height="dimensions.height"
            @updateCanvasData="canvasData = $event"
        />
        <PaintCanvasCircles
            v-if="canvasType === 'circles'"
            :canvas_uuid="canvas_uuid"
            :width="dimensions.width"
            :height="dimensions.height"
            @updateCanvasData="canvasData = $event"
        />
    </div>
</template>

<script setup>
// -- Imports
import { ref } from 'vue';
import { uuid } from 'vue-uuid';
// -- Fonts
import { faDownload, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCircle } from '@fortawesome/free-regular-svg-icons';
// -- Components
import DividerComponent from '@/components/DividerComponent.vue';
import PaintCanvasRectangles from './rectangles/PaintCanvasRectangles.vue';
import PaintCanvasCircles from './circles/PaintCanvasCircles.vue';
import DownloadCanvasDialog from './DownloadCanvasDialog.vue';
import UploadCanvasDialog from './UploadCanvasDialog.vue';

const canvas_uuid = uuid.v4();

const canvasType = ref('rectangles');

const uploadDialog = ref(null);
const downloadDialog = ref(null);

const dimensions = ref({ width: 1080, height: 1080 }); // keep same aspect ratio as in css
const canvasData = ref({});

const showUploadDialog = () => {
    uploadDialog.value?.uploadDialog?.dialogRef?.showModal();
};

const showDownloadDialog = () => {
    downloadDialog.value?.downloadDialog?.dialogRef?.showModal();
};
</script>
