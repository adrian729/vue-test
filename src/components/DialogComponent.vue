<template>
    <dialog
        class="bg-dim-surface text-on-surface rounded border-2 border-accent shadow shadow-accent"
        ref="dialogRef"
    >
        <div class="flex justify-end px-3 pt-2">
            <FontAwesomeIcon
                class="cursor-pointer"
                :icon="faXmark"
                @click="close()"
            />
        </div>
        <div class="flex flex-col px-8 py-4 gap-4 min-w-72">
            <slot></slot>
        </div>
    </dialog>
</template>

<script setup lang="ts">
// -- Imports
import { ref } from 'vue';
// -- Fonts
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const dialogRef = ref<HTMLDialogElement | null>(null);

const open = () => dialogRef.value?.showModal();
const close = () => dialogRef.value?.close();

defineExpose({ open, close });

// TODO: Add header, main, footer slots (header for title, main for content, footer for actions/buttons) and add generic default styles
</script>
