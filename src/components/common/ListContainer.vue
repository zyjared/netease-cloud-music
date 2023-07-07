<script setup lang='ts'>
import { ArrowRight } from '@element-plus/icons-vue';

defineProps<{
    title: string;
    to?: string;
}>()
</script>

<template>
    <section>
        <div class="flex items-center justify-between py-2">
            <h2 class="relative pl-2"><span class="absolute w-[3px] h-3/5 top-1/2 left-0 -translate-y-1/2 rounded-full bg-[--self]"></span>{{ title }}</h2>
            <slot name=header>
                <router-link :to="to" class="text-[--secondary] text-xs" v-if="to">
                    <span>更多</span>
                    <ArrowRight class="inline-block w-4 align-top" />
                </router-link>
            </slot>
        </div>
        <slot></slot>
    </section>
</template>