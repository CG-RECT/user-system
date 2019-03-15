<template>
  <h-line :data="chartData" :colors="chartColors" :legend="legend" :yAxis="yAxis" height="300px"></h-line>
</template>

<script>
  export default {
    data: function () {
      return {
        chartData: {
          columns: ['日期', '组合', '基准'],
          rows: [
            { '日期': '2018-01-01', '组合': 1, '基准': 1},
            { '日期': '2018-01-12', '组合': 0.9, '基准': 4},
            { '日期': '2018-01-23', '组合': 2, '基准': 6},
            { '日期': '2018-02-03', '组合': 1.1, '基准': 1.8},
            { '日期': '2108-02-14', '组合': -4, '基准': -3.1},
            { '日期': '2018-02-15', '组合': 2, '基准': 1.7},
            { '日期': '2018-02-15', '组合': 2.5, '基准': 4.3}
          ]
        },
        //chartSettings:{
           // metrics: ['组合', '基准'],
            //dimension: ['日期'],
        //},
        legend: { //图例属性
             x: 'right' //居右显示
        },
        xAxis: {
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#006000'
                }
            },
            data: ['2018-01-01','2018-01-12','2018-01-23','2018-02-03','2108-02-14','2018-02-25','2018-03-08']
        },
        yAxis:{
            min:-6.00,
            max:8.00,
            //minInterval: 2,
            splitNumber:7,
            name:'收益率(%)',
            //type:'value'
            axisLabel:{
                formatter: function (value, index) {           
                  return value.toFixed(2);      
                   }
            }
        },
        chartColors:['#0066cc','#ff0000'], //图表颜色
      }
    }
  }
</script>