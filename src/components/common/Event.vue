<script lang="ts">
export type Data = {

    threadId: string;
    id: number;
    eventTime: number;

    user: {
        userId: number;
        nickname: string;
        avatarUrl: string;
        vipType: number;
    };

    // 根据该值显示不同效果
    type: number;

    // 标签
    bottomActivityInfos: {
        id: number;
        name: string;
    }[];

    // 发布的图片
    pics: {
        height: number;
        width: number;
        originUrl: string;
        squareUrl: string;
        rectangleUrl: string;
        pcSquareUrl: string;
        pcRectangleUrl: string;
    }[];

    jsonParse: {
        msg: string; // 发布的文字内容
        [k: string]: any; // 根据以后的模板确定
    };

    commentThread: {
        shareCount: number;
        commentCount: number;
        likedCount: number;
    };

}

</script>

<script setup lang='ts'>
import {
    ChatLineRound,
    Share,
    Promotion,
    MoreFilled,
} from "@element-plus/icons-vue";
import * as dayjs from 'dayjs';
import { computed, toRaw } from 'vue';

const { data } = defineProps<{ data: Data; full?: boolean }>()
const typeTexts = {
    "18": "分享单曲",
    "19": "分享专辑",
    "17": "分享歌单",
    "28": "分享电台节目",
    "22": "转发",
    "39": "发布视频",
    "35": "分享歌单",
    "13": "分享歌单",
    "24": "分享专栏文章",
    "21": "分享视频",
    "41": "分享视频",
}

const toUser = computed(() => {
    return {
        toview: 'user',
        params: {
            uid: data.user.userId
        }
    }
})

const toComment = computed(() => {
    return {
        toview: 'commentEvent',
        params: {
            threadId: data.threadId,
            data: toRaw(data)
        }
    }
})

</script>

<template>
    <section class="">

        <!-- 头部 -->

        <div class="flex items-center gap-3">
            <SubLink :to="toUser">
                <el-avatar :size="50" :src="data.user.avatarUrl" />
            </SubLink>
            <div class="">
                <div>
                    <span>
                        {{ data.user.nickname }}
                    </span>
                    <span class="ml-3">{{ typeTexts[data.type.toString() as keyof typeof typeTexts] }}</span>
                </div>
                <div class="text-sm opacity-80">
                    {{ dayjs(data.eventTime).format("YYYY年M月D日") }}
                </div>
            </div>
        </div>

        <!-- 正文 -->

        <div class="space-y-2" :style="{
            paddingLeft: full ? '0' : '4rem'
        }">

            <!-- 发布的文字 -->
            <SubLink class="block" :to="toComment">
                <p>
                <p>{{ data.jsonParse.msg }}</p>
                </p>
            </SubLink>

            <!-- =================================== -->

            <!-- 根据类型选择展示方式 -->

            <!-- 详细的展示类型，见 typeTexts -->
            <!-- 展示的组件应该会被抽离出来 -->
            <!-- 在后续补上 -->

            <template v-if="data.type != 35">
                <p class="glass-base">暂不支持显示该类型</p>
            </template>

            <!-- =================================== -->

            <!-- 标签  -->

            <div class="text-sm text-cyan-400">
                <span v-for="bInfo in data.bottomActivityInfos" :key="bInfo.id">
                    #{{ bInfo.name }}
                </span>
            </div>

            <!-- 图片 -->

            <div class="flex flex-wrap gap-4 py-2">
                <el-image v-for="(pic, index) in data.pics" :src="pic.squareUrl" :key="index" fit="fill"
                    class="w-full rounded-md md:w-1/3" />
            </div>

            <!-- 底部信息 -->

            <div class="space-x-4 text-sm opacity-75">
                <span>
                    <Share class="inline-block w-[1.2rem] align-bottom mr-1" />转发
                </span>
                <span>
                    <ChatLineRound class="inline-block w-[1.2rem] align-bottom mr-1" />评论
                </span>
                <span>
                    <Promotion class="inline-block w-[1.2rem] align-bottom mr-1" />{{
                        data.commentThread.likedCount
                    }}
                </span>
                <span>
                    <MoreFilled class="inline-block float-right w-[1.2rem] rotate-90" />
                </span>
            </div>
        </div>
    </section>
</template>