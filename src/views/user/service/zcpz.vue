<template>
  <div>
      <h-panel title="资产配置">
          <h-row type="flex" justify="space-around" class="code-row-bg">
                <h-col span="24">
                        <div id="pieChart" style="width:300px;height:150px"></div>
                </h-col>
          </h-row>
          <h-row type="flex" justify="space-around" class="code-row-bg">
                <h-col span="24">
                    <div>
                        <h-table stripe :columns="columns1" :data="data1" :size="size" :row-class-name="rowClassName"></h-table>
                    </div>
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
                data1: [
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
    methods:{
    initpieChart(date) {
      let pieChart = echarts.init(document.getElementById("pieChart"));
      let option = {
        tooltip: {
          rigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: [
         '#ffdc35',
         '#bebebe',
         '#d0d0d0', 
         '#e0e0e0'
        ],
        legend: { //图例属性
             orient: 'vertical',  //垂直显示
             y: 'center',    //延Y轴居中
             x: 'right' //居右显示
        },
        series: [
          {
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
            data: date
          }
        ]
      };
      pieChart.setOption(option);
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
        let date = [
            { value: 0.6, name: '股票', selected:true},
            { value: 0.2, name: '债券' },
            { value: 0.1, name: '银行存款' },
            { value: 0.1, name: '其他' },
          ];
          this.initpieChart(date);
    } 
}
</script>
<style>
    
</style>


