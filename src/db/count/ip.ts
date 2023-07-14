const expression_ip = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/
const expression_domain_name = /^([0-9a-zA-Z-]{1,}\.)+([a-zA-Z]{2,})$/
const ipORdomainNAME = (host,port) => {
    if(expression_ip.test(host)){
        return 'http://' + host + ':' + port
    }else if(expression_domain_name.test(host)){
        return 'http://' + host
    }
    else if(host === 'localhost'){
        return 'http://' + host
    }
    else{
        throw new Error('ip地址或者域名配置错误')
    }
    
}



    

export default {
    ipORdomainNAME
}