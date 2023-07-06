<script setup lang='ts'>
import { useSubView } from '@/stores/subView';
import { ChatLineSquare, Service, Share, CircleClose, Download, UserFilled, FolderAdd, VideoPlay } from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
    show: boolean;
    top: number;
    trackId: number
}>()
const emits = defineEmits(['update:show'])

const subViewStore = useSubView();
const more = [
    {
        icon: VideoPlay,
        title: '下一首播放',
        event: () => { }
    },
    {
        icon: FolderAdd,
        title: '收藏到歌单',
        event: () => { }
    }
    ,
    {
        icon: Download,
        title: '下载',
        event: () => { }
    }
    ,
    {
        icon: ChatLineSquare,
        title: '评论',
        event: () => {
            subViewStore.toView<'comment'>({
                toview: 'comment',
                params: {
                    id: props.trackId,
                    commentType: 'song'
                }
            })
        }
    }
    ,
    {
        icon: Share,
        title: '分享',
        event: () => { }
    },
    {
        icon: UserFilled,
        title: '歌手',
        event: () => { }
    },
    {
        icon: Service,
        title: '专辑',
        event: () => { }
    },
    {
        icon: CircleClose,
        title: '屏蔽',
        event: () => { }
    }
]

const tipsToolRef = ref<HTMLElement | null>(null);
function externalClick(e: Event) {
    if (e.target == tipsToolRef.value || (e.target as HTMLElement).parentElement == tipsToolRef.value) return;
    if (props.show) {
        emits('update:show', false);
    }
}
function handleShow() {
    if (!props.show) return;
    emits('update:show', false);
}
onMounted(() => {
    document.addEventListener('click', externalClick);
})
onUnmounted(() => {
    document.removeEventListener('click', externalClick);

})
</script>

<template>
    <ul class="bg-[--bg] absolute p-2 border-[--secondary] rounded-md right-12 border z-50 -translate-y-1/2 transition-[top] duration-300"
        v-show="props.show" ref="tipsToolRef" :style="{ top: props.top + 'px' }">
        <li v-for="m, index in more" :key="index" @click="m.event"
            class="block px-4 py-2 rounded-sm cursor-pointer hover:bg-[--line]">
            <component :is="m.icon" class="inline-block w-4 mr-3 opacity-50"></component>
            {{ m.title }}
        </li>
        <div
            class="absolute w-4 h-4 rotate-45 -translate-y-1/2 border border-b-transparent border-l-transparent border-inherit top-1/2 -right-2 bg-inherit">
        </div>
    </ul>
</template>