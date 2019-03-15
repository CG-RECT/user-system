<template>
  <div class="hSearHead"> 
          <div class="card-body">
            <div style="height:60px;">
              <div class="total-container">
                    <div class="h-row-title">
                        单位净值（元）
                    </div>
                    <div >
                        <div class="head-total">{{singNetvalueWithcompute}}</div>
                        <div class="img-percent">
                            <span><img src="@/assets/3.png" alt="" style="width: 2%;">0.28%</span>
                        </div>
                    </div>
              </div>
              <div class="out-off"></div> 
              <div class="total-container">
                <div class="h-row-title">
                    净值（万元）
                </div>
                <div >
                    <div class="head-total">{{netvalueWithcompute}}</div>
                    <div class="img-percent">
                        <span><img src="@/assets/3.png" alt="" style="width: 2%;">0.97%</span>
                    </div>
                </div>
              </div>
              <div class="out-off"></div>             
              <div class="total-container">
                <div class="h-row-title">
                    总规模（万元）
                </div>
                <div >
                    <div class="head-total">{{totalvalueWithcompute}}</div>
                    <div class="img-percent">
                        <span><img src="@/assets/3.png" alt="" style="width: 2%;">0.69%</span>
                    </div>
                </div>
              </div>
             <div class="out-off"></div>
               <div class="total-container">
                <div class="h-row-title">
                    现金头寸
                </div>
                <div >
                     <div class="head-total">{{totalvalueWithcompute}}</div>
                </div>
              </div>
            </div>
          </div>
  </div>
</template>

<script>
import {formatNumber} from  '@/utils/index'

    export default {
        date(){
            return {

            }
        },
        props: {
             //首行数据
            netvalue: Number,
            singNetvalue: Number,
            totalvalue: Number,
            cash:Number
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
            },
            cashWithcompute(){
                 return formatNumber(this.cash,4,1)
            }      
        }
    }
</script>

<style>
    .card-body {
        border: 1px solid rgb(232, 232, 232);
        width: 99.2%;
        margin:0 auto
    }
    .total-container{
        width:24.5%;
        float:left;
        margin-top: 15px;
    }
    .head-total {
        text-overflow: ellipsis;
        word-break: break-all;
        color: rgb(0, 0, 0);
        margin-top: 4px;
        margin-bottom: 0px;
        font-size: 20px;
        line-height: 20px;
        height: 20px;
        overflow: hidden;
        display:inline;                
    }
    .out-off{
       border:0.5px solid ;
       float:left;
       height:30px;
       color:#f2f2f2;
       margin-top:16px
    }
</style>


