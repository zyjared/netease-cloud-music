<script setup lang="ts">
import {
    IconHeart,
    IconArrowDown,
    IconMessage,
    IconSpeakerWave,
    IconEllipsisVertical,
    IconArrowsRightLeft,
    IconBackward,
    IconForward,
    IconBars,
    IconPlayCircle,
    IconPauseCircle,
} from "@/components/icons/index.ts";
import { Close, FolderAdd, DeleteFilled, RefreshLeft } from '@element-plus/icons-vue';
import { useIsPlayingStore } from "@/stores/isPlaying";
import Progress from "./Progress.vue";
import { computed } from "vue";

const isPlayingStore = useIsPlayingStore();

const handlePreviousSong = () => {
    isPlayingStore.previousSong();
};

const handleNextSong = () => {
    isPlayingStore.nextSong();
};

const handleIsPlaying = () => {
    isPlayingStore.handleIsPlaying();
};

// const speakerWave = ref<number>(0)
const speakerWave = computed({
    get() {
        return isPlayingStore.speakerWave;
    },
    set(val) {
        isPlayingStore.audio.volume = val;
    }
})
</script>

<template>
    <div class="px-8 space-y-4" id="music-control">
        <!-- 用户操作 -->
        <div class="flex justify-between">

            <!-- 喜欢 -->

            <IconHeart class="w-6" />

            <!-- 下载 -->

            <el-tooltip placement="top" trigger="click">
                <template #content>
                    <p>请到官方 App 下载 \~.~/</p>
                </template>
                <template #default>
                    <IconArrowDown class="w-6 cursor-pointer" @click.stop />
                </template>
            </el-tooltip>

            <!-- 评论 -->

            <IconMessage class="w-6" />

            <!-- 音量 -->

            <el-tooltip placement="top" trigger="click">
                <template #content>
                    <div class="pt-4">
                        <el-slider v-model="speakerWave" input-size="small" :show-tooltip="false" vertical height="12rem"
                            :min="0" :max="1" :step="0.1" class="cursor-pointer"
                            style="--el-slider-button-size:1rem;--el-slider-height:.4rem;" :style="{
                                '--el-slider-runway-bg-color': 'rgba(255,255,255,.3)'
                            }" />
                    </div>
                </template>
                <template #default>
                    <IconSpeakerWave class="w-6 cursor-pointer" @click.stop />
                </template>
            </el-tooltip>

            <!-- 更多 -->

            <el-tooltip placement="top" trigger="click">
                <template #content>
                    <div>
                        暂无
                    </div>
                </template>
                <template #default>
                    <IconEllipsisVertical class="w-6 cursor-pointer" @click.stop />
                </template>
            </el-tooltip>
        </div>

        <!-- 播放时长 -->
        <Progress :dark="true" />

        <!-- 音乐控制 -->

        <div class="flex items-center justify-between">

            <!-- 循环 / 播放方式 -->

            <IconArrowsRightLeft class="w-6 cursor-pointer" />

            <!-- 上一曲 -->

            <IconBackward class="w-6 cursor-pointer" @click.stop="handlePreviousSong" />

            <!-- 播放 / 暂停 -->

            <span class="inline-block w-12 cursor-pointer">
                <IconPlayCircle v-show="!isPlayingStore.isPlaying" @click.stop="handleIsPlaying" />
                <IconPauseCircle v-show="isPlayingStore.isPlaying" @click.stop="handleIsPlaying" />
            </span>

            <!-- 下一曲 -->

            <IconForward class="w-6 cursor-pointer" @click.stop="handleNextSong" />

            <!-- 播放列表 -->

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
                    <IconBars class="w-6 cursor-pointer" @click.stop />
                </template>
            </el-tooltip>

        </div>
    </div>
</template>

<style scoped></style>
