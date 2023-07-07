import { httpInstance } from "@/utils/http";

export async function getSearchHot() {
  const res = await httpInstance("/search/hot/detail");
  return res.data;
}
