import LayoutAside from '../components/layout-aside.vue'
import LayoutHeader from '../components/layout-header.vue'
import BreadCrumb from '../components/common/bread-crumb.vue'

export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册
    Vue.component('layout-header', LayoutHeader)// 全局注册
    Vue.component('bread-crumb', BreadCrumb)// 全局注册一个面包屑组件
  }
}
