<script setup lang="ts">
import { getFriendsEvent } from "@/api/friends";
import FullHalfContainer from "@/components/common/FullHalfContainer.vue";
import { onMounted, shallowRef } from "vue";

import Event from "@/components/common/Event.vue";

const events = shallowRef();

onMounted(async () => {
    const res = await getFriendsEvent();

    res.event = res.event.reduce((arr: any, e: any) => {
        e["commentThread"] = Object.assign({}, e.info!.commentThread);
        e["jsonParse"] = JSON.parse(e.json!);

        // 删减，已经处理过
        delete e.info;
        delete e.json;

        return [...arr, e];
    }, []);

    events.value = res;

})
</script>

<template>
    <FullHalfContainer title="朋友动态">
        <div v-if="events" class="p-4 space-y-4">
            <Event v-for="event in events.event" :key="event.id" :data="event" :full="false" />
        </div>
        <Loading />
    </FullHalfContainer>
</template>

<style scoped></style>
