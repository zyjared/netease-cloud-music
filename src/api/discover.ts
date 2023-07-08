import { httpInstance } from "@/utils/http";

export async function getBanners(
  type: "pc" | "android" | "iphone" | "ipad" = "pc"
) {
  const types = ["pc", "android", "iphone", "ipad"];
  const res = await httpInstance(
    `/banner?type=${types.findIndex((el) => el == type) + 1}`
  );
  return res.banners;
}

// 推荐歌单
export async function getPersonalized(limit: number = 10) {
  const res = await httpInstance(`/personalized?limit=${limit}`);
  return res.result;
}

// 新歌速递，最新音乐
enum NewsongsType {
  "全部" = 0,
  "华语" = 7,
  "欧美" = 96,
  "日本" = 8,
  "韩国" = 16,
}
export async function getNewsongs(type: NewsongsType = NewsongsType["全部"]) {
  const res = await httpInstance(`/top/song?type=${NewsongsType[type]}`);
  return res.data;
}

// 独家放送 入口
export async function getPrivatecontent() {
  const res = await httpInstance("/personalized/privatecontent");
  return res.result;
}

// 歌单分类
export async function getCatlist() {
  const res = await httpInstance("/playlist/catlist");
  return res;
}

// 热门分类，主要显示的分类
export async function getCatlistHot() {
  const res = await httpInstance("/playlist/hot");
  return res.tags;
}

// 显示分类的歌单
export async function getCatPlaylist(
  cat: string,
  limit: number = 20,
  offset: number = 0
) {
  const res = await httpInstance(
    `/top/playlist?cat=${cat}&limit=${limit}&offset=${offset}`
  );
  return res.playlists;
}
