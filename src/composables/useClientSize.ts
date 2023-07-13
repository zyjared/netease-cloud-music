import { onMounted, onUnmounted, ref } from "vue";

export function useClientSize() {
  const width = ref(0);
  const height = ref(0);

  function updated() {
    width.value = window.innerWidth || document.documentElement.clientWidth;
    height.value = window.innerHeight || document.documentElement.clientHeight;
    const d = document.querySelector("#app") as HTMLElement;
    d.style.width = width.value + "px";
    d.style.height = height.value + "px";
  }

  updated();

  onMounted(() => {
    window.addEventListener("resize", updated);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updated);
  });

  return {
    width,
    height,
  };
}
