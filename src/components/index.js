import LayoutAside from '../components/layout-aside.vue'
import LayoutHeader from '../components/layout-header.vue'

export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册
    Vue.component('layout-header', LayoutHeader)
  }
}
