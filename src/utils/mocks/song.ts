import { mock } from "mockjs";
import urls from "./data/songs/urls.json";
import details from "./data/songs/details.json";
import checks from "./data/songs/checks.json";
import lyrics from "./data/songs/lyrics.json";


export function mockSong() {
  mock(/\/song\/url\/v1/, (options) => {
    let url = options.url.match(/=(\d+)?\&/g);
    let id = url![0].slice(1, -1);
    // console.log("url", id);
    // @ts-ignore
    return urls[id];
  });

  mock(/\/song\/detail/, (options) => {
    let url = options.url.match(/=(\d+)/g);
    let id = url![0].slice(1);
    // console.log("detail", id);
    // @ts-ignore
    return details[id];
  });

  mock(/\/check\/music/, (options) => {
    let url = options.url.match(/=(\d+)?\&/g);
    let id = url![0].slice(1, -1);
    // console.log("check", id);
    // @ts-ignore
    return checks[id];
  });

  mock(/\/lyric/, (options) => {
    let url = options.url.match(/=(\d+)/g);
    let id = url![0].slice(1);
    // console.log("lyric", id);
    // @ts-ignore
    return lyrics[id];
  });
}
