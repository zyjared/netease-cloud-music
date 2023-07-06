import { httpInstance } from "@/utils/http";

export async function getPlaylistDetail(id: number, cookie = "") {
  const res = await httpInstance({
    url: `/playlist/detail`,
    method: "post",
    params: {
      id,
      cookie,
      timestamp: Date.now(),
    },
  });
//   console.log(res);
  return res.playlist;
}
