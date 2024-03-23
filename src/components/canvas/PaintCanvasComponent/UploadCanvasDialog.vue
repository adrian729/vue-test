<template>
    <DialogComponent ref="uploadDialog">
        <p>Upload canvas?</p>
        <div class="flex flex-1 justify-between">
            <button class="btn-gray w-28" @click="uploadCanvas">
                continue
            </button>
            <button
                autofocus
                class="btn-red w-28"
                @click="uploadDialog?.dialogRef?.close()"
            >
                cancel
            </button>
        </div>
    </DialogComponent>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import DialogComponent from '@/components/DialogComponent.vue';

const jsonServerUrl = import.meta.env.VITE_JSON_SERVER_URL;

const props = defineProps({
    rectanglesData: {
        type: Object,
        default: () => ({}),
        required: true,
    },
});

const uploadDialog = ref(null);

defineExpose({ uploadDialog });

const uploadCanvas = () => {
    const rectangle = {
        canvasData: props.rectanglesData,
        type: 'rectangles',
    };
    axios
        .post(`${jsonServerUrl}/rectangles`, rectangle)
        .then((response) => {
            console.log('uploadCanvas', response.data);
        })
        .catch((error) => console.error(error));
    uploadDialog.value?.dialogRef?.close();
};
</script>
