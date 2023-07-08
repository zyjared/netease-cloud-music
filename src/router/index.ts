import { createRouter, createWebHistory } from "vue-router";
import { useSubView } from "@/stores/subView";
import { useLoadingStore } from "@/stores/loading";

const routes = [
  {
    path: "/",
    redirect: "/discover",
  },
  {
    path: "/discover",
    component: () => import("@/views/Discover/index.vue"),
    redirect: "/discover/recommend",
    children: [
      {
        path: "recommend",
        component: () => import("@/views/Discover/views/Recommend.vue"),
        meta: {
          title: "推荐",
        },
      },
      {
        path: "songlist",
        component: () => import("@/views/Discover/views/songlist.vue"),
        meta: {
          title: "歌单",
        },
      },
      //   {
      //     path: "ranking",
      //     component: () => import("@/views/Discover/views/Ranking.vue"),
      //     meta: {
      //       title: "排行榜",
      //     },
      //   },
      {
        path: "newsongs",
        component: () => import("@/views/Discover/views/Newsongs.vue"),
        meta: {
          title: "新歌",
        },
      },
    ],
  },
  {
    path: "/mv",
    component: () => import("@/views/Mv/index.vue"),
    redirect: "/mv/handpick",
    children: [
      {
        path: "handpick",
        component: () => import("@/views/Mv/views/Handpick.vue"),
      },
    ],
  },
  {
    path: "/mine",
    component: () => import("@/views/Mine/index.vue"),
  },
  {
    path: "/friends",
    component: () => import("@/views/Friends/index.vue"),
  },
  {
    path: "/account",
    component: () => import("@/views/Account/index.vue"),
  },
  {
    path: "/icons",
    component: () => import("@/components/Icons/index.vue"),
  },
  {
    path: "/test",
    component: () => import("@/test/test.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  useLoadingStore().init();
});

router.afterEach(() => {
  useSubView().clearViews();
  return true;
});

export default router;
