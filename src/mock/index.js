import Mock from 'mockjs'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
    timeout: 1000
})

Mock.mock(/\/table/, req => {
    return "hello"
})
Mock.mock(/\/test\/zcpz\/ring/,req =>{
    return {
        "date": [
            { value: 0.6, name: '股票', selected:true},
            { value: 0.2, name: '债券' },
            { value: 0.1, name: '银行存款' },
            { value: 0.1, name: '其他' },
          ]
        }
})

export default Mock