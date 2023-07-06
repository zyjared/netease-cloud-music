<script lang="ts">
import { Data as EventData } from "@/components/common/Event.vue";
export type SelfProps = {
  uid: number;
};

interface SelfEvent extends EventData {
  json?: string;
  info?: {
    commentThread: {
      shareCount: number;
      commentCount: number;
      likedCount: number;
    };
  };
}

type SelfData = EventData[];
</script>

<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import { getUserEvent } from "@/api/user";
import Event from "@/components/common/Event.vue";

const props = defineProps<SelfProps>();
const selfData = shallowRef<SelfData | null>(null);

async function disburse(props: SelfProps) {
  if (!props) return null;

  let res = await getUserEvent(props.uid);
  // res.size ==> events 的长度
  // res.lasttime
  if (res.code != 200) return null;

  selfData.value = res.events.reduce((arr: SelfData, e: SelfEvent) => {
    // 新增，Event 组件需要
    e["commentThread"] = Object.assign({}, e.info!.commentThread);
    e["jsonParse"] = JSON.parse(e.json!);

    // 删减，已经处理过
    delete e.info;
    delete e.json;

    return [...arr, e];
  }, []);
}

onMounted(async () => {
  await disburse(props);
});
</script>

<template>
  <section class="space-y-4">
    <Event
      class="glass-base"
      v-for="event in selfData"
      :key="event.id"
      :data="event"
      :full="false"
    />
  </section>
</template>
