<script setup lang='ts'>
import { ChatLineSquare, Service, Share, CircleClose, Download, UserFilled, FolderAdd, VideoPlay } from '@element-plus/icons-vue'
import { useSubView } from '@/stores/subView';
import { MoreFilled, } from '@element-plus/icons-vue';

const props = defineProps<{
    trackId: number //歌曲id
}>()

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
        useful: true, // 标记可用
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

</script>

<template>
    <el-popover placement="right" trigger="hover" >
        <template #reference>
            <div class="relative">
                <MoreFilled class="inline-block w-4 rotate-90 cursor-pointer" style="outline: none;" />
            </div>
        </template>
        <template #default>
            <ul class="w-40">
                <li v-for="m, index in more" :key="index" @click="{ m.event(); }" class="block px-4 py-2 rounded-sm "
                    :class="m.useful ? 'cursor-pointer text-[--text] hover:bg-[--line]' : 'text-[--secondary]'">
                    <component :is="m.icon" class="inline-block w-4 mr-3 opacity-50"></component>
                    {{ m.title }}
                </li>
            </ul>
        </template>
    </el-popover>
</template>