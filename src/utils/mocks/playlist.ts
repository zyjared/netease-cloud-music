import { mock } from "mockjs";
import playlistData from "./data/playlist.json";

export function mockPlaylist() {
  mock(/\/playlist\/detail/, playlistData);
}
