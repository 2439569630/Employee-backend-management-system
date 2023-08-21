import { defineStore } from 'pinia'

/**
 * 个人信息对象。
 * @property {string} name - 用户名。
 * @property {number} limitsOfAuthority - 用户的权限。
 */
export const useStore = defineStore('userStatus', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      name: 'admin', // 用户名
      limitsOfAuthority: 0, // 权限等级
    }
  },
})

