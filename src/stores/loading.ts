import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { ref, shallowReactive, shallowRef, watch } from "vue";

type LoadingRequests = {
  [key: symbol]: boolean;
};
export const useLoadingStore = defineStore("loadingStore", () => {
  let timer: number; // 延迟
  let overTimer: number; // 超时

  const isLoading = ref<boolean>(true);

  const requests = shallowReactive<Map<LoadingRequests, boolean>>(new Map());

  watch(requests, (map) => {
    if (!map.size) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      isLoading.value = false;
      clearTimeout(overTimer);
    }, 500);
  });

  function init() {
    clearTimeout(timer);
    clearTimeout(overTimer);
    isLoading.value = true;
    requests.clear();
  }

  function updateLoading(config: any, value: boolean) {
    if (value) {
      requests.set(config, value);
      clearTimeout(overTimer);
      overTimer = setTimeout(() => {
        isLoading.value = false;
        requests.clear();
        ElNotification({
          title: "未完全载入",
          message:
            "响应超时，某些数据可能丢失。完善该逻辑获得详细丢失数据信息。",
          zIndex: 999,
        });
      }, 5000);

      return;
    }

    requests.delete(config);
  }

  return {
    isLoading,
    updateLoading,
    init,
  };
});
