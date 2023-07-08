import { mock } from "mockjs";
import friendsEvent from "./data/friends-event.json";

export function mockFriends() {
  mock(/\/event/, friendsEvent);
}
