import { ComponentOptions, defineAsyncComponent } from "vue";
import { SubViews, ToViewName } from "@/types";

export interface SubView<T extends ToViewName> {
  toview: T;
  params: SubViews[T];
  view: {
    component: ComponentOptions;
    n: number;
  };
  id: number;
}

export const views: {
  [k in ToViewName]: { component: ComponentOptions; n: number };
} = {
  user: {
    component: defineAsyncComponent(
      () => import("@/views/SubViews/User/index.vue")
    ),
    n: 1,
  },
  playlist: {
    component: defineAsyncComponent(
      () => import("@/views/SubViews/Playlist/index.vue")
    ),
    n: 1,
  },
  comment: {
    component: defineAsyncComponent(
      () => import("@/views/SubViews/Comment/index.vue")
    ),
    n: 1,
  },
  commentEvent: {
    component: defineAsyncComponent(
      () => import("@/views/SubViews/Comment/Event.vue")
    ),
    n: 1,
  },

  commentPlaylist: {
    component: defineAsyncComponent(
      () => import("@/views/SubViews/Comment/Playlist.vue")
    ),
    n: 1,
  },
};
