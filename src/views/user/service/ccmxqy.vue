<template>
  <div>
      <h-panel>
            <h-row type="flex" class="code-row-bg">               
                <h-form ref="formItem" :label-width="80" :model="formItem" inline>
                        <h-form-item prop="zhname" label="组合名称:" style = "margin-top:3px;">
                            <h-input type="text" v-model="formItem.zhname" placeholder="请输入" size="small">
                            </h-input>
                        </h-form-item>
                        <h-form-item prop="zhname" label="行业名称:" style = "margin-top:7px;">
                            <h-select v-model="formItem.select" size="small" placeholder="请选择">
                                <h-option value="hundsun">恒生电子</h-option>
                                <h-option value="pingan">中国平安</h-option>
                                <h-option value="gongshang">工商银行</h-option>
                            </h-select>
                        </h-form-item>
                        <h-form-item prop="date" label="查询日期:" style = "margin-top:7px;">
                            <h-date-picker type="date" placeholder="选择日期" v-model="formItem.date" size="small"></h-date-picker>
                        </h-form-item>
                </h-form>
                <div style = "float:left;margin-top:12px;">
                    <h-button icon="search" size="small" style="background:#ff9224;color:#ffffff"></h-button>
                </div>    
            </h-row>
          <h-row>
            <h-panel>
                <h-row>
                    <div class="title-div">
                        <label class="textlang">持仓明细</label>
                    </div>
                    <!--<div class="title-div1">

                    </div>
                    <div class="out-off-div"></div> 
                    <div class="title-div2">

                    </div>
                    <div class="out-off-div"></div> 
                    <div class="title-div3">
                
                    </div> -->
                </h-row >
                <h-row style="margin-top: 2px;">
                    <h-table stripe :columns="columns1" :data="data1" :size="size" :multiLevel="multiLevel"></h-table>
                </h-row>
                                   
            </h-panel>
          </h-row>
      </h-panel>
  </div>
</template>
<script>
export default {
  data() {
        return {
            columns1: [
                    {
                        title: '证券代码',
                        key: 'code',
                        align: "center",
                    },
                    {
                        title: '证券名称',
                        key: 'name',
                        align: "center"
                    },
                    {
                        title: '所属行业',
                        key: 'fx',
                        align: "center"
                    },
                    {
                        title: '最新价',
                        key: 'sl',
                        align: "center"
                    },
                    {
                        title: '今日表现',
                        key: 'je',
                        align: "center"
                    },
                    {
                        title: '市值占比',
                        key: 'jj',
                        align: "center"
                    },
                    {
                        title: '业绩基准',
                        key: 'szzb',
                        align: "center",
                    },
                    {
                        title: '超配比例',
                        key: 'cpbl',
                        align: "center",
                    },
                    {
                        title: '最新评级',
                        key: 'zxpj',
                        align: "center",
                    },
                    {
                        title: '变动方向',
                        key: 'bdfx',
                        align: "center",
                    },
                    {
                        title: '评级日期',
                        key: 'pjrq',
                        align: "center",
                    },
                    {
                        title: '2018A',
                        key: 'aaa',
                        align: "center",
                    },
                    {
                        title: '2019E',
                        key: 'eee',
                        align: "center",
                    },
                    {
                        title: '2010E',
                        key: 'eeeee',
                        align: "center",
                    },
                    {
                        title: '目标价',
                        key: 'mbj',
                        align: "center",
                    },
                    {
                        title: '目标涨幅',
                        key: 'mbzf',
                        align: "center",
                    },
                    {
                        title: '2018A',
                        key: 'aaaaa',
                        align: "center",
                    },
                    {
                        title: '2019E',
                        key: 'eeeeee',
                        align: "center",
                    },
                    {
                        title: '2020E',
                        key: 'eeeeeee',
                        align: "center",
                    },
                    {
                        title: '一致预期',
                        key: 'yzyq',
                        align: "center",
                    },
                    {
                        title: 'PB',
                        key: 'PB',
                        align: "center",
                    }
                ],
                data1: [
                    {
                        code: '600570',
                        name: '恒生电子',
                        fx: '买入',
                        sl: '1100000',
                        je: '50000000.00',
                        jj: '46.34',
                        szzb: '2%',
                        cpbl: '2%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '卖出',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%',
                        cpbl: '2%'
                    },
                   {
                        code: '600400',
                        name: '汇丰银行',
                        fx: '卖出',
                        sl: '9700000',
                        je: '7000000.00',
                        jj: '7.22',
                        szzb: '3%',
                        cpbl: '2%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '买入',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%',
                        cpbl: '2%'
                    },
                    {
                        code: '600570',
                        name: '恒生电子',
                        fx: '买入',
                        sl: '1100000',
                        je: '50000000.00',
                        jj: '46.34',
                        szzb: '2%',
                        cpbl: '2%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '卖出',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%',
                        cpbl: '2%'
                    },
                   {
                        code: '600400',
                        name: '汇丰银行',
                        fx: '卖出',
                        sl: '9700000',
                        je: '7000000.00',
                        jj: '7.22',
                        szzb: '3%',
                        cpbl: '2%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '买入',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%',
                        cpbl: '2%'
                    },
                    {
                        code: '600570',
                        name: '恒生电子',
                        fx: '买入',
                        sl: '1100000',
                        je: '50000000.00',
                        jj: '46.34',
                        szzb: '2%',
                        cpbl: '2%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '卖出',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%',
                        cpbl: '2%'
                    },
                   {
                        code: '600400',
                        name: '汇丰银行',
                        fx: '卖出',
                        sl: '9700000',
                        je: '7000000.00',
                        jj: '7.22',
                        szzb: '3%',
                        cpbl: '2%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '买入',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%',
                        cpbl: '2%'
                    }
                ],
                multiLevel:[
                    {
                        title:"持仓信息",
                        cols:8,
                        rows:1,
                        align:'center',
                        className:'titleMessage-td'
                    },
                    {
                        title: '内部研究EPS',
                        cols:8,
                        rows:1,
                        align:'center',
                        className:'titleMessage-td'
                    },
                    {
                        title: '内部研究PE',
                        cols:5,
                        rows:1,
                        align:'center',
                        className:'titleMessage-td'
                    }
                ],
                size:'small',
            formItem: {
                zhname:"",
                select:"",
                date:""
            }
        }
  }
}
</script>
<style>
    .title-div1{
        height: 60px;
        width:33%;
        float:left;
        background-color:#fafafa;
        margin-top: 0px;
    }
    .title-div2{
        height: 60px;
        width:33%;
        float:left;
        background-color:#fafafa;
        margin-top: 0px;
    }
    .title-div3{
        height: 60px;
        width:33.4%;
        float:left;
        background-color:#fafafa;
        margin-top: 0px;
    }
    .out-off-div{
        height: 60px;
        width:0.3%;
        float:left;
        background-color:#ffffff;
        margin-top: 0px;
    }
    .title-div {
        background-color: #f2f2f2;
        width: 100%;
        height: 25px;
        text-align:left;
        font-size:15px;
        padding-top: 4px;
        padding-left: 2px;
        margin-bottom: 0px;
    }
    .h-table th.titleMessage-td {
         background-color:#fafafa;
         height: 60px;
         border:1px solid #ffffff;
    }
</style>


