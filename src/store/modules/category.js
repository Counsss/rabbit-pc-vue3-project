import { topCategory } from "@/api/constants"
import { findAllCategory } from "@/api/category"
// 分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合
      list: topCategory.map(item => ({ name: item }))
    }
  }
}
