import { defineStore } from "pinia";
import { Component, shallowRef } from "vue";
import { SubViews, ToViewName, ToView } from "@/types";
import { views } from "@/router/sub-views";

// 作为 subview 的路由
// src/compenents/global/

export interface SubView<T extends ToViewName> {
  toview: T;
  params: SubViews[T];
  view: {
    component: Component;
    n: number;
  };
  id: number;
}

export const useSubView = defineStore("subView", () => {
  let id = 0;
  const subViews = shallowRef<SubView<ToViewName>[]>([]);

  function replaceView<T extends ToViewName>(args: ToView<T>) {
    id++;
    subViews.value.splice(subViews.value.length - 1, 1, {
      ...args,
      view: views[args.toview],
      id,
    });
  }

  function pushView<T extends ToViewName>(args: ToView<T>) {
    id++;
    subViews.value.push({
      ...args,
      view: views[args.toview],
      id,
    });
  }

  function toView<T extends ToViewName>(args: ToView<T> | null | undefined) {
    if (!args) return;
    const length = subViews.value.length;
    if (length == 0 || subViews.value[length - 1].toview != args.toview) {
      pushView(args);
    } else {
      if (subViews.value[length - 1].params == args.params) return;
      replaceView(args);
    }
    subViews.value = [...subViews.value];
  }

  function backView() {
    if (subViews.value.length == 0) return;
    subViews.value.pop();
    subViews.value = [...subViews.value];
  }

  function clearViews() {
    subViews.value = [];
  }

  return {
    subViews,
    toView,
    backView,
    clearViews,
  };
});
