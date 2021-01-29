import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import utils from "./utils"

/* Import styles */

import "@renderer/themes/common.less"
import "@renderer/assets/icons"

/* createApp */

const app = createApp(App)

/* Config */

app.config.globalProperties.utils = utils
// app.config.productionTip = false

/* Initial */

app
  .use(store)
  .use(router)
  .mount("#app")
