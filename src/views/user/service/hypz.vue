<template>
  <div class="hHypz">      
          <h-row type="flex" justify="space-around" class="code-row-bg">
                <h-col span="13">
                      <h-panel>
                          <div class="title-div-qy">
                                <label class="textlang">行业配置</label>
                          </div>
                          <h-row type="flex" justify="space-around" class="code-row-bg">
                                <h-col span="24">
                                    <div class="Hyspan"><span>行业集中度：<label style="color:red">{{hyjzd}}</label></span></div>
                                    <!--<h-ring :legend="legend" :series="series" :colors="chartColors" height="233px"></h-ring>-->
                                    <div id="pieChartHy" style="width:80%;height:250px"></div>
                                </h-col>
                          </h-row>
                      </h-panel>  
                </h-col>
                <h-col span="11">
                       <h-panel>
                           <div class="title-div-qy">
                                <label class="textlang">重仓行业</label>
                          </div>
                           <h-row type="flex" justify="space-around" class="code-row-bg">
                                <h-col span="24">
                                    <h-table stripe :columns="columns1" :data="data1" :size="size" :row-class-name="rowClassName" height="250px"></h-table>
                                </h-col>
                            </h-row>
                       </h-panel>
                </h-col>
          </h-row>     
  </div>
</template>
<script>
import echarts from "echarts";

export default {
    data() {
        return {
        columns1: [
                    {
                        title: '行业名称',
                        key: 'name',
                        align: "center",
                        render:(h,params) => {
                            let val = params.row.name;
                            return h("a",{
                                attrs: {
                                    href: 'http://localhost:8080/hypz',  
                                },
                            }, val);
                        }
                    },
                    {
                        title: '持仓',
                        key: 'sum',
                        align: "center"
                    },
                    {
                        title: '基准',
                        key: 'jz',
                        align: "center"
                    },
                    {
                        title: '超配',
                        key: 'cp',
                        align: "center"
                    },
                    {
                        title: '表现',
                        key: 'bx',
                        align: "center"
                    }
                ],
                data1: [
                    {
                        name: '信息服务',
                        sum: '12.18',
                        jz: '6.23',
                        cp: '5.95',
                        bx: '0.05'
                    },
                    {
                        name: '电子',
                        sum: '8.67',
                        jz: '3.12',
                        cp: '5.55',
                        bx: '0.30'
                    },
                    {
                        name: '化工',
                        sum: '8.12',
                        jz: '4.15',
                        cp: '3.97',
                        bx: '0.21'
                    },
                    {
                        name: '能源',
                        sum: '7.12',
                        jz: '5.15',
                        cp: '1.97',
                        bx: '0.10'
                    }
                ],
                size:'small', //表格行样式
                notSetWidth:true,
                hyjzd: '49.93%',
                chartColors:['#66b3ff','#97cbff','#d2e9ff', '#bebebe','#e0e0e0','#f0f0f0'], //扇区颜色
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} {d}"
                },
                legend: { //图例属性
                    orient: 'vertical',  //垂直显示
                    y: 'center',    //延Y轴居中
                    x: 'right' //居右显示
                },
                series: [{
                    name: "净值占比",
                    type: "pie",
                    selectedMode: 'single',
                    radius: ["20%", "50%"],
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
                            { name: '信息服务', value: 0.3, selected:true},
                            { name: '电子', value: 0.1 },
                            { name: '化工', value: 0.1 },
                            { name: '能源', value: 0.05 },
                            { name: '房地产', value: 0.05 },
                            { name: '其他', value: 0.4 },
                        ]
                }]
            }
        },
        methods: {
                    rowClassName (row, index) {
                            if (index === 0) {
                                return 'demo-table-info-row';
                            } else if (index === 3) {
                                return 'demo-table-error-row';
                            }
                            return '';
                        },
                    initpieChart(date) {
                        let pieChart = echarts.init(document.getElementById("pieChartHy"));
                        let option = {
                            tooltip: {
                            rigger: "item",
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            color: [
                                '#66b3ff',
                                '#97cbff',
                                '#d2e9ff', 
                                '#bebebe',
                                '#e0e0e0',
                                '#f0f0f0'
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
                                radius: ["20%", "50%"],
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
                },

                mounted() {
                        let date = [
                            { name: '信息服务', value: 0.3, selected:true},
                            { name: '电子', value: 0.1 },
                            { name: '化工', value: 0.1 },
                            { name: '能源', value: 0.05 },
                            { name: '房地产', value: 0.05 },
                            { name: '其他', value: 0.4 },
                        ]
                        this.initpieChart(date);
                    } 
}
</script>
<style>
.Hyspan{
    height: 17px;
    text-align: left;
    padding-left: 8%;
}
</style>
