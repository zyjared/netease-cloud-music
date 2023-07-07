import { mock } from "mockjs";
import newsongsAll from "./data/newsongs-all.json";

export function mockNewsongs() {
  mock(/\/top\/song/, newsongsAll);
}
