import { App } from "vue";
import SubLink from "./SubLink.vue";
import SubView from "./SubView.vue";
import SubContainer from "./SubContainer.vue";

export const globalComponent = {
  install(app: App<Element>) {
    app.component("sub-link", SubLink);
    app.component("sub-view", SubView);
    app.component("sub-container", SubContainer);
  },
};
