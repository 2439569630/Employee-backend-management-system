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