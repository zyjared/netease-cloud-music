import { httpInstance } from "@/utils/http";

// standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res
// /song/url/v1?id=405998841,33894312&level=lossless
type SongsUrl = {
  id: string;
  url: string;
  level: string;
  size: string;
}[];
export async function getSongsUrlByIds(
  ids: number[],
  level: number = 0
): Promise<SongsUrl> {
  const levels = ["standard", "higher", "exhigh", "lossless", "hires"];
  const res = await httpInstance(
    `/song/url/v1?id=${ids.join(",")}&level=${levels[level % levels.length]}`
  );
  // console.log(res);
  return res.data;
}

//  0: 免费或无版权
//   1: VIP 歌曲
//   4: 购买专辑
//   8: 非会员可免费播放低音质，会员可播放高音质及下载
//   fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
type SongsDetail = {
  privileges: any[];
  songs: {
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
  }[];
};
export async function getSongsDetailByIds(ids: number[]): Promise<SongsDetail> {
  const res = await httpInstance(`/song/detail?ids=${ids.join(",")}`);
  return res;
}

// 不传参时，地址默认为 br = 999000
export async function getSongStatus(id: number, br: 320000 | 999000 = 320000) {
  const res = await httpInstance(`/check/music?id=${id}&br=${br}`);
  return res;
}

export async function getSongLyric(id: number) {
  const res = await httpInstance(`/lyric?id=${id}`);
  //   有音乐 的url : res.url
  return res.lrc ? res.lrc.lyric : "";
}
