<script setup lang='ts'>
import { getCatPlaylist, getCatlist, getCatlistHot } from '@/api/discover';
import ListContainer from '@/components/common/ListContainer.vue';
import SongList from '@/components/common/SongList.vue';
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import { Menu, Close } from '@element-plus/icons-vue';
import gsap from 'gsap';


type Cat = {
    name: string;
    resourceCount: number;
    imgId: number;
    imgUrl: null,
    type: number;
    category: number;
    resourceType: number;
    hot: boolean;
    activity: boolean;
}

const catlist = shallowRef<
    {
        code: number;
        all: Cat;
        sub: Cat[];
        categories: {
            [k: string]: string;
        }
    } | null
>();

const list = computed<Cat[][]>(() => {
    if (!catlist.value) return [];
    const cats: Cat[][] = [];
    catlist.value.sub.forEach((sub: Cat) => {
        let dep = cats[sub.category];
        if (!dep) {
            cats[sub.category] = [sub];
            return;
        }
        dep.push(sub);
    })
    return cats;
})


const catlistShow = ref(false);

const headerTags = shallowRef<{ id: number; name: string; type: number }[]>([]);

const title = ref('全部');
const tabName = ref(''); // 只是歌单分类内分组的 tab，非 title 相关

onMounted(async () => {
    catlist.value = await getCatlist();
    let hotTags = await getCatlistHot();
    headerTags.value = hotTags.length >= 5 ? hotTags.slice(0, 5) : hotTags;
    tabName.value = catlist.value?.categories['0'] as string;
})

// 显示的歌单
const showPlaylist = shallowRef<{
    id: number;
    name: string;
    description: string;
    coverImgUrl: string;
    playCount: number;
    trackCount: number;
}[]>([]);

watch(title, async (cat) => {
    showPlaylist.value = await getCatPlaylist(cat)
}, { immediate: true })


// 下拉加载，临时测试
const addShowPlaylist = async (e: Event) => {
    const container = e.target as HTMLElement;
    if (container.scrollHeight - container.scrollTop - container.offsetHeight < 60) {
        const res = await getCatPlaylist(title.value, 30, showPlaylist.value.length)
        showPlaylist.value = showPlaylist.value.concat(res);
    }
}
onMounted(() => {
    document.querySelector('#fullcontainer')?.addEventListener('scroll', addShowPlaylist);
})
onUnmounted(() => {
    document.querySelector('#fullcontainer')?.removeEventListener('scroll', addShowPlaylist);
})


// 动画
const onEnter = (ele: Element) => {
    gsap.from(ele, {
        y: -100,
        opacity: 0,
        duration: 0.3
    })
}

const onLeave = (ele: Element, done: () => void) => {
    gsap.to(ele, {
        y: -100,
        opacity: 0,
        duration: 0.2,
        onComplete: done
    })
}
</script>

<template>
    <ListContainer :title="title" v-if="catlist" class="[&_::-webkit-scrollbar]:w-0">
        <template #header>
            <div class="flex items-center gap-3 text-sm xs:gap-6">
                <ul class="space-x-2 xs:space-x-6 text-[--secondary]">
                    <li v-for="tag in headerTags" :key="tag.id" class="inline-block cursor-pointer"
                        :class="title == tag.name ? 'border-[--self]' : ''" @click="title = tag.name">{{ tag.name }}</li>
                </ul>
                <div class="border border-[--line] rounded-full pl-2 pr-3 py-1 cursor-pointer"
                    @click.stop="catlistShow = true">
                    <span class="inline-block p-1">
                        <Menu class="w-4 align-middle text-[--text-opacity] inline-block" />
                    </span>
                    <span>选择分类</span>
                </div>
            </div>
        </template>
        <template #default>

            <!-- 分类选择 -->
            <Transition @enter="onEnter" @leave="onLeave">
                <div class="absolute z-[40] top-0 left-0 flex w-full h-full cursor-pointer backdrop-blur-sm"
                    v-if="catlistShow">
                    <div class="w-4/5 p-4 m-auto h-fit space-y-8 border border-[--line] bg-[--bg] rounded-lg">
                        <div class="flex items-center gap-4">
                            <span class="flex-1 py-1 text-center border border-[--line]"
                                :class="title == '全部' ? 'border-[--self]' : ''" @click="title = '全部'">
                                全部歌单
                            </span>
                            <span class="float-r hover:bg-[--line] p-1 rounded-md cursor-poniter"
                                @click.stop="catlistShow = false">
                                <Close class="inline-block w-6 text-[--secondary]" />
                            </span>
                        </div>
                        <el-tabs v-model="tabName" tab-position="right">
                            <el-tab-pane v-for="cats, index in list" :label="catlist.categories[`${index}`]"
                                :name="catlist.categories[`${index}`]" :key="index">
                                <div class="overflow-y-auto text-sm" :style="{ height: 3 * list.length + 'rem' }">
                                    <span v-for="cat, index in cats" :key="index" @click="title = cat.name"
                                        :class="title == cat.name ? 'border-[--self]' : ''"
                                        class="inline-block w-24 p-1 m-2 text-center border border-[--line] sm:w-28">{{
                                            cat.name }}</span>
                                </div>
                            </el-tab-pane>
                        </el-tabs>

                    </div>
                </div>
            </Transition>

            <!-- 显示的歌单 -->
            <div class="grid content-start grid-cols-3 gap-4 xs:grid-cols-5 lg:grid-cols-8">
                <SongList v-for="playlist, index in showPlaylist" :key="playlist.id + index.toString()" :data="{
                    id: playlist.id,
                    name: playlist.name,
                    picUrl: playlist.coverImgUrl,
                    playCount: playlist.playCount,
                    trackCount: playlist.trackCount
                }" />
            </div>
        </template>
    </ListContainer>
</template>