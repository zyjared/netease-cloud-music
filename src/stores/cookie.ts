import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useCookie = defineStore("cookie", () => {
  const cookie = useStorage("cookie", "", localStorage);

  const updateCookie = (newCookie: string) => {
    cookie.value = newCookie;
  };
  const removeCookie = () => {
    cookie.value = null;
  };

  return {
    cookie,
    updateCookie,
    removeCookie,
  };
});
