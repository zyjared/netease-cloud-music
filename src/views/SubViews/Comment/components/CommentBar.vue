<script setup lang='ts'>
import { ToUser } from '@/types';
import { computed } from 'vue';
import dayjs from 'dayjs';
import { Promotion } from '@element-plus/icons-vue';

type Props = {
    user: {
        avatarUrl: string;
        nickname: string;
        userId: number;

    };
    time: number;
    content: string;
    likedCount: number;
    liked: boolean; // 自己是否点赞
    commentId: number;
}

const props = defineProps<Props>()

const toUser = computed<ToUser>(() => {
    return {
        toview: 'user',
        params: {
            uid: props.user.userId
        }
    }
})

</script>

<template>
    <div class="flex gap-2 py-2 text-sm">
        <SubLink :to="toUser" class="origin-left scale-90">
            <el-avatar :src="user.avatarUrl" />
        </SubLink>

        <div :to="toUser" class="flex flex-wrap pt-2 items-top grow">
            <div class="opacity-50 grow">
                <span class="block text-sm">
                    {{ user.nickname }}
                </span>
                <span class="block origin-top-left scale-75">
                    {{ dayjs(time).format("YYYY年M月D日") }}
                </span>
            </div>
            <div class="flex-none space-x-1 text-sm opacity-50">
                <span class="inline-block origin-bottom scale-90">{{ likedCount }}</span>
                <span>
                    <Promotion class="inline-block w-4 align-middle"
                        :style="{ color: liked ? 'var(--self)' : 'inherit' }" />
                </span>
            </div>

            <div class="w-full">
                {{ content }}
            </div>
        </div>

    </div>
</template>