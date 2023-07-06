import { httpInstance } from "@/utils/http";

export async function getCommentEvent(threadId: string) {
  const res = await httpInstance(`/comment/event?threadId=${threadId}`);
  //   console.log(res);
  return res;
}

export async function getCommentPlaylist(id: number) {
  const res = await httpInstance(`/comment/playlist?id=${id}`);
  //   console.log(res);
  //   console.log(id);
  return res;
}

export async function getCommentSong(id: number) {
  const res = await httpInstance(`/comment/music?id=${id}`);
  return res;
}

export async function getComment(
  id: number | string,
  commentType: "event" | "playlist" | "song"
) {
  let res;
  switch (commentType) {
    case "event":
      res = await getCommentEvent(id as string);
      break;
    case "playlist":
      res = await getCommentPlaylist(id as number);
      break;
    case "song":
      res = await getCommentSong(id as number);
      break;
  }
  return res;
}
