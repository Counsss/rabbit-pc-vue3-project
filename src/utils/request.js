// 1.创建一个axios实例
// 2.请求拦截器:如果有token 头部携带
// 3.响应拦截器: 1.玻璃无效数据 2.处理token失效
// 4.导出一个函数，调用当前的axsio实例发请求，返回值promise
import router from "@/router";
import store from "@/store";
import axios from "axios";

export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置的拦截
  // 如果本地有token就在头部携带

  // 1.获取用户信息对象
  const { profile } = store.state.user
  // 2. 判断是否存在token
  if (profile.token) {
    // 3.设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

//响应拦截器
// res => res.data  取出data数据，将来调用接口的时候直接拿到的就是后台的数据
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码，进入该函数
  if (err.response && err.response.status === 401) {
    // 1. 清空无效用户信息
    // 2. 跳转到登录页
    // 3. 跳转需要传参（当前路由地址）给登录页码
    store.commit('user/setUser', {})
    // 当前路由地址
    // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
    // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // encodeURIComponent 转换url编码，防止解析地址出问题
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

//请求工具函数
export default (url, method, submitData) => {
  //负责发请求,请求地址,请求方式,提交的数据
  return instance({
    url,
    method,
    // 1.如果是get请求  需要使用params来传递submitData
    // 2.如果不是get请求  需要使用data来传递submitData
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}