import { mockSong } from "./mocks/song";
import { mockPlaylist } from "./mocks/playlist";
import { mockComments } from "./mocks/comments";
import { mockDiscover } from "./mocks/discover";
import { mockLogin } from "./mocks/login";
import { mockUser } from "./mocks/user";
import { mockSearch } from "./mocks/search";
import { mockNewsongs } from "./mocks/newsongs";

export function mockAll() {
  mockLogin();
  mockUser();
  mockComments();
  mockDiscover();
  mockPlaylist();
  mockSong();
  mockSearch();
  mockNewsongs();
}
