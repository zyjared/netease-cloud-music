import { mockSong } from "./mocks/song";
import { mockPlaylist } from "./mocks/playlist";
import { mockComments } from "./mocks/comments";
import { mockDiscover } from "./mocks/discover";
import { mockLogin } from "./mocks/login";
import { mockUser } from "./mocks/user";

export function mockAll() {
  mockSong();
  mockPlaylist();
  mockComments();
  mockDiscover();
  mockLogin();
  mockUser();
}
