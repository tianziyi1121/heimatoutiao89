// 对axios进行一个封装
import axios from 'axios' // 先引入axios包
import router from '../router' // 引入路由实例对象 为了下面跳转页面
import { Message } from 'element-ui' // 引入这个包 为了下面错误的提示信息时使用里面的东西
import JSONBig from 'json-bigint' // 引入第三方包 为了解决大数据的问题
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
// 发送axiso请求 在未到服务器之前 做一些业务处理  请求拦截器
axios.interceptors.request.use(function (config) {
  // 请求成功
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config // 返回的config会作为新的请求选项 进行请求
}, function () {
  // 执行请求失败

})
//
// 后台数据到达 响应拦截器之前 执行的一个函数
axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data) // jsonbig.parse 替换 json.parse  保证数据的正确
}]

// 响应拦截
axios.interceptors.response.use((response) => {
  // 成功时执行
  return response.data ? response.data : {} // 为了解决data不存在时,then中读取数据报错问题  underfined.name会报错,var obj={},log(obj.name)返回underfined
}, function (error) {
  // 失败时执行  状态码不是200或者201时执行 所有的失败都会进入到第二个函数
  let status = error.response.status
  let message = ''
  //   let massgae = '',
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      window.localStorage.removeItem('user-token')// 删除token
      // 因为都是同样的原因,但是是不同的状态码,所以我们需要俩个判断条件,先判断是否是相同的地址,在看请求的状态码
      router.push('/login')// resfehtoken 过期,用来换取token
      break
    case 507:
      message = '服务器数据异常'
      break
    case 404:
      message = '手机号不正确'
      break
    case 401:
      window.localStorage.removeItem('user-token') // 因为令牌过期了 所以要强制删除token
      router.push('/login')// token过期
      break
    default:
      break
  }
  Message({ type: 'warning', message })// 提示消息

  // 状态码提示
  // 想让错误拦截器的内容继续进入到以后的catch中 而不进入then  必须return
  return Promise.reject(error)
})

export default axios

//   执行请求成功时  config可以拿到所有的请求对象  是发送请求的配置信息

// 注: 响应拦截 先执行拦截器后执行then
