import { mock } from "mockjs";
import userPlaylist from "./data/user-playlist.json";

export function mockUser() {
  // 用户展示页
  mock(/\/user\/detail/, {
    createTime: 1449302301978,
    createDays: 2764,
    profile: {
      userId: 110568337,
      //   userId: 32953014,
      nickname: "陵游",
      backgroundUrl: "/static/images/bg.jpg",
      avatarUrl: "/avatar.jpg",
      eventCount: 1, // 动态
      followeds: 9, // 粉丝
      follows: 9, // 关注
      vipType: 11,
    },
  });

  // 用户展示页
  // 动态
  mock(/\/user\/event/, {
    code: 200,
    "events|1-10": [
      {
        threadId: "A_EV_2_19709905069_110568337",
        "id|+1": 1,
        "eventTime|+10000000": 1633270176686,
        user: {
          userId: 110568337,
          nickname: "陵游",
          avatarUrl: "/static/images/avatar.jpg",
          vipType: 11,
        },

        "type|1": [35, 18],

        "bottomActivityInfos|0-3": [
          {
            "id|+1": 0,
            name: "集合吧村民",
          },
        ],

        "pics|1-5": [
          {
            height: 100,
            width: 100,
            originUrl: "/static/images/bg.jpg",
            squareUrl: "/static/images/bg.jpg",
            rectangleUrl: "/static/images/bg.jpg",
            pcSquareUrl: "/static/images/bg.jpg",
            pcRectangleUrl: "/static/images/bg.jpg",
          },
        ],

        // 原返回值类型，将在处理后删除
        json: '{"msg":"#晒晒我的村民证# 一日持证，终生村民","soundeffectsInfo":null}',
        info: {
          commentThread: {
            "shareCount|1-100": 9,
            "commentCount|1-100": 9,
            "likedCount|1-100": 7,
          },
        },
      },
    ],
  });

  // 用户歌单
  mock(/\/user\/playlist\?uid.*/, userPlaylist);
}
