<script setup lang='ts'>
import SongMore from '@/components/common/SongMore.vue';
import { useIsPlayingStore } from '@/stores/isPlaying';
import { CaretRight } from '@element-plus/icons-vue'

// 该文件同 components/SongTrack
// 但是接口参数不一样，不再修改数据结构

defineProps<{
    id: number;
    name: string;
    artists: {
        name: string;
        id: number;
    }[];
    no: number;
    order: number;
    album: {
        picUrl: string;
        name: string; // 专辑名
    };
    mvid: number;
}>()

// 点击即添加歌曲到正在播放
const isPlayingStore = useIsPlayingStore();

</script>

<template>
    <div class="flex items-center gap-2 p-2 pl-1 text-[--secondary] border-gray-600/10 border" ref="trackRef">

        <!-- 序号 -->

        <div class="w-[3rem] text-center">
            {{ order }}
        </div>

        <!-- 歌曲信息 -->

        <div class="flex-1 overflow-hidden cursor-pointer" @click="isPlayingStore.pushSong(id)">
            <div class="text-[--text] truncate">
                {{ name }}
            </div>
            <div class="truncate origin-left scale-75 -translate-x-1">
                <span class="text-red-500 scale-[60%] border-2 border-[--self] px-1 inline-block rounded-md font-bold">
                    SQ
                </span>
                <span v-for="ar, index in artists" :key="ar.id">
                    <template v-if="index < 2">
                        {{ index == 0 ? '' : '/' }}{{ ar.name }}
                    </template>
                </span>
                <span v-if="artists.length > 2">...</span>
                <span class="px-1">-</span>
                <span>{{ album.name }}</span>
            </div>
        </div>

        <!-- 操作 -->

        <div class="flex items-center gap-4">
            <div v-if="mvid" class=" inline-block  border dark:border-[--secondary] rounded-md px-[.1rem]">
                <CaretRight class="w-4" />
            </div>


            <SongMore :track-id="id" />

        </div>


    </div>
</template>