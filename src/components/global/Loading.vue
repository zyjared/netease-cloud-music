<script setup lang='ts'>
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
</script>

<template>
    <div class="absolute w-full h-full z-50 top-0 left-0 bg-[--bg] flex" v-show="loadingStore.isLoading">
        <!-- 本意是，loading 在 main 中固定 -->
        <!-- 在不更改此 class 下，请确保 relative 的位置是理想 -->
        <div class="w-16 m-auto" v-loading="loadingStore.isLoading" element-loading-text="请稍后..."></div>
    </div>
</template>
