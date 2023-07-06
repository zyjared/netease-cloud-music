<script setup lang='ts'>
import { computed, onMounted, onUnmounted, ref } from 'vue';

const { banners } = defineProps<{
    banners: {
        pic: string;
        typeTitle: string;
        url: string;
        bannerId: string;
    }[];
}>();

const len = computed(() => banners.length);

const activeIndex = ref<number>(0);

let timer: number;
const handleActiveIndex = () => {
    clearInterval(timer);
    timer = setInterval(() => {
        activeIndex.value = (activeIndex.value + 1) % len.value;
    }, 3000);
}


const outContainerRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

const handleVisbility = () => {
    if (document.visibilityState == 'visible') {
        handleActiveIndex();
    } else {
        clearInterval(timer);
    }
}

onMounted(() => {
    handleActiveIndex();
    outContainerRef.value?.addEventListener('mouseenter', () => clearInterval(timer));
    outContainerRef.value?.addEventListener('mouseleave', handleActiveIndex);
    document.addEventListener("visibilitychange", handleVisbility);
});

onUnmounted(() => {
    clearInterval(timer);
    outContainerRef.value = null;
    document.removeEventListener('visibilitychange', handleVisbility);
});

</script>

<template>
    <section class="relative pb-4" ref="outContainerRef">
        <div class="relative w-full overflow-x-hidden h-fit" ref="containerRef">
            <img v-if="banners[0]" :src="banners[0].pic" class="block w-full opacity-0 sm:w-3/5" alt="">
            <div v-for="img, index in banners" :key="index" class="absolute w-full transition-all duration-300 sm:w-3/5 "
                :style="{
                    top: 0,
                    left: 30 * (~~(len / 2) - (index + activeIndex) % len) + 50 + '%',
                    transform: `translateX(-50%) scale(${(~~(len / 2) - (index + activeIndex) % len) != 0 ? 0.8 : 1})`,
                    zIndex: len - Math.abs(~~(len / 2) - (index + activeIndex) % len),
                }">
                <img :src="img.pic" class="block w-full" />
                <span
                    class="absolute bottom-[2px] -right-[2px] text-white bg-[--self] px-3 rounded-l-full origin-bottom-right scale-75">{{
                        img.typeTitle }}</span>
            </div>
        </div>
        <div class="absolute bottom-0 flex justify-center w-full gap-4">
            <span v-for="dot in  banners.length" :key="dot" @click="() => activeIndex = dot - 1"
                class="inline-block w-2 h-2 bg-[--text-opacity] rounded-full cursor-pointer" :style="{
                    background: activeIndex + 1 == dot ? 'var(--self)' : ''
                }"></span>
        </div>
    </section>
</template>
