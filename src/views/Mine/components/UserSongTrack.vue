<script setup lang='ts'>
import { useSubView } from '@/stores/subView';
import { ToPlaylist } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
    id: number;
    name: string;
    trackCount: number;
    coverImgUrl: string;
    creator: {
        nickname: string
        userId: number;
    }
}>()

const subView = useSubView();
const toPlaylist = computed<ToPlaylist>(() => {
    return {
        toview: 'playlist',
        params: {
            id: props.id
        }
    }
})


</script>

<template>
    <div class="flex items-center h-12 gap-2 text-left cursor-pointer sm:h-16" @click="subView.toView(toPlaylist)">
        <img class="w-12 h-12 sm:h-16 sm:w-16" :src="props.coverImgUrl" />
        <div class="flex-1">
            <p>{{ props.name }}</p>
            <p class="text-xs text-[--secondary]">
                <span>{{ props.trackCount }}首&ensp;</span><span>by&ensp;{{ props.creator.nickname }}</span>
            </p>
        </div>
    </div>
</template>