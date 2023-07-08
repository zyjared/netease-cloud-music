
<script setup lang="ts">
import FullContainer from '@/components/common/FullContainer.vue';
import TabPage from '@/components/common/TabPage.vue';

import { useRouter } from 'vue-router';


// 头部导航
const router = useRouter();
const children = router.getRoutes().find(route => route.path == '/discover')?.children;

// @ts-ignore
const headerList = children!.reduce((pre, cur) => {
    // @ts-ignore
    const { path, meta: { title } } = cur;
    return [...pre, { path, title }]
}, []) as { path: string; title: string; }[]

</script>

<template>
    <FullContainer>
        <template #header>
            <TabPage :list="headerList" />
            <!-- <ul class="relative flex items-center justify-around h-full xs:justify-evenly md:mx-20">
                        <li v-for="item in headerList" :key="item.path" class="inline-block">
                            <router-link :to="item.path"
                                :style="{ color: route.path.includes(item.path) ? 'var(--self)' : 'inherit' }">
                                {{ item.title }}
                            </router-link>
                        </li>
                        <span class="h-[3px] rounded-full bg-[--self] block absolute -bottom-2 transition-[left,width] duration-300"
                            ref="barRef"></span>
                    </ul> -->
        </template>
        <template #default>

            <RouterView />
            <Loading />
        </template>
    </FullContainer>
</template>

<style scoped></style>
