<template>
  <div>
      <h-panel>
            <!--<h-row type="flex" class="code-row-bg">
                <h-col span="2" style="text-">                          
                    <label for="dtp_input1">组合名称:</label>
                </h-col>
                <h-col span="3">
                    <h-input size="small" data-link-field="dtp_input1" placeholder="请输入"></h-input>
                </h-col> 
                <h-col span="2">   
                    <label for="dtp_input1">组合名称:</label>
                </h-col>
                <h-col span="3">    
                    <div style="float:left;"><h-date-picker type="date" placeholder="选择日期" size="small"></h-date-picker></div>
                </h-col>
                <h-col span="1">
                    <div style="float:left;margin-left:10px"><h-button icon="search" size="small" style="background:#ff9224;color:#ffffff"></h-button></div>
                </h-col>

            </h-row>-->
            <h-row type="flex" class="code-row-bg">               
                <h-form ref="formItem" :label-width="80" :model="formItem" inline>
                        <h-form-item prop="zhname" label="组合名称:" style = "margin-top:3px;">
                            <h-input type="text" v-model="formItem.zhname" placeholder="请输入" size="small">
                            </h-input>
                        </h-form-item>
                        <h-form-item prop="date" label="查询日期:" style = "margin-top:7px;">
                            <h-date-picker type="date" placeholder="选择日期" v-model="formItem.date" size="small"></h-date-picker>
                        </h-form-item>
                </h-form>
                <div style = "float:left;margin-top:12px;">
                    <h-button icon="search" size="small" style="background:#ff9224;color:#ffffff"></h-button>
                </div>    
            </h-row>        
          <hSearHead :netvalue="netvalue" :singNetvalue="singNetvalue" :totalvalue="totalvalue"></hSearHead>
          <h-row type="flex" justify="space-around" class="code-row-bg">
                <h-col span="9">
                    <hZcpz></hzcpz>
                </h-col>
                <h-col span="15">
                    <hZhyjzbx></hZhyjzbx>
                </h-col>
          </h-row>
          <h-row type="flex" justify="space-around" class="code-row-bg">
                <h-col span="9">
                    <hJyhz></hJyhz>
                </h-col>
                <h-col span="15">
                        <hHypz></hHypz>
                        <hGgpz></hGgpz>    
                </h-col>
          </h-row>
      </h-panel>
  </div>
</template>
<script>
import hZcpz from './zcpz.vue'
import hZhyjzbx from './zhyjzbx.vue'
import hHypz from './hypz.vue'
import hGgpz from './ggpz.vue'
import hJyhz from './jyhz.vue'
import hSearHead from './searchHead.vue'
import {formatNumber} from  '@/utils/index'
export default {
    data() {
        return {
            //首行数据
            netvalue: 1243774.6906,
            singNetvalue: 1.7650,
            totalvalue: 704806.4339,
            cash:704806.4339,
            //表单查询数据
            formItem: {
                zhname:'',
                date:''
            },
        }
    },
  components: {
      hZcpz,
      hZhyjzbx,
      hHypz,
      hGgpz,
      hJyhz,
      hSearHead
  },
  methods:{
      thousandBitSeparator(num) {
            return num && (num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
                return $1 + ",";
            }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
                return $1 + ",";
            }));

        },
  },
  computed:{
      netvalueWithcompute(){
        return formatNumber(this.netvalue,4,1)
      },
      singNetvalueWithcompute(){
        return formatNumber(this.singNetvalue,4,1)
      },
      totalvalueWithcompute(){
          return formatNumber(this.totalvalue,4,1)
      }      
  }
}
</script>
<style>
    .searh-input{
         float:left;
    }
    .img-percent{
        margin-left: 10%;
        display:inline; 
    }
    .app-main .h-main-search .h-form-item.no-label {
        width: 260px;
    }
</style>


