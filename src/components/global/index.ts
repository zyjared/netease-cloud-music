import { App } from "vue";
import SubLink from "./SubLink.vue";
import SubView from "./SubView.vue";
import SubContainer from "./SubContainer.vue";
import Loading from "./Loading.vue";

export const globalComponent = {
  install(app: App<Element>) {
    app.component("sub-link", SubLink);
    app.component("sub-view", SubView);
    app.component("sub-container", SubContainer);
    app.component("is-loading", Loading);
  },
};
