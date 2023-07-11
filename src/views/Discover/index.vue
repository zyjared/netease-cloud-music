
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
        </template>
        <template #default>

            <RouterView />
            <Loading />
        </template>
    </FullContainer>
</template>

<style scoped></style>
