<template>
  <div>
      <h-panel title="组合与基准表现">
          <h-row type="flex" justify="space-around" class="code-row-bg">
                <h-col span="24">
                        <div><ul><li class="lichart">时间区间：</li>
                                 <li class="lichart">近1月</li>
                                 <li class="lichart">近3月</li>
                                 <li class="lichart">近6月</li>
                                 <li class="lichart">近1年</li>
                                 <li class="lichart">近3年</li>
                                 <li class="lichart">今年来</li>
                                 <li class="lichart">成立以来</li>
                        </ul></div>
                        <div id="lineChart" class="lineChart"></div>
                </h-col>
          </h-row>
          <h-row type="flex" justify="space-around" class="code-row-bg">
                <h-col span="24">
                   <h-table stripe :columns="columns1" :data="data3" :size="size" :row-class-name="rowClassName"></h-table>
                </h-col>
          </h-row>
      </h-panel>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
    data() {
        return {
             columns1: [
                    {
                        title: '资产大类',
                        key: 'name'
                    },
                    {
                        title: '净值占比',
                        key: 'percent'
                    },
                    {
                        title: '基准',
                        key: 'jz'
                    },
                    {
                        title: '超配',
                        key: 'cp'
                    },
                    {
                        title: '表现',
                        key: 'bx'
                    }
                ],
                data3: [
                    {
                        name: '股票资产',
                        percent: '67.43',
                        jz: '67.43',
                        cp: '1.69',
                        bx: '0.14'
                    },
                    {
                        name: '债券资产',
                        percent: '12.34',
                        jz: '12.34',
                        cp: '-1.25',
                        bx: '-0.22'
                    },
                    {
                        name: '货币类资产',
                        percent: '15.10',
                        jz: '15.10',
                        cp: '1.14',
                        bx: '1.16'
                    },
                    {
                        name: '其他',
                        percent: '5.13',
                        jz: '5.13',
                        cp: '0.00',
                        bx: '1.08'
                    }
                ],
                size:'small',
        }
    },
    methods: {
        initLineChart(data1, data2) {
            let lineChart = echarts.init(document.getElementById("lineChart"));
            let option = {
                 tooltip: {
                    rigger: "item",
                    formatter: "{a} <br/>{b}: {c}"
                },
                color:[
                    '#0066cc',
                    '#ff0000'
                ],
                legend: { //图例属性
                    x: 'right' //居右显示
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
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
                series:[
                    {
                      name:'组合',
                      type:'line' ,
                      smooth:true,
                      data:data1
                    },
                    {
                      name:'基准',
                      type:'line' ,
                      smooth:true,
                      data:data2
                    }
                ]
            };
            lineChart.setOption(option);
        },
        rowClassName (row, index) {
                if (index === 0) {
                    return 'demo-table-info-row';
                } else if (index === 3) {
                    return 'demo-table-error-row';
                }
                return '';
            }
    },
    mounted() {
        let data1 = [1,0.9,2,1.1,-4,2,2.5
        ];
        let data2 = [1,4,6,1.8,-3.1,1.7,4.3]
        this.initLineChart(data1, data2);
    }
}
</script>
<style lang="scss">
.lineChart{
    height: 200px;
    width: 80%;
}
.lichart{
    float: left;
    margin-left: 35px;
}
</style>

