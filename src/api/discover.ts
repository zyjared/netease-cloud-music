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

export async function getPersonalized(limit: number=10) {
  const res = await httpInstance(`/personalized?limit=${limit}`);
  return res.result;
}
