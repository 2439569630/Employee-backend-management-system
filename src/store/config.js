/**
 * 全局配置
 */
import { defineStore } from 'pinia'
// 导入通用防抖函数
import { Debounce } from '@router/./../Universalfunction/debounce'
const debounce = new Debounce(); // 创建一个防抖函数实例
export const useConfig = defineStore('config', {
    state: () => {
        return {
            width: 0, // 屏幕宽度
            height: 0, // 屏幕高度
            isCollapse: false, // 是否折叠菜单
            isMobile: false, // 是否是移动端
            isTablet: false, // 是否是平板
            isDesktop: false, // 是否是桌面端
            isResizeListenerAdded: false, // 是否添加了窗口大小变化监听
        }
    },
    actions: {
        /**
         * @param  {...any} updates 需要更新的状态的参数
         */
        useConfig: function (...updates) {
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
         * 创建一个监听窗口大小变化的函数
         */
        updateWidthAndHeight: function () {
            if (this.isResizeListenerAdded) return;
            // 这里传递一个函数给防抖函数
            const WH = () => {
                debounce.debounce(() => {
                    this.width = window.innerWidth;
                    this.height = window.innerHeight;
                }, 1000);
            }
            // 初始化一次
            WH();
            // 添加监听事件
            window.addEventListener('resize', WH);
            this.useConfig({
                isResizeListenerAdded: true
            })
        }
    }
})