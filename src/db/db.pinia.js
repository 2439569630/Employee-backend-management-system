import { defineStore } from 'pinia';

export const useServerStore = defineStore({
    id: 'server',
    state: () => ({
        host: '127.0.0.1', // 服务器地址ip或者域名
        port: 9999, // 服务器端口
    }),
    getters: {
        url() {
            return `http://${this.host}:${this.port}`; // 加上协议部分
        }
    }
});
