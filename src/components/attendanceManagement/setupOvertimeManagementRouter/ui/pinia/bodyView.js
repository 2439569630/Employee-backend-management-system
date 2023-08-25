import { defineStore } from "pinia";

/**
 * 1:请假记录,2:添加请假
 * Switching of components is done by changing the value of the variable "bodyView"
 * 组件的切换是通过更改变量“bodyView”的值来完成的
 */
export const useSwitchingOFcomponentsStatus = defineStore('useSwitching',{
    state: () => {
        return {
            index: '1'
        }
    },
})

/**
 * 存放表格状态
 * Store table status
 */
export const useTableStatus = defineStore('useTableStatus',{
    state: () => {
        return {
            data: [], // 当前页数据
        }
    }
})
/**
 * 存放分页状态 
 */
export const usePagingStatus = defineStore('usePagingStatus',{
    state: () => {
        return {
            total_rows: 0, // 总行数
            page: 1, // 当前页
            rows: 20, // 每页行数
        }
    }
})