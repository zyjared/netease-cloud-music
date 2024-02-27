

[Vue3](https://cn.vuejs.org/)、[Pinia](https://pinia.web3doc.top/)、[Vue Router](https://router.vuejs.org/zh/) 等。

喜欢在平板上打开<a href="https://music.163.com/" title="网易云音乐官网">
网易云音乐
<img src="public/netease-cloud-music.svg" style="display:inline-block; height: 1em;vertical-align:middle;" />
</a>，半屏的子页面层叠使用很舒适。


## 关于 api

可以在 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 查看详情。

默认使用 [mock](http://mockjs.com/) 的数据。

## 演示

静态演示地址：[https://zyzstudy.gitee.io/](https://zyzstudy.gitee.io/)

```shell
$ git clone https://github.com/yujiangz/netease-cloud-music.git
$ cd netease-cloud-music
$ npm install
$ npm run dev
```

如果不使用 mock，则需要阅读 [关于 api](#关于-api)。除此之外，还需要在 `src/utils/mock.ts` 注释掉不需要 mock 的部分。
