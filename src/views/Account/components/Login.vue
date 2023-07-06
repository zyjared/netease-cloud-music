<script setup lang="ts">
import { UserFilled, Picture as IconPicture } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { h, ref } from "vue";

import { useLogin } from "../composables/useLogin";
import { IconNeteaseCloudMusic } from "@/components/icons";

const { loginImg, loginType, loading, login, loginCancel } = useLogin();

const loginVisible = ref(false);
const handleLogin = () => {
  loginVisible.value = true;
  login();
};

const handleLoginCancel = () => {
  loginVisible.value = false;
  loginCancel();
  ElNotification({
    title: "提醒",
    message: "您取消了登录",
    icon: h(IconNeteaseCloudMusic, { style: "color: red;" }),
  });
};
</script>

<template>
  <!-- 默认显示页面 -->

  <div class="flex items-center justify-between px-6 py-8">
    <div class="flex items-center gap-4">
      <el-avatar :size="60" :icon="UserFilled"> </el-avatar>
      <span>享受音乐好时光</span>
    </div>
    <div
      class="cursor-pointer border border-[--line] text-sm rounded-md px-1 py-1"
      @click="handleLogin"
    >
      请登录
    </div>
  </div>

  <!-- 登录流程的界面 -->

  <el-dialog
    v-model="loginVisible"
    :show-close="false"
    align-center
    class="text-center"
    :style="`
      --el-dialog-border-radius: 0.5rem;
      --el-dialog-padding-primary: 1rem;
      min-width: 300px;
      max-width: 400px;`"
  >
    <template #header="{ titleClass }">
      <div :class="titleClass">
        <h2>登录</h2>
      </div>
    </template>
    <div
      class="flex flex-col items-center gap-8 sm:gap-4 sm:justify-around sm:flex-row"
    >
      <el-image
        style="width: 150px; height: 150px"
        class="border rounded-sm border-[--line]"
        :src="loginImg"
        fit="fill"
      >
        <template #placeholder>
          <div
            class="w-full h-full"
            v-loading="loading"
            :element-loading-text="loginType"
          ></div>
        </template>
        <template #error>
          <div class="flex flex-col items-center justify-center h-full">
            <p>加载二维码失败</p>
            <el-icon size="40"><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
      <div class="flex flex-col gap-4 sm:self-end">
        <p class="text-sm">该网站不会收集您的个人信息</p>
        <p class="">扫描左侧二维码登录</p>
        <el-button @click="handleLoginCancel" type="danger" class="w-full"
          >取消</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>
