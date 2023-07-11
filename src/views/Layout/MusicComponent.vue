<script setup lang="ts">
import {
    IconBackward,
    IconPlay,
    IconForward,
    IconHeart,
    IconArrowDown,
    IconArrowsRightLeft,
    IconBars,
    IconPause
} from "@/components/icons/index.ts";
import { Close, DeleteFilled, FolderAdd, RefreshLeft } from '@element-plus/icons-vue'
import Progress from "./MusicInterface/Progress.vue";
import { useIsPlayingStore } from "@/stores/isPlaying";
import dayjs from "dayjs";

const emits = defineEmits(["imgEvent"]);
const handleImgEvent = () => {
    emits("imgEvent");
};

const isPlayingStore = useIsPlayingStore();
</script>

<template>
    <div class="border-t border-[--line] cursor-pointer  flex items-center sm:bottom-0 z-[51] fixed left-0 bottom-[--h-nav] bg-[--bg] w-full content-start justify-around gap-4 sm:gap-8 py-1 px-1 sm:px-0 h-[--h-component]"
        @click.stop="handleImgEvent">
        <!-- 封面 -->

        <div class="w-12 h-12 m-1 cursor-pointer sm:h-16 sm:w-16 sm:ml-6" :style="{
            background: isPlayingStore.song ? `url(${isPlayingStore.song.al.picUrl})` : 'url(static/images/bg.jpg)',
            backgroundSize: 'cover'
        }">
        </div>

        <!-- 上一曲 播放 下一曲 -->

        <div class="flex text-red-500 xs:gap-6 sm:gap-4">
            <IconBackward class="hidden w-6 cursor-pointer xs:inline-block" @click.stop="isPlayingStore.previousSong()" />
            <IconPlay class="w-6 cursor-pointer" v-show="!isPlayingStore.isPlaying"
                @click.stop="isPlayingStore.handleIsPlaying()" />
            <IconPause class="w-6 cursor-pointer" v-show="isPlayingStore.isPlaying"
                @click.stop="isPlayingStore.handleIsPlaying()" />
            <IconForward class="hidden w-6 cursor-pointer xs:inline-block" @click="isPlayingStore.nextSong()" />
        </div>

        <!-- 进度条 -->

        <div class="w-40 sm:flex-1 xs:w-48">
            <div class="flex justify-between -mb-2 text-sm" v-if="isPlayingStore.song">

                <!-- 歌曲信息 -->
                <span class="flex-1 truncate">
                    {{ isPlayingStore.song.name }} <i v-for="ar, index in isPlayingStore.song.ar" :key="ar.id"
                        class="text-[--secondary]">{{
                            (index == 0 ?
                                ' - ' : ' / ') + ar.name }}</i>
                </span>

                <span class="hidden ml-auto origin-bottom-right scale-90 sm:inline-block">
                    {{ dayjs(0).second(isPlayingStore.playedtime).format('mm:ss') }}
                    <i class="not-italic text-[--secondary]">/ {{
                        dayjs(0).millisecond(isPlayingStore.song.dt).format('mm:ss') }}</i></span>
            </div>
            <Progress :time-show="false" />
        </div>

        <!-- 收藏 下载 循环 列表 -->

        <div class="flex gap-8 mr-6 text-slate-500">
            <IconHeart class="w-6" />
            <el-tooltip placement="top" trigger="click">
                <template #content>
                    <p>请到官方 App 下载 \~.~/</p>
                </template>
                <template #default>
                    <IconArrowDown class="hidden w-6 cursor-pointer sm:inline-block" />
                </template>
            </el-tooltip>
            <IconArrowsRightLeft class="hidden w-6 sm:inline-block" />


            <el-tooltip placement="top" trigger="click">

                <!-- 窗口 -->

                <template #content>
                    <div class="pb-4">
                        <div class="flex gap-6 h-[1.75rem] leading-[1.75rem] my-4 mx-2">
                            <span class="flex-1">
                                <RefreshLeft
                                    class="inline-block w-[1.75rem] mr-1 p-1 hover:bg-[--text-opacity] align-bottom rounded-md cursor-pointer text-[--bg-secondary]" />
                                列表循环（{{
                                    isPlayingStore.songList.length }}）
                            </span>

                            <span>
                                <FolderAdd
                                    class="inline-block w-[1.75rem] mr-1 p-1 hover:bg-[--text-opacity] align-bottom rounded-md cursor-pointer text-[--bg-secondary]" />
                                收藏
                            </span>

                            <span>
                                <DeleteFilled @click.stop="isPlayingStore.clearSOngs()"
                                    class="inline-block w-[1.75rem] align-bottom cursor-pointer p-1 mr-1 hover:bg-[--text-opacity] rounded-md  text-[--bg-secondary]" />
                            </span>

                        </div>
                        <ul class="overflow-y-auto divide-white/20 max-h-80" style="overflow: overlay;"
                            v-if="isPlayingStore.songList.length > 0">
                            <li v-for="song, index in isPlayingStore.songList" :key="song.id"
                                class="flex gap-4 px-4 py-2 rounded-sm cursor-pointer hover:bg-[--secondary]"
                                :class="isPlayingStore.songActiveIndex == index ? 'text-red-500 ' : '[&_p_span]:text-[--bg-secondary]'"
                                @click.stop="isPlayingStore.selectSong(song.id)">
                                <p class="truncate w-[16rem] inlnine-block">{{ song.name }}
                                    <span class="">-{{ song.ar.reduce((pre: unknown[], cur) => [...pre,
                                    cur.name],
                                        []).join('/') }}</span>
                                </p>
                                <Close class="inline-block w-6 p-1 rounded-md hover:bg-[--secondary] text-[--bg-secondary]"
                                    @click.stop="isPlayingStore.removeSong(song.id)" />
                            </li>
                        </ul>
                        <p v-else class="text-center">暂无音乐</p>
                    </div>
                </template>
                <template #default>
                    <IconBars class="hidden w-6 cursor-pointer xs:inline-block" />
                </template>
            </el-tooltip>

        </div>
    </div>
</template>

<style scoped></style>
