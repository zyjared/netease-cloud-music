<scrip lang="ts">

</scrip>

<script setup lang="ts">
import FullContainer from '@/components/common/FullContainer.vue';
import Banner from './components/Banner.vue';
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import { getBanners } from '@/api/discover'
import { useRoute, useRouter } from 'vue-router';


const banners = shallowRef<{
    pic: string;
    typeTitle: string;
    url: string;
    bannerId: string;
}[] | null>(null)

onMounted(async () => {
    banners.value = await getBanners();
})


// 头部导航
const router = useRouter();
const route = useRoute();

const children = router.getRoutes().find(route => route.path == '/discover')?.children;

// @ts-ignore
const headerList = children!.reduce((pre, cur) => {
    // @ts-ignore
    const { path, meta: { title } } = cur;
    return [...pre, { path, title }]
}, []) as { path: string; title: string; }[]

// 跟随条

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
    <FullContainer>
        <template #header>
            <ul class="relative flex items-center justify-around h-full xs:justify-evenly md:mx-20">
                <li v-for="item in headerList" :key="item.path" class="inline-block">
                    <router-link :to="item.path"
                        :style="{ color: route.path.includes(item.path) ? 'var(--self)' : 'inherit' }">
                        {{ item.title }}
                    </router-link>
                </li>
                <span class="h-[3px] rounded-full bg-[--self] block absolute -bottom-2 transition-[left,width] duration-300"
                    ref="barRef"></span>
            </ul>
        </template>
        <template #default>
            <!-- banner -->
            <Banner :banners="banners" v-if="banners" />

            <!-- 歌单推荐 -->
            <RouterView />

        </template>
    </FullContainer>
</template>

<style scoped></style>
