import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { ref, shallowReactive, watch } from "vue";

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
    }, 400);
  });

  function init() {
    clearTimeout(timer);
    clearTimeout(overTimer);
    isLoading.value = true;
    requests.clear();
  }

  function close() {
    clearTimeout(timer);
    clearTimeout(overTimer);
    requests.clear();
    overTimer = setTimeout(() => {
      isLoading.value = false;
    }, 500);
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
    init,
    close,
    updateLoading,
  };
});
