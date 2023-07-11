<script setup lang='ts'>
import { getComment } from '@/api/comment';
import { onMounted, shallowRef } from 'vue';
import CommentBar from './components/CommentBar.vue';
import { ToComment } from '@/types'

type CommentType = ToComment['params']['commentType']

type Props = {
    id: number| string;
    commentType: CommentType;
    data?: any; // 展示的组件如果需要 传递 prop
}

type Comment = {
    commentId: number;
    user: {
        avatarUrl: string;
        nickname: string;
        userId: number;

    };
    content: string;
    likedCount: number;
    time: number;
    liked: boolean; // 自己是否点赞
}

type Data = {
    userId: number;
    hotComments: Comment[];
    comments: Comment[];
    total: number;
}


const props = defineProps<Props>()
const data = shallowRef<Data>()

const getCommentBarProps = (comment: Comment) => {
    const { commentId, user, content, likedCount, time, liked } = comment;
    return { commentId, user, content, likedCount, time, liked }
}

async function disburse(props: Props) {
    // console.log(props.id);
    data.value = await getComment(props.id, props.commentType);
    // console.log('评论', data.value);
}

onMounted(() => {
    disburse(props);
})
</script>

<template>
    <SubContainer title="评论">
        <section v-if="data?.hotComments.length !== 0" class="p-4 space-y-2">
            <h3>精彩评论</h3>
            <CommentBar v-bind="getCommentBarProps(comment)" v-for="comment in data?.hotComments" :key="comment.commentId">
            </CommentBar>
        </section>
        <section v-if="data?.comments.length !== 0" class="p-4 space-y-2">
            <h3>最新评论<span>（{{ data?.total }}）</span></h3>
            <CommentBar v-bind="getCommentBarProps(comment)" v-for="comment in data?.comments" :key="comment.commentId">
            </CommentBar>
        </section>
        <div v-else>
            <el-empty :image-size="200">
                <template #description>
                    <p class="text-white">

                        还没有评论
                    </p>
                </template>
            </el-empty>
        </div>
    </SubContainer>
</template>