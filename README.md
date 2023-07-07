# 网易云音乐 - 前端

[Vue3](https://cn.vuejs.org/)、[Pinia](https://pinia.web3doc.top/)、[Vue Router](https://router.vuejs.org/zh/) 等。

喜欢在平板上打开<a href="https://music.163.com/">
网易云音乐
<img src="public/netease-cloud-music.svg" style="display:inline-block; height: 1em;vertical-align:middle;" />
</a>，半屏的子页面层叠使用很舒适。

## 效果图
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
<img src="docs/images/01.png" alt="音乐播放界面图" />
<img src="docs/images/01-1.png" alt="音乐播放界面歌词图" />
<img src="docs/images/02.png" alt="歌单图" />
<img src="docs/images/03.png" alt="歌单分类图" />
<img src="docs/images/04.png" alt="账号界面图" />
<img src="docs/images/05.png" alt="载入过渡图" />
<img src="docs/images/06.png" alt="主页与评论图" style="grid-column: span 2;" />
</div>

## 关于 api

可以在 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 查看详情。

默认使用 [mock](http://mockjs.com/) 的数据。

## 演示

```shell
$ git clone https://github.com/yujiangz/netease-cloud-music.git
$ cd netease-cloud-music
$ npm install
$ npm run dev
```

如果你选择不使用 mock 的数据，则需要阅读 [关于 api](#关于-api)。除此之外，你还需要在 `src/utils/mock.ts` 注释掉你不需要 mock 的部分。

> 或者等我后面部署，部署后，该页将更新链接。

## 联系

- [我的主页](https://yustudy.cn)
- Q: 528802378
