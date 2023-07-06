// 该文件函数不是组合式函数，组合式函数使用 vueUse 的 useDark

// modeInit 需要在全局根组件执行一次加载历史设置
export function modeInit() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}

// 如果需要切换，则给定一个初始值 isDark，确保伪响应
// 可以增加逻辑以解决 toggleDark 所提到的部分问题
// 目前是没必要的，如果需要的逻辑再多，选择 vueUse

export function isDark(): boolean {
  return localStorage.theme === "dark";
}

// 要做到真正的 toggle ，需要响应式，否则可能会导致页面、页面控制值和存储值三者之间矛盾
// （虽然不刻意手动更改 storage 就不太可能出现）

export function toggleDark(mode: "light" | "dark") {
  if (mode === "dark") {
    localStorage.theme = "dark";
    !document.documentElement.classList.contains("dark") &&
      document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}
