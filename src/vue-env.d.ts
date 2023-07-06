declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componenetOptions: ComponentOptions;
  export type SelfProps = { [k: string]: any };
  export default componenetOptions;
}
