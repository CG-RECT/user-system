<template>
  <h-ring :legend="legend" :series="series" :settings="chartSettings" :colors="chartColors"></h-ring>
</template>

<script>
  export default {
    data () {
      return {
        chartData: {
          columns: ['accsets', 'percent'],
          rows: [
            { 'accsets': '股票', 'percent': 0.6, selected:true},
            { 'accsets': '债券', 'percent': 0.2 },
            { 'accsets': '银行存款', 'percent': 0.1 },
            { 'accsets': '证券', 'percent': 0.05 },
            { 'accsets': '债权', 'percent': 0.05 },
          ]
        },
        chartColors:['#ffdc35','#bebebe','#d0d0d0', '#e0e0e0'], //扇区颜色
        chartSettings: { //设置图表自身属性
            limitShowNum: 3, //限制扇区个数
        },
        legend: { //图例属性
             orient: 'vertical',  //垂直显示
             y: 'center',    //延Y轴居中
             x: 'right' //居右显示
        },
        series: {
            name: "净值占比",
            type: "pie",
            selectedMode: 'single',
            radius: ["20%", "60%"],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
             data:  [
                      { name: '股票', value: 0.6, selected:true},
                      { name: '债券', value: 0.2 },
                      { name: '银行存款', value: 0.1 },
                      { name: '证券', value: 0.05 },
                      { name: '债权', value: 0.05 },
                  ]
        }
      }
    }
  }
</script>