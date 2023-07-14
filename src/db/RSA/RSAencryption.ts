/**
 * 默认的填充模式，无法更改：RSA_PKCS1_PADDING
 * 
*/



// 从本地存储中获取公钥
let encryptKEY = localStorage.getItem('publicKey')
// 定义一个加密函数
const encryption = (key) => {
    try {
        
    }
    catch(error) {
        // 捕获错误并在控制台中输出错误信息
        console.error(error)
    }
}

// 导出加密函数
export default {
    encryption
}
