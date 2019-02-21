<template>
  <h-ring :data="chartData"></h-ring>
</template>

<script>
  export default {
    data () {
      return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
          ]
        }
      }
    }
  }
</script>