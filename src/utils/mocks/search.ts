import { mock } from "mockjs";
import searchHot from "./data/search-hot.json";

export function mockSearch() {
  mock(/\/search\/hot\/detail/, searchHot);
}
