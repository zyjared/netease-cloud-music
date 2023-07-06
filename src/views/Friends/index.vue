<script setup lang="ts">
import { ElNotification } from "element-plus";

const open = () => {
  ElNotification({
    title: "Title",
    message: "This is a reminder",
  });
};
</script>

<template>
  <div>
    friends
    <button class="block bg-gray-300 border" @click="open">提交</button>
  </div>
</template>

<style scoped></style>
