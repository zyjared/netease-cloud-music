<script setup lang="ts">
import { getUserDetail } from "@/api/user";
const handle = async () => {
  const res = await getUserDetail(110568337);
  console.log(res);
};
</script>

<template>
  <div class="flex w-full h-full">

    <button class="m-auto border border-[--self] text-lg p-4 hover:bg-[--self] hover:text-white" @click="handle">test</button>
  </div>
</template>

<style scoped></style>
