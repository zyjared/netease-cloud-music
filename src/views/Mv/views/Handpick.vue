<script setup lang='ts'>
import ListContainer from '@/components/common/ListContainer.vue';
import { onMounted, ref, shallowRef } from 'vue';
import { getMvFirst } from '@/api/mv'
import MvCard from '../components/MvCard.vue';

type Mv = {
    artistId: number;
    artistName: string;
    artists: { id: number; name: string }[];
    cover: string; // 图片
    id: number;
    name: "string";
    playCount: number;
    subed: false;
};

const firstMvs = shallowRef<Mv[]>([])

onMounted(async () => {
    const res = await getMvFirst();
    firstMvs.value = res;
})

</script>

<template>
    <ListContainer title="最新 MV" to="#">
        <div class="grid grid-cols-2 gap-3 xs:grid-cols-4 lg:grid-cols-5" v-if="firstMvs.length !== 0">
            <MvCard :key="firstMvs[0].id" class="sm:col-span-2 sm:row-span-2" v-bind="firstMvs[0]" />
            <MvCard v-for="mv in firstMvs.slice(1)" :key="mv.id" v-bind="mv" />
        </div>
    </ListContainer>
</template>