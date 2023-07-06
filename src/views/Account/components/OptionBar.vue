<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { onBeforeMount, ref, Ref, unref } from "vue";

const {
  title,
  type = "view",
  disabled,
  value,
} = defineProps<{
  title: string;
  value?: Ref<boolean> | (() => boolean) | boolean;
  type?: "switch" | "view" | string;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: "handle", toValue: boolean): void;
}>();

// 初始化 _value
// _value 不能返回给父组件，通过 handle 事件处理 switch 的 beforeChange 事件

let _value: Ref | null = ref(false);
let _beforeChange: null | (() => Promise<unknown>) = () => {
  return new Promise((resolve, _reject) => {
    emits("handle", !_value!.value);
    return resolve(true);
  });
};

onBeforeMount(() => {
  if (type == "switch" && !disabled) {
    _value!.value = typeof value == "function" ? value() : unref(value);
  } else {
    _value = null;
    _beforeChange = null;
  }
});
</script>

<template>
  <div
    class="flex items-center justify-between h-12"
    :class="disabled ? 'text-[--secondary]' : ''"
  >
    <span>{{ title }}</span>
    <ArrowRight v-if="type !== 'switch'" class="h-4 text-[--secondary]" />
    <el-switch
      v-else
      active-text=""
      inactive-text=""
      v-model="_value"
      :before-change="_beforeChange"
    />
  </div>
</template>
