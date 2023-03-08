import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import "./assets/iconfont/iconfont.js"
import "./assets/iconfont/iconfont.css"
import "./assets/iconfont-plus/iconfont.js"
import "./assets/iconfont-plus/iconfont.css"
import Plugins from "./components/index.js"
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
axios.defaults.baseURL ='http://81.68.210.170:8081'
Vue.use(ElementUI);
Vue.use(Plugins);
new Vue({
  router,
  axios,
  store,
  data(){
		return{
			openIndex:"1-3",
			query: {
				currentPage: 1,
				pageSize: 10
			},
			queryTemp: {
				currentPage: 1,
				pageSize: 10
			},
			key:''
		}
	},
  render: h => h(App)
}).$mount('#app')


