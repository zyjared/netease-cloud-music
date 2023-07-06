<script lang="ts">
import { SelfProps as HomePageProps } from "./HomePage/index.vue";
import { SelfProps as DynamicsProps } from "./Dynamics/index.vue";
import SubLink from "@/components/global/SubLink.vue";
import { ToUser } from "@/types";

export type SelfProps = {
    uid: number;
};

type SelfData = {
    bg: string;
    avatarUrl: string;
    nickname: string;
    stats: string[];
};
</script>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { shallowRef } from "vue";
import { getUserDetail } from "@/api/user";

const props = defineProps<SelfProps>();
const selfData = shallowRef<SelfData>({
    bg: "",
    avatarUrl: "",
    nickname: "",
    stats: [],
});

const homePageProps = shallowRef<HomePageProps | null>(null);
const dynamicsProps = shallowRef<DynamicsProps | null>(null);

async function disburse(props: SelfProps) {
    let res = await getUserDetail(props.uid);

    if (!res) return null;

    selfData.value = {
        bg: res.profile.backgroundUrl,
        avatarUrl: res.profile.avatarUrl,
        nickname: res.profile.nickname,
        stats: [
            `${res.profile.follows} 关注`,
            `${res.profile.followeds} 粉丝`,
            `Lv.${0}`,
        ],
    };

    homePageProps.value = {
        createDays: res.createDays,
        createTime: res.createTime,
    };

    dynamicsProps.value = {
        uid: res.profile.userId,
    };

    return true;
}

onMounted(async () => {
    await disburse(props);
});

// 切换
const HomePage = defineAsyncComponent(() => import("./HomePage/index.vue"));
const Dynamics = defineAsyncComponent(() => import("./Dynamics/index.vue"));

const curName = ref<"homepage" | "dynamics">("homepage");

// 页面切换
const toUser = computed<ToUser>(() => {
    return {
        toview: 'user',
        params: {
            uid: props.uid
        }
    }
})
</script>

<template>
    <SubContainer title="个人主页" :style="{
        background: `url(${selfData.bg}) center`,
        backgroundSize: 'cover',
    }">
        <template #default>
            <div class="px-3 space-y-4 overflow-y-visible text-white ">
                <!-- 卡片简介 -->

                <section class="relative space-y-2 mt-40 text-sm text-center pt-[2.5rem_!important] glass-base">
                    <SubLink :to="toUser" class="absolute top-0 -translate-x-1/2 -translate-y-1/2 w-fit left-1/2">
                        <el-avatar :src="selfData.avatarUrl" style="--el-avatar-size: 5rem" />
                    </SubLink>
                    <div class="text-lg font-bold">
                        {{ selfData.nickname }}
                    </div>
                    <div class="space-x-6 text-white/80">
                        <span v-for="(stat, index) in selfData.stats" :key="index" class="inline-block">{{ stat }}
                        </span>
                    </div>
                    <div class="space-x-2">
                        <span class="border inline-block border-[--line] px-1 rounded-md cursor-pointer">IP 属地：{{ "江苏"
                        }}</span>
                        <span class="border inline-block border-[--line] px-1 rounded-md cursor-pointer">DOUDOU 乐迷</span>
                    </div>
                    <div style="font-size: 0.5rem">
                        <el-button class="w-20 h-8" size="small" round>互相关注 </el-button>
                        <el-button class="w-20 h-8" type="primary" size="small" round>聊天</el-button>
                    </div>
                </section>

                <!-- 切换 -->
                <section class="flex justify-around glass-base">
                    <span @click="() => (curName = 'homepage')">主页</span>
                    <span @click="() => (curName = 'dynamics')">动态</span>
                </section>

                <KeepAlive>
                    <component :key="curName" :is="curName === 'homepage' ? HomePage : Dynamics"
                        v-bind="curName === 'homepage' ? homePageProps : dynamicsProps"
                        v-if="curName === 'homepage' ? homePageProps : dynamicsProps" />

                </KeepAlive>
            </div>
        </template>
    </SubContainer>
</template>
