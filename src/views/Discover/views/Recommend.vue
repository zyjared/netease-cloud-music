<script setup lang='ts'>
import { getPersonalized, getNewsongs, getBanners, getPrivatecontent } from '@/api/discover';
import { onMounted, shallowRef } from 'vue';
import ListContainer from '@/components/common/ListContainer.vue';
import SongList from '@/components/common/SongList.vue'
import Songbar from '../components/Songbar.vue';
import Banner from '../components/Banner.vue';
import { VideoCamera } from '@element-plus/icons-vue';

// banner
const banners = shallowRef<{
    pic: string;
    typeTitle: string;
    url: string;
    bannerId: string;
}[]>([])


onMounted(async () => {
    banners.value = await getBanners();
})



const personlized = shallowRef<{
    id: number;
    name: string;
    picUrl: string;
    playCount: number;
    trackCount: number;

}[] | null>(null)


const newongs = shallowRef<{
    id: number;
    name: string;
    artists: {
        name: string;
        id: number;
    }[];
    no: number;
    album: {
        picUrl: string;
        name: string; // 专辑名
    };
    mvid: number;
}[]>([]);

const privatecontent = shallowRef<{
    id: number;
    picUrl: string;
    name: string;
}[]>([])

onMounted(async () => {
    personlized.value = await getPersonalized();
    newongs.value = await getNewsongs();
    privatecontent.value = await getPrivatecontent();
})


</script>

<template>
    <div class="pb-20 space-y-8">

        <!-- banner -->
        <Banner :banners="banners" v-if="banners" />

        <ListContainer title="推荐歌单" to="/discover/songlist">
            <div class="grid grid-cols-3 row-span-6 xs:grid-cols-4 gap-y-6 gap-x-4 sm:grid-cols-5">
                <SongList v-for="item in personlized" :data="item" :key="item.id" />
            </div>
        </ListContainer>

        <ListContainer title="独家放送" to="#">
            <div class="flex flex-col gap-4 text-xs sm:flex-row">
                <div v-for="content in privatecontent" :key="content.id" class="relative">
                    <img :src="content.picUrl" loading="lazy" :alt="content.name" class="block object-contain" />
                    <p class="mt-2">{{ content.name }}</p>
                    <span class="absolute p-1 border rounded-full border-white/50 top-2 left-2 bg-gray-600/30">
                        <VideoCamera class="w-4 text-white" />
                    </span>
                </div>
            </div>
        </ListContainer>

        <ListContainer title="最新音乐" to="/discover/newsongs">
            <div class="grid grid-cols-2">
                <Songbar v-for="song, index in newongs.slice(0, 10)" :key="song.id" v-bind="song" :order="index + 1"
                    :class="index >> 1 & 1 ? '' : 'bg-[--line]'" />
            </div>
        </ListContainer>


    </div>
</template>