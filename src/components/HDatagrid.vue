<template>
  <div class="h-datagrid">
    <div class="h-datagrid-title" v-if="title" ref="gridTitle">
      <h4>{{ title }}</h4>
    </div>
    <div class="h-datagrid-toolbar" v-if="hasToolBar" ref="gridToolbar">
      <div class="pull-right" ref="listCheckBox" v-if="showListCkeckBox">
          <h-button type="ghost" icon="ios-keypad-outline"  @click="handlemultiple">自定义列表项</h-button>
          <transition name="slide-up">
            <div v-show="this.showMultiple" class="h-table-checkBox-container" style="width:120px">
              <h-checkbox-group class="h-table-checkBox-group" v-model="checked" v-for="(item,index,key) in showCol" :key="item.key" @on-change="checkAllGroupChange(item)">
                  <h-checkbox :label="item.key" class="h-table-checkBox">
                    <span class="h-table-checkBox-item" >{{item.title}}</span>
                  </h-checkbox>
              </h-checkbox-group> 
            </div>
          </transition>
      </div>
      <slot name="toolbar"></slot>
      <!-- <h-button type="ghost" icon="addition" @click="exportCsv()">{{$t('m.i.common.download')}}</h-button> -->
    </div>
    <div :ref="selfAdaptTable" class="h-table-box">
      <h-table :data="tData" :columns="columns" 
          :size="size"
          :border="border"
          :stripe="stripe"
          :show-header="showHeader"
          :width="width"
          :height="fixedHeight"
          :canDrag="canDrag"
          :loading="loadingData"
          :disabled-hover="disabledHover"
          :highlight-row="highlightRow"
          :rowSelect="rowSelect"
          :row-class-name="rowClassName"
          :no-data-text="onDataText"
          :no-filtered-data-text="noFilteredDataText"
          :patibleHeight="patibleHeight"
          @on-row-click="onRowClick" 
          @on-row-dblclick="onRowDbClick"
          @on-current-change="onCurrentChange"
          @on-select="onSelect"
          @on-select-cancel="onSelectCancel"
          @on-select-all="onSelectAll"
          @on-selection-change="onSelectChange"
          @on-sort-change="onSortChange"
          @on-expand="onExpand"
          ref="gridContent"></h-table>       
    </div>
    <h-page :current="pageInfo.pageNo"
            :total="total" 
            :page-size="pageInfo.pageSize"
            :size="size"
            :placement="placement"
            :simple="simple"
            :show-total="showTotal"
            :show-elevator="showElevator"
            :show-sizer="showSizer"
            :pageSizeOpts="pageSizeOpts" 
            :class-name="className"
            :styles="styles"
            @on-change="dataChange" 
            @on-page-size-change="pageSizeChange" 
            ref="gridPage" v-if="hasPage"></h-page>
  </div>
</template>
<script>
  const prefixCls = 'h-datagrid'
  import fetch from '../libs/http.js'
  import Emitter from '@/utils/emitter'
  //import printJS from 'print-js/src/index'

  export default {
    name: 'HDatagrid',
    data () {
      return {
        patibleHeight:true,
        selfHeight: 0,
        fixedHeight: this.height,
        tData: [],
        total: 0,
        dataInfo: {},
        pageInfo: {
          pageNo: this.current || 1,
          pageSize: this.pageSize || 10
        },
        hasToolBar: true,
        loadingData: false, //仅在url中生效，非URL在外部配置,
        showMultiple: false,
        checked: [],
        showCol: []                                 
      }
    },
    mixins: [Emitter],
    props: {
      title: String,//表格列表头部信息,
      showListCkeckBox: { //是否显示自定义表格选项框
        type: Boolean,
        default: false
      },
      gridData: Object, // 数据信息，包含表格信息rows及分页信息total[可以通过property自定义rows字段]
      columns: Array,
      border: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: 'small'
      },
      stripe: {
        type: Boolean,
        default: true
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      width: [Number, String],
      height: [Number, String],
      canDrag: {
        type: Boolean,
        default: true
      },
      disabledHover: {
        type: Boolean,
        default: false
      },
      highlightRow: {
        type: Boolean
      },
      rowSelect: {
        type: Boolean
      },
      rowClassName: Function,
      onDataText: String,
      noFilteredDataText: String,
      onRowClick: {
        type: Function,
        default () {
          return ''
        }
      },
      onRowDbClick: {
        type: Function,
        default () {
          return ''
        }
      },
      onCurrentChange: {
        type: Function,
        default () {
          return ''
        }
      },
      onSelect:{
        type: Function,
        default () {
          return ''
        }
      },
      onSelectCancel: {
        type: Function,
        default () {
          return ''
        }
      },
      onSelectAll: {
        type: Function,
        default () {
          return ''
        }
      },
      onSelectChange: {
        type: Function,
        default () {
          return ''
        }
      },
      onSortChange: {
        type: Function,
        default () {
          return ''
        }
      },
      onExpand: {
        type: Function,
        default () {
          return ''
        }
      },
      current: Number,
      pageSize: Number,
      placement: {
        type: String,
        default: 'top'
      },
      pageSizeOpts: Array,
      simple: Boolean,
      showTotal: {
        type: Boolean,
        default: true
      },
      showElevator: {
        type: Boolean,
        default: true
      },
      showSizer: {
        type: Boolean,
        default: true
      },
      className: String,
      styles: Object,
      hasPage:{ //是否显示分页
        type: Boolean,
        default: false
      },
      getDataFunc:{ //分页获取data函数，该参数必须配gridData || 无分页情况,直接返回rows,同时配置get-data事件
        type: Boolean,
        default: false
      },
      // getData: Function, //分页获取data函数，该参数必须配gridData || 无分页情况,直接返回rows
      url: String, //参考2.0 通过url请求数据
      bindForm: Object,
      autoLoad: { //设置URL时是否自动加载数据，默认true
        type: Boolean,
        default: true
      },
      loading: { // 非url时使用
        type: Boolean,
        default: false
      },
      selfAdaptTable: String,//暴露给用户ref属性,设置此属性后，表格根据页面高度自适应，不设置此属性按照给定的高度值给表格设定高度
      property: {
        type: Object,
        default() { // 自定义返回字段
          return {
            total: 'total',
            rows: 'rows',
            pageNo: 'pageNo',
            pageSize: 'pageSize',
            responseType: 'data'
          }
        }
      }
    },
    watch: {
      selfHeight (val) {
          this.selfHeight = val
      },
      current (val) {
        this.pageInfo.pageNo = val
      },
      pageSize (val) {
        this.pageInfo.pageSize = val
      },
      gridData: {
　　　　handler(newValue, oldValue) {
          if(newValue && newValue[this.property.rows] && newValue[this.property.rows].length > 0) {
            this.tData = newValue[this.property.rows]
          } else {
            this.tData = []
          }
          if (this.hasPage) {
            if(newValue && newValue[this.property.total]) {
              this.total = newValue[this.property.total]
            } else {
              this.total = 0
            }
          }
　　　　},
　　　　deep: true
  　　},
      // bindForm: {
      //   // 对象深度观察
      //   handler: (val) => {
      //     this.pageInfo.pageNo = 1
      //     this.getDataListByUrl()
      //   },
      //   deep: true
      // }
      loading (val) {
        this.loadingData = val
      }
    },
    methods :{
      getDataListByUrl () {
        // 是否有分页存在
        this.loadingData = true
        if (this.hasPage) {
          let query = this.pageInfo
          Object.assign(query, this.bindForm) 
          let that = this          
          fetch.post(this.url, query).then(res => {
            if (res) { //token过期判定
              this.loadingData = false
              if(res[this.property.responseType][this.property.total] && res[this.property.responseType][this.property.total] > 0 && res[this.property.responseType][this.property.rows]) {
                this.tData = res[this.property.responseType][this.property.rows]
                this.total = res[this.property.responseType][this.property.total]
              } else {
                this.tData = []
                this.total = 0
              }
              that.$nextTick(function () {
                that.dispatch('curpage','successDatagridLoad',this.tData, this.total)
              })
            } else {
              this.loadingData = false
              this.tData = []
            }
          })
        } else {
          let query = this.bindForm
          let that = this
          fetch.post(this.url, query).then(res => {
            if (res && res[this.property.responseType]) {
              this.loadingData = false
              if (res[this.property.responseType][this.property.rows] && res[this.property.responseType][this.property.rows].length > 0) {
                this.tData = res[this.property.responseType][this.property.rows]
              } else if (res[this.property.responseType] && res[this.property.responseType].length > 0) {
                this.tData = res[this.property.responseType]
              } else if(res[this.property.responseType] && res[this.property.responseType][this.property.rows] && res[this.property.responseType][this.property.rows].length > 0){
                this.tData = res[this.property.responseType][this.property.rows]
              } else {
                this.tData = []
              }
              that.$nextTick(function () {
                that.dispatch('curpage','successDatagridLoad')
              })
            } else {
              this.loadingData = false
              this.tData = []
            }
          })
        } 
      },
      // 赋值
      setGridData () {
        if (this.gridData[this.property.rows]) {
          this.tData = this.gridData[this.property.rows]
        }
        if (this.hasPage) {
          if (this.gridData[this.property.total]) {
            this.total = this.gridData[this.property.total]
          }
        }
      },
      getDataList (pageNo, pageSize) {
        if (this.url) {
          this.getDataListByUrl()
          this.$emit('on-page-change-url',pageNo,pageSize)//点击分页时，传递事件
        } else if (this.getDataFunc) {
          if (this.hasPage) {
            this.$emit('get-data', this.pageInfo)
          } else {
            this.$emit('get-data')
          }
        } else {
          this.$emit('on-page-change', pageNo, pageSize)
          // this.setGridData()
        }
      },
      // 点击上一页
      dataChange (i) {
        this.pageInfo.pageNo = i
        this.getDataList(i, this.pageInfo.pageSize)
      },
      // 页码改变
      pageSizeChange (i) {
        this.pageInfo.pageSize = i
        this.pageInfo.pageNo = 1
        // pageNo || pageSize
        this.getDataList(1 ,i)
      },


      // 反选某行的选中状态，仅多选
      toggleTableSelect (index) {
        if (this.$refs.gridContent.selectType) {
          this.$refs.gridContent.toggleSelect(index)
        } else (
          this.$hMessage.info('仅支持表格多选')
        )
      },
      // 表格导出功能
      exportCsv (params) {
        /* {
          filename:  '' // 文件名
          columns: []// 导出表格列
          data: [] // 导出表格数据
          noHeader: false //是否导出表格头
        } */
        this.$refs.gridContent.exportCsv(params)
      },
      printer (config) {
        // 具体各项配置参考http://printjs.crabbly.com/
        let printConfig = config ? config : {
          printable: [],
          properties: [],
          type: 'json',
          gridHeaderStyle: 'border: 1px solid #111;',
          gridStyle: 'border: 1px solid #111;text-align:center;'
        }
        //printJS(printConfig)
      },
      bodyClick (event) {
        //实现点击页面空白地方使自定义列表项div消失
          let _this = this;
          if(!!_this.$refs.listCheckBox.contains(event.target)) return
          _this.showMultiple = false
      },
      //显示多选框
      handlemultiple(){ 
        this.showMultiple = !this.showMultiple
        document.body.addEventListener('click',this.bodyClick,false)
      },
      //控制列显示隐藏
      checkAllGroupChange (item) {
        this.columns.forEach((value,index) => {
          if(value.key == item.key){
              value.hiddenCol = !value.hiddenCol
              if(this.checked.length==1){
                this.$refs.gridContent.fixedHeader()
              }
            }
        })
      },
      //计算表格高度
      calculateHeight(){
        let appObj = document.getElementsByClassName("app-main")
        let appOffsetTop = appObj.length == 0 ? 0 : appObj[0].offsetTop
        let objects = {
          panelObj: window.document.getElementsByClassName("h-panel")[0],
          titleObj: window.document.getElementsByClassName("h-datagrid-title")[0],
          toolbarObj: window.document.getElementsByClassName("h-datagrid-toolbar")[0],
          pageObj: window.document.getElementsByClassName("h-page")[0]
        }
        let extralHeight = 0
        Object.keys(objects).forEach(function(key,index){
          if(typeof objects[key] != "undefined"){
              extralHeight+= objects[key].clientHeight
          }
        });
        return window.innerHeight - extralHeight - appOffsetTop - 27
    },
      //表格自适应
      selfAdaption(){
        if(this.$refs[this.selfAdaptTable]){
          this.selfHeight = this.calculateHeight() 
          this.fixedHeight = this.selfHeight 
          if(this.selfHeight>50){
            this.$refs[this.selfAdaptTable].style.height = this.selfHeight.toString()+'px'
          }else{
            return
          }
          // this.$refs[this.selfAdaptTable].style.height = this.selfHeight.toString()+'px'
        }
      }
    },
    created () {
      if(this.autoLoad) {
        this.getDataList(1,10)
      } else {
        if (this.gridData) {
          this.setGridData()
        }
      }
      if (!this.$slots.toolbar) { 
        this.hasToolBar = false
      }
      this.columns.forEach((value,index,showCol) => {
        if(value.hiddenCol != true ){
            let tempItem = JSON.parse(JSON.stringify(value))
            if(tempItem.type == 'selection'){
                tempItem.title = '选择框'
              }
            this.showCol.push(tempItem)
            this.checked.push(value.key)
          }
        })
    },
    beforeDestroy() { //在组件生命周期结束的时候销毁。
      document.body.removeEventListener('click',this.bodyClick,false)
    },
   }
</script>
<style lang="scss">
  .h-datagrid {
    background: #fff;
  }
  .h-datagrid-title {
    height: 32px;
    padding: 5px 18px 4px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom: 1px solid transparent;

    color: #192229;
    background: #fff;
    border-bottom: 1px solid #DCE1E3;
    h4 {
      margin: 0;
      font-weight: bold;
      line-height: 22px;
    }
  }
  .h-datagrid-toolbar {
    padding: 8px 15px;
    min-height: 48px;
    border-bottom: 1px solid #dce1e3;
    border-width: 1px 1px 0;
    // .pull-left {
    //   float: left;
    // }
    .pull-right {
      float: right;
    }
    .h-btn {
      padding: 6px 12px;
      margin-right: 4px;
      > .h-icon + span,
      > span + .h-icon{
        font-size: 12px;
        // color: #333333;
        margin-left: 0;
      }
      .iconfont {
        font-size: 12px;
        // color: #333333;
      }
      &.h-btn-disable > .h-icon + span,
      &.h-btn-disable > span + .h-icon,
      &.h-btn-disable > .iconfont {
        color: inherit;
      }
    }
    .downloadInfo {
      padding: 3px 9px;
      height: 32px;
      border: 1px solid #D7DDE4;  
    }
    .downloadInfo:hover {
      border: 1px solid #5ca8ff;  
    }
  }
  .h-datagrid .h-table-small .h-table-header {
    color: #192229;
    border-bottom: 2px solid  #DCE1E3;
  }
  .h-datagrid .h-table-small .h-table-body .h-table-tbody .h-table-row td{
    border-bottom: 1px solid #dce1e7;
  }
  .h-datagrid .h-table-small .h-table-fixed {
    color: #192229;
    .h-table-fixed-header{
      border-bottom: 2px solid  #DCE1E3;
    }
    .h-table-fixed-body .h-table-tbody td{
      border-bottom: 1px solid #dce1e7;
    }
  }
  .h-datagrid .h-editgird-small .h-editgird-header {
    color: #192229;
  }
  .h-datagrid .h-table-small td {
    height: 30px;
  }
  .h-datagrid .h-select-item {
    padding: 3px 16px;
  }
  .h-datagrid .h-table-fixed-body td .h-icon{
    font-size:18px;
    cursor: pointer;
    &:after {
      content: '';
      display: inline-block;
      background: #dce1e3;
      width: 1px;
      height: 10px;
      margin: 0 6px;
    }
    &:last-child:after {
      display: none;
    }
  }

  .h-datagrid .h-page {
    margin: 5px;
    padding: 10px 5px 5px 5px;
    .h-page-prev,
    .h-page-next,
    .h-page-item-jump-prev,
    .h-page-item-jump-next,
    .h-page-item,
    .h-page-options-elevator input {
      height: 26px;
      line-height: 24px;
      min-width: 24px;
    }
    .h-select-single {
      .h-select-selection {
        height: 28px;
        line-height: 26px;
        .h-select-placeholder,
        .h-select-selected-value {
          height: 28px;
          line-height: 26px;
        }
      }
    }
  }


      // 自定义列表项选择框样式
  .h-table-checkBox-container{
    position:absolute;
    padding: 5px 0px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 8px #ccc;
    max-height:200px;
    width: 130px;
    overflow:auto;
    z-index:9999;
    .h-table-checkBox-group{
      width: 120px;
      padding:5px 10px 5px 10px;
      white-space:nowrap;
      .h-table-checkBox{
        .h-table-checkBox-item{
          // display: inline-block;
        }
      }
    }
    .h-table-checkBox-group:hover{
      background: rgb(243, 243, 243);
    }

      /*修改table滚动条样式*/
    /* 滚动条 */
    ::-webkit-scrollbar{
      width:7px;
      height:7px;
      background-color: transparent;
    }
    ::-webkit-scrollbar-track{
      -webkit-box-shadow: none;
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb{
      border-radius: 10px;
      background: rgba(123,129,144,0.6);
    }
    ::-webkit-scrollbar-thumb:hover{
      cursor: pointer;
      background: rgba(123,129,144,1);
    }

  }
</style>
