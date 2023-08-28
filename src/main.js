import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as ConfirmDialog from 'vuejs-confirm-dialog'

const app = createApp(App);

app.use(router);
app.use(ConfirmDialog);

app.mount("#app");
