import { httpInstance } from "@/utils/http";


export async function getMvFirst(limit: number = 30, area: string = "") {
  const res = await httpInstance({
    url: "/mv/first",
    params: {
      area,
      limit,
    },
  });
  return res.data;
}
