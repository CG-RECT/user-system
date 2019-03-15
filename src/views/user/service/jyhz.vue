<template>
  <div class="hJyhz">
      <h-panel>
          <div class="title-div-qy">
             <label class="textlang">交易汇总</label>
          </div>
          <h-row type="flex" justify="space-around" class="code-row-bg">
                <h-col span="24">
                            <h-table stripe :columns="columns1" :data="data1" :size="size" height="560px" :notSetWidth="notSetWidth"></h-table>
                </h-col>
          </h-row>
      </h-panel>
  </div>
</template>
<script>
import {formatNumber} from  '@/utils/index'
export default {
    data(){
        return {
            columns1: [
                    {
                        title: '代码',
                        key: 'code',
                        align: "center"
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: "center"
                    },
                    {
                        title: '方向',
                        key: 'fx',
                        align: "center"
                    },
                    {
                        title: '数量',
                        key: 'sl',
                        align: "center",
                        render:(h,params) => {
                            let val = params.row.sl;
                            let str = formatNumber(val,2,1);
                            return h("span",{}, str);
                        }
                    },
                    {
                        title: '金额',
                        key: 'je',
                        align: "center",
                        render:(h,params) => {
                            let val = params.row.je;
                            let str = formatNumber(val,2,1);
                            return h("span",{}, str);
                        }
                    },
                    {
                        title: '均价',
                        key: 'jj',
                        align: "center"
                    },
                    {
                        title: '市值占比',
                        key: 'szzb',
                        align: "center",
                        width: 90
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
                        szzb: '2%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '卖出',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%'
                    },
                   {
                        code: '600400',
                        name: '汇丰银行',
                        fx: '卖出',
                        sl: '9700000',
                        je: '7000000.00',
                        jj: '7.22',
                        szzb: '3%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '买入',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%'
                    },
                    {
                        code: '600570',
                        name: '恒生电子',
                        fx: '买入',
                        sl: '1100000',
                        je: '50000000.00',
                        jj: '46.34',
                        szzb: '2%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '卖出',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%'
                    },
                   {
                        code: '600400',
                        name: '汇丰银行',
                        fx: '卖出',
                        sl: '9700000',
                        je: '7000000.00',
                        jj: '7.22',
                        szzb: '3%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '买入',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%'
                    },
                    {
                        code: '600570',
                        name: '恒生电子',
                        fx: '买入',
                        sl: '1100000',
                        je: '50000000.00',
                        jj: '46.34',
                        szzb: '2%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '卖出',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%'
                    },
                   {
                        code: '600400',
                        name: '汇丰银行',
                        fx: '卖出',
                        sl: '9700000',
                        je: '7000000.00',
                        jj: '7.22',
                        szzb: '3%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '买入',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%'
                    },
                    {
                        code: '600000',
                        name: '浦发银行',
                        fx: '卖出',
                        sl: '8200000',
                        je: '50000210.00',
                        jj: '6.1',
                        szzb: '2%'
                    },
                   {
                        code: '600400',
                        name: '汇丰银行',
                        fx: '卖出',
                        sl: '9700000',
                        je: '7000000.00',
                        jj: '7.22',
                        szzb: '3%'
                    },
                ],
                size:'small', //表格行样式
                notSetWidth: true,
                autoHeadWidth:true

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
    }
}
</script>
<style>

</style>

