<script lang="ts">
export type SelfProps = {
    createDays: number,
    createTime: number,
};

export const a = 2;
</script>

<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const { createDays, createTime } = defineProps<SelfProps>();
</script>

<template>
    <section class="glass-base">
        <h2>基本信息</h2>
        <dl class="text-white/70">
            <dt class="inline-block">村龄：</dt>
            <dd class="inline-block">
                {{ ~~dayjs.duration(createDays, "days").asYears() }}年（{{
                    dayjs(createTime).format("YYYY年M月D日")
                }}注册）
            </dd>
            <br />
            <dt class="inline-block">性别：</dt>
            <dd class="inline-block">男</dd>
        </dl>
    </section>
</template>
