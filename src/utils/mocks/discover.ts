import { mock } from "mockjs";
import dataPlaylist from "./data/discover-playlist.json";
import dataBanner from "./data/banner.json";

export function mockDiscover() {
  mock(/\/personalized/, dataPlaylist);

  mock(/\banner/, dataBanner);
}
