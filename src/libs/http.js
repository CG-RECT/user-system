import hui from 'h_ui/dist/h_ui.min.js'
import axios from 'axios'
//import store from '@/store'
import Qs from 'qs'

import { convertObj } from '@/libs/util'

const httpConfig = {
    //请求接口
    baseURL: window.LOCAL_CONFIG.API_HOME,

    // 默认请求方法
    method: 'get',

    // 设置超时时间
    timeout: 500000000,

    //自动携带cookie
    withCredentials: true,

    // 返回数据类型
    responseType: 'json',

    //最大重定向数目
    maxRedirects: 5,

    // 请求头信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },

    // 序列化param
    paramsSerializer: function (params) {
        return Qs.stringify(params)
    },

    // 在发送请求之前对请求数据做处理
    transformRequest: [
        function (data) {
            data = Qs.stringify(data)
            return data
        }
    ],

    // 提前处理返回的数据
    transformResponse: [
        function (data) {
            return data
        }
    ],
}

const http = axios.create(httpConfig)

http.interceptors.request.use(request => {
    let isUnderscore = window.LOCAL_CONFIG.isUnderscore

    //为服务传输时采用的是下划线形式，而不是驼峰
    //在这里需要将驼峰模式转为下划线形式
    if (isUnderscore && request.data) {
        let newData = {}
        convertObj(request.data, newData, true)
        request.data = newData
    }
    return request
}, error => {
    Promise.reject(error)
})

http.interceptors.response.use(response => {
    // ie中res.data返回为string类型，chorme为obj类型
    if (response.data && typeof response.data == 'string') {
        response.data = JSON.parse(response.data)
    }

    if (response.data && response.data.data) {//兼容IAR模式 20180915 add by 周智星
        response.data = response.data.data.length == 1 ? response.data.data[0] : response.data.data
    }

    let return_code = response.data.return_code

    if (response.data && (
        return_code == 9008 ||
        return_code == 9007 ||
        return_code == 9006 ||
        return_code == 9005 ||
        return_code == 9004) || !response) {
        console.log('error')
        throw new Error(response)
    }
    return response
}, error => {
    if(!error.response){
        hui.hMessage.error("网络请求错误")
    } 

    if (error && error.response && error.response.data && error.response.data.return_code) {
        let flag = true;
        let text = ""
        let return_code = error.response.data.return_code

        if (return_code == 9008) {
            text = '对不起,您缺少访问权限'
        } else if (return_code == 9006) {
            text = '页面已经失效,请先登录'
            flag = false
        } else if (return_code == 9007) {
            text = '会话已失效,请重新登录'
            flag = false
        } else if (return_code == 9004) {
            text = '您已被踢出,请先登录'
            flag = false
        } else if (return_code == 9005) {
            text = '您已在别地方登录,请先登录'
            flag = false
        } else if (return_code == 9011) {
            text = '验证码出错'
        } else {
            flag = false
            text = '当前服务端登录验证出错,请重新登录'
        }

        if (!flag) {
            hui.hMsgBox.confirm({
                title: "确认登录",
                content: text,
                onOk: () => {
                    //store.dispatch('logout').then(() => {
                        //location.reload()
                    //})
                },
                onCancle: () => {
                }
            })
        } else {
            if (text != "") {
                hui.hMessage.info(text)
            }
        }
    }

    Promise.reject(error)
})


export default http;