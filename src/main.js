import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// import "@vime/core/themes/default.css";
import "./index.css";
// import VueAxios from "vue-axios";
// import axios from "axios";
import "hls.js";

// createApp(App).use(store).use(ElementPlus).mount("#app");
createApp(App).use(store).mount("#app");
