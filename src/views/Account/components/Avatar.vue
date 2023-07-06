<script setup lang="ts">
import { Edit } from "@element-plus/icons-vue";
import { computed, shallowRef, watchEffect } from "vue";
import { getUserDetail } from "@/api/user";

const { userId } = defineProps<{
  userId: number | null;
}>();

const profile = shallowRef<any | null>(null);
const stats = computed(() => {
  if (!profile.value) return [];
  const { eventCount, follows, followeds } = profile.value;
  return [
    ["动态", eventCount],
    ["关注", follows],
    ["粉丝", followeds],
  ];
});

watchEffect(async () => {
  if (!userId) return;
  const res = await getUserDetail(userId);
  profile.value = res.profile;
});

const toUser = computed(() => {
  return {
    toview: "user",
    params: {
      uid: userId,
    },
  };
});
</script>

<template>
  <!-- 头像 -->
  <div class="flex items-center justify-between px-6 py-8">
    <SubLink :to="toUser" class="flex items-center gap-4">
      <el-avatar :size="60" :src="profile?.avatarUrl"></el-avatar>
      <span>{{ profile?.nickname }}</span>
    </SubLink>
    <div class="border border-[--line] text-sm rounded-md px-1 py-1">
      <el-icon size="20" class="align-top">
        <Edit />
      </el-icon>
      编辑
    </div>
  </div>
  <!-- 信息 -->
  <div class="border-t border-[--line] flex justify-around text-center py-2">
    <div v-for="(stat, index) in stats" :key="index" class="flex-1 space-y-1">
      <span class="block text-xs text-[--secondary]">{{ stat[0] }}</span>
      <span class="block">{{ stat[1] }}</span>
      <el-divider
        direction="vertical"
        v-if="index !== 2"
        class="float-right -translate-y-[200%]"
      />
    </div>
  </div>
</template>
