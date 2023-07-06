import { mock } from "mockjs";
import commentPlaylist from "./data/comment-playlist.json";

export function mockComments() {
  mock(/\/comment\/playlist/, commentPlaylist);

  mock(/\/comment\/event/, {
    comments: [],
    hotComments: [],
    topComments: [],
  });
}
