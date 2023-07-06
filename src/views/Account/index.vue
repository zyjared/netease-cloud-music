<script setup lang="ts">
import FullHalfContainer from "@/components/common/FullHalfContainer.vue";
import Avatar from "./components/Avatar.vue";
import Login from "./components/Login.vue";
import OptionBar from "./components/OptionBar.vue";

import { IconNeteaseCloudMusic } from "@/components/icons";
import { ElNotification } from "element-plus";

import { options } from "./units/options.ts"; // 设置项
import { useCookie } from "@/stores/cookie";
import { getLoginStatus } from "@/api/login";

import { h, ref, watch } from "vue";

const cookieStore = useCookie();
const logged = ref<null | Boolean>(null);
const userId = ref<number | null>(null);

watch(
    cookieStore,
    async (store) => {
        const res = await getLoginStatus(store.cookie, true);
        if (!res.profile) return;
        userId.value = res.profile.userId;
        logged.value = true;
    },
    { immediate: true }
);

watch(logged, (_v, prev) => {
    if (prev !== false) return;
    ElNotification({
        title: "登录成功",
        message: "您取消了登录",
        icon: h(IconNeteaseCloudMusic, { style: "color: red;" }),
    });
});


</script>

<template>
    <FullHalfContainer>
        <template #header> 账号 </template>
        <template #default>
            <Avatar v-if="logged" :user-id="userId" />
            <Login v-else />
            <div class="pl-6 divide-y divide-[--line]">
                <OptionBar v-for="(option, index) in options" :key="index" :title="option.title" :type="option.type"
                    :disabled="option.disabled" :value="option.value" @handle="(toV) => option.handle!(toV)"
                    class="pr-[1rem]" />
            </div>
        </template>
        <template #second>
            <img src="netease-cloud-music.svg" alt="" />
        </template>
    </FullHalfContainer>
</template>

<style scoped></style>
