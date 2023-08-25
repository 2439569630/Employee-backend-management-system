
/**
 * @description 通用防抖函数
 * @param fn 完成防抖后执行的函数
 * @param time 防抖时间
 */
export class Debounce {
    private timer: any = null;
    constructor() {
    }
    public debounce(fn: Function, time: number) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            fn();
        }, time);
    }
}