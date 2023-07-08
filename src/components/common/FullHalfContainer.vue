<script setup lang="ts">
defineProps<{
    title?: string
}>()
</script>

<template>
    <div class="flex h-full">
        <div class="flex-1 flex flex-col border-r border-[--line]">
            <h2 class="h-[3rem] text-center leading-[3rem]">
                <slot name="header">{{ title }}</slot>
            </h2>
            <div class="relative flex-1 overflow-y-auto">
                <slot></slot>
            </div>
        </div>
        <div class="hidden sm:flex sm:flex-1">
            <div class="m-auto">
                <slot name="second"> <img src="netease-cloud-music.svg" alt="" /></slot>
            </div>
        </div>
    </div>
</template>
