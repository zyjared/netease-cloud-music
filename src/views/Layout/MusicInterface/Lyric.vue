<script setup lang="ts">
import { useIsPlayingStore } from '@/stores/isPlaying';
import { ArrowRight } from '@element-plus/icons-vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const isPlayingStore = useIsPlayingStore();

type Lyric = {
    time: number;
    content: string;
}
const lyrics = computed<Lyric[]>(() => {
    if (!isPlayingStore.song) return [];
    return isPlayingStore.song.lyric.split('\n').reduce((pre: Lyric[], lyric: string) => {
        let r = lyric.match(/(\d{2}:\d{2}\.\d{0,3})\](.*)/);
        if (!r) return pre;
        let time = (parseInt(r[1].slice(0, 2)) * 60000 + parseInt(r[1].slice(3, 5)) * 1000 + parseInt(r[1].slice(6))) / 1000
        let content = r[2].trim();
        return [...pre, { time, content }]
    }, [])
})

const activeIndex = ref<number>(0);

const handleActiveIndex = () => {

    if (lyrics.value.length == 0) return;

    let len = lyrics.value.length - 1;
    let index = activeIndex.value;

    while (activeIndex.value < len && lyrics.value[activeIndex.value + 1].time <= isPlayingStore.playedtime) {
        activeIndex.value++
    }

    if (index != activeIndex.value) return;

    while (0 < activeIndex.value && lyrics.value[activeIndex.value - 1].time >= isPlayingStore.playedtime) {
        activeIndex.value--;
    }

}

const lyricRef = ref<Element | null>(null)
watch(activeIndex, (index) => {
    lyricRef.value?.children[index].scrollIntoView({ behavior: "smooth", block: "center" })
})
onMounted(() => {
    if (lyrics.value.length == 0) return;
    isPlayingStore.audio.addEventListener('timeupdate', handleActiveIndex);
})
onUnmounted(() => {
    isPlayingStore.audio.removeEventListener('timeupdate', handleActiveIndex)
})

// 点击跳转到相应的时间
const handlePlayedTime = (index: number) => {
    isPlayingStore.audio.currentTime = lyrics.value[index].time;
    activeIndex.value = index;
}

</script>

<template>
    <section class="flex flex-col items-center h-full pt-16 text-center text-gray-300" v-if="isPlayingStore.song">
        <span class="hidden  text-[1.2rem]"></span>

        <!-- 歌曲名 -->

        <h2 class="h-8 text-lg font-bold text-[1.2rem] leading-8 text-white" v-if="isPlayingStore.song">{{
            isPlayingStore.song.name }}</h2>

        <!-- 歌手 -->

        <div>
            <span v-for="ar, index in isPlayingStore.song.ar" :key="ar.id"><i v-if="index != 0">/</i>{{ ar.name
            }}</span>
            <i>
                <ArrowRight class="inline-block w-4" />
            </i>
        </div>

        <!-- 歌词 -->


        <div class="flex-1 h-full overflow-y-auto">
            <div class="  h-[calc(100%-4rem)]  mt-6 overflow-y-auto [&::-webkit-scrollbar]:w-0 " ref="lyricRef"
                v-show="lyrics.length > 0">
                <p v-for="lyric, index in lyrics" :key="isPlayingStore.song.id + '-' + index"
                    class="mx-auto transition-all duration-300 cursor-pointer w-fit leading-[2.5rem] height-[2.5rem]"
                    :class="activeIndex !== index ? '' : 'text-white text-[1.2rem] font-bold'"
                    @click.stop="() => handlePlayedTime(index)">{{
                        lyric.content
                    }}</p>


            </div>

            <p class="pt-40 font-bold" v-show="lyrics.length == 0">
                还没有歌词
            </p>
        </div>

    </section>
</template>
