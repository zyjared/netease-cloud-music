import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { ref, shallowReactive, shallowRef, watch } from "vue";

type LoadingRequests = {
  [key: symbol]: boolean;
};
export const useLoadingStore = defineStore("loadingStore", () => {
  let timer: number; // 延迟
  let overTimer: number; // 超时

  const keysMap = new Map(); // 但是要注意 {} !== {}，但这里是同一个

  const isLoading = ref<boolean>(true);

  const requests = shallowRef<LoadingRequests>({});
  watch(requests, () => {
    if (!keysMap.size) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      isLoading.value = false;
      clearTimeout(overTimer); // 清除超时的定时
    }, 500);
  });

  //  初始化，确保使用前是干净的。注意和重置状态不一样
  function init() {
    clearTimeout(timer);
    clearTimeout(overTimer);
    isLoading.value = true;
    requests.value = {};
    keysMap.clear();
  }

  function updateLoading(config: any, value: boolean) {
    let keySym = keysMap.get(config);
    if (value) {
      // 超时后不再 loading ，并重置状态
      clearTimeout(overTimer);
      overTimer = setTimeout(() => {
        isLoading.value = false;
        requests.value = {};
        keysMap.clear();
        ElNotification({
          title: "未完全载入",
          message:
            "响应超时，某些数据可能丢失。完善该逻辑获得详细丢失数据信息。",
          zIndex: 999,
        });
      }, 5000);

      // 正常逻辑
      !keySym && keysMap.set(config, (keySym = Symbol()));
      requests.value[keySym] = value;
      requests.value = { ...requests.value };
      return;
    }
    delete requests.value[keySym];
    keysMap.delete(config);
    requests.value = { ...requests.value };
  }

  return {
    isLoading,
    updateLoading,
    init,
  };
});
