<script setup lang="ts">
import { IconDvdPointer, IconDvd } from "@/components/icons/index.ts";
import { useIsPlayingStore } from "@/stores/isPlaying";
import { onMounted, onUnmounted, ref } from "vue";
const isPlayingStore = useIsPlayingStore();

const rotate = ref<number>(0);
let timer: number;
const openRotate = () => {
    clearInterval(timer);
    timer = setInterval(() => rotate.value += 6, 500);
}
const closeRotate = () => {
    clearInterval(timer);
}

// 可见性
const handleVisbility = () => {
    if (document.visibilityState == 'visible' && isPlayingStore.isPlaying) {
        openRotate();
    } else {
        closeRotate();
    }
}

onMounted(() => {
    isPlayingStore.audio.addEventListener('play', openRotate);
    isPlayingStore.audio.addEventListener('pause', closeRotate);
    isPlayingStore.audio.addEventListener('emptied', closeRotate);
    document.addEventListener("visibilitychange", handleVisbility);
})

onUnmounted(() => {
    clearInterval(timer);
    isPlayingStore.audio.removeEventListener('play', openRotate);
    isPlayingStore.audio.removeEventListener('pause', closeRotate);
    isPlayingStore.audio.removeEventListener('emptied', closeRotate);
    document.removeEventListener("visibilitychange", handleVisbility);
})
</script>

<template>
    <div class="box-content relative pt-6 mx-auto scale-90 sm:scale-100 w-fit">
        <div class="absolute top-0 left-0 z-10 w-8 h-8 transition-transform duration-500" :class="
            isPlayingStore.isPlaying ? 'rotate-[-34.5deg]' : 'rotate-[-10deg]'
        ">
            <IconDvdPointer
                class="block w-48 absolute top-1/2 left-1/2 origin-left translate-x-[1rem] -translate-y-[1rem] -scale-x-100" />
        </div>
        <div class="relative w-fit" :style="{
            transition: 'all .5s linear',
            transform: `rotateZ(${rotate}deg)`,
        }">

            <!-- 背景 dvd -->
            <IconDvd class="inline-block rounded-full w-80 bg-white/20" />

            <!-- 图片层 -->

            <div class="absolute w-full h-full scale-75 -translate-x-1/2 -translate-y-1/2 border-4 border-gray-900 rounded-full top-1/2 left-1/2"
                :style="{
                    background: `url(${isPlayingStore.song ? isPlayingStore.song.al.picUrl : '/netease-cloud-music.svg'}) center`,
                    backgroundSize: 'cover'
                }" />
        </div>
    </div>
</template>

<style scoped></style>
