<script lang="ts">
import { Data as EventData } from '@/components/common/Event.vue'
export type Props = {
    threadId: string;
    data: EventData
};
</script>

<script setup lang="ts">
import { getCommentEvent } from '@/api/comment';
import { onMounted, shallowRef } from 'vue';
import Event from '@/components/common/Event.vue';

const props = defineProps<Props>();

const selfData = shallowRef({
    comments: []
})

async function disburse(props: Props) {
    const res = await getCommentEvent(props.threadId);
    if (res.code !== 200) return;

    // =================
    // 待获取数据的结构
    // console.log(res)
    // =================
}
onMounted(async () => {
    await disburse(props);
})
</script>

<template>
    <SubContainer title="评论">
        <div class="px-3 space-y-8">

            <Event :data="props.data" />

            <div class="text-sm">
                <!-- 其组件尚未编写 -->
                <span class="text-sm">评论</span>
                <div v-for="comment, index in selfData.comments" :key="index">
                    {{ comment }}
                </div>
            </div>
        </div>
    </SubContainer>
</template>
