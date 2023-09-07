import { defineStore } from "pinia";
import { ElMessage } from 'element-plus'
import axios from '@/axios/axios.js'
/**+
 * 存放分页状态 
 */
export const usePagingStatus = defineStore('usePagingStatus',{
    state: () => {
        return {
            total_rows: 0, // 总行数
            page: 1, // 当前页
            rows: 20, // 每页行数
        }
    },
    actions: {
        /**
         * 更新分页状态
         */
        updatePagingStatus:  function (...updates) {
            // 遍历传入的属性并更新状态
            for (const update of updates) {
                for (const key in update) {
                    if (key in this) {
                        this[key] = update[key];
                    }
                }
            }
        },
        /**
         * 更新总行数
         */
        async getPagingData() {
            try {
                const total =  await new Promise((resolve, reject) => {
                    axios.post('/overtime/overtimeManagement/pagingData')
                    .then((res) => {
                        resolve(res.data.total_rows)
                    })
                    .catch((err) => {
                        reject(err)
                    })
                })
                this.updatePagingStatus({
                    total_rows: total,
                })
            }
            catch (error) {
                ElMessage({
                    message: '获取数据失败',
                    grouping: true,
                    type: 'error',
                })
                console.error(error);
            }
        }
    }
})