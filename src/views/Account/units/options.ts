import { isDark, toggleDark } from "@/composables/useDark";

export const options = [
  {
    title: "定时关闭",
    type: "view",
    disabled: true, //
  },
  {
    title: "音质选择",
    type: "view",
    disabled: true,
  },
  {
    title: "清除缓存",
    type: "view",
    disabled: true,
  },
  {
    title: "音乐黑名单",
    type: "view",
    disabled: true,
  },
  {
    title: "心动模式",
    type: "view",
    disabled: true,
  },
  {
    title: "控制中心菜单显示喜欢",
    type: "view",
    disabled: true,
  },
  {
    title: "歌词翻译",
    type: "switch",
    disabled: true,
  },
  {
    title: "桌面歌词",
    type: "switch",
    disabled: true,
  },
  {
    title: "深色模式",
    type: "switch",
    value: isDark,
    handle: (toValue: boolean) => {
      if (toValue) {
        toggleDark("dark");
      } else {
        toggleDark("light");
      }
    },
    disabled: false,
  },
];
