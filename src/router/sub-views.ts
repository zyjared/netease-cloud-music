import { Component, defineAsyncComponent } from "vue";
import { SubViews, ToViewName } from "@/types";

export interface SubView<T extends ToViewName> {
  toview: T;
  params: SubViews[T];
  view: {
    component: Component;
    n: number;
  };
  id: number;
}

const userComponent = defineAsyncComponent(
  () => import("@/views/SubViews/User/index.vue")
);

const playlistComponent = defineAsyncComponent(
  () => import("@/views/SubViews/Playlist/index.vue")
);

const commentComponent = defineAsyncComponent(
  () => import("@/views/SubViews/Comment/index.vue")
);

// const commentEventComponent = defineAsyncComponent(
//   () => import("@/views/SubViews/Comment/Event.vue")
// );

// const commentPlaylistComponent = defineAsyncComponent(
//   () => import("@/views/SubViews/Comment/Playlist.vue")
// );

export const views: {
  [k in ToViewName]: { component: Component; n: number };
} = {
  user: {
    component: userComponent,
    n: 1,
  },
  playlist: {
    component: playlistComponent,
    n: 1,
  },
  comment: {
    component: commentComponent,
    n: 1,
  },
//   commentEvent: {
//     component: commentEventComponent,
//     n: 1,
//   },

//   commentPlaylist: {
//     component: commentPlaylistComponent,
//     n: 1,
//   },
};
