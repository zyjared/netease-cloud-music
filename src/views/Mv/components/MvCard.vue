<script setup lang='ts'>
import { Headset } from '@element-plus/icons-vue';
import { formatCount } from '@/utils/formatCount'

type Mv = {
    artistId: number;
    artistName: string;
    artists: { id: number; name: string }[];
    cover: string; // 图片
    id: number;
    name: string;
    playCount: number;
    subed: false;
};

defineProps<Mv>()
</script>

<template>
    <div class='relative'>
        <img :src="cover" class="block object-cover w-full h-full m-0" alt="" loading="lazy">
        <span
            class="absolute top-0 right-0 p-1 text-xs text-white origin-top-right scale-90 bg-gradient-to-l from-black/50">
            <Headset class="inline-block w-4 mr-1 align-top" />{{ formatCount(playCount) }}
        </span>
        <p class="absolute left-0 w-full px-2 text-xs text-white truncate bottom-2">{{ name }}-{{ artistName }}</p>
    </div>
</template>