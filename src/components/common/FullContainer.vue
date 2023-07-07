<script setup lang='ts'>
import { Search, ArrowLeft } from '@element-plus/icons-vue';
import { onMounted, ref, shallowRef } from 'vue';
import gsap from 'gsap';
import { getSearchHot } from '@/api/search';

defineOptions({
    inheritAttrs: false
})
const searchValue = ref('')
const drawerShow = ref<boolean>(false)
const handleShow = () => drawerShow.value = !drawerShow.value

// 抽屉的动画
const onEnter = (ele: Element) => {
    gsap.from(ele, {
        duration: 0.3,
        x: '50%'
    })
}

const onLeave = (ele: Element, done: () => void) => {
    gsap.to(ele, {
        duration: 0.6,
        x: '100%',
        onComplete: done
    })
}

// 热门搜索
const searchHot = shallowRef<{
    searchWord: string;
}[]>([])

onMounted(async () => {
    searchHot.value = await getSearchHot();
})
</script>

<template>
    <div v-bind="$attrs" class="flex flex-col h-full">
        <div
            class="sticky top-0 z-40 flex xs:flex-row flex-col-reverse gap-4 justify-between items-center p-4 pb-2 border-b border-[--line] bg-[--bg]">
            <div class="flex-1 w-full h-full">
                <slot name="header"></slot>
            </div>
            <div class="px-2 xs:w-48 py-2 bg-[--line] w-full rounded-full cursor-pointer" @click.stop="handleShow">
                <span class="block mx-auto w-fit text-[--secondary] text-sm">
                    <Search class="inline-block w-4 mr-1" />
                    <i class="not-italic">搜索</i>
                </span>
            </div>
        </div>
        <div class="relative flex-1 p-4 overflow-y-auto">
            <slot></slot>
        </div>
    </div>
    <Transition @enter="onEnter" @leave="onLeave">
        <div class="absolute top-0 left-0 z-40 w-full h-full" v-if="drawerShow" @click.self="handleShow">
            <div
                class="absolute top-0 right-0 z-10 w-full h-full bg-[--bg] sm:border-l px-4 py-6 border-[--text-opacity] sm:w-1/2 ">
                <div class="flex items-center gap-6">
                    <span class="w-8 cursor-pointer hover:bg-[--line] rounded-md p-1 inline-block" @click.stop="handleShow">
                        <ArrowLeft class="text-[--secondary]" />
                    </span>
                    <div class="flex-1">
                        <el-input v-model="searchValue" placeholder="搜索" :suffix-icon="Search" class="rounded-full" />
                    </div>
                </div>
                <!-- 搜索推荐 -->
                <div class="p-4 mt-4">
                    <h3 class="border-b border-[--line] mb-3">热门搜索</h3>
                    <div class="grid grid-cols-2 text-[--secondary]">
                        <a v-for="word, index in searchHot" :key="index" href="#"
                            class="hover:bg-[--line] p-2 px-4 rounded-md">{{ word.searchWord }}</a>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>