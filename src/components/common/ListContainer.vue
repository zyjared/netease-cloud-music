<script setup lang='ts'>

defineProps<{
    title: string;
}>()
</script>

<template>
    <section class="">
        <div class="py-2">
            <h2 class="font-bold">{{ title }}</h2>
        </div>
        <slot></slot>
    </section>
</template>