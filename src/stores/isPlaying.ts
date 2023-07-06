import {
  getSongLyric,
  getSongStatus,
  getSongsDetailByIds,
  getSongsUrlByIds,
} from "@/api/song";
import { useStorage } from "@vueuse/core";
import { ElNotification, ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { computed, ref, watch, nextTick, onUnmounted, onMounted } from "vue";

// 为 getSongsDetailByIds 中的 song 类型
type Song = {
  id: number;
  name: string;
  fee: 0 | 1 | 4 | 8; // 见 上
  dt: number; // 歌曲时长
  ar: {
    id: number;
    name: string;
  }[];
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  url: string; // 单独获取
  check: { success: boolean; message: "ok" | "亲爱的,暂无版权" };
  lyric: string;
};

export const useIsPlayingStore = defineStore("isPlaying", () => {
  const songList = useStorage<Song[]>("songlist", []);
  const songActiveIndex = useStorage<number>(
    "songActiveIndex",
    songList.value.length > 0 ? 0 : -1
  );

  if (songActiveIndex.value >= songList.value.length) {
    songActiveIndex.value = 0;
  }

  // 正在播放的歌曲
  const song = computed(() => {
    return songList.value[songActiveIndex.value];
  });

  // 音乐是否正在播放中
  const isPlaying = ref<boolean>(false);

  // 音乐实例
  let audio = new Audio();
  onUnmounted(() => {
    // @ts-ignore
    audio = null;
  });

  watch(
    song,
    async (newSong) => {
      if (newSong && newSong.check.success) {
        if (newSong.url == audio.src) return;
        audio.src = newSong.url;
        audio.load();
        if (isPlaying.value) {
          audio.play().catch(() => {
            audio.pause();
            ElMessage({
              message: "请检查是否被拒绝访问",
              type: "error",
            });
          });
        }
      } else {
        audio.pause();
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    audio.addEventListener("play", () => {
      isPlaying.value = true;
    });
    audio.addEventListener("pause", () => {
      isPlaying.value = false;
    });
  });

  // 循环方式
  enum CycleMode {
    List,
    Single,
    Random,
  }
  const loopMode = ref<CycleMode>();

  const playedtime = ref<number>(0); // 已播放时长
  const speakerWave = ref(audio.volume); // 音量
  onMounted(() => {
    audio.addEventListener("timeupdate", () => {
      playedtime.value = audio.currentTime;
    });
    audio.addEventListener("volumechange", () => {
      speakerWave.value = audio.volume;
    });
  });

  // ==================
  // 拦截，即检查，判断以上 state 的值是否能够改变
  // 通常在操作 state 的所有函数内使用，即提取的复用操作
  // 不同类型的拦截：待斟酌
  // return boolean
  // ==================

  // 播放音乐是否有值检查
  function interceptorHasSong() {
    if (!song.value) {
      ElNotification({
        title: "播放失败",
        message: "请检查歌曲列表",
        zIndex: 999,
      });
      return false;
    }
    return true;
  }

  //   音乐url是否可用
  function interceptorSongCheck() {
    if (!song.value.check.success) {
      audio.pause();
      ElNotification({
        title: "提醒",
        message: "该音乐不可播放：" + song.value.check.message,
        zIndex: 999,
      });
      return false;
    }
    return true;
  }

  //  防抖
  // 这样的写法只能给一个函数 ==> 加入歌单
  // 多个需要则改为对象存储
  let debounceTimer: number | undefined = undefined;
  let debounceOpen: boolean = false;
  function debounce() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debounceOpen = false;
      debounceTimer = undefined;
    }, 600);

    if (!debounceOpen) {
      debounceOpen = true;
      return true;
    }

    if (debounceOpen) {
      ElMessage({
        message: "操作太快",
        type: "error",
      });
      return false;
    }
  }

  // ==================
  // 状态改变
  // ==================

  // 控制播放
  const handleIsPlaying = async (value?: boolean) => {
    if (!interceptorHasSong() || !interceptorSongCheck()) return;
    await nextTick();
    if ((value == undefined && !isPlaying.value) || value) {
      if (audio.src === "") {
        return;
      }
      audio
        .play()
        .then(() => {})
        .catch(() => {
          ElMessage({
            message: "请检查是否被拒绝访问",
            type: "error",
          });
          audio.pause();
        });
    } else {
      audio.pause();
    }
  };

  // 选择歌曲播放, index 选择
  const selectSong = (id: number) => {
    songActiveIndex.value = songList.value.findIndex(
      (song: Song) => song.id == id
    );

    handleIsPlaying(true);
  };

  // 上一曲 index --
  const previousSong = () => {
    if (!interceptorHasSong()) return;
    songActiveIndex.value =
      (songActiveIndex.value - 1 + songList.value.length) %
      songList.value.length;
  };

  //   下一曲 index ++
  const nextSong = () => {
    if (!interceptorHasSong()) return;
    songActiveIndex.value = (songActiveIndex.value + 1) % songList.value.length;
  };

  // 单首加入播放列表
  const pushSong = async (id: number) => {
    if (!debounce()) return;

    let song: Song;

    const preIndex = songList.value.findIndex((song: Song) => song.id == id);
    if (preIndex != -1) {
      song = songList.value.splice(preIndex, 1)[0];
    } else {
      // 歌曲信息
      const { name, fee, dt, ar, al } = (await getSongsDetailByIds([id]))[
        "songs"
      ][0];
      //   console.log("detail", { name, fee, dt, ar, al });
      // 音乐url
      const url = (await getSongsUrlByIds([id]))[0].url;
      //   console.log("url", url);
      // 检查音乐是否可用
      const check = await getSongStatus(id);
      //   歌词
      const lyric = await getSongLyric(id);
      song = { id, name, fee, dt, ar, al, url, check, lyric };
    }

    if (songActiveIndex.value === -1) {
      songList.value = [song];
      songActiveIndex.value = 0;
    } else {
      songList.value.splice(songActiveIndex.value, 0, song);
      songList.value = [...songList.value];
    }

    if (!isPlaying.value) handleIsPlaying(true);
  };

  // 删除歌曲
  const removeSong = (id: number) => {
    let i = songList.value.findIndex((song: Song) => song.id == id);
    if (i == -1) return;

    if (i <= songActiveIndex.value) {
      if (i == songActiveIndex.value) {
        audio.pause();
      }
      songActiveIndex.value = songActiveIndex.value - 1;
    }

    songList.value.splice(i, 1);
    songList.value = [...songList.value];
  };

  // 清空歌曲
  const clearSOngs = () => {
    songList.value = [];
    songActiveIndex.value = -1;
  };

  onUnmounted(() => {
    clearTimeout(debounceTimer);
  });

  return {
    audio,
    songActiveIndex,
    songList,
    song,
    isPlaying,
    loopMode,
    playedtime,
    speakerWave,
    handleIsPlaying,
    nextSong,
    previousSong,
    selectSong,
    pushSong,
    removeSong,
    clearSOngs,
  };
});
