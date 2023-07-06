<script setup lang='ts'>
import { useIsPlayingStore } from '@/stores/isPlaying';
import * as dayjs from 'dayjs';
import { computed } from 'vue';

defineProps({
    dark: {
        type: Boolean,
        default: false
    },
    timeShow: {
        type: Boolean,
        default: true
    }
})

const isPlayingStore = useIsPlayingStore();

const played = computed({
    get() {
        return isPlayingStore.playedtime;
    },
    set(val) { isPlayingStore.audio.currentTime = val; }
})

</script>

<template>
    <div class="flex items-center justify-between gap-3" v-if="isPlayingStore.song">
        <span class="text-xs" v-if="timeShow"> {{ dayjs(0).second(isPlayingStore.playedtime).format('mm:ss') }}</span>
        <el-slider v-model="played" input-size="small" :show-tooltip="false" :min="0" :max="isPlayingStore.song.dt / 1000"
            style="--el-slider-button-size:.8rem;--el-slider-height:.3rem;--el-color-white:red; " :style="{
                '--el-slider-runway-bg-color': dark ? 'rgba(255,255,255,.3)' : 'rgba(200,200,200,.3)'
            }" />
        <span class="text-xs" v-if="timeShow">{{ dayjs(0).millisecond(isPlayingStore.song.dt).format('mm:ss') }}</span>
    </div>
</template>