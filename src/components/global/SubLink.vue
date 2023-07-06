<script setup lang="ts">
import { useSubView } from "@/stores/subView";
import { ToView, ToViewName } from "@/types";
defineProps<{
    to: ToView<ToViewName>;
}>();

const subViewStore = useSubView();
</script>

<template>
    <div class="cursor-pointer" @click="subViewStore.toView(to)">
        <slot></slot>
    </div>
</template>
