<template>
    <div>
        <h1 class="page_title">注册新账户</h1>
        <h-row type="flex" justify="center">
            <h-col>
                <h-form :model="formItem" :label-width="80" ref="formItem">
                    <h-form-item label="账户ID:" required prop="account" :validRules="accountRule">
                        <h-input type="text" v-model="formItem.account" placeholder="请输入"></h-input>
                    </h-form-item>
                    <h-form-item label="手机号:" required prop="phone" :validRules="phoneRule">
                        <h-input type="text" v-model="formItem.phone" placeholder="请输入"></h-input>
                    </h-form-item>
                    <h-form-item label="Email:" prop="eMail" :validRules="emailRule">
                        <h-input type="text" v-model="formItem.eMail" placeholder="请输入"></h-input>
                    </h-form-item>
                    <h-form-item label="显示名称:" required prop="name" :validRules="nameRule">
                        <h-input type="text" v-model="formItem.name" placeholder="请输入"></h-input>
                    </h-form-item>
                    <h-form-item label="密码:" required prop="password" :validRules="passwordRule">
                        <h-input type="password" v-model="formItem.password" placeholder="请输入"></h-input>
                    </h-form-item>
                    <h-form-item label="确认密码:" required prop="conPassword" :validRules="conPasswordRule">
                        <h-input type="password" v-model="formItem.conPassword" placeholder="请输入"></h-input>
                    </h-form-item>
                    <h-form-item label="验证码:" required prop="conCode" :validRules="conCodeRule">
                        <h-row>
                            <h-col span="12">
                                <h-input type="text" v-model="formItem.conCode" placeholder="请输入"></h-input>
                            </h-col>
                            <h-col span="12">
                                <img src="@/assets/code5.png" style="height:32px;cursor:pointer" alt="验证码" >
                            </h-col>
                        </h-row>
                    </h-form-item>
                    <h-form-item>
                        <h-button type="primary" @click="handleSubmit()">提交</h-button>
                        <h-button type="ghost" @click="handleReset()" style="margin-left:8px">重置</h-button>
                    </h-form-item>
                </h-form>
            </h-col>
        </h-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formItem: {
                account: '',
                phone: '',
                eMail: '',
                name: '',
                password: '',
                conPassword: '',
                conCode: ''
            },
            accountRule: ['username'],
            phoneRule: ['mobile'],
            emailRule: ['email'],
            nameRule: ['username'],
            passwordRule: [
                'username',
                {
                    test: /^[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\_\+\{\}\:\"\|\<\>\?\-\=\;\'\\\,\.\/]{6,15}$/,
                    message: '请输入6-15位数字和字母',
                    trigger: 'blur'
                }
            ],
            conPasswordRule: [
                'username',
                {
                    test: /^[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\_\+\{\}\:\"\|\<\>\?\-\=\;\'\\\,\.\/]{6,15}$/,
                    message: '请输入6-15位数字和字母',
                    trigger: 'blur'
                }
            ],
            conCodeRule: [
                'username',
                {
                    test: /^[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\_\+\{\}\:\"\|\<\>\?\-\=\;\'\\\,\.\/]{4}$/,
                    message: '请输入正确的验证码',
                    trigger: 'blur'
                }
            ]
        }
    },
    methods: {
        handleSubmit() {
            if(this.formItem.password != this.formItem.conPassword) {
                this.$hMessage.error('两次输入密码不一致')
            }
        },
        handleReset() {
            this.$refs.formItem.resetFields()
        }
    }
}
</script>

<style lang="scss">
.page_title{
    margin: 20px 0 40px 0;   
}
.verify-tip-inner{
    max-width: 400px !important;
}
</style>
