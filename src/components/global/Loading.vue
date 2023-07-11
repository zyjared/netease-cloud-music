<script setup lang='ts'>
import { useLoadingStore } from '@/stores/loading';
import { gsap } from 'gsap';
import { onMounted, shallowRef } from 'vue';
const loadingStore = useLoadingStore();

const loadRef = shallowRef<HTMLElement | null>(null)

onMounted(() => {
    const d = loadRef.value as HTMLElement;
    if (!d) return;
    const rect = d.getBoundingClientRect();
    d.style.width = d.parentElement?.offsetWidth + 'px';
    d.style.position = 'fixed';
    d.style.left = rect.x + 'px';
    d.style.top = rect.y + 'px';
    Element
})

const onLeave = (e: Element, done: () => void) => {
    gsap.to(e, {
        opacity: 0,
        duration: 0.2,
        onComplete: done
    })
}
</script>

<template>
    <Transition @leave="onLeave">
        <div class="absolute w-full h-full z-50 top-0 left-0 bg-[--bg] flex" v-if="loadingStore.isLoading" @wheel.prevent
            @scroll.prevent ref="loadRef">
            <!-- 本意是，loading 在 main 中固定 -->
            <!-- 在不更改此 class 下，请确保 relative 的位置是理想 -->
            <div class="w-16 m-auto" v-loading="loadingStore.isLoading" element-loading-text="请稍后..."></div>
        </div>
    </Transition>
</template>
