<script setup lang='ts'>
import { useIsPlayingStore } from '@/stores/isPlaying';
import { CaretRight } from '@element-plus/icons-vue';
import SongMore from './SongMore.vue';

defineProps<{
    order: number;

    track: {
        id: number;
        name: string;
        ar: { // 歌手
            id: number;
            name: string;
        }[];
        mv: number; // 0 则没有
        al: { // 专辑
            id: number;
            name: string;
            picUrl: string;
        };
        sq: {
            br: number;
            size: number;
        } | null;
    }
}>()


// 点击即添加歌曲到正在播放
const isPlayingStore = useIsPlayingStore();

</script>

<template>
    <div class="flex items-center gap-2 p-2 pl-1 text-[--secondary] hover:bg-[--text-opacity]">

        <!-- 序号 -->

        <div class="w-[3rem] text-center">
            {{ order }}
        </div>

        <!-- 歌曲信息 -->

        <div class="flex-1 overflow-hidden cursor-pointer" @click="isPlayingStore.pushSong(track.id)">
            <div class="text-[--text] truncate">
                {{ track.name }}
            </div>
            <div class="truncate origin-left scale-75 -translate-x-1">
                <span class="text-red-500 scale-[60%] border-2 border-[--self] px-1 inline-block rounded-md font-bold">
                    SQ
                </span>
                <span v-for="ar, index in track.ar" :key="ar.id">
                    <template v-if="index < 2">
                        {{ index == 0 ? '' : '/' }}{{ ar.name }}
                    </template>
                </span>
                <span v-if="track.ar.length > 2">...</span>
                <span class="px-1">-</span>
                <span>{{ track.al.name }}</span>
            </div>
        </div>

        <!-- 操作 -->

        <div class="flex items-center gap-4">
            <div v-if="track.mv != 0" class=" inline-block  border dark:border-[--secondary] rounded-md px-[.1rem]">
                <CaretRight class="w-4" />
            </div>

            <SongMore :track-id="track.id" />

        </div>


    </div>
</template>