import { mock } from "mockjs";
import mvFirst from "./data/mv-first.json";

export function mockMv() {
  mock(/\/mv\/first/, mvFirst);
}
