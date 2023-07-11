<script setup lang='ts'>
import { ToPlaylist } from '@/types';
import { Headset } from '@element-plus/icons-vue'
import { computed } from 'vue';
import { formatCount } from '@/utils/formatCount'

const { data } = defineProps<{
    data: {
        id: number;
        name: string;
        picUrl: string;
        playCount: number;
        trackCount: number;
    }
}>()

const toPlaylist = computed<ToPlaylist>(() => {
    return {
        toview: 'playlist',
        params: {
            id: data.id
        }
    }
})

</script>

<template>
    <SubLink class="relative inline-block" :to="toPlaylist">
        <el-image class=" border-white/10" style="display: block;" :src="data.picUrl" fit="fill" lazy>
            <template #placeholder><img src="/netease.png" class="block p-6" /></template>
            <template #error><img src="/netease.png" class="block p-6 " /></template>
        </el-image>
        <span
            class="absolute top-0 right-0 p-1 text-xs text-white origin-top-right scale-90 bg-gradient-to-l from-black/50">
            <Headset class="inline-block w-4 mr-1 align-top" />{{ formatCount(data.playCount) }}
        </span>
        <p class="w-full pt-[.35rem] text-xs leading-[1.25rem] h-[2.85rem]" :style="{
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': 2,
            overflow: 'hidden'
        }">{{ data.name }}</p>
    </SubLink>
</template>