<script setup lang='ts'>
import { Search, ArrowLeft } from '@element-plus/icons-vue';
import { ref } from 'vue';
import gsap from 'gsap';

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
</script>

<template>
    <div v-bind="$attrs" class="flex flex-col h-full">
        <div class="sticky top-0 z-40 flex xs:flex-row flex-col-reverse gap-4 justify-between items-center p-4 pb-2 border-b border-[--line] bg-[--bg]">
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
        <div class="flex-1 p-4 overflow-y-auto">
            <slot></slot>
        </div>
    </div>
    <Transition @enter="onEnter" @leave="onLeave">
        <div class="absolute top-0 left-0 z-40 w-full h-full" v-if="drawerShow" @click.self="handleShow">
            <div
                class="absolute top-0 right-0 z-10 w-full h-full bg-[--bg] sm:border-l p-4 border-[--text-opacity] sm:w-1/2 ">
                <div class="flex items-center gap-6">
                    <span class="w-6">
                        <ArrowLeft class="text-[--secondary] cursor-pointer" @click.stop="handleShow" />
                    </span>
                    <div class="flex-1">
                        <el-input v-model="searchValue" placeholder="搜索" :suffix-icon="Search" class="rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>