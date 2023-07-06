<script setup lang='ts'>
import { getPlaylistDetail } from '@/api/playlist';
import { computed, onMounted, ref, shallowRef } from 'vue';
import { ArrowRight, Bottom, FolderAdd, ChatLineRound, Share, VideoPlay } from '@element-plus/icons-vue'
import { formatCount } from '@/utils/formatCount';
import { ToComment, ToUser } from '@/types';
import SongTrack from '@/components/common/SongTrack.vue';
import { useCookie } from '@/stores/cookie';
import SubLink from '@/components/global/SubLink.vue';
import TipsTool from './components/TipsTool.vue';

type SelfProps = {
    id: number
}

type SelfData = {
    name: string;
    coverImgUrl: string;
    createTime: number;
    updateTime: number;
    description: string;
    creator: {
        userId: number;
        nickname: string;
        avatarUrl: string;
        vipType: number;
    };
    subscribedCount: number; // 收藏次数
    shareCount: number;
    commentCount: number;
    trackCount: number;
    tracks: {
        id: number;
        name: string;
        ar: { // 歌手
            id: number;
            name: string;
        }[];
        mv: number; // 0 则没有
        al: { // 专辑
            id: number;
            name: string;
            picUrl: string;
        };
        sq: {
            br: number;
            size: number;
        } | null;
    }[];

}

const cookieStore = useCookie();

const props = defineProps<SelfProps>();
const selfData = shallowRef<SelfData | null>(null);

async function disburse(props: SelfProps) {
    const res = await getPlaylistDetail(props.id, cookieStore.cookie);
    // console.log(res);
    selfData.value = res;
}

onMounted(() => {
    disburse(props);
})

// 工具提示
const tipsToolTop = ref<number>(0)
const tipsToolShow = ref<boolean>(false)
const clickTrackMore = (element: HTMLElement) => {
    tipsToolTop.value = element.offsetTop + element.offsetHeight / 2;
    tipsToolShow.value = true;

}

// 子页面跳转
const toUser = computed<ToUser | null>(() => {
    if (!selfData.value) return null;
    return {
        toview: 'user',
        params: {
            uid: selfData.value?.creator.userId
        }
    }
})

const toComment = computed<ToComment | null>(() => {
    if (!props.id) return null;
    return {
        toview: 'comment',
        params: {
            id: props.id,
            commentType: 'playlist'
        }
    }
})
</script>

<template>
    <SubContainer title="歌单">
        <template #default>

            <!-- 歌单 创建信息 -->

            <div :style="{
                background: `url(${selfData?.coverImgUrl})`,
                backgroundSize: 'cover'
            }">
                <div class="relative flex flex-wrap items-center px-4 py-6 text-white gap-y-6 gap-x-4 backdrop-blur-3xl">
                    <div class="w-40">
                        <el-image :src="selfData?.coverImgUrl" style="display: block;" fit="fill"></el-image>
                    </div>
                    <SubLink :to="toUser" v-if="toUser" class="w-[calc(100%-11rem)] space-y-4">
                        <div class="">{{ selfData?.name }}</div>
                        <div class="flex items-center gap-2">
                            <el-avatar :src="selfData?.creator.avatarUrl" fit="fill" />
                            <span class="text-xs text-white/80">
                                {{ selfData?.creator.nickname }}
                                <ArrowRight class="inline-block w-4 align-top" />
                            </span>
                        </div>
                    </SubLink>

                    <ul class="flex items-center justify-around flex-shrink-0 w-full text-xs text-center" v-if="selfData">
                        <li>
                            <span class="block w-6 mx-auto mb-2">
                                <FolderAdd />
                            </span>
                            {{ formatCount(selfData?.subscribedCount) }}
                        </li>
                        <li>
                            <SubLink :to='toComment' v-if="toComment">
                                <span class="block w-6 mx-auto mb-2">
                                    <ChatLineRound />
                                </span>
                                {{ formatCount(selfData?.commentCount) }}
                            </SubLink>
                        </li>
                        <li>
                            <span class="block w-6 mx-auto mb-2">
                                <Share />
                            </span>
                            {{ formatCount(selfData?.shareCount) }}
                        </li>
                        <li>
                            <span class="block w-6 mx-auto mb-2">
                                <Bottom />
                            </span>
                            下载
                        </li>
                    </ul>
                </div>

            </div>

            <!-- 歌单歌曲 -->

            <div class="relative px-2 py-4">

                <!-- 注意 clickTrackMore 的参数 element 应当和 tipsTool 在同一个标签内 -->

                <TipsTool :track-id="1" :top="tipsToolTop" v-model:show="tipsToolShow" />

                <!--  -->

                <div class="px-2 py-4">
                    <span class="w-[3rem] pr-2  inline-block text-center">
                        <VideoPlay class="inline-block w-6 align-top " />
                    </span>
                    播放全部
                    <span class="text-xs opacity-50">（共&ensp;{{ selfData?.trackCount }}&ensp;首）</span>
                </div>
                <SongTrack v-for="track, index in selfData?.tracks" :track="track" :order="index + 1" :key="track.id"
                    @moreEvent="clickTrackMore" />
            </div>

        </template>
    </SubContainer>
</template>