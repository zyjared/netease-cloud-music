import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const userId = useStorage("userId", 0, localStorage);
  const updateUserId = (id: number) => {
    userId.value = id;
  };

  return {
    userId,
    updateUserId,
  };
});
