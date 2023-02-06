import Vue from 'vue'
import App from './App.vue'
import Element from "element-ui"
import axios from "axios"
import "element-ui/lib/theme-chalk/index.css"
import "./assets/iconfont/iconfont.js"
import "./assets/iconfont/iconfont.css"
import "./assets/iconfont-plus/iconfont.js"
import "./assets/iconfont-plus/iconfont.css"
import router from "./router/index.js";
import Plugins from "./components/index.js";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:8848";
Vue.use(Element);
Vue.use(Plugins);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
