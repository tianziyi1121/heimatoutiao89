// 权限拦截 导航守卫
import router from '../router'
// 全局前置守卫
router.beforeEach((to, form, next) => {
  // 判断拦截地址、to里面的path属性可以获取当前页面地址
//   to ：router 要跳转到页面(即将要进入的目标) from 当前导航正要离开的路由
  // next() 通过放行可以跳转到主页  next(false)停止跳转  next('/login')拦截(禁止跳转到主页)强制跳转到登录页面
  if (to.path.startsWith('/home')) {
    //   进行权限判断 判断有无token 如果有token的话就放过 没有就回到登录页面
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 思路:先判断要跳转到的地址是不是主页里面的,如果是则用next(路径),若不是则放行,然后在判断要跳到主页里面的
// 是否携带了令牌,若携带了,则放行,没携带转回登录界面,
