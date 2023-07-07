import { mock } from "mockjs";
import dataPlaylist from "./data/discover-playlist.json";
import dataBanner from "./data/banner.json";
import dataPrivatecontent from "./data/discover-privatecontent.json";
import dataCatlist from "./data/discover-catlist.json";
import dataCatlistHot from "./data/discover-catlisthot.json";
import dataHuayu from "./data/discover-catplaylist-huayu.json";
import dataQuanbu from "./data/discover-catplaylist-quanbu.json";

export function mockDiscover() {
  mock(/\/personalized\?limit=.*/, dataPlaylist);

  mock(/\/banner/, dataBanner);

  mock(/\/personalized\/privatecontent/, dataPrivatecontent);

  mock(/\/playlist\/catlist/, dataCatlist);

  mock(/\/playlist\/hot/, dataCatlistHot);

  mock(/\/top\/playlist\?cat/, (options) => {
    if (options.url.includes("全部")) {
      return dataHuayu;
    } else {
      return dataQuanbu;
    }
  });
}
