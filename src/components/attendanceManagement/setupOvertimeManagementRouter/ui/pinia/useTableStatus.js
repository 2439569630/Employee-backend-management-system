import { defineStore } from "pinia";
import axios from '@/axios/axios.js'
import { usePagingStatus } from './usePagingStatus.js'
import { ElMessage } from 'element-plus'
const pagingStatus = usePagingStatus()

/**
 * 存放表格状态
 * Store table status
 */
export const useTableStatus = defineStore('useTableStatus', {
    state: () => {
        return {
            data: [], // 当前页数据
            search: false, // 是否搜索
            // 需要搜索的值
            searchValue: '',
        }
    },
    actions: {
        /**
         * @param  {...any} updates 需要更新的状态的参数
         */
        useTableStatus: function (...updates) {
            // 遍历传入的属性并更新状态
            for (const update of updates) {
                for (const key in update) {
                    if (key in this) {
                        this[key] = update[key];
                    }
                }
            }
        },
        // 当search发生变化时，重置searchValue
        setSearch: async function (value) {
            this.search = value;
            if (!value) {
                this.search = false;
                this.searchValue = null;
            }
        },
        /**
         * 根据搜索值搜索数据
         * @param {*} page 页码
         * @param {*} rows 行数
         * @param {*} name 姓名
         */
        async searchValueData() {
            try {
                // 获取页码和行数
                const page = pagingStatus.page;
                const rows = pagingStatus.rows;
                const response = await new Promise((resolve, reject) => {
                    axios.post('/overtime/overtimeManagement/searchName', {
                        name: this.searchValue,
                        page: page,
                        rows: rows,
                    })
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
                })

                
                // 更新表格状态
                this.useTableStatus({
                    data: response.dataRows
                });

                // 更新分页状态
                pagingStatus.updatePagingStatus({
                    page: page,
                    total_rows: response.totalRows
                });
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 当点击清空按钮时，重置search：false、searchValue：''、page：1、rows：10
         */
        cleanUp() {
            // 重置search
            this.useTableStatus({
                search: false,
            })
            // 调用usePagingStatus中的updatePagingStatus方法重置page和rows
            pagingStatus.updatePagingStatus({
                page: 1,
                rows: 20
            })
            // 重置完，重新获取数据
            this.getCurrentPageData()
        },

        /**
         * 获取当前页数据
         */
        async getCurrentPageData() {
            try {
                const response = await new Promise((resolve, reject) => {
                    axios.post('/overtime/overtimeManagement', {
                        page: pagingStatus.page,
                        rows: pagingStatus.rows
                    })
                        .then((response) => {
                            resolve(response.data);
                        })
                        .catch((error) => {
                            reject(error);
                        })
                })
                // 更新表格状态
                this.useTableStatus({
                    data: response
                })
                // 更新总行数
                pagingStatus.getPagingData()
                
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

    },

})