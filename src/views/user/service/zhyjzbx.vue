<template>
  <div class="hZhyjzbx">
      <h-panel>
          <div class="title-div-qy">
             <label class="textlang">组合与基准表现</label>
          </div>
          <h-row type="flex" justify="space-around" class="code-row-bg">
                <h-col span="24">
                        <!--<div class="bx-flash" id="achart">
                            <a class="achart" href="#" @click="flashChart('achart1')" id="achart1">近1月</a>
                            <a class="achart" href="#" @click="flashChart('achart2')" id="achart2">近3月</a>
                            <a class="achart" href="#" @click="flashChart('achart3')" id="achart3">近6月</a>
                            <a class="achart" href="#" @click="flashChart('achart4')" id="achart4">近1年</a>
                            <a class="achart" href="#" @click="flashChart('achart5')" id="achart5">近3年</a>
                            <a class="achart" href="#" @click="flashChart('achart6')" id="achart6">今年来</a>
                            <a class="achart" href="#" @click="flashChart('achart7')" id="achart7">成立以来</a>
                        </div>-->
                        <div class="broder-body">
                            <div id="lineChart" class="lineChart"></div>
                        </div>
                        <!--<div class="h-line">
                            <h-line :tooltip="tooltip" :colors="color" :legend="legend" :xAxis="xAxis" :yAxis="yAxis" :series="series" height="250px"></h-line>
                        </div>-->
                </h-col>
          </h-row>
          <!--<h-row type="flex" justify="space-around" class="code-row-bg">
                <h-col span="24">
                   <h-table stripe :columns="columns1" :data="data3" :size="size" :row-class-name="rowClassName"></h-table>
                </h-col>
          </h-row>-->
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
                        key: 'name',
                        align: "center"
                    },
                    {
                        title: '净值占比',
                        key: 'percent',
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
                //图标属性绑定
                tooltip: {
                    trigger: 'axis',
                },
                color:[
                    '#0066cc',
                    '#ff0000'
                ],
                legend: { //图例属性
                    x: 'right' //居右显示
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    //axisLine: {
                        //onZero: false,
                        //lineStyle: {
                            //color: '#006000'
                        //}
                    //},
                    data:[]
                }],
                yAxis: [{
                    min:1.592,
                    max:1.568,
                    //minInterval: 2,
                    splitNumber:6,
                    name:'收益率(%)',
                    type:'value',
                    axisLabel:{
                        formatter: function (value, index) {           
                        return value.toFixed(3);      
                        }
                    }
                }],
                series:[
                    {
                      name:'组合',
                      type:'line' ,
                      smooth:true,
                      data:[],
                    },
                    {
                      name:'基准',
                      type:'line' ,
                      smooth:true,
                      data:[],
                    }
                ]
        }
    },
    methods: {
        initLineChart(data1, data2) {
            let lineChart = echarts.init(document.getElementById("lineChart"));
            let option = {
                 tooltip: {
                    trigger: 'axis', //是否显示对应刻度线
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
                    data: ['9:30','10:00','10:30','11:00','11:30','13:30','14:00','14:30','15:00'],
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: '#0099ff',
                            width: 2
                        }
                    },
                    splitLine: {
                        show: true //是否显示纵向分割线
                    },
                },
                yAxis:[{
                    min:1.568, //纵轴最小值
                    max:1.592, //纵轴最大值
                    splitNumber:6, //强制分割段数
                    interval:0.004, //强制分割间隔
                    boundaryGap: false, //是否在刻度处显示标签
                    //data: [ //离散时可用
                            //{value:'1.568',textStyle:{color:'green'},lineStyle: {color: '#006000'}},
                            //'1.572','1.576','1.580','1.584','1.588','1.592'],
                    name:'', //纵轴名称
                    type:'value', //纵轴类型连续
                    axisLine: { //纵轴样式等属性设置
                        //onZero: false,
                        lineStyle: {
                            color: '#0099ff',
                            width: 2
                        }
                    },
                    axisLabel:{ //纵轴刻度标签属性设置
                        formatter: function (value, index) {           
                            return value.toFixed(3);      
                        },
                        color: function (value, index) {
                                if(value>1.580){
                                    return 'red'
                                }else if(value==1.580){
                                    return '#000000'
                                }else{
                                    return 'green'
                                }
                            }
                    }
                },
                {
                    min:-2, //纵轴最小值
                    max:2, //纵轴最大值
                    splitNumber:6, //强制分割段数
                    interval:0.66, //强制分割间隔
                    boundaryGap: false, //是否在刻度处显示标签
                    //data: [ //离散时可用
                            //{value:'1.568',textStyle:{color:'green'},lineStyle: {color: '#006000'}},
                            //'1.572','1.576','1.580','1.584','1.588','1.592'],
                    name:'', //纵轴名称
                    type:'value', //纵轴类型连续
                    axisLabel:{ //纵轴刻度标签属性设置
                        formatter: function (value, index) {           
                            return value.toFixed(2);      
                        },
                        color: function (value, index) {
                                if(value>0){
                                    return 'red'
                                }else if(value == 0){
                                    return '#000000'
                                }else{
                                    return 'green'
                                }
                            }
                    }
                }],
                series:[
                    {
                      name:'组合', //线条名称
                      type:'line' , //图表类型
                      symbol: 'none', //去掉圆圈
                      smooth:true, //是否平滑
                      data:data1 //图标数据
                    },
                    {
                      name:'基准',
                      type:'line' ,
                      symbol: 'none', //去掉圆圈
                      smooth:true,
                      data:data2
                    }
                ]
            };
            lineChart.setOption(option);
        },
        flashChart (id) {
            this.colorSet(id);
            
        },
        colorSet(id){
            var elements = document.getElementById('achart').getElementsByTagName('a');
            for(var i = 0;i<elements.length;i++){
                if(elements[i].id == id){
                    document.getElementById(elements[i].id).style.backgroundColor="#66b3ff";
                }else{
                    document.getElementById(elements[i].id).style.backgroundColor="";
                }
            }
        },
        rowClassName (row, index) {
                if (index === 0) {
                    return 'demo-table-info-row';
                } else if (index === 3) {
                    return 'demo-table-error-row';
                }
                return '';
            },
        getChartData() {
            this.series[0].data = [1,1.1,0.9,0.5,2,1,1.1,1.5,-4,-2,2,3,2.5,3.6];
            this.series[1].data = [1,4,6,1.8,-3.1,1.7,4.3,1.1,1.5,-4,-2,2,3,2.5,3.6];
            this.xAxis[0].data = ['2018-01-01','2018-01-12','2018-01-23','2018-02-03','2108-02-14','2018-02-25','2018-03-08']
        }
    },
    created() {
        this.getChartData();
    },
    mounted() {
        let data1 = [1.580,1.583,1.573,1.575,1.588,1.571,1.580,1.583,1.582];
        let data2 = [1.572,1.579,1.577,1.585,1.590,1.571,1.585,1.580,1.582];
        this.initLineChart(data1, data2);
    }
}
</script>
<style lang="scss">
.lineChart{
    height: 250px;
    width: 100%;
}
.lichart{
    float: left;
    margin-left: 35px;
}
.lichart1{
    float: left;
    margin-left: 35px;
}
.lichart2{
    float: left;
    margin-left: 35px;
}
.lichart3{
    float: left;
    margin-left: 35px;
}
.div-flash-chart{
    background: #66b3ff;
}
.achart{
    color: #2c3e50;
    margin-left: 35px;
}
.bx-flash{
    height: 10px;
    margin-left: 10%;
    text-align: left;
}
.ax-flash{
    float: left;
    margin-left: 35px;
}
.title-div-qy {
        background-color: #f2f2f2;
        width: 100%;
        height: 25px;
        text-align:left;
        font-size:15px;
        padding-top: 4px;
        padding-left: 2px;
        margin-bottom: 3px;
    }
.broder-body {
    border: 1px solid rgb(232, 232, 232);
    margin:0 auto
}
</style>

