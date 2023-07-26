import count from './count/ip'
const server: { host: string,port: number } = {
    // 这里是后台的地址 
    // 域名或者ip地址，ip地址需要添加端口
    // 格式为： 127.0.0.1 | baidu.com | ht.baidu.com
    host: '127.0.0.1',
    port: 9999
}

const url = count.ipORdomainNAME(server.host, server.port)
console.log(url);


export default {
    url
}   