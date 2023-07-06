import { httpInstance as http } from "@/utils/http";

// 生成登录二维码

// 获取 key
export async function getQrKey(): Promise<{ unikey: string }> {
  const res = await http({
    url: `/login/qr/key?timestamp=${Date.now()}`,
  });
  return res.data;
}

// 根据 key 获得二维码
export async function getQrImg(key: string) {
  const res = await http({
    url: `/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`,
  });
  return res.data.qrimg;
}

// 根据 key 检查二维码状态
export async function getLoginingStatus(
  key: string,
  timestamp: boolean = true
): Promise<{
  code: number | string;
  message: string;
  cookie: string;
}> {
  const res = await http({
    url:
      `/login/qr/check?key=${key}` +
      (timestamp ? `&timestamp=${Date.now()}&noCookie=false` : ""),
  });
  return res;
}

// 获取 登录状态
export async function getLoginStatus(
  cookie: string = "",
  timestamp: boolean = true
) {
  const res = await http({
    url: timestamp ? `/login/status?timestamp=${Date.now()}` : "/login/status",
    method: "post",
    data: {
      cookie,
    },
  });
  return res.data;
}
