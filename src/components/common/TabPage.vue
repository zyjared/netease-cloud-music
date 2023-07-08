<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { ref, onMounted, onUnmounted, watch } from 'vue';

defineProps<{
    list: { title: string; path: string }[]
}>()

const route = useRoute()
const barRef = ref<HTMLElement | null>(null);
const handleBar = () => {
    const children = barRef.value?.parentElement?.children;
    if (!children) return;
    for (let i = 0; i < children?.length - 1; i++) {
        const ele = children[i] as HTMLElement;
        const href = ele.firstElementChild!.getAttribute('href');
        if (!href || !route.path.includes(href)) continue;
        let left = ele.offsetLeft;
        let width = ele.offsetWidth;
        barRef.value!.style.left = left + 'px';
        barRef.value!.style.width = width + 'px';
    }
}

onMounted(() => {
    handleBar();
    window.addEventListener('resize', handleBar);
})

onUnmounted(() => {
    window.removeEventListener('resize', handleBar);
})

watch(() => route.path, () => {
    handleBar();
})

</script>

<template>
    <ul class="relative flex items-center justify-around h-full xs:justify-evenly md:mx-20">
        <li v-for="item in list" :key="item.path" class="inline-block">
            <router-link :to="item.path" :style="{ color: route.path.includes(item.path) ? 'var(--self)' : 'inherit' }">
                {{ item.title }}
            </router-link>
        </li>
        <span class="h-[3px] rounded-full bg-[--self] block absolute -bottom-2 transition-[left,width] duration-300"
            ref="barRef"></span>
    </ul>
</template>