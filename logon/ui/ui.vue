<template>
    <div class="box">
        <div class="body">
            <div>
                <h1>员工后台管理系统</h1>
            </div>
            <div class="button">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                :size="formSize" status-icon>
                <el-form-item label="账号" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary" size="large" :disabled="buttonstate.state" class="widht" @click="submitForm(ruleFormRef)">
                        {{ buttonstate.txt }}
                    </el-button>
                </el-form-item>
            </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

import db from './../../src/db/db'
import router from '../../src/router';
// import rsa from './../../src/db/RSA/RSA'


// import encryption from './../../src/db/RSA/RSAencryption'
const internalInstance = getCurrentInstance()!;
const instance = internalInstance.appContext.config.globalProperties.$axios;




const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    password: '', 
})
// buttonstate 按钮的登录状态
const buttonstate = reactive({
    state: false,
    txt: '登录',
    // 动画的时间
    time: 3000,

})


const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 8, max: 9, message: '账号的长度为8位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        // zlib: { // 验证码 （提高验证速度） （验证码不是必需的，但可以选
    ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    document.cookie = 'session-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {    
            // 验证成功将按钮状态更改。
            buttonstate.state = true
            buttonstate.txt = '登录中'
            instance.post(db.url + '/ues/logon', {
                uesname: ruleForm.name,
                password: ruleForm.password
            }
            ,{
                // withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            )
            .then(res => {
                if (res.status === 200) {
                    buttonstate.state = false
                    buttonstate.txt = '登录'
                    ElMessage({
                        duration: 1000,
                        showClose: true,
                        message: res.data.msg,
                        type: 'success',
                    })
                    router.push('/uesdata')
                }
            })
            .catch(err => {
                buttonstate.state = false
                buttonstate.txt = '登录'
                ElMessage({
                    showClose: true,
                    message: err.response.data,
                    type: 'error',
                })
            })
        } else {
            
        }
    })
}





</script>

<style scoped>  
.box {
    height: 100vh;
    background-color: #444;
    /* position: fixed; */
}

.body {
    width: 35vw;
    height: 45vh;
    background-color: #fff;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /* padding-right: 5%; */
}
h1 {
    text-align: center;
    /* margin-left: 20%; */
}
.widht {
    width: 100%;
}
.button {
    width: 90%;
    height: 90%;
}
</style>