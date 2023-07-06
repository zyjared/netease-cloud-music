import { httpInstance } from "@/utils/http";


// 用户展示页
// 用户信息
export async function getUserDetail(uid: number) {
  const res = await httpInstance(`/user/detail?uid=${uid}`);
  return res;
}

// 用户展示页
// 动态
export async function getUserEvent(uid: number) {
  const res = await httpInstance(`/user/event?uid=${uid}`);
  return res;
}
