<script setup lang='ts'>
import { getComment, getCommentPlaylist } from '@/api/comment';
import SubContainer from '@/components/global/SubContainer.vue';
import { onMounted, shallowRef } from 'vue';

type Props = {
    id: number
}

type Comment = {
    user: {
        avatarUrl: string;
        nickname: string;
        userId: number;

    };
    content: string;
    likedCount: number;
    time: number;
    liked: boolean
}
type Data = {
    userId: number;
    hotComments: Comment[];
    comments: Comment[];
    total: number;
}

const props = defineProps<Props>()
// const data = shallowRef<Data>()

async function disburse(props: Props) {
    console.log(props)
    // data.value = await getComment('playlist', props.id);

}

onMounted(() => {
    disburse(props);
})
</script>

<template>
    <SubContainer title="评论">
        <div>歌单评论</div>
    </SubContainer>
</template>