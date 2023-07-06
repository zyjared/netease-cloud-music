<script setup lang="ts">
import { ArrowLeft } from "@element-plus/icons-vue";
import { useSubView } from "@/stores/subView";

const { title } = defineProps<{
    title?: string;
}>();
const subViewStore = useSubView();
</script>

<template>
    <div class="flex flex-col h-full">
        <h2 class="sticky top-0 left-0 py-3 text-center bg-[--bg] z-50">
            <span @click="subViewStore.backView()" class="absolute -translate-y-1/2 cursor-pointer left-2 top-1/2">
                <ArrowLeft class="w-6" />
            </span>
            <slot name="header">{{ title }}</slot>
        </h2>
        <div class="flex-1 overflow-y-auto" style="overflow: overlay;">
            <slot name="default"></slot>
        </div>
    </div>
</template>
