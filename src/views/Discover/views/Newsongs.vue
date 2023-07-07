<script setup lang='ts'>
import { getNewsongs } from '@/api/discover';
import { onMounted, shallowRef } from 'vue';
import { VideoPlay } from '@element-plus/icons-vue';
import Songbar from '../components/Songbar.vue';

const newongs = shallowRef<{
    id: number;
    name: string;
    artists: {
        name: string;
        id: number;
    }[];
    no: number;
    album: {
        picUrl: string;
        name: string; // 专辑名
    };
    mvid: number;
}[]>([]);


onMounted(async () => {
    newongs.value = await getNewsongs();
})
</script>

<template>
    <div>
        <div class="bg-[--line] border-gray-600/10 border p-4 cursor-pointer hover:bg-[--text-opacity]">
            <VideoPlay class="inline-block w-6 mr-4" />播放全部
        </div>
        <div class="grid grid-cols-2">
            <Songbar v-for="song, index in newongs" :key="song.id" v-bind="song" :order="index + 1"
                :class="index >> 1 & 1 ? 'bg-[--line]' : ''" />
        </div>
    </div>
</template>