import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home'
// import Commont from '../views/comment/index.vue'
Vue.use(VueRouter)

const routes = [
  {// 强制跳转
    path: '/',
    redirect: '/home'
  },
  {
    // 主页
    path: '/home',
    name: 'hoem',
    component: Home,
    children: [{
      path: '', // 二级路由，什么都不写，作为显示组件
      component: Home2
    }, {
      // 二级路由表
      // path: '../views/comment', // 完整地址
      path: 'comment', // 相对地址
      component: () => import('../views/comment/index.vue')// 按需加载
      // component: Commont
    }, {
      path: 'material', // 素材列表管理
      component: () => import('../views/material/index.vue')// 按需加载
    },
    {
      path: 'articles', // 相对地址
      component: () => import('../views/articles/index.vue')// 按需加载
      // component: Commont
    },
    {
      path: 'publish/:articleId', // 相对地址   //此规则只匹配修改文章
      component: () => import('../views/publish/index.vue')// 按需加载
      // component: Commont
    },
    {
      path: 'publish', // 相对地址   //此规则只匹配新增发布文章
      component: () => import('../views/publish/index.vue')// 按需加载
      // component: Commont
    }
      //   {
      //     path: 'account', // 账户信息
      //     component: () => import('../views/account') // 按需加载
      //   }]
      // }+++++++
    ]

  },
  {
    // 登录页面 ,
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
