import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui' // 引入包
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入初始化样式
import axios from 'axios' //  引入axios
import Component from './components/index.js' // 引入组件对象

Vue.config.productionTip = false
Vue.prototype.$axios = axios // 赋值给全局对象
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条得默认地址
Vue.use(ElementUI) // 全局注册
Vue.use(Component) // 注册全局组件对象 并调用该对象的一个方法  install

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
