<template>
    <dialog
        class="bg-slate-200 rounded border-2 border-slate-900 shadow-lg"
        ref="dialogRef"
    >
        <div class="flex justify-end px-3 pt-2">
            <FontAwesomeIcon
                class="cursor-pointer"
                :icon="faXmark"
                @click="dialogRef?.close()"
            />
        </div>
        <div class="flex flex-col px-8 py-4 gap-4 min-w-72">
            <slot></slot>
        </div>
    </dialog>
</template>

<script setup>
// -- Imports
import { ref } from 'vue';
// -- Fonts
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const dialogRef = ref(null);
defineExpose({ dialogRef });
</script>
