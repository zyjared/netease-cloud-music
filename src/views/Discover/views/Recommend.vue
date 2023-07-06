<script setup lang='ts'>
import { getPersonalized } from '@/api/discover';
import { onMounted, shallowRef } from 'vue';
import ListContainer from '@/components/common/ListContainer.vue';


const personlized = shallowRef<{
    id: number;
    name: string;
    picUrl: string;
    playCount: number;
    trackCount: number;

}[] | null>(null)

onMounted(async () => {
    personlized.value = await getPersonalized();
})

</script>

<template>
    <ListContainer title="推荐歌单">
        <div class="grid grid-cols-3 row-span-6 xs:grid-cols-4 gap-y-6 gap-x-4 sm:grid-cols-5">
            <SongList class="w-full" v-for="item in personlized" :data="item" :key="item.id" />
        </div>
    </ListContainer>
</template>