import { useCookie } from "@/stores/cookie";
import { httpInstance } from "@/utils/http";

const cookieStore = useCookie();

export async function getFriendsEvent(
  pagesize: number = 20,
  lasttime: number = -1
) {
  const res = await httpInstance({
    url: `/event`,
    params: {
      pagesize,
      lasttime,
      cookie: cookieStore.cookie,
    },
  });
  return res;
}
