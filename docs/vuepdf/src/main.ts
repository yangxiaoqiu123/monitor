import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import pinia from "@/store";

import "element-plus/theme-chalk/index.css";
const app = createApp(App);
app.use(ElementPlus);
app.use(pinia);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
