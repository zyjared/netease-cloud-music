<script setup lang="ts">
import { IconChevronDown, IconShare } from "@/components/icons/index.ts";

import Cover from "./Cover.vue";
import Control from "./Control.vue";
import Lyric from "./Lyric.vue";
import { ref } from "vue";
import { useIsPlayingStore } from "@/stores/isPlaying";
import gsap from 'gsap'

const isPlayingStore = useIsPlayingStore()

const { show } = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(["handleShow"]);

const handleShow = () => {
    emits("handleShow");
};

//  小屏 时
const view = ref<0 | 1>(0);
const handleView = () => {
    view.value = view.value == 0 ? 1 : 0
}
const containerRef = ref<Element | null>(null);

// 大背景切换
const onEnter = (ele: Element) => {
    gsap.from(ele, {
        opacity: 0,
        duration: 0.5,
        delay: 0.3
    })
}

const onLeave = (ele: Element) => {
    gsap.to(ele, {
        opacity: 0,
        duration: 0.3,
    })
}
</script>

<template>
    <div class="fixed top-0 left-0 z-[99] w-full h-full text-white transition-transform duration-300"
        :class="show ? '' : 'translate-y-full'">

        <div class="absolute top-0 left-0 w-full h-full" :style="{
            background: `url(/static/images/bg.jpg)`
        }"></div>

        <transition @enter="onEnter" @leave="onLeave">
            <div class="absolute top-0 left-0 z-10 w-full h-full" :style="{
                background: `url(${isPlayingStore.song.al.picUrl})`
            }" :key="isPlayingStore.song.id" v-if="isPlayingStore.song"></div>
        </transition>

        <!-- 退出与分享 -->
        <section>
            <IconChevronDown class="absolute z-50 w-6 cursor-pointer top-5 left-6" @click="() => handleShow()" />
            <IconShare class="absolute z-50 w-6 cursor-pointer top-5 right-6" @click="() => handleShow()" />
        </section>

        <!-- 主视图 -->

        <div class="absolute top-0 left-0 z-40 pb-8 w-full h-full px-6 backdrop-blur-3xl bg-slate-700/10 grid sm:grid-cols-2 grid-rows-[1fr_auto] grid-flow-col"
            ref="containerRef">

            <!-- 左侧屏幕 -->

            <div class="asbolute sm:opacity-100 flex duration-300 transition-[opacity] pb-32 sm:pb-0"
                :class="view == 1 ? 'opacity-100 z-10 ' : 'opacity-0 z-0 w-full h-full'" @click="handleView">
                <Cover class="m-auto" />
            </div>

            <Control class="absolute z-20 w-full bottom-8 sm:static" />

            <!-- 右侧歌词 -->
            <Lyric class="absolute sm:static transition-[opacity] w-full sm:row-span-2 duration-300 sm:opacity-100 pb-40 sm:pb-0"
                :class="view == 1 ? 'opacity-0 z-0 w-full h-full' : 'opacity-100 z-10'" @click="handleView" />

        </div>
    </div>
</template>

<style scoped></style>
