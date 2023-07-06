import { ref, watchEffect, watch, computed, h } from "vue";
import { getLoginingStatus, getQrImg, getQrKey } from "@/api/login";

import { useCookie } from "@/stores/cookie";
import { ElNotification } from "element-plus";
import { IconNeteaseCloudMusic } from "@/components/icons";

export function useLogin() {
  enum LoginType {
    Start = "wait",
    KeySuccess = "keySuccess",
    KeyFail = "error",
    QrSuccess = "qrSuccess",
    QrFail = "qrFail",
    QrOver = "error",
    Error = "error",
    Success = "success",
    Fail = "fail",
  }

  const cookieStore = useCookie();

  const loginType = ref<null | LoginType>(null);
  const loading = computed(() => {
    if (loginType.value === null) return;
    return [LoginType.Start, LoginType.KeySuccess].includes(loginType.value);
  });

  const loginKey = ref<null | string>(null); // 登录key
  const loginImg = ref<any>(null); // 登录图片

  //   key 值改变后，img 自动改变
  watchEffect(async () => {
    if (!loginKey.value) return;
    const img = await getQrImg(loginKey.value);

    if (!img) {
      loginType.value = LoginType.QrFail;
      return;
    }

    loginType.value = LoginType.QrSuccess;
    loginImg.value = img;
  });

  //   img 得到后，应该执行的主逻辑
  let timer: number | undefined = undefined;
  watch(loginImg, async (img) => {
    clearInterval(timer);

    if (!img || !loginKey.value) {
      return;
    }

    timer = setInterval(async () => {
      if (loginType.value !== LoginType.QrSuccess) {
        clearInterval(timer);
        return;
      }

      const statusRes = await getLoginingStatus(loginKey.value!);
      console.log("扫码状态：待扫码。", statusRes.code);

      if (statusRes.code == "800") {
        console.log("二维码过期");
        loginType.value = LoginType.QrOver; // type: 登录失败，二维码过期
      }
      if (statusRes.code == "803") {
        console.log("登录成功");
        ElNotification({
          title: "登录成功",
          message: "欢迎回来",
          icon: h(IconNeteaseCloudMusic, { style: "color: red;" }),
        });
        loginType.value = LoginType.Success; // type: 登录成功
        cookieStore.updateCookie(statusRes.cookie);
      }
    }, 3000);
  });

  //   登录时，只操作 key 便会自动执行主要的步骤
  async function login() {
    loginType.value = LoginType.Start;
    const key = await getQrKey();
    if (!key.unikey) {
      loginType.value = LoginType.KeyFail;
      return;
    }
    loginKey.value = key.unikey;
    loginType.value = LoginType.KeySuccess;
  }

  async function loginCancel() {
    loginType.value = null;
    loginKey.value = null;
    loginImg.value = null;
  }

  return {
    loginType,
    loginKey,
    loginImg,
    loading,
    login,
    loginCancel,
  };
}
