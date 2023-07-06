<script setup lang="ts">
import * as icons from "./index.ts";
</script>

<template>
  <div class="flex flex-wrap gap-8 items-center">
    <div v-for="(value, key) in icons" :key="key" class="text-center">
      <component :is="value" class="block mx-auto w-8" />
      <p class="text-black/60 text-sm">{{ key }}</p>
    </div>
  </div>
</template>
