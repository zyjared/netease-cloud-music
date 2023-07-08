import { useCookie } from "@/stores/cookie";
import { httpInstance } from "@/utils/http";

export async function getSubcount() {
  const res = await httpInstance({
    url: "/user/subcount",
    params: {
      cookie: useCookie().cookie,
    },
  });
  return res;
}
