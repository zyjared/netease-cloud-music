<script setup lang="ts">
import {
    IconNeteaseCloudMusic,
    IconVideoCamera,
    IconMusicalNote,
    IconUserGroup,
    IconUser,
} from "@/components/icons/index.ts";

const pages = [
    {
        title: "发现",
        path: "/discover",
        icon: IconNeteaseCloudMusic,
    },

    {
        title: "MV",
        path: "/mv",
        icon: IconVideoCamera,
    },
    {
        title: "我的",
        path: "/mine",
        icon: IconMusicalNote,
    },
    {
        title: "朋友",
        path: "/friends",
        icon: IconUserGroup,
    },
    {
        title: "账号",
        path: "/account",
        icon: IconUser,
    },
];
</script>

<template>
    <nav
        class="sm:h-full bg-[--bg] z-50 flex sm:flex-col pb-6 w-full sm:w-[--w-nav] items-center justify-around py-2 border-t sm:border-r sm:border-t-0 border-[--line] h-[--h-nav]">
        <router-link v-for="page in pages" :key="page.title" :to="page.path" class="text-center">
            <component class="w-[2.6rem] block p-2 rounded-full" :is="page.icon" />
            <div class="text-sm">{{ page.title }}</div>
        </router-link>
    </nav>
</template>
