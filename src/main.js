import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@vime/core/themes/default.css";

createApp(App).use(store).use(ElementPlus).mount("#app");
